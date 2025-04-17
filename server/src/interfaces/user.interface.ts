export type UserRole = 'company' | 'transporter' | 'admin';
export type CompanyType = 'manufacturer' | 'recycler' | 'processor' | 'distributor';

export interface User {
  user_id: number;
  email: string;
  password_hash: string;
  role: UserRole;
  company_name: string;
  contact_person?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  logo_url?: string;
  website?: string;
  company_description?: string;
  registration_number?: string;
  verified: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CompanyProfile {
  profile_id: number;
  user_id: number;
  company_type: CompanyType;
  founding_year?: number;
  employee_count?: number;
  annual_revenue?: number;
  sustainability_goals?: string;
  industry_sector?: string;
  primary_materials?: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Certification {
  certification_id: number;
  user_id: number;
  certification_type: string;
  certification_name: string;
  issuing_body: string;
  issue_date: Date;
  expiry_date?: Date;
  certificate_url?: string;
  verified: boolean;
  created_at: Date;
}

export interface UserRegistrationInput {
  email: string;
  password: string;
  company_name: string;
  role: UserRole;
  contact_person?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  company_type?: CompanyType;
  industry_sector?: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface UserResponse {
  user_id: number;
  email: string;
  role: UserRole;
  company_name: string;
  contact_person?: string;
  verified: boolean;
  token?: string;
} 