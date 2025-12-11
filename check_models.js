
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Manually read .env to avoid 'dotenv' dependency
let apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    try {
        const envPath = path.resolve(process.cwd(), ".env");
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, "utf-8");
            const match = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);
            if (match) {
                apiKey = match[1].trim();
                // Remove surrounding quotes if present
                if ((apiKey.startsWith('"') && apiKey.endsWith('"')) || (apiKey.startsWith("'") && apiKey.endsWith("'"))) {
                    apiKey = apiKey.slice(1, -1);
                }
            }
        }
    } catch (e) {
        console.error("Could not read .env file");
    }
}

if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    console.error("Error: Valid VITE_GEMINI_API_KEY not found in .env or environment.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // There isn't a direct 'listModels' on the client instance in some versions,
        // but we can try to find a working model by testing a list.
        // Actually, the server SDK has listModels, client SDK might not.
        // We will just try a few common known ones and report which works.

        const candidates = [
            "gemini-1.5-flash",
            "gemini-pro"
        ];

        console.log(`Checking models with Key: ${apiKey.substring(0, 5)}... (Length: ${apiKey.length})`);

        for (const modelName of candidates) {
            process.stdout.write(`Testing ${modelName}... `);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                await model.generateContent("Hello");
                console.log("\x1b[32mOK\x1b[0m");
                return; // Found one!
            } catch (e) {
                console.log(`\n\x1b[31mFailed:\x1b[0m ${e.toString()}`);
            }
        }

    } catch (error) {
        console.error("Fatal Error:", error);
    }
}

listModels();
