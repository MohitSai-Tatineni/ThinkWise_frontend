// components/IdeaChatBot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IdeaChatBot({ idea, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    const botResponse = {
      from: 'bot',
      text: `Certainly! Based on "${idea.title}", here's what I know:\n\n${idea.description}\n\nROI: ${idea.roi} | Effort: ${idea.effort} | Score: ${idea.score}`
    };
    setMessages([...newMessages, botResponse]);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!idea) return <div className="p-10 text-center text-lg">Idea not found</div>;

  return (
    <div className="flex flex-col w-full h-full font-sans overflow-hidden animate-slide-up-fade">
      {/* Header */}
      <div className="p-4 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 animate-fade-in-up">💬 AI Assistant — {idea.title}</h1>
        <button
          onClick={onBack}
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Main Content */}
      {!showChat ? (
        <div className="max-w-4xl mx-auto w-full px-6 py-10 text-gray-800 animate-fade-in-up">
          <h2 className="text-3xl font-extrabold mb-6 text-indigo-600 animate-fade-in-up">📄 Idea Overview</h2>
          <div className="space-y-3 animate-fade-in-up">
            <p><strong className="text-indigo-700">Title:</strong> {idea.title}</p>
            <p><strong className="text-indigo-700">Category:</strong> {idea.category || 'N/A'}</p>
            <p><strong className="text-indigo-700">Description:</strong> {idea.description}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">ROI: {idea.roi}</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Effort: {idea.effort}</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Score: {idea.score}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setMessages([{ from: 'bot', text: `Hi! I'm your AI assistant. Ask me anything about "${idea.title}".` }]);
              setShowChat(true);
            }}
            className="mt-10 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:scale-105 transition transform duration-300 shadow-lg animate-bounce"
          >
            💬 Chat to Know More
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 max-w-5xl mx-auto w-full">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                <div className="flex items-start space-x-3 w-fit max-w-full">
                  {msg.from === 'bot' && <span className="text-2xl mt-1 animate-wiggle">🤖</span>}
                  {msg.from === 'user' && <span className="text-2xl mt-1 animate-wiggle">🧑‍💻</span>}
                  <div
                    className={`px-5 py-3 rounded-2xl shadow-md text-sm whitespace-pre-line transition-all duration-200 ${
                      msg.from === 'bot'
                        ? 'bg-white/90 text-gray-900 border border-gray-200'
                        : 'bg-indigo-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t backdrop-blur-md sticky bottom-0 z-10 bg-white/80">
            <div className="flex items-center gap-3 max-w-5xl mx-auto w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about the idea..."
                className="flex-1 border border-gray-300 rounded-full px-5 py-2 focus:ring-2 focus:ring-indigo-300 outline-none shadow-md"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 animate-pulse"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
