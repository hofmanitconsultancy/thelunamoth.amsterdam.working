export interface CelestialPoint {
  name: string;
  quality: string;
  element: string;
  sign: string;
  sign_num: number;
  position: number;
  abs_pos: number;
  emoji: string;
  point_type: 'Planet' | 'House';
  house: string | null;
  retrograde: boolean | null;
}

export interface ChartSubject {
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
  sidereal_mode: string | null;
  houses_system_identifier: string;
  houses_system_name: string;
  perspective_type: string;
  iso_formatted_local_datetime: string;
  iso_formatted_utc_datetime: string;
  julian_day: number;
  utc_time: number;
  local_time: number;
  [key: string]: any; // Allow for dynamic planet properties
}

export interface LunarPhase {
  degrees_between_s_m: number;
  moon_phase: number;
  sun_phase: number;
  moon_emoji: string;
  moon_phase_name: string;
}

export interface ChartAspect {
  p1_name: string;
  p1_abs_pos: number;
  p2_name: string;
  p2_abs_pos: number;
  aspect: string;
  orbit: number;
  aspect_degrees: number;
  aid: number;
  diff: number;
  p1: number;
  p2: number;
  is_major: boolean;
}

export interface NatalChart {
  status: string;
  data: {
    subject: ChartSubject & Record<string, CelestialPoint>;
  };
  aspects: ChartAspect[];
}