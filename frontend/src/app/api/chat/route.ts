import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini SDK if the API key is present
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// The constitution context that the Arbitrator acts upon
const constitutionRef = `
Test Chama Alpha - Constitution
Article 4: Monthly Contributions
Every member must contribute KES 5,000 virtually every 5th of the month.
Late contributions attract a penalty (pano) of ganji 500 per day.
`;

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // If SDK is active with key, generate response dynamically
        if (genAI) {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const prompt = `System: You are an expert Chama Legal Arbitrator. Analyze the user's dispute based on the constitution.
Sheng Context: ganji=money, pano=penalty, mkubwa=chairman.
Constitution:
${constitutionRef}

User Query: ${message}`;

            const result = await model.generateContent(prompt);
            const response = await result.response.text();

            return NextResponse.json({ response });
        }

        // Fallback for when API Key isn't provided but logic shouldn't be rigidly hardcoded
        // Basic naive evaluation against rules
        if (message.toLowerCase().includes("late") || message.toLowerCase().includes("pano") || message.toLowerCase().includes("ganji")) {
            return NextResponse.json({
                response: "According to Article 4 of your constitution, the penalty (pano) for late payment is ganji 500 KES per day."
            });
        }

        return NextResponse.json({
            response: "I am your Chama Arbitrator. However, no AI SDK Configuration (GEMINI_API_KEY) was found to dynamically audit this dispute."
        });

    } catch (e: any) {
        return NextResponse.json({
            response: "Error processing the arbitration logic: " + e.message
        });
    }
}
