import { InterpretationStorageService } from './storage.service';
import { ZODIAC_SIGNS } from '../../utils/astrology';

export class HouseInterpretations {
  static async getInterpretation(house: string, sign: string): Promise<string> {
    const signName = ZODIAC_SIGNS[sign] || sign;
    const houseName = house.replace(/_/g, ' ');
    const key = `${house.toLowerCase()}_${sign.toLowerCase()}`;
    
    const interpretation = await InterpretationStorageService.getInterpretation('house_sign', key);
    return interpretation || `${signName} in the ${houseName} suggests specific influences in this area of life.`;
  }
}