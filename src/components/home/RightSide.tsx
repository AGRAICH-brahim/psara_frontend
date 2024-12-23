const RightSide = () => {
    return (
        <>
            <div className="w-4/5 bg-white rounded-xl border-r ml-10 p-6">
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
                        <div
                            className="flex items-center space-x-3 hover:bg-gray-100 p-1 rounded-lg transition duration-300 ease-in-out">
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

                        <div
                            className="flex items-center space-x-3 hover:bg-gray-100 p-1 rounded-lg transition duration-300 ease-in-out">
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
        </>
    )
}

export default RightSide