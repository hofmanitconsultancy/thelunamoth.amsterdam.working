export interface NatalChartRequest {
  subject: {
    name: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    longitude: number;
    latitude: number;
    city: string;
    nation: string;
    timezone: string;
    zodiac_type: string;
  };
}

export interface NatalChartResponse {
  status: string;
  data: {
    subject: {
      name: string;
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      city: string;
      nation: string;
      lng: number;
      lat: number;
      tz_str: string;
      zodiac_type: string;
      houses_system_name: string;
      perspective_type: string;
      [key: string]: any; // For dynamic planet/house data
    };
  };
  aspects: Array<{
    p1_name: string;
    p2_name: string;
    aspect: string;
    orbit: number;
    aspect_degrees: number;
    is_major: boolean;
    [key: string]: any;
  }>;
}

export interface AstrologyChart extends NatalChartResponse {
  userId: string;
  createdAt: Date;
}