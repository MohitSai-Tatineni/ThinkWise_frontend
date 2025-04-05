import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 overflow-hidden px-6 text-center animate-fade-in">
      <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">💡</div>
      <div className="absolute bottom-16 right-12 text-7xl opacity-10 animate-bounce">📊</div>
      <div className="absolute top-1/2 left-1/3 text-5xl opacity-10 animate-ping">🤖</div>

      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 z-10">
        Welcome to the Idea Prioritizer AI
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-10 z-10">
        <Typewriter
          words={[
            "Prioritize what matters.",
            "Evaluate impact with AI.",
            "Make confident innovation choices."
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={30}
          delaySpeed={1200}
        />
      </p>

      <button
        onClick={() => navigate("/app")}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 z-10"
      >
        🚀 Get Started
      </button>
    </div>
  );
}
