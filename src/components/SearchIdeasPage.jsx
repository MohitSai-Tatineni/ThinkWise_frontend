// components/SearchIdeasPage.jsx
import React, { useState } from 'react';
import { generateFakeIdeas } from '../utils/fakeIdeas';

const allIdeas = generateFakeIdeas(100);

export default function SearchIdeasPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null);

  const filteredIdeas = allIdeas.filter((idea) => {
    const q = search.toLowerCase();
    return (
      (!categoryFilter || idea.category === categoryFilter) &&
      (!authorFilter || idea.author.toLowerCase().includes(authorFilter.toLowerCase())) &&
      (idea.title.toLowerCase().includes(q) ||
        idea.description.toLowerCase().includes(q) ||
        idea.date.toLowerCase().includes(q))
    );
  });

  const uniqueCategories = [...new Set(allIdeas.map((idea) => idea.category))];

  if (selectedIdea) {
    const { title, category, description, author, date, roi, effort, score } = selectedIdea;
    return (
      <div className="w-full h-full p-10 animate-slide-up-fade">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">📌 {title}</h2>
        <p className="mb-2 text-gray-600"><strong>Category:</strong> {category}</p>
        <p className="mb-2 text-gray-600"><strong>Author:</strong> {author}</p>
        <p className="mb-2 text-gray-600"><strong>Date:</strong> {date}</p>
        <p className="mt-4 mb-6 text-gray-800 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-3 mb-6 text-sm">
          <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full">ROI: {roi}</span>
          <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full">Effort: {effort}</span>
          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full">Score: {score}</span>
        </div>
        <button onClick={() => setSelectedIdea(null)} className="text-sm text-indigo-600 hover:underline">
          ⬅ Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8 overflow-y-auto h-full bg-gradient-to-bl from-white to-indigo-50 rounded-lg shadow-md animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">🔍 Explore & Search Ideas</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, description or date..."
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          placeholder="Filter by author name"
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <ul className="space-y-6">
        {filteredIdeas.map((idea) => (
          <li
            key={idea.id}
            onClick={() => setSelectedIdea(idea)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-bold text-indigo-800 mb-2">{idea.title}</h3>
            <p className="text-sm text-gray-600 mb-1">Category: <span className="font-medium text-purple-700">{idea.category}</span></p>
            <p className="text-sm text-gray-600 mb-1">Author: <span className="text-blue-600">{idea.author}</span> | Date: {idea.date}</p>
            <p className="text-sm text-gray-700 mt-3 leading-relaxed">{idea.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}