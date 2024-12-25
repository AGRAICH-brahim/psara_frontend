import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import DecisionButton from "./DecisionButton.tsx";

// Définition des interfaces
interface AnimalAnnonce {
    id: number;
    nom: string;
    vaccin: boolean;
    typeVaccin: string | null;
    age: number;
    sexe: string;
    localisation: string;
    besoinsSpecifiques: string;
    description: string;
    type: string;
    status: string;
    dateCreated: string;
    dateUpdate: string | null;
    userCreation: number;
    images: string[];
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface StatusEntity {
    id: number;
    status: string;
}

interface AdoptionRequest {
    id: number;
    dataDemande: string;
    dateValidation: string | null;
    typeAdoption: string;
    idUser: number;
    statusEntity: StatusEntity;
    animalAnnonce: AnimalAnnonce;
}
interface User {
    id: number;
    email: string;
    password: string | null;
    phone: string;
    role: string;
    estVerifie: boolean | null;
    userType: string | null;
    nom: string;
    prenom: string;
    cin: string;
    nomOrganisation: string | null;
    description: string | null;
    adresse: string | null;
    siteWeb: string | null;
    nr: string | null;
    documentVerification: string | null;
}


const DemandeAdoption = () => {
    const [demandes, setDemandes] = useState<AdoptionRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]); // Pour stocker les informations des utilisateurs
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const dataStorage = localStorage.getItem("data");
    const userId = dataStorage ? JSON.parse(dataStorage).userId : null;

    useEffect(() => {
        const fetchAdoptionRequests = async () => {
            if (!userId) {
                setError("Utilisateur non connecté");
                setLoading(false);
                return;
            }

            try {
                // Récupérer les demandes d'adoption
                const adoptionResponse = await fetch(`http://localhost:8202/api/animal-annonces/demande-adoption/${userId}`);
                const adoptionData: AdoptionRequest[] = await adoptionResponse.json();
                setDemandes(adoptionData);

                // Récupérer les utilisateurs associés aux demandes d'adoption
                const usersPromises = adoptionData.map(async (adoption) => {
                    const userResponse = await fetch(`http://localhost:8200/api/users/${adoption.idUser}`);
                    const userData: User = await userResponse.json();
                    return userData;
                });

                const usersData = await Promise.all(usersPromises);
                setUsers(usersData);

                setLoading(false);
            } catch (err) {
                setError("Erreur de récupération des données.");
                console.error(err);
                setLoading(false);
            }
        };

        fetchAdoptionRequests();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto mt-12 px-4">
            <h1 className="text-4xl font-semibold text-center mb-12 text-gray-900">Demandes d'Adoption</h1>

            {/* Barre de recherche */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Rechercher une adoption..."
                    className="px-4 py-2 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-1/3"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-10">
                {demandes.map((demande, index) => (
                    <div key={demande.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 duration-300">
                        <div className="relative">
                            <img src={`http://localhost:8080/images/${demande.animalAnnonce.images[0]}`} alt={demande.animalAnnonce.nom} className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 bg-opacity-80">
                                {demande.statusEntity.status === 'Terminée' ? (
                                    <span className="text-green-500">Terminée</span>
                                ) : demande.statusEntity.status === 'Adoptée' ? (
                                    <span className="text-green-500">Adoptée</span>
                                ) : (
                                    <span className="text-yellow-500">{demande.statusEntity.status}</span>
                                )}
                            </div>

                        </div>
                        <div className="p-6">
                            <h5 className="text-xl font-bold text-blue-500">Demande #{demande.id}</h5>
                            <p className="mt-2 text-sm text-gray-600"><strong>Type d'adoption :</strong> {demande.typeAdoption}</p>
                            <p className="mt-2 text-sm text-gray-600"><strong>Date de demande :</strong> {new Date(demande.dataDemande).toLocaleString()}</p>

                            <div className="mt-6">
                                <h6 className="text-sm font-semibold text-gray-500">Informations sur la personne faisant
                                    la demande. </h6>
                                <p className="text-sm text-gray-700"><strong>Nom :</strong> {users[index]?.nom} </p>
                                <p className="text-sm text-gray-700"><strong>Email :</strong> {users[index]?.email}</p>
                                <p className="text-sm text-gray-700">
                                    <strong>Voir le profil de l'utilisateur : </strong>
                                    <Link
                                        to="/user-profile"
                                        state={{ userId: users[index]?.id }} // Passer le userId directement via `state`
                                    >
                                         Cliquez ici
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-6">
                                <h6 className="text-sm font-semibold text-gray-500">Animal Concerné</h6>
                                <p className="text-sm text-gray-700"><strong>Nom :</strong> {demande.animalAnnonce.nom}
                                </p>
                                <p className="text-sm text-gray-700"><strong>Type :</strong> {demande.animalAnnonce.type}</p>
                                <p className="text-sm text-gray-700"><strong>Âge :</strong> {demande.animalAnnonce.age} ans</p>
                                <p className="text-sm text-gray-700"><strong>Sexe :</strong> {demande.animalAnnonce.sexe}</p>
                                <p className="text-sm text-gray-700"><strong>Vacciné :</strong> {demande.animalAnnonce.vaccin ? 'Oui' : 'Non'}</p>
                            </div>

                            <div className="text-center mt-4">
                                <DecisionButton adoptionId={demande.id}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DemandeAdoption;
