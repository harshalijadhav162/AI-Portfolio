const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const projects = [
  {
    id: 1,
    title: 'AI Portfolio Website',
    description: 'An interactive portfolio built with Next.js, featuring AI chatbot integration.',
    tech: ['Next.js', 'Tailwind CSS', 'Express', 'OpenAI'],
    link: 'https://github.com/harshali/portfolio'
  },
  {
    id: 2,
    title: 'E-commerce App',
    description: 'Full-stack e-commerce application with user authentication and payment integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://github.com/harshali/ecommerce'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather app using external APIs and data visualization.',
    tech: ['JavaScript', 'Chart.js', 'OpenWeather API'],
    link: 'https://github.com/harshali/weather'
  }
];

const certifications = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    date: '2023'
  },
  {
    id: 2,
    title: 'AI/ML Certification',
    issuer: 'Google',
    date: '2024'
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/certifications', (req, res) => {
  res.json(certifications);
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI assistant for Harshali Jadhav, a web developer. Answer questions about her projects, skills, and experience based on the provided information.' },
        { role: 'user', content: message }
      ],
      max_tokens: 150
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ response: 'Sorry, I am unable to respond right now.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
