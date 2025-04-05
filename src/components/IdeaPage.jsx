import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IdeaChatBot from './IdeaChatBot';
import AnalyticsPage from './AnalyticsPage';
import SearchIdeasPage from './SearchIdeasPage';

const topIdeas = [
  {
    id: 1,
    title: "Automated Customer Support Bot",
    roi: "High",
    effort: "Medium",
    score: 87,
    description: "An AI bot to resolve user issues quickly."
  },
  {
    id: 2,
    title: "Smart Inventory Alert System",
    roi: "Medium",
    effort: "Low",
    score: 82,
    description: "Monitor stock levels and send alerts before depletion."
  },
  {
    id: 3,
    title: "AI-based Resume Matcher",
    roi: "High",
    effort: "High",
    score: 78,
    description: "Matches resumes with job requirements automatically."
  },
];

export default function IdeaPage() {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', description: '' });
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, maxLength } = e.target;
    if (value.length <= maxLength) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    alert("Idea Submitted:\n" + JSON.stringify(formData, null, 2));
    setFormData({ title: '', category: '', description: '' });
    setShowForm(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-bl from-white to-[#f5f3ff]">
      {/* Sidebar */}
      <div className="w-1/6 bg-gradient-to-b from-indigo-50 via-white to-purple-100 p-6 shadow-xl border-r border-purple-200 transition-all duration-300 ease-in-out animate-fade-in">
        <div
          className="flex flex-col space-y-1 mb-6 cursor-pointer hover:opacity-90"
          onClick={() => {
            setSelectedIdea(null);
            setShowForm(false);
            setShowAnalytics(false);
            setShowSearch(false);
          }}
        >
          <div className="flex items-center space-x-3 hover:scale-105 transform transition-transform duration-200">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-inner">
              🧠
            </div>
            <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Idea Prioritizer</h1>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-purple-700 flex items-center gap-2">
          Previous Top 3 Ideas
          <span className='text-sm text-gray-400'>Curated by ROI + Effort</span>
        </h2>

        {topIdeas.map((idea, idx) => (
          <div key={idea.id} className={`bg-white p-4 mb-4 rounded-lg shadow hover:shadow-xl transition-transform duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.02] animate-fade-in-up delay-[${idx * 100}]`}>
            <h3 className="font-semibold text-sm text-gray-900 mb-1">{idea.title}</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">ROI: {idea.roi}</span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Effort: {idea.effort}</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Score: {idea.score}</span>
            </div>
            <button
              onClick={() => {
                setSelectedIdea(idea);
                setShowForm(false);
                setShowAnalytics(false);
                setShowSearch(false);
              }}
              className="mt-3 text-indigo-600 hover:underline text-xs font-medium"
            >
              Learn more →
            </button>
          </div>
        ))}

        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
              setShowAnalytics(true);
              setSelectedIdea(null);
              setShowForm(false);
              setShowSearch(false);
            }}
            className="w-full text-left px-4 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white text-sm font-semibold rounded-xl shadow hover:scale-105 transition"
          >
             View Analytics
          </button>
          <button
            onClick={() => {
              setShowSearch(true);
              setSelectedIdea(null);
              setShowForm(false);
              setShowAnalytics(false);
            }}
            className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-sm font-semibold rounded-xl shadow hover:scale-105 transition"
          >
             Search Ideas
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex justify-center items-center p-6">
        {selectedIdea ? (
          <div className="w-full h-full animate-slide-up-fade transition-all duration-700 ease-in-out">
            <IdeaChatBot idea={selectedIdea} onBack={() => setSelectedIdea(null)} />
          </div>
        ) : showAnalytics ? (
          <AnalyticsPage />
        ) : showSearch ? (
          <SearchIdeasPage />
        ) : showForm ? (
          <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg animate-fade-in space-y-4">
            <h2 className="text-2xl font-bold text-center text-indigo-700">✍️ Submit a Game-Changing Idea</h2>
            <p className="text-sm text-gray-500 text-center">Every big product started with a wild idea. Yours could be next.</p>
            <input
              name="Full Name"
              maxLength={150}
              value={formData.title}
              onChange={handleChange}
              placeholder=" Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              name="title"
              maxLength={150}
              value={formData.title}
              onChange={handleChange}
              placeholder=" Idea Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              name="category"
              maxLength={150}
              value={formData.category}
              onChange={handleChange}
              placeholder=" Category (e.g., AI, HR, Sales...)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              name="description"
              maxLength={1000}
              value={formData.description}
              onChange={handleChange}
              placeholder=" Describe your idea in detail..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-gray-400 text-right">Max 200 words</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit Idea
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-10 animate-fade-in">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-700 via-pink-500 to-indigo-700 animate-pulse">
              🌱 Got a Brilliant Idea?
              <br />
              <span className="text-xs font-medium text-purple-500">Let it bloom, get ranked, and make an impact ✨</span>
            </h1>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => alert("📎 File upload feature coming soon!")}
                  className="bg-white border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-100"
                >
                  📎 Upload Idea File
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
                >
                  💡 Enter Idea Manually
                </button>
              </div>

              <div className="text-sm text-gray-600 max-w-xl text-center space-y-2 mt-2 px-4">
                <p>
                  📎 <strong>Upload Idea File</strong> lets you submit a file (CSV/JSON) containing multiple ideas.
                  We'll analyze and extract the <span className="text-purple-600 font-medium">Top 3 Ideas</span> using parameters like <strong>ROI</strong>, <strong>Effort</strong>, and <strong>Score</strong>.
                </p>
                <p>
                  💡 <strong>Enter Idea Manually</strong> allows you to input a single idea and receive an instant evaluation of its <strong>ROI</strong>, <strong>Effort</strong>, and a calculated <strong>Score</strong> from our AI engine.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
