import type { NatalChartResponse } from '../../types/natal-chart';

export class NatalChartValidationService {
  static validateApiResponse(data: any): data is NatalChartResponse {
    if (!data || typeof data !== 'object') {
      console.error('Invalid response format:', data);
      return false;
    }

    if (data.status !== 'OK' || !data.data?.subject) {
      console.error('Missing required top-level fields:', data);
      return false;
    }

    const requiredFields = [
      'name', 'year', 'month', 'day', 'hour', 'minute',
      'city', 'nation', 'lng', 'lat', 'tz_str'
    ];

    const missingFields = requiredFields.filter(
      field => data.data.subject[field] === undefined
    );

    if (missingFields.length > 0) {
      console.error('Missing required subject fields:', missingFields);
      return false;
    }

    return true;
  }
}