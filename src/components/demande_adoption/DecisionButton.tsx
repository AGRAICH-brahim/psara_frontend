import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    SelectItem,
    useDisclosure, Select,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// Définition de l'interface pour les statuts
interface Status {
    id: number;
    status: string;
}

// Définition du type des props, avec adoptionId
interface DecisionButtonProps {
    adoptionId: number;
}

const DecisionButton = ({ adoptionId }: DecisionButtonProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [data, setData] = useState<Status[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null); // Pour stocker l'ID du statut sélectionné

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8202/api/adoptions/all-status");
                setData(response.data || []);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.message || error.message); // Utilisez la réponse de l'API si disponible
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Changement de la manière dont la valeur est extraite
    const handleStatusChange = (value: string) => {
        const selectedId = Number(value);  // On convertit la valeur en nombre
        setSelectedStatus(selectedId);
        console.log("Status sélectionné : ", selectedId); // Vérification de la valeur correcte
    };

    const handleSubmit = async () => {
        if (selectedStatus === null) {
            toast.error("Veuillez sélectionner un statut.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8202/api/adoptions/${adoptionId}/status/${selectedStatus}`);
            toast.success("Le statut de l'adoption a été mis à jour !");
            onOpenChange(false); // Fermer la modal après la soumission réussie
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || error.message); // Utilisez la réponse de l'API si disponible
            }
        }
    };

    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
                Prendre une décision
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Changer le statut de l'adoption</ModalHeader>
                            <ModalBody>
                                <Select
                                    className="w-full"
                                    label="Choisir le statut de la décision"
                                    placeholder="Sélectionner un statut"
                                    onChange={(e) => handleStatusChange(e.target.value)} // Assurez-vous d'extraire la valeur ici
                                    value={selectedStatus?.toString()} // Assurez-vous que la valeur du Select est bien contrôlée
                                >
                                    {data.map((status) => (
                                        <SelectItem key={status.id} value={status.id.toString()}>
                                            {status.status}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Button onPress={handleSubmit} className="mt-4">Valider votre décision</Button>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fermer
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DecisionButton;
