// apiService.ts
export const API_KEY = "AIzaSyC7ioTgXTo9jbrIK6KFtGivkWqX2XBo1wI";
export const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Typage de la réponse API
interface ApiResponse {
    candidates: { content: { parts: { text: string }[] } }[];
}

// Fonction pour générer la réponse
export async function generateResponse(userMessage: string): Promise<string> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: userMessage }],
                    },
                ],
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erreur lors de la requête API");
        }

        const data: ApiResponse = await response.json();
        const generatedText = data.candidates[0]?.content.parts[0]?.text || "";
        return generatedText;
    } catch (error) {
        console.error("Erreur API :", error);
        throw error;
    }
}
