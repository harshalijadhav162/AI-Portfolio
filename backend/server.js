const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing for your frontend
app.use(cors({ origin: 'http://localhost:3000' }));
// Enable the express server to parse JSON bodies
app.use(express.json());

// --- OpenAI Configuration ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- Mock Data for Projects ---
// In a real application, you might fetch this from a database.
const projects = [
  {
    id: 1,
    title: 'AI-Powered Portfolio',
    description: 'An interactive personal portfolio featuring a custom AI chatbot, built with the MERN stack and OpenAI.',
    stack: ['React', 'Node.js', 'Express', 'OpenAI'],
    link: 'https://github.com/your-username/your-repo',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce website with product listings, a shopping cart, and a checkout process.',
    stack: ['Next.js', 'Tailwind CSS', 'Stripe'],
    link: 'https://github.com/your-username/your-repo',
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A simple and intuitive app to manage daily tasks, built with React and using local storage.',
    stack: ['React', 'CSS', 'JavaScript'],
    link: 'https://github.com/your-username/your-repo',
  },
];

// --- API Routes ---

// GET /api/projects
// This endpoint provides the project data to your frontend.
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// POST /api/chat
// This endpoint handles the conversation with the AI chatbot.
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // This is the "persona" for your chatbot. Customize it to match your tone.
    const systemPrompt = "You are Harshali Jadhav's personal AI assistant. Your name is Alex. You are friendly, helpful, and slightly witty. You know everything about Harshali's projects, skills, and background. Answer questions as if you were an expert on her professional life.";

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});