import { useEffect, useState } from 'react';

const ProfileComponent = () => {
    const [user, setUser] = useState<any>(null);
    const [annonces, setAnnonces] = useState<any[]>([]);
    const [adoptions, setAdoptions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<number>(1); // Etat pour gérer l'onglet sélectionné

    // Récupérer l'ID de l'utilisateur depuis le localStorage
    const userId = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')!).userId : null;

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
            <div role="tablist" className="tabs tabs-bordered mt-6">
                {/* Tab 1: Annonces */}
                <button
                    className={`tab ${selectedTab === 1 ? 'tab-active' : ''}`}
                    onClick={() => setSelectedTab(1)}
                >
                    Annonces
                </button>
                {/* Tab 2: Adoptions */}
                <button
                    className={`tab ${selectedTab === 2 ? 'tab-active' : ''}`}
                    onClick={() => setSelectedTab(2)}
                >
                    Adoptions
                </button>
                {/* Tab 3: Avis */}
                <button
                    className={`tab ${selectedTab === 3 ? 'tab-active' : ''}`}
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
                                        className="w-full h-full object-cover rounded-lg shadow-lg"
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
                                    <h3 className="font-semibold text-gray-800">Adoption #{adoption.id}</h3>
                                    <p className="text-gray-600">Date Demande: {new Date(adoption.dataDemande).toLocaleString()}</p>
                                    <p className="text-gray-600">Type: {adoption.typeAdoption}</p>
                                    <p className="text-gray-600">Status: {adoption.statusId === 1 ? 'En attente' : 'Validée'}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">Aucune adoption</p>
                        )}
                    </div>
                )}
                {selectedTab === 3 && (
                    <p className="text-gray-600">Les avis de l'utilisateur viendront ici.</p>
                )}
            </div>

            {/* Footer */}
            <div className="bg-white p-4 mt-6">
                <div className="max-w-7xl mx-auto text-center text-gray-500">
                    <p>&copy; 2024 Instagram Clone. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
