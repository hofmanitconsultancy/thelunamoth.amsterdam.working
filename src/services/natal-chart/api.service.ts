import { API_CONFIG } from '../../config/api';
import type { NatalChartRequest, NatalChartResponse } from '../../types/natal-chart';

export class NatalChartApiService {
  private static readonly API_URL = 'https://astrologer.p.rapidapi.com/api/v4';
  private static readonly headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'astrologer.p.rapidapi.com',
    'x-rapidapi-key': API_CONFIG.RAPIDAPI_KEY
  };

  static async fetchNatalChart(data: NatalChartRequest): Promise<NatalChartResponse> {
    try {
      console.log('Fetching natal chart with data:', data);
      
      const response = await fetch(`${this.API_URL}/natal-aspects-data`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ subject: data.subject })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      return result;
    } catch (err) {
      console.error('API Error:', err);
      throw new Error('Failed to fetch natal chart data');
    }
  }
}