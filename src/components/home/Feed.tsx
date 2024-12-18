import { AiOutlineLike  } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import {useEffect, useState} from "react";
import axios from 'axios';


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
        userCreation: string | null; // Utilisateur ayant créé l'
    }

    const [data , setData] = useState<DataItem[]>([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/animal-annonces");
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])


    if (loading)  return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (data.length === 0) return <p>No data</p>;


    return (
        <>
            {data.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 rounded-lg bg-white border-2 border-amber-500 w-full p-3 mb-5">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 p-2">
                            <div>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className={"text-base"}>AGRAICH Brahim {item.nom} {item.id} </p>
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
                            <p className={"font-thin text-xs"}>status : en cours</p>
                        </div>
                    </div>
                    <div className={"border"}></div>

                    <div>
                        <p className="text-sm   ">
                            {item.description}
                        </p>
                    </div>
                    <div className="">
                        <div className="carousel w-full">
                            {item.images.map((image, index) => (
                                <div key={index} id={`slide${item.id}-${index}`} className="carousel-item relative w-full">
                                    <img
                                        src={`http://localhost:8080/images/${image}`}
                                        alt={item.nom}
                                        className="w-full object-cover max-h-[300px]"
                                    />
                                    <div
                                        className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2  justify-between">
                                        {/* Navigation vers l'image précédente */}
                                        <a
                                            href={`#slide${item.id}-${index === 0 ? item.images.length - 1 : index - 1}`}
                                            className="btn btn-circle">
                                            ❮
                                        </a>
                                        {/* Navigation vers l'image suivante */}
                                        <a
                                            href={`#slide${item.id}-${(index + 1) % item.images.length}`}
                                            className="btn btn-circle">
                                            ❯
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
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


        </>
    )
}
export default Feed;