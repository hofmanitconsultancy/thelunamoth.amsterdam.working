import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from '../config/google';
import type { PlaceDetails, PlacePrediction } from '../types/places';

export class PlacesService {
  private static loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places']
  });

  private static async getTimezone(latitude: number, longitude: number): Promise<string> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${GOOGLE_MAPS_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch timezone data');
      }
      
      const data = await response.json();
      return data.status === 'OK' ? data.timeZoneId : '';
    } catch (err) {
      console.error('Timezone fetch error:', err);
      return '';
    }
  }

  static async initGoogleMaps(): Promise<void> {
    try {
      await this.loader.load();
    } catch (err) {
      console.error('Failed to load Google Maps:', err);
      throw new Error('Unable to initialize location services');
    }
  }

  static async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    try {
      await this.initGoogleMaps();
      
      return new Promise((resolve, reject) => {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        
        service.getDetails(
          {
            placeId,
            fields: ['formatted_address', 'geometry', 'address_components']
          },
          async (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK || !place?.address_components) {
              reject(new Error('Failed to fetch place details'));
              return;
            }

            const cityComponent = place.address_components.find(
              component => component.types.includes('locality')
            );
            
            const countryComponent = place.address_components.find(
              component => component.types.includes('country')
            );

            if (!cityComponent || !countryComponent) {
              reject(new Error('Invalid location data'));
              return;
            }

            const latitude = place.geometry?.location?.lat() || 0;
            const longitude = place.geometry?.location?.lng() || 0;
            
            const timezone = await this.getTimezone(latitude, longitude);

            resolve({
              placeId,
              formattedAddress: place.formatted_address || '',
              city: cityComponent.long_name,
              country: countryComponent.long_name,
              countryCode: countryComponent.short_name,
              latitude,
              longitude,
              timezone
            });
          }
        );
      });
    } catch (err) {
      console.error('Place details error:', err);
      throw new Error('Unable to fetch location details');
    }
  }

  static async searchPlaces(query: string): Promise<PlacePrediction[]> {
    if (!query.trim()) return [];

    try {
      await this.initGoogleMaps();
      
      return new Promise((resolve, reject) => {
        const service = new google.maps.places.AutocompleteService();
        
        service.getPlacePredictions(
          {
            input: query,
            types: ['(cities)']
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              resolve(predictions.map(p => ({
                place_id: p.place_id,
                description: p.description
              })));
            } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              resolve([]);
            } else {
              reject(new Error('Failed to fetch place suggestions'));
            }
          }
        );
      });
    } catch (err) {
      console.error('Place search error:', err);
      throw new Error('Unable to search locations');
    }
  }
}