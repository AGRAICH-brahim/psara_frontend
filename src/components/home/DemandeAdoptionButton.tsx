import { Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

// Type for the selectedItem prop
interface DataItem {
    id: number;
    nom: string;
    vaccin: boolean;
    typeVaccin: string | null;
    age: number;
    sexe: string;
    localisation: string;
    besoinsSpecifiques: string;
    images: string[];
    description: string;
    type: string;
    status: string;
    dateCreated: string;
    dateUpdate: string | null;
    userCreation: string | null;
}

// Type for the DemandeAdoptionButtonProps
interface DemandeAdoptionButtonProps {
    selectedItem: DataItem;
    userId: number; // Assuming you pass the user ID to the component
}

const DemandeAdoptionButton: React.FC<DemandeAdoptionButtonProps> = ({ selectedItem }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const dataStorage = localStorage.getItem("data");
    const userId = dataStorage ? JSON.parse(dataStorage).userId : null;
    // Handle form submission
    const handleAdoptionRequest = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Prepare the request data
        const requestData = {
            dataDemande: new Date().toISOString(), // Set the current date and time
            dateValidation: null, // You can set this to null or handle it based on your logic
            typeAdoption: selectedItem.type,
            idUser: userId, // Assuming userId is passed as a prop
            statusId: 1, // Set the statusId (you can modify this based on your application logic)
            animalAnnonceId: selectedItem.id, // Animal annonce ID
        };

        try {
            // Send POST request to the adoption API
            const response = await axios.post("http://localhost:8202/api/adoptions", requestData);

            console.log(response.data);
            setSuccess("Demande d'adoption envoyée avec succès !");
        } catch (error) {
            setError("Une erreur est survenue lors de l'envoi de la demande.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                color="warning"
                onClick={handleAdoptionRequest}
                disabled={loading} // Disable the button when the request is being processed
            >
                {loading ? "Envoi en cours..." : "Envoyer demande d'adoption"}
            </Button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </>
    );
};

export default DemandeAdoptionButton;
