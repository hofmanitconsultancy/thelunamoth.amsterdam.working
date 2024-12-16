export class AstrologyValidationService {
  static validateChartData(data: any) {
    if (!data?.data?.subject) {
      return {
        isValid: false,
        error: 'Missing subject data'
      };
    }

    const requiredFields = [
      'name', 'year', 'month', 'day', 'hour', 'minute',
      'city', 'nation', 'lng', 'lat', 'tz_str'
    ];

    const missingFields = requiredFields.filter(
      field => !data.data.subject[field]
    );

    if (missingFields.length > 0) {
      return {
        isValid: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      };
    }

    return { isValid: true };
  }
}