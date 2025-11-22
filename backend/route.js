import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// --- OpenAI Configuration ---
// The API key will be read from Vercel's environment variables.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Handles POST requests to /api/chat
 * @param {Request} request The incoming request object.
 * @returns {Response} A JSON response with the AI's reply.
 */
export async function POST(request) {
  try {
    const { message } = await request.json();

    // This is the "persona" for your chatbot.
    const systemPrompt = "You are Harshali Jadhav's personal AI assistant. Your name is Alex. You are friendly, helpful, and slightly witty. You know everything about Harshali's projects, skills, and background. Answer questions as if you were an expert on her professional life.";

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    });

    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return NextResponse.json({ error: 'Failed to get a response from the AI.' }, { status: 500 });
  }
}