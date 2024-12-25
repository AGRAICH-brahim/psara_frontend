import { AiOutlineLike  } from "react-icons/ai";
import { FaShareAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";
import 'swiper/css/scrollbar';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";
import Swiper from "./Swiper.tsx";
import { MdVerified} from "react-icons/md";
import DemandeAdoptionButton from "./DemandeAdoptionButton.tsx";
import {Link} from "react-router-dom";



const Feed = () => {
    interface DataItem {
        id: number; // Identifiant unique de l'animal
        nom: string; // Nom de l'animal
        vaccin: boolean; // Statut de vaccination (true ou false)
        typeVaccin: string | null; // Type de vaccin (ou null si absent)
        age: number; // Âge de l'animal
        sexe: string; // Sexe de l'animal (male, femelle, etc.)
        localisation: string; // Localisation de l'animal
        besoinsSpecifiques: string; // Besoins spécifiques de l'animal
        images: string[]; // Tableau d'URL des images
        description: string; // Description de l'animal
        type: string; // Type d'animal (chien, chat, etc.)
        status: string; // Statut (disponible, adopté, etc.)
        dateCreated: string; // Date de création (format ISO 8601)
        dateUpdate: string | null; // Date de mise à jour (ou null si non mise à jour)
        userCreation: number | null; // Utilisateur ayant créé l'
    }

    const [data , setData] = useState<DataItem[]>([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

    const [userCreation, setUserCreation] = useState<{ [key: number]: any }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/animal-annonces");
                const sortedData = response.data.sort((a: DataItem, b: DataItem) => b.id - a.id); // Trier par `id` en ordre décroissant
                setData(sortedData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data.message || error.message); // Utilisez la réponse de l'API si disponible
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    const fetchAdoptionComments = async (userId: number) => {
        try {
            const response = await axios.get(`http://localhost:8200/api/users/${userId}`);
            setUserCreation((prev) => ({
                ...prev,
                [userId]: response.data, // Associe les données utilisateur à l'ID utilisateur
            }));
        } catch (err) {
            console.error("Erreur lors de la récupération des données utilisateur", err);
        }
    };

    useEffect(() => {
        data.forEach((item) => {
            if (item.userCreation && !userCreation[item.userCreation]) {
                fetchAdoptionComments(item.userCreation);
            }
        });
    }, [data]);

    if (loading)  return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (data.length === 0) return <p>No data</p>;

    const openModal = (item: DataItem) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };
    return (
        <>
            {data.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 rounded-lg bg-white border-2 border-amber-500 w-full p-3 mb-5">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 p-2">
                            <div>
                                <div  role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">

                                        <div className="flex relative">
                                            <MdVerified className="absolute left-1  "  color="blue"/>
                                        </div>
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="/img.png"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className={"text-base"}> <Link
                                        to="/user-profile"
                                        state={{ userId: item?.userCreation }} // Passer le userId directement via `state`
                                    >
                                        {userCreation[item.userCreation]?.nom
                                        ? `${userCreation[item.userCreation].nom} ${userCreation[item.userCreation].prenom}`
                                        : "Utilisateur inconnu"}
                                    </Link>
                                    </p>
                                </div>
                                <div>
                                    <p className="font-thin text-xs ">Publié le
                                        : {new Date(item.dateCreated).toLocaleString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className={"font-light text-xs"}>status :{item.status}</p>
                            <p className={"font-light text-xs"}>Type d'adoption : <span className={`${item.type == "En cours"} : text-orange-500 ? text-black`}>{item.type}</span> </p>
                        </div>
                    </div>
                    <div className={"border"}></div>

                    <div>
                        <p className="text-sm   ">
                            {item.description}
                        </p>

                        <p  onClick={() => openModal(item)} className="cursor-pointer">Voir toute les details</p>
                    </div>
                    <div className="">
                        <Swiper images={item.images} />
                    </div>
                    <div className="border bg-amber-100"></div>
                    <div className="flex flex-row justify-between items-center p-2">
                        <div className="flex flex-row gap-2 p-2">
                            <div>
                                <AiOutlineLike/>
                            </div>
                            <div>
                                <p className={"font-thin text-xs"}>Like</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <button className={"btn-home"}>Faire demande d'adoption</button>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 p-2">
                            <div>
                                <FaShareAlt/>
                            </div>
                            <div>
                                <p className={"font-thin text-xs"}>Partager</p>
                            </div>
                        </div>
                    </div>
                    <div className="border bg-amber-100"></div>
                </div>
            ))}
            {selectedItem && (
                <Modal isOpen={!!selectedItem} size={"3xl"} onClose={closeModal}>
                    <ModalContent>
                        <ModalHeader>{selectedItem.nom}</ModalHeader>
                        <ModalBody>
                            <Swiper images={selectedItem.images}/>
                            <p><strong>Description :</strong> {selectedItem.description}</p>
                            <p><strong>Besoins Specifiques :</strong> {selectedItem.besoinsSpecifiques}</p>
                            <div className="flex flex-row gap-2 p-2 justify-between">
                                <div>
                                    <p><strong>Type :</strong> {selectedItem.type}</p>
                                </div>
                                <div>
                                    <p><strong>Statut :</strong> {selectedItem.status}</p>
                                </div>
                                <div>
                                    <p>
                                        <strong>Vaccin
                                            :</strong> {selectedItem.vaccin ? "Animal vacciné" : "Animal n'est pas vacciné"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 p-2 justify-between ">
                                <div>
                                <p><strong>Localisation :</strong> {selectedItem.localisation}</p>
                                </div>
                                <div>
                                    <p><strong>Âge :</strong> {selectedItem.age} ans</p>
                                </div>
                                <div>
                                    <p><strong>Sexe :</strong> {selectedItem.sexe}</p>
                                </div>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <DemandeAdoptionButton selectedItem={selectedItem} />
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

        </>
    )
}
export default Feed;