import type { BirthData } from '../../types/birthData';
import type { User } from 'firebase/auth';
import type { NatalChartRequest } from '../../types/natal-chart';

export class NatalChartFormatterService {
  static formatRequestData(birthData: BirthData, user: User): NatalChartRequest {
    const birthDate = new Date(birthData.birthDate);
    const [hours, minutes] = birthData.birthTime.split(':').map(Number);

    // Ensure all required fields are present and properly formatted
    return {
      subject: {
        name: user.displayName || 'User',
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1, // JavaScript months are 0-based
        day: birthDate.getDate(),
        hour: hours || 0,
        minute: minutes || 0,
        longitude: Number(birthData.longitude) || 0,
        latitude: Number(birthData.latitude) || 0,
        city: birthData.city || '',
        nation: birthData.countryCode || '',
        timezone: birthData.timezone || 'UTC',
        zodiac_type: 'Tropic'
      }
    };
  }
}