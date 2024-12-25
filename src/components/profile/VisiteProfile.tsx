import { useEffect, useState } from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea} from "@nextui-org/react";
import Swiper from "../home/Swiper.tsx";
import { useLocation } from "react-router-dom";
import {toast} from "sonner";

const VisiteProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [annonces, setAnnonces] = useState<any[]>([]);
    const [adoptions, setAdoptions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<number>(1); // Etat pour gérer l'onglet sélectionné
    const [selectedAnnonce, setSelectedAnnonce] = useState<any | null>(null); // State for selected annonce
    const [selectedAdoption, setSelectedAdoption] = useState<any | null>(null); // State for selected adoption

    const [isAnnonceModalOpen, setIsAnnonceModalOpen] = useState<boolean>(false); // Modal pour les annonces
    const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState<boolean>(false); // Modal pour les adoptions

    const [comments, setComments] = useState<{ [adoptionId: number]: string }>({});
    const [errorComments, setErrorComments] = useState<{ [adoptionId: number]: string | null }>({});


    const [adoptionComments, setAdoptionComments] = useState<{ [adoptionId: number]: any[] }>({});


    const location = useLocation();
    const { userId } = location.state || {}; // Récupérer userId depuis le state

    useEffect(() => {
        if (userId) {
            // Récupérer les informations de l'utilisateur
            fetch(`http://localhost:8200/api/users/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.role === 'ROLE_USER') {
                        setUser(data); // Stocke les informations de l'utilisateur si le rôle est ROLE_USER
                    }
                })
                .catch((err) => {
                    setError('Failed to fetch user data');
                    console.error(err);
                });

            // Récupérer les annonces de l'utilisateur
            fetch(`http://localhost:8202/api/animal-annonces/user-annonce/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setAnnonces(data); // Stocke les annonces
                })
                .catch((err) => {
                    setError('Failed to fetch user annonces');
                    console.error(err);
                });

            // Récupérer les adoptions de l'utilisateur
            fetch(`http://localhost:8202/api/adoptions/user/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setAdoptions(data); // Stocke les adoptions
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Failed to fetch adoptions');
                    console.error(err);
                    setLoading(false);
                });

        }
    }, [userId]);

    const fetchAdoptionComments = async (adoptionId: number) => {
        try {
            const response = await fetch(`http://localhost:8202/api/avis-comment/${adoptionId}`);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des commentaires");
            }
            const data = await response.json();
            setAdoptionComments((prev) => ({
                ...prev,
                [adoptionId]: data, // Associe les commentaires à l'ID de l'adoption
            }));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (selectedTab === 3) {
            adoptions.forEach((adoption) => {
                fetchAdoptionComments(adoption.id);
            });
        }
    }, [selectedTab, adoptions]);


    const handleAnnonceModalOpen = (annonce: any) => {
        setSelectedAnnonce(annonce); // Set selected annonce
        setIsAnnonceModalOpen(true); // Ouvrir la modal pour l'annonce
    };



    const handleAdoptionModalOpen = (adoptionId: number) => {
        // Récupérer les détails de l'animal adopté en fonction de l'adoptionId
        fetch(`http://localhost:8202/api/animal-annonces/demande-adoption/${adoptionId}`)
            .then((response) => response.json())
            .then((data) => {
                setSelectedAdoption(data[0]?.animalAnnonce || null); // Vérification pour éviter 'undefined'
                setIsAdoptionModalOpen(true); // Ouvrir la modal pour l'adoption
            })
            .catch((err) => {
                setError('Failed to fetch animal details');
                console.error(err);
            });
    };

    const handleModalClose = () => {
        setIsAnnonceModalOpen(false); // Fermer la modal d'annonce
        setIsAdoptionModalOpen(false); // Fermer la modal d'adoption
        setSelectedAnnonce(null); // Réinitialiser l'annonce sélectionnée
        setSelectedAdoption(null); // Réinitialiser l'adoption sélectionnée
    };




    const handleCommentChange = (adoptionId: number, value: string) => {
        setComments((prevComments) => ({
            ...prevComments,
            [adoptionId]: value,
        }));
    };

    const handleAddComment = async (adoptionId: number) => {
        const comment = comments[adoptionId]?.trim();

        if (!comment) {
            setErrorComments((prevErrors) => ({
                ...prevErrors,
                [adoptionId]: "Le commentaire ne peut pas être vide.",
            }));
            return;
        }

        const commentData = {
            comment,
            createdAt: new Date().toISOString(),
            userId,
            adoptedId: adoptionId,
        };

        try {
            const response = await fetch(
                "http://localhost:8202/api/avis-comment/create",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(commentData),
                }
            );

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du commentaire");
            }

            // Réinitialise le commentaire après l'envoi
            setComments((prevComments) => ({
                ...prevComments,
                [adoptionId]: "",
            }));
            setErrorComments((prevErrors) => ({
                ...prevErrors,
                [adoptionId]: null,
            }));

            toast.success("Commentaire ajouté avec succès !");
        } catch (err) {
            setErrorComments((prevErrors) => ({
                ...prevErrors,
                [adoptionId]: "Une erreur est survenue lors de l'ajout du commentaire.",
            }));
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Profile Section */}
            <div className="max-w-7xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
                {/* Profile Info */}
                {user && user.role === 'ROLE_USER' && (
                    <div className="flex items-center space-x-6">
                        <img
                            src="/img_1.png" // Utilisez l'image de profil réelle de l'utilisateur si disponible
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-[#d86404]"
                        />
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800">{user.nom} {user.prenom}</h2>
                            <p className="text-gray-600">@{user.email}</p>
                            <div className="mt-2">
                                <p className="text-gray-600">CIN: {user.cin}</p>
                                <p className="text-gray-600">Phone: {user.phone}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Tabs Section */}
            <div role="tablist" className="tabs tabs-bordered mt-11">
                <button
                    className={`tab h-10 ${selectedTab === 1 ? 'tab-active' : ''}`}
                    onClick={() => setSelectedTab(1)}
                >
                    Annonces
                </button>
                <button
                    className={`tab h-10 ${selectedTab === 2 ? 'tab-active' : ''}`}
                    onClick={() => setSelectedTab(2)}
                >
                    Adoptions
                </button>
                <button
                    className={`tab h-10 ${selectedTab === 3 ? 'tab-active' : ''}`}
                    onClick={() => setSelectedTab(3)}
                >
                    Avis
                </button>
            </div>

            {/* Tab Content Section */}
            <div className="min-h-[400px] py-10">
                {selectedTab === 1 && (
                    <div className="grid grid-cols-3 gap-6">
                        {annonces.length > 0 ? (
                            annonces.map((annonce, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={`http://localhost:8202/images/${annonce.images[0]}`} // Utilisation de l'URL de l'image de l'annonce
                                        alt={`Annonce ${index + 1}`}
                                        className="w-full h-full object-cover cursor-pointer rounded-lg shadow-lg hover:opacity-80"
                                        onClick={() => handleAnnonceModalOpen(annonce)}  // Ouvrir la modal sur clic
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">Aucune annonce disponible</p>
                        )}
                    </div>
                )}
                {selectedTab === 2 && (
                    <div className="space-y-4">
                        {adoptions.length > 0 ? (
                            adoptions.map((adoption, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Adoption #{adoption.id}</h3>
                                        </div>
                                        <div>
                                            <button className={"p-2 border rounded-3xl"}
                                                    onClick={() => handleAdoptionModalOpen(adoption.id)}>Voir les
                                                détails de cet animal adopté
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-gray-600">Date
                                        Demande: {new Date(adoption.dataDemande).toLocaleString()}</p>
                                    <p className="text-gray-600">Type: {adoption.typeAdoption}</p>
                                    <p className="text-gray-600">Status: {adoption?.status?.status || 'N/A'}</p> {/* Protection d'accès à 'status' */}

                                    <div className="mt-4">
                                        <Textarea
                                            placeholder="Votre avis ici..."
                                            value={comments[adoption.id] || ""}
                                            onChange={(e) =>
                                                handleCommentChange(adoption.id, e.target.value)
                                            }
                                            rows={4}
                                        />
                                        {errorComments[adoption.id] && (
                                            <div className="text-red-500">
                                                {errorComments[adoption.id]}
                                            </div>
                                        )}
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            className="mt-2"
                                            onClick={() => handleAddComment(adoption.id)} // Passez l'ID de l'adoption
                                        >
                                            Soumettre l'avis
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">Aucune adoption disponible</p>
                        )}
                    </div>
                )}



                {selectedTab === 3 && (
                    <div className="space-y-4">
                        {adoptions.length > 0 ? (
                            adoptions.map((adoption, index) => (
                                <div key={adoption.id} className="bg-white p-4 rounded-lg shadow-md">
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Adoption #{adoption.id}</h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">Date Demande: {new Date(adoption.dataDemande).toLocaleString()}</p>
                                    <p className="text-gray-600">Type: {adoption.typeAdoption}</p>
                                    <p className="text-gray-600">Status: {adoption?.status?.status || 'N/A'}</p>

                                    <div className="mt-4">
                                        <p className="font-semibold">Avis :</p>
                                        {/* Affichage des commentaires si disponibles */}
                                        {adoptionComments[adoption.id]?.length > 0 ? (
                                            adoptionComments[adoption.id].map((comment, commentIndex) => (
                                                <div key={commentIndex} className="p-3 bg-gray-50 rounded-lg mt-2">
                                                    <p className="text-gray-700"><strong>Commentaire:</strong> {comment.comment}</p>
                                                    <p className="text-gray-500 text-sm">Publié le: {new Date(comment.createdAt).toLocaleString()}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600">Aucun avis pour cette adoption.</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">Aucune adoption disponible</p>
                        )}
                    </div>
                )}

            </div>

            {/* Modal pour les Annonces */}
            {/* Modal pour les Annonces */}
            {isAnnonceModalOpen && selectedAnnonce && (
                <Modal isOpen={isAnnonceModalOpen} size="3xl" onClose={handleModalClose}>
                    <ModalContent>
                        <ModalHeader>
                            <h3 className="text-xl font-semibold">Détails de l'annonce</h3>
                        </ModalHeader>
                        <ModalBody>
                            {selectedAnnonce && (
                                <>
                                    <p>Nom: {selectedAnnonce.nom}</p>
                                    <Swiper images={selectedAnnonce.images} />
                                    <p><strong>Description:</strong> {selectedAnnonce.description}</p>
                                    <p><strong>Besoins Spécifiques:</strong> {selectedAnnonce.besoinsSpecifiques}</p>
                                    <div className="flex flex-row gap-2 p-2 justify-between">
                                        <div><p><strong>Type:</strong> {selectedAnnonce.type}</p></div>
                                        <div><p><strong>Statut:</strong> {selectedAnnonce.status}</p></div>
                                        <div><p><strong>Vacciné:</strong> {selectedAnnonce.vaccin ? "Animal vacciné" : "Animal non vacciné"}</p></div>
                                    </div>
                                    <div className="flex flex-row gap-2 p-2 justify-between">
                                        <div><p><strong>Localisation:</strong> {selectedAnnonce.localisation}</p></div>
                                        <div><p><strong>Âge:</strong> {selectedAnnonce.age} ans</p></div>
                                        <div><p><strong>Sexe:</strong> {selectedAnnonce.sexe}</p></div>
                                    </div>
                                </>
                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}

            {/* Modal pour les Adoptions */}
            {isAdoptionModalOpen && selectedAdoption && (
                <Modal isOpen={isAdoptionModalOpen} onClose={handleModalClose}>
                    <ModalContent>
                        <ModalHeader>
                            <h3 className="text-xl font-semibold">Détails de l'adoption</h3>
                        </ModalHeader>
                        <ModalBody>
                            {selectedAdoption && (
                                <>
                                    <p>Nom de l'animal: {selectedAdoption.nom}</p>
                                    <Swiper images={selectedAdoption.images} />
                                    <p><strong>Description:</strong> {selectedAdoption.description}</p>
                                    <p><strong>Besoins Spécifiques:</strong> {selectedAdoption.besoinsSpecifiques}</p>
                                    <div className="flex flex-row gap-2 p-2 justify-between">
                                        <div><p><strong>Type:</strong> {selectedAdoption.type}</p></div>
                                        <div><p><strong>Statut:</strong> {selectedAdoption.status}</p></div>
                                        <div><p><strong>Vacciné:</strong> {selectedAdoption.vaccin ? "Animal vacciné" : "Animal non vacciné"}</p></div>
                                    </div>
                                    <div className="flex flex-row gap-2 p-2 justify-between">
                                        <div><p><strong>Localisation:</strong> {selectedAdoption.localisation}</p></div>
                                        <div><p><strong>Âge:</strong> {selectedAdoption.age} ans</p></div>
                                        <div><p><strong>Sexe:</strong> {selectedAdoption.sexe}</p></div>
                                    </div>
                                </>
                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

export default VisiteProfile;

