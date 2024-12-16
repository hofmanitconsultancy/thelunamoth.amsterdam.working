import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Compass, Moon } from 'lucide-react';
import { useBirthData } from '../../hooks/useBirthData';

const charts = [
  {
    id: 'birth-chart',
    icon: Star,
    title: 'Birth Chart Reading',
    description: 'Discover your cosmic blueprint through an in-depth analysis of your natal chart.',
    link: '/natal-chart',
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'compatibility',
    icon: Users,
    title: 'Compatibility Reading',
    description: 'Explore relationship dynamics through synastry and composite charts.',
    link: '/booking',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'transit',
    icon: Compass,
    title: 'Transit Reading',
    description: 'Understand current planetary influences and upcoming opportunities.',
    link: '/booking',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'horoscope',
    icon: Moon,
    title: 'Daily Horoscope',
    description: 'Get personalized daily insights based on your unique birth chart.',
    link: '/booking',
    gradient: 'from-violet-500 to-purple-600'
  }
];

export function AstrologicalCharts() {
  const navigate = useNavigate();
  const { birthData, isBirthDataComplete } = useBirthData();

  const handleChartClick = (chartId: string, link: string) => {
    // Only allow birth chart access if birth data is complete
    if (chartId === 'birth-chart' && !isBirthDataComplete()) {
      alert('Please complete your birth information first to access your natal chart.');
      return;
    }
    navigate(link);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {charts.map((chart) => {
        const Icon = chart.icon;
        return (
          <button
            key={chart.id}
            onClick={() => handleChartClick(chart.id, chart.link)}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br p-[2px] hover:scale-[1.02] transition-transform text-left"
            style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
          >
            <div className="relative h-full bg-purple-900/90 backdrop-blur-xl rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`bg-gradient-to-br ${chart.gradient} p-2 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{chart.title}</h3>
              </div>
              <p className="text-purple-200 text-sm">{chart.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/10 p-2 rounded-full">
                  <Icon className="h-4 w-4 text-purple-200" />
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}