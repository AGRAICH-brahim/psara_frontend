import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setUser} from "../store.ts";
import {  toast } from 'sonner'

const SeConnecter = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Créez une instance de dispatch

    const credentials = {
        email: email,
        password: password,
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Appel API pour l'authentification
            const response = await axios.post(
                "http://localhost:8200/api/users/login",
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = response.data;

            if (data.statusCode === 200) {
                // Stockage des informations dans localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("email", data.email); // Assurez-vous d'ajouter l'email
                localStorage.setItem("data", JSON.stringify(data)); // Assurez-vous que l'objet est converti en chaîne JSON


                // Mettre à jour Redux avec les données utilisateur
                dispatch(setUser({
                    userId: data.userId, // Assurez-vous de définir un ID d'utilisateur si disponible
                    email: data.email,
                    role: data.role,
                    nom: data.nom,
                    prenom: data.prenom,

                    token: data.token,
                    isAuthenticated: true,
                }));
                toast.success(data.message); // Afficher le message de succès du backend

                // Redirection en fonction du rôle
                if (data.role === "ROLE_ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/home");
                }
            } else {
                toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
            }
        } catch (err: any) {
            toast.error("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
        }
    };


    return (
        <>
            <label className="btn-home" htmlFor="my_modal_7">
                Se Connecter
            </label>

            {/* Modal */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <div>
                        <p>Connectez-vous</p>
                        <label
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            htmlFor="my_modal_7"
                        >
                            ✕
                        </label>
                    </div>
                    <div className="w-full h-[2px] border border-[#d86404] bg-[#d86404]"></div>

                    <div className="py-4 w-full flex flex-col gap-5">
                        <form className="py-4 w-full flex flex-col gap-5" onSubmit={handleLogin}>
                            <div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="grow"
                                        placeholder="Email"
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="grow"
                                        placeholder="Mot de passe"
                                    />
                                </label>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div>
                                <button type="submit" className="btn-home w-full">
                                    Connexion
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <a className="font-[light]" href="">
                                    Mot de passe oublié
                                </a>

                                <label className="font-[thin]" htmlFor="my_modal_6">
                                    Créer un compte
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                    Close
                </label>
            </div>
        </>
    );
};

export default SeConnecter;
