import { LucideIcon } from 'lucide-react';

export interface BookingService {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  icon: LucideIcon;
}

export interface BookingFormData {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  message?: string;
}