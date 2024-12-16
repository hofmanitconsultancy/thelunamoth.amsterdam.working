import type { BirthData, BirthDataDisplay } from '../types/birthData';

export function formatBirthData(data: any): BirthData {
  if (!data) return null;

  // Ensure we have a valid location object
  const location = data.location || {
    city: '',
    country: '',
    countryCode: '',
    formattedAddress: '',
    latitude: 0,
    longitude: 0,
    timezone: '',
    placeId: ''
  };

  return {
    userId: data.userId || '',
    birthDate: data.birthDate || '',
    birthTime: data.birthTime || '',
    location: {
      city: location.city || '',
      country: location.country || '',
      countryCode: location.countryCode || '',
      formattedAddress: location.formattedAddress || '',
      latitude: location.latitude || 0,
      longitude: location.longitude || 0,
      timezone: location.timezone || '',
      placeId: location.placeId || ''
    }
  };
}

export function formatBirthDataForDisplay(data: BirthData | null): BirthDataDisplay {
  if (!data) {
    return {
      date: '',
      time: '',
      location: {
        city: '',
        country: '',
        formattedAddress: '',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        timezone: ''
      }
    };
  }

  return {
    date: data.birthDate ? new Date(data.birthDate).toLocaleDateString() : '',
    time: data.birthTime || '',
    location: {
      city: data.location?.city || '',
      country: data.location?.country || '',
      formattedAddress: data.location?.formattedAddress || '',
      coordinates: {
        latitude: data.location?.latitude || 0,
        longitude: data.location?.longitude || 0
      },
      timezone: data.location?.timezone || ''
    }
  };
}