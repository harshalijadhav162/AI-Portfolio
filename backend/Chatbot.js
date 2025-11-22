'use client';

import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi there! I'm Alex, Harshali's AI assistant. Ask me anything about her work or skills!" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatboxRef = useRef(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Send message to your backend API
      const response = await fetch('/api/chat', { // Use relative path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage = { sender: 'ai', text: data.reply };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage = { sender: 'ai', text: "Sorry, I'm having a little trouble connecting right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-gray-800 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-gray-900 p-3 rounded-t-lg text-white text-center font-bold">
            Chat with Alex
          </div>

          {/* Messages */}
          <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <span className="inline-block px-3 py-2 rounded-lg bg-gray-700 text-gray-200">
                  ...
                </span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-700">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
              disabled={isLoading}
            />
          </form>
        </div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white text-3xl hover:bg-blue-700 transition"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          // Close Icon (X)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Chat Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;

```

### 2. Add the Chatbot to Your Website Layout

To make the chatbot appear on every page of your portfolio, you should add it to your main layout file.

Open the file `frontend/app/layout.js` (or `layout.tsx`) and add the `Chatbot` component just before the closing `</body>` tag.

```javascript
import './globals.css'
import { Inter } from 'next/font/google'
import Chatbot from './components/Chatbot' // <-- Import the new component

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Harshali Jadhav | AI Portfolio', // You can update this
  description: 'My interactive AI-powered portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        {children}
        <Chatbot /> {/* <-- Add the chatbot component here */}
      </body>
    </html>
  )
}
```

### What to Do Next

1.  **Run Your Application:** If they aren't running already, start both your backend and frontend servers again.
    *   In the `backend` folder: `npm run dev`
    *   In the `frontend` folder: `npm run dev`

2.  **Test the Chatbot:** Go to `http://localhost:3000`. You should now see a blue chat bubble in the bottom-right corner. Click it to open the chat window and try asking a question like:
    *   "What projects has Harshali worked on?"
    *   "What is her background?"

The chatbot will send your message to your backend, get a response from the OpenAI API, and display it in the chat. You have now successfully integrated the core AI feature!

<!--
[PROMPT_SUGGESTION]How do I deploy this entire project to a live website?[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you help me create the "Hero" and "About Me" sections for the homepage?[/PROMPT_SUGGESTION]
-->