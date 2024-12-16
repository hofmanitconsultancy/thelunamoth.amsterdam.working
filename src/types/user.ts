export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  createdAt: Date;
}

export interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}