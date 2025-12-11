
import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Use a fallback or throw error if key is missing, 
// but for now we'll log a warning and let the API call fail if not present.
if (!API_KEY) {
    console.warn("VITE_GEMINI_API_KEY is not defined. Generative AI features will fail.");
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

export async function getGiftRecommendations(preferences) {
    if (!API_KEY) {
        throw new Error("Missing API Key. Please set VITE_GEMINI_API_KEY in your .env file.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are a helpful gift assistant. Based on the following user preferences, recommend 5 distinct gift ideas.
    
    Preferences:
    - Who: ${preferences.who}
    - Age/Interests: ${preferences.interests}
    - Occasion: ${preferences.occasion}
    - Budget: ${preferences.budget}
    - Details: ${preferences.details}

    Return ONLY a valid JSON array of objects. Do not wrap in markdown code blocks. 
    Each object should have:
    - "name": string (product name)
    - "price": string (estimated price range, e.g. "$25 - $40")
    - "reason": string (brief explanation why it's a good match)
    - "searchQuery": string (a precise search query to find this product online)
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks if the model adds them despite instructions
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Error fetching gift recommendations:", error);
        if (error.message.includes("404") || error.message.includes("not found")) {
            console.error("TIP: This error usually means the Generative Language API is not enabled for your API Key, or the model 'gemini-1.5-flash' is not available in your region/project. Try creating a new key at https://aistudio.google.com/");
        }
        throw error;
    }
}
