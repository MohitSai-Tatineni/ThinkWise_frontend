// components/AnalyticsPage.jsx
import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, TimeScale, Tooltip, Legend, Title } from 'chart.js';
import { generateFakeIdeas } from '../utils/fakeIdeas';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, TimeScale, Tooltip, Legend, Title);

const ideas = generateFakeIdeas(100);

// Preprocess data
const categoryCount = {};
const roiDistribution = {};
const effortDistribution = {};
const effortVsRoi = {};
const scoreBuckets = { '60-69': 0, '70-79': 0, '80-89': 0, '90-100': 0 };
const categoryScores = {};
const ideasOverTime = {};

ideas.forEach(idea => {
  categoryCount[idea.category] = (categoryCount[idea.category] || 0) + 1;
  roiDistribution[idea.roi] = (roiDistribution[idea.roi] || 0) + 1;
  effortDistribution[idea.effort] = (effortDistribution[idea.effort] || 0) + 1;
  const key = `${idea.effort}-${idea.roi}`;
  effortVsRoi[key] = (effortVsRoi[key] || 0) + 1;
  if (idea.score < 70) scoreBuckets['60-69']++;
  else if (idea.score < 80) scoreBuckets['70-79']++;
  else if (idea.score < 90) scoreBuckets['80-89']++;
  else scoreBuckets['90-100']++;
  if (!categoryScores[idea.category]) categoryScores[idea.category] = [];
  categoryScores[idea.category].push(idea.score);
  const month = format(new Date(idea.date), 'yyyy-MM');
  ideasOverTime[month] = (ideasOverTime[month] || 0) + 1;
});

const chartIdeasOverTime = {
  labels: Object.keys(ideasOverTime).sort(),
  datasets: [
    {
      label: 'Ideas Submitted per Month',
      data: Object.entries(ideasOverTime).sort(([a], [b]) => new Date(a) - new Date(b)).map(([_, v]) => v),
      borderColor: '#6366F1',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      fill: true,
      tension: 0.4
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
    title: { display: false },
  },
  scales: {
    x: { title: { display: true, text: 'Month' } },
    y: { title: { display: true, text: 'Number of Ideas' }, beginAtZero: true }
  }
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
  },
  scales: {
    x: { title: { display: true, text: 'Category' } },
    y: { title: { display: true, text: 'Count' }, beginAtZero: true }
  }
};

const scoreBarOptions = {
  ...barOptions,
  scales: {
    x: { title: { display: true, text: 'Score Range' } },
    y: { title: { display: true, text: 'Number of Ideas' }, beginAtZero: true }
  }
};

export default function AnalyticsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 overflow-y-auto h-full bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 tracking-tight drop-shadow">📊 Idea Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Ideas per Category</h3>
          <Bar data={{ labels: Object.keys(categoryCount), datasets: [{ label: 'Ideas per Category', data: Object.values(categoryCount), backgroundColor: 'rgba(99, 102, 241, 0.7)' }] }} options={barOptions} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">ROI Distribution</h3>
          <Pie data={{ labels: Object.keys(roiDistribution), datasets: [{ label: 'ROI Distribution', data: Object.values(roiDistribution), backgroundColor: ['#10B981', '#FBBF24', '#EF4444'] }] }} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Effort Distribution</h3>
          <Pie data={{ labels: Object.keys(effortDistribution), datasets: [{ label: 'Effort Distribution', data: Object.values(effortDistribution), backgroundColor: ['#60A5FA', '#FCD34D', '#F87171'] }] }} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Effort vs ROI</h3>
          <Bar data={{ labels: Object.keys(effortVsRoi), datasets: [{ label: 'Effort-ROI Pairs', data: Object.values(effortVsRoi), backgroundColor: 'rgba(139, 92, 246, 0.7)' }] }} options={barOptions} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Score Buckets</h3>
          <Bar data={{ labels: Object.keys(scoreBuckets), datasets: [{ label: 'Score Distribution', data: Object.values(scoreBuckets), backgroundColor: 'rgba(34, 197, 94, 0.7)' }] }} options={scoreBarOptions} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Avg Score by Category</h3>
          <Bar data={{ labels: Object.keys(categoryScores), datasets: [{ label: 'Avg Score by Category', data: Object.values(categoryScores).map(arr => arr.reduce((a, b) => a + b) / arr.length), backgroundColor: 'rgba(59, 130, 246, 0.7)' }] }} options={barOptions} />
        </div>

        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Ideas Submitted Over Time (by Month)</h3>
          <Line data={chartIdeasOverTime} options={lineOptions} />
        </div>
      </div>
    </div>
  );
}
