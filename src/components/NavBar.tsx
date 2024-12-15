import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const NavBar = () => {

    const [choix, setChoix] = useState("utilisateur");
    const [formData,setFormData] = useState({
        nom: "",
        prenom: "",
        phone: "",
        cin: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        estVerifie: "",
        userType: "",
        nomOrganisation: "",
        description: "",
        adresse: "",
        siteWeb: "",
        nr: "",
        documentVerification: "",

    })
    
    const handleChoixChange = (event) => {
        setChoix(event.target.value); // Mettre à jour le choix
      };


      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Valider les champs
        if (formData.password !== formData.confirmPassword) {
          alert("Les mots de passe ne correspondent pas !");
          return;
        }
    
        // Préparer les données en fonction du type de profil
        const payload = choix === 'utilisateur' ? {
          nom: formData.nom,
          prenom: formData.prenom,
          phone: formData.phone,
          cin: formData.cin,
          email: formData.email,
          password: formData.password,
          role: 'ROLE_USER', // Ajouter le rôle pour un utilisateur simple
            userType: 'utilisateur', // Type d'utilisateur
            estVerifie: false,
        } : {
          associationName: formData.nomOrganisation,
          adresse: formData.adresse,
          phone: formData.phone,
          nr: formData.nr,
          email: formData.email,
          password: formData.password,
          description: formData.description,
          siteWeb: formData.siteWeb,
           role: 'ROLE_ASSOCIATION', // Ajouter le rôle pour une association
            userType: 'association', // Type d'utilisateur
            estVerifie: false,
        };
    
        // Envoyer la requête avec Axios
        try {
          const response = await axios.post(`http://localhost:8200/api/users/create`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
          alert('Inscription réussie !');
          console.log(response.data); // Traiter la réponse du backend
        } catch (error) {
          console.error('Erreur lors de l’inscription :', error);
          alert('Une erreur est survenue lors de l’inscription.');
        }
      };
    

   
  return (
    <>
       <div className="navbar h-[100px] bg-[#d86404] padding-container">
            <div className="navbar-start">
                <a className="btn btn-ghost h-[70px] text-xl"><img src="./logo.png" className="h-[70px] flex relative bottom-1 " alt="" /></a>
            </div>
            <div className="navbar-center">
                    <ul className="flex row gap-14 text-lg text-white">
                        <li><Link  to="/">Accueil</Link></li>
                        <li><Link to="/hello">A propos</Link></li>
                        <li><a href="">Contact</a></li>
                    </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </button>
                <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
                </button>

                <div className=" flex gap-2">
                    <label className="btn-home" htmlFor="my_modal_7" >Se Connecter</label>

                    
                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                    <div className="modal" role="dialog">
                        <div className="modal-box">
                            <div>
                                <p>Connecter Vous</p>
                                <label className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" htmlFor="my_modal_7">
                                    ✕
                                </label>
                            </div>
                            <div className="w-full h-[2px] border border-[#d86404] bg-[#d86404] " ></div>


                            <div className="py-4 w-full flex flex-col gap-5" >

                                <div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4 opacity-70">
                                            <path
                                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                            <path
                                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                        </svg>
                                        <input type="text" className="grow" placeholder="Email" />
                                    </label>
                                </div>
                                <div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="h-4 w-4 opacity-70">
                                            <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd" />
                                        </svg>
                                        <input type="password" className="grow" placeholder="password" />
                                    </label>  
                                </div>          
                                <div>
                                    <button className="btn-home w-full " >Connexion</button>
                                </div>                                           
                                <div className="flex items-center justify-between" >
                                    <a className="font-[light]" href="">Mot passe oublié</a>   

                                    <label className="font-[thin]" htmlFor="my_modal_6">Créer compte</label> 
                                </div>            
                            </div>
                                            
                    
                        </div>
                        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                    </div>

                    <label className="btn-home" htmlFor="my_modal_6" >S'inscrire</label>


                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                    <div className="modal" role="dialog">

                        

                        <div className="modal-box  w-11/12 max-w-3xl">
                            <div>
                                <p>Creéer votre compte dé mainetenant</p>
                                <label className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" htmlFor="my_modal_6">
                                    ✕
                                </label>
                            </div>
                            <div className="w-full h-[2px] border border-[#d86404] bg-[#d86404] " ></div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center">
                                <h1 className="text-2xl font-bold mb-4">Inscription</h1>
                               
                                <div className="flex space-x-4 mb-6">
                                    <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="utilisateur"
                                        checked={choix === "utilisateur"}
                                        onChange={handleChoixChange}
                                        className="form-radio"
                                    />
                                    <span>Utilisateur Simple</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="association"
                                        checked={choix === "association"}
                                        onChange={handleChoixChange}
                                        className="form-radio"
                                    />
                                    <span>Association</span>
                                    </label>
                                </div>
                            </div>


                            {choix === "utilisateur" && (
                                <div className="py-4 w-full flex flex-col gap-5" >
                                    <div className="flex flex-row items-center gap-4 w-full ">
                                        <input type="text" placeholder="Nom" name="nom" onChange={handleInputChange} className="input input-bordered w-full " />
                                        <input type="text" placeholder="Prenom" name="prenom" onChange={handleInputChange} className="input input-bordered w-full " />
                                    </div>
                                    <div className="flex flex-row items-center gap-4 w-full ">
                                        <input type="text" placeholder="Phone" name="phone" onChange={handleInputChange} className="input input-bordered w-full " />
                                        <input type="text" placeholder="CIN" name="cin" onChange={handleInputChange} className="input input-bordered w-full " />
                                    </div>
                                    <div>
                                        <label className="input input-bordered flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70">
                                                <path
                                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                <path
                                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                            </svg>
                                            <input type="text" className="grow" onChange={handleInputChange} name="email" placeholder="Email" />
                                        </label>
                                    </div>
                                    <div className="flex flex-row items-center gap-4 w-full " >
                                        <label className="input input-bordered flex items-center gap-2 w-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70">
                                                <path
                                                fillRule="evenodd"
                                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                clipRule="evenodd" />
                                            </svg>
                                            <input type="password" name="password" onChange={handleInputChange}  className="grow w-full" placeholder="password" />
                                        </label>  
                                        <label className="input input-bordered flex items-center gap-2 w-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70">
                                                <path
                                                fillRule="evenodd"
                                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                clipRule="evenodd" />
                                            </svg>
                                            <input type="password" name="confirmPassword" onChange={handleInputChange} className="grow w-full" placeholder="confirm password" />
                                        </label>  
                                    </div> 
                                        

                                    <div className="flex items-center justify-between" >
                                        <a className="font-[light]" href="">Mot passe oublié</a>   
    
                                        <a className="font-[thin]" href="">Créer compte</a> 
                                    </div>            
                                </div>
                            )}

                            {choix === "association" && (
                                <div className="py-4 w-full flex flex-col gap-5" >
                                    <div className="flex flex-row items-center gap-4 w-full ">
                                        <input type="text" placeholder="Nom d'association" onChange={handleInputChange} name="associationName" className="input input-bordered w-full " />
                                        <input type="text" placeholder="Adresse" name="adresse" className="input input-bordered w-full " />
                                    </div>
                                    <div className="flex flex-row items-center gap-4 w-full ">
                                        <input type="text" placeholder="Phone" name="phone" onChange={handleInputChange} className="input input-bordered w-full " />
                                        <input type="text" placeholder="Numéro NR" name="nr" onChange={handleInputChange} className="input input-bordered w-full " />
                                    </div>
                                    <div>
                                        <label className="input input-bordered flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70">
                                                <path
                                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                <path
                                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                            </svg>
                                            <input type="text" className="grow" onChange={handleInputChange} name="email" placeholder="Email" />
                                        </label>
                                    </div>
                                    <div className="flex flex-row items-center gap-4 w-full " >
                                        <label className="input input-bordered flex items-center gap-2 w-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70">
                                                <path
                                                fillRule="evenodd"
                                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                clipRule="evenodd" />
                                            </svg>
                                            <input type="password" className="grow w-full" onChange={handleInputChange} name="password" placeholder="password" />
                                        </label>  
                                        <label className="input input-bordered flex items-center gap-2 w-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70">
                                                <path
                                                fillRule="evenodd"
                                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                clipRule="evenodd" />
                                            </svg>
                                            <input type="password" className="grow w-full" onChange={handleInputChange} name="confirmPassword" placeholder="confirm password" />
                                        </label>  
                                    </div> 

                                    <div className="flex flex-row items-center gap-4 w-full ">
                                        <input type="text" placeholder="Description de l'association" name="description" onChange={handleInputChange} className="input input-bordered w-full " />
                                    </div>
                                    <div className="flex flex-row items-center gap-4 w-full ">
                                        <input type="text" placeholder="Site Web (facultative )" name="siteWeb" onChange={handleInputChange} className="input input-bordered w-full " />
                                    </div>


                                        

                                    <div className="flex items-center justify-between" >
                                        <a className="font-[light]" href="">Mot passe oublié</a>   

                                        <a className="font-[thin]" href="">Créer compte</a> 
                                    </div>            
                                </div>
                            )}
                                    <div>
                                        <button className="btn-home w-full " htmlFor="my_modal_6" >Créer Compte</button>
                                    </div> 
                        </form>
                        </div>
                        <label className="modal-backdrop" htmlFor="my_modal_6">Close</label>
                    </div>


                </div>
            </div>

          
        
        </div>
    </>
  )
}

export default NavBar