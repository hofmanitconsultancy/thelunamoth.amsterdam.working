export interface PlacePrediction {
  place_id: string;
  description: string;
}

export interface PlaceDetails {
  placeId: string;
  formattedAddress: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
}