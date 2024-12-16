import { API_CONFIG } from '../../config/api';
import type { NatalChartRequest, NatalChartResponse } from '../../types/astrology';

export class AstrologyApi {
  private static readonly API_URL = 'https://astrologer.p.rapidapi.com/api/v4';
  private static readonly headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'astrologer.p.rapidapi.com',
    'x-rapidapi-key': API_CONFIG.RAPIDAPI_KEY
  };

  static async getNatalChart(data: NatalChartRequest): Promise<NatalChartResponse> {
    try {
      const response = await fetch(`${this.API_URL}/natal-aspects-data`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status !== 'OK' || !result.data?.subject) {
        throw new Error('Invalid API response format');
      }

      return result;
    } catch (err) {
      console.error('Error fetching natal chart:', err);
      throw new Error('Failed to fetch natal chart data');
    }
  }
}