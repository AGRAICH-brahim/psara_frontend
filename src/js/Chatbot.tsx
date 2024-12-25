import React, { useState } from "react";
import { generateResponse } from "./apiService"; // Assurez-vous que cette fonction est définie pour appeler l'API.

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ text: string; type: "user" | "bot" }[]>([]);
    const [input, setInput] = useState("");
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);  // Gestion de l'état du chatbot

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Ajouter le message de l'utilisateur
        setMessages((prev) => [...prev, { text: input, type: "user" }]);
        const userMessage = input;
        setInput(""); // Réinitialiser l'input

        // Afficher un message "En cours..." avant la réponse
        setMessages((prev) => [...prev, { text: "En cours...", type: "bot" }]);

        try {
            const botResponse = await generateResponse(userMessage);
            setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1] = { text: botResponse, type: "bot" }; // Remplacer le message "En cours..."
                return updatedMessages;
            });
        } catch (error) {
            setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1] = { text: "Une erreur est survenue.", type: "bot" };
                return updatedMessages;
            });
        }
    };

    return (
        <div className="fixed bottom-6 right-6">
            {/* Bouton de bascule du chatbot */}
            <button
                className="flex items-center justify-center w-16 h-16 bg-[#d86404] text-white rounded-full shadow-lg transform transition-transform duration-200 hover:rotate-45 focus:outline-none"
                onClick={() => setIsChatbotOpen((prev) => !prev)}  // Toggle l'état du chatbot
            >
                <span className="material-symbols-rounded">
                    {isChatbotOpen ? "close" : "mode_comment"}  {/* Change l'icône selon l'état */}
                </span>
            </button>

            {/* Conteneur du chatbot */}
            <div
                className={`fixed bottom-20 right-6 w-[700px] lg:w-[800px] xl:w-[800px] bg-white rounded-lg shadow-2xl transform transition-transform origin-bottom-right duration-300 scale-50 opacity-0 pointer-events-none ${
                    isChatbotOpen ? "scale-100 opacity-100 pointer-events-auto" : ""  // Gère l'affichage du chatbot
                }`}
            >
                <header className="bg-[#d86404] text-white py-4 px-6 text-center shadow-md relative rounded-t-lg">
                    <h2 className="text-5xl font-semibold">Chatbot</h2>
                    <span
                        className="material-symbols-outlined absolute text-4xl right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsChatbotOpen(false)}  // Ferme le chatbot
                    >
                        close
                    </span>
                </header>

                {/* Liste des messages */}
                <ul className="h-[600px] lg:h-[450px] xl:h-[700px] overflow-y-auto px-6 py-4 bg-gray-50 space-y-6 rounded-b-lg">
                    {/* Message de bienvenue initial du bot */}
                    <li className="chat incoming text-xl flex justify-start w-full">
        <span
            className="material-symbols-outlined w-12 h-12 bg-[#d86404] text-white flex items-center justify-center rounded-full mr-4">
            smart_toy
        </span>
                        <p className="p-5 text-xl rounded-xl max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none">
                            Hi there 👋<br/>How can I help you today?
                        </p>
                    </li>

                    {/* Messages dynamiques */}
                    {messages.map((message, index) => (
                        <li
                            key={index}
                            className={`flex items-end ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {message.type === "bot" && (
                                <span
                                    className="material-symbols-outlined w-12 h-12 bg-[#d86404] text-white flex items-center justify-center rounded-full mr-4">
                    smart_toy
                </span>
                            )}

                            <p
                                className={`p-5 text-xl rounded-xl max-w-[80%] ${
                                    message.type === "user"
                                        ? "bg-[#d86404] text-white rounded-br-none"
                                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                                }`}
                            >
                                {message.text}
                            </p>
                        </li>
                    ))}
                </ul>

                {/* Entrée utilisateur */}
                <div className="flex items-center gap-4 px-6 py-4 bg-white border-t border-gray-200">
                    <textarea
                        className="flex-grow resize-none border-none outline-none p-4 text-2xl placeholder-gray-400 rounded-xl"
                        rows={1}
                        placeholder="Entrez un message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    ></textarea>
                    <button
                        className="bg-[#d86404] text-white p-4 rounded-full text-xl"
                        onClick={handleSendMessage}
                    >
                        <span className="material-symbols-rounded text-4xl ">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
