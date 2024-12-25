const MessagesComponent = () => {
    return (
        <div className="bg-gray-100 w-full min-h-[calc(100vh-100px)] mb-2 flex">
            {/* Sidebar de gauche */}
            <div className="w-1/4 bg-white rounded-xl border-r p-6">
                <div className="flex items-center mb-6">
                    <img
                        src="/logo.png" // Remplacez par votre logo ou icône de l'application
                        alt="Logo"
                        className="w-10 h-10"
                    />
                    <h2 className="ml-3 text-2xl font-bold text-gray-800">PSARD</h2>
                </div>

                <div className="space-y-2">
                    <div className="text-gray-600 text-lg font-semibold">Messages</div>
                    <div className="space-y-2">
                        {/* Exemple de conversations */}
                        <div className="flex items-center space-x-3 hover:bg-gray-100 p-1 rounded-lg transition duration-300 ease-in-out">
                            <img
                                src="/img.png" // Remplacez par une image de profil d'exemple
                                alt="User 1"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                                <p className="font-xs text-gray-800">Agraich Brahim</p>
                                <p className="text-sm text-gray-500">Hey, ?</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 hover:bg-gray-100 p-1 rounded-lg transition duration-300 ease-in-out">
                            <img
                                src="/img.png" // Remplacez par une image de profil d'exemple
                                alt="User 2"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                                <p className="font-xs text-gray-800">Imane ouabou</p>
                                <p className="text-sm text-gray-500">See you tomorrow!</p>
                            </div>
                        </div>

                        {/* Plus de conversations peuvent être ajoutées ici */}
                    </div>
                </div>
            </div>

            {/* Section de droite avec conversation active */}
            <div className="w-3/4 px-6 flex flex-col">
                {/* Entête de la conversation */}
                <div className="flex items-center justify-between mb-6 bg-gray-50 p-2 px-4 rounded-3xl border ">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/img.png" // Remplacez par une image de profil d'exemple
                            alt="User 1"
                            className="w-14 h-14 rounded-full"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">John Doe</p>
                            <p className="text-sm text-gray-500">Active now</p>
                        </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700">Info</button>
                </div>

                {/* Messages */}
                <div className="space-y-2 flex-1  overflow-y-auto px-2 max-h-[calc(70vh-80px)]">
                    {/* Exemple de message */}
                    <div className="flex items-start space-x-3">
                        <img
                            src="/img.png" // Remplacez par votre image de profil ou une image générique
                            alt="You"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="bg-gray-200 p-2 rounded-lg max-w-xs shadow-sm">
                            <p className="text-gray-800">Hey, how's it going?</p>
                        </div>
                    </div>

                    {/* Message de l'autre utilisateur */}
                    <div className="flex items-start space-x-3 ml-auto">
                        <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs shadow-sm">
                            <p className="text-white">I'm good, thanks! And you?</p>
                        </div>
                        <img
                            src="/img.png" // Remplacez par l'image de profil de l'autre utilisateur
                            alt="User"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>

                    {/* Plus de messages peuvent être ajoutés ici */}
                </div>

                {/* Champ de saisie de message */}
                <div className="mt-4 flex items-center space-x-3 bg-white border-t ">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-3 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="text-blue-500 hover:text-blue-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 10h18M3 10l6 6M3 10l6-6"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagesComponent;
