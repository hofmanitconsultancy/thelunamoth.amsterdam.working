import type { BirthData } from '../../types/birthData';
import type { User } from 'firebase/auth';
import type { NatalChartRequest } from '../../types/astrology';

export class AstrologyFormatterService {
  static formatBirthDataForApi(birthData: BirthData, user: User): NatalChartRequest {
    const birthDate = new Date(birthData.birthDate);
    const [hours, minutes] = birthData.birthTime.split(':').map(Number);

    return {
      subject: {
        name: user.displayName || 'User',
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        day: birthDate.getDate(),
        hour: hours,
        minute: minutes,
        longitude: birthData.longitude,
        latitude: birthData.latitude,
        city: birthData.city,
        nation: birthData.countryCode,
        timezone: birthData.timezone,
        zodiac_type: 'Tropic'
      }
    };
  }
}