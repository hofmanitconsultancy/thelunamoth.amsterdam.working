// Map of zodiac sign abbreviations to full names
export const ZODIAC_SIGNS: Record<string, string> = {
  'Ari': 'Aries',
  'Tau': 'Taurus', 
  'Gem': 'Gemini',
  'Can': 'Cancer',
  'Leo': 'Leo',
  'Vir': 'Virgo',
  'Lib': 'Libra',
  'Sco': 'Scorpio',
  'Sag': 'Sagittarius',
  'Cap': 'Capricorn',
  'Aqu': 'Aquarius',
  'Pis': 'Pisces'
} as const;

// Map of planet names to proper display names
export const PLANET_NAMES: Record<string, string> = {
  'sun': 'Sun',
  'moon': 'Moon',
  'mercury': 'Mercury', 
  'venus': 'Venus',
  'mars': 'Mars',
  'jupiter': 'Jupiter',
  'saturn': 'Saturn',
  'uranus': 'Uranus',
  'neptune': 'Neptune',
  'pluto': 'Pluto'
} as const;

// Order for displaying planets
export const PLANET_ORDER = [
  'sun', 'moon', 'mercury', 'venus', 'mars',
  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'
] as const;

// Order for displaying houses
export const HOUSE_ORDER = [
  'first_house', 'second_house', 'third_house', 'fourth_house',
  'fifth_house', 'sixth_house', 'seventh_house', 'eighth_house',
  'ninth_house', 'tenth_house', 'eleventh_house', 'twelfth_house'
] as const;

// Format degrees with zodiac sign
export function formatDegrees(degrees: number): string {
  const wholeDegrees = Math.floor(degrees);
  const minutes = Math.floor((degrees - wholeDegrees) * 60);
  return `${wholeDegrees}°${minutes ? ` ${minutes}′` : ''}`;
}

// Format planet position with sign and degrees
export function formatPlanetPosition(position: number, sign: string): string {
  return `${ZODIAC_SIGNS[sign] || sign} ${formatDegrees(position)}`;
}