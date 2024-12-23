import { useState } from "react";
import axios from "axios";


interface FormData {
    nom: string;
    age: string;
    sexe: string;
    localisation: string;
    besoinsSpecifiques: string;
    description: string;
    type: string;
    vaccin: boolean;
    typeVaccin: string;
    status: string;
    userCreation: number | null; // Autorisez null ici
    imageFiles: File[]; // Changez de tableau de chaînes à tableau de fichiers
}

const AjouterAnnonce = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Récupérer et analyser les données du localStorage
    const dataStorage = localStorage.getItem("data");
    const userId = dataStorage ? JSON.parse(dataStorage).userId : null;


    const [formData, setFormData] = useState<FormData>({
        nom: "",
        age: "",
        sexe: "",
        localisation: "",
        besoinsSpecifiques: "",
        description: "",
        type: "",
        vaccin: false,
        typeVaccin: "",
        status: "En cours",
        userCreation: userId || null, // Utiliser null si userId est null
        imageFiles: [], // Initialisez ici comme tableau de fichiers
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };



    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFormData({ ...formData, imageFiles: files });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation de typeVaccin si vaccin est coché
        if (formData.vaccin && !formData.typeVaccin) {
            alert("Veuillez spécifier le type de vaccin.");
            return;
        }
        console.log("formData avant envoi : ", formData);

        // Construction de l'objet FormData
        const formDataToSend = new FormData();
        formDataToSend.append("nom", formData.nom);
        formDataToSend.append("age", formData.age);
        formDataToSend.append("sexe", formData.sexe);
        formDataToSend.append("localisation", formData.localisation);
        formDataToSend.append("besoinsSpecifiques", formData.besoinsSpecifiques);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("type", formData.type);
        formDataToSend.append("vaccin", formData.vaccin.toString());
        formDataToSend.append("userCreation", formData.userCreation ? formData.userCreation.toString() : "");
        // Vérification si 'typeVaccin' est renseigné avant d'ajouter
        if (formData.vaccin && formData.typeVaccin.trim() !== "") {
            formDataToSend.append("typeVaccin", formData.typeVaccin);
        }


        formDataToSend.append("status", formData.status);

        // Ajout des fichiers image
        formData.imageFiles.forEach(file => {
            formDataToSend.append("imageFiles", file);
        });

        // Affichage des données envoyées dans la console pour débogage
        console.log("Données envoyées : ", formDataToSend);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/animal-annonces",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Annonce ajoutée avec succès", response.data);
            closeModal();
        } catch (error: any) {
            console.error("Erreur lors de l'ajout de l'annonce", error.response?.data || error);
        }
    };



    return (
        <>
            <div>
                <button onClick={openModal} className="btn btn-info">
                    + Ajouter Annonce
                </button>
            </div>
            {isOpen && (
                <dialog open className="modal text-black">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="w-full flex justify-center items-center ">
                            <h1 className="text-orange-500 font-bold text-3xl">Ajouter une annonce</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-2">
                            {/* Type */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Type d'adoption</span>
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">Choisir Type d'adoption...</option>
                                    <option value="Permanente">Permanente</option>
                                    <option value="Temporaire">Temporaire</option>
                                </select>
                            </div>

                            {/* Nom */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nom d'animal</span>
                                </label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleInputChange}
                                    placeholder="Entrez le nom de l'animal"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Âge */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Âge</span>
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    placeholder="Entrez l'âge de l'animal (en années)"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Sexe */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Sexe</span>
                                </label>
                                <select
                                    name="sexe"
                                    value={formData.sexe}
                                    onChange={handleInputChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">Choisir...</option>
                                    <option value="male">Male</option>
                                    <option value="femelle">Femelle</option>
                                </select>
                            </div>

                            {/* Localisation */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Localisation</span>
                                </label>
                                <input
                                    type="text"
                                    name="localisation"
                                    value={formData.localisation}
                                    onChange={handleInputChange}
                                    placeholder="Entrez la localisation"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Vaccin */}
                            <div className="form-control flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="vaccin"
                                    checked={formData.vaccin}
                                    onChange={handleInputChange}
                                    className="checkbox"
                                    id="vaccin"
                                />
                                <label htmlFor={"vaccin"} className="label cursor-pointer">
                                    <span className="label-text">L'animal est-il vacciné ?</span>
                                </label>
                            </div>

                            {formData.vaccin && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Type de vaccin</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="typeVaccin"
                                        value={formData.typeVaccin}
                                        onChange={handleInputChange}
                                        placeholder="Entrez le type de vaccin"
                                        className="input input-bordered"
                                    />
                                </div>
                            )}

                            {/* Besoins spécifiques */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Besoins spécifiques</span>
                                </label>
                                <textarea
                                    name="besoinsSpecifiques"
                                    value={formData.besoinsSpecifiques}
                                    onChange={handleInputChange}
                                    placeholder="Décrivez les besoins spécifiques de l'animal"
                                    className="textarea textarea-bordered"
                                    rows={3}
                                />
                            </div>

                            {/* Description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Ajoutez une description de l'animal"
                                    className="textarea textarea-bordered"
                                    rows={5}
                                    required
                                />
                            </div>

                            {/* Images */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Images</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="file-input file-input-bordered"
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {formData.imageFiles.map((image, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(image)}
                                            alt={`upload-preview-${index}`}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Bouton soumettre */}
                            <div className="form-control mt-4">
                                <button type="submit" className="btn-home">
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={closeModal} // Fermer en cliquant à l'extérieur
                    ></div>
                </dialog>
            )}
        </>
    );
};

export default AjouterAnnonce;
