import { InterpretationStorageService } from './storage.service';
import { ZODIAC_SIGNS } from '../../utils/astrology';

export class PlanetHouseInterpretations {
  static async getInterpretation(planet: string, sign: string, house: string): Promise<string> {
    const signName = ZODIAC_SIGNS[sign] || sign;
    const houseName = house.replace(/_/g, ' ');
    const key = `${planet.toLowerCase()}_${house.toLowerCase()}`;
    
    const interpretation = await InterpretationStorageService.getInterpretation('planet_house', key);
    return interpretation || `${planet} in ${signName} in the ${houseName} brings its influence to this area of life.`;
  }
}