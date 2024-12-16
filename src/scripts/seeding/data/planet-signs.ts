import { ZODIAC_SIGNS, PLANET_NAMES } from '../../../utils/astrology';

export const planetSignInterpretations: Record<string, string> = {
  // Sun interpretations
  'sun_ari': `The Sun in Aries indicates a natural leader with a pioneering spirit. ${PLANET_NAMES.sun} in ${ZODIAC_SIGNS.Ari} brings confidence, enthusiasm, and a strong drive for individual achievement.`,
  'sun_tau': `The Sun in Taurus suggests a grounded individual with strong values. ${PLANET_NAMES.sun} in ${ZODIAC_SIGNS.Tau} brings patience, determination, and appreciation for life's pleasures.`,
  // Add more sun interpretations...

  // Moon interpretations
  'moon_ari': `The Moon in Aries indicates emotional spontaneity and quick reactions. ${PLANET_NAMES.moon} in ${ZODIAC_SIGNS.Ari} brings passionate feelings and a need for emotional independence.`,
  'moon_tau': `The Moon in Taurus suggests emotional stability and security needs. ${PLANET_NAMES.moon} in ${ZODIAC_SIGNS.Tau} brings a strong connection to comfort and material well-being.`,
  // Add more moon interpretations...
};