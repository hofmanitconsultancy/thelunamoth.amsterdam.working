import React from 'react';
import { Star, Moon, Sun, Compass, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    icon: Star,
    title: 'Birth Chart Analysis',
    description: 'Explore your complete natal chart with detailed planetary positions and aspects',
    link: '/birth-chart'
  },
  {
    icon: Moon,
    title: 'Current Transits',
    description: 'Track real-time planetary movements and their influence on your chart',
    link: '/transits'
  },
  {
    icon: Sun,
    title: 'Solar Return Chart',
    description: 'Discover your yearly astrological forecast and opportunities',
    link: '/solar-return'
  },
  {
    icon: Compass,
    title: 'Progressed Chart',
    description: 'View your evolving astrological journey through time',
    link: '/progressions'
  },
  {
    icon: Clock,
    title: 'Daily Aspects',
    description: 'Review current planetary aspects and their meanings',
    link: '/daily-aspects'
  },
  {
    icon: MapPin,
    title: 'Astro-Locality',
    description: 'Explore how different locations affect your chart',
    link: '/astro-locality'
  }
];

export function AstrologicalTools() {
  return (
    <>
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Link
            key={tool.title}
            to={tool.link}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/15 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon className="h-6 w-6 text-purple-300 group-hover:text-purple-200" />
              <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
            </div>
            <p className="text-purple-200">{tool.description}</p>
          </Link>
        );
      })}
    </>
  );
}