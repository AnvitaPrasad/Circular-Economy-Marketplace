import { Material } from './material.interface';
import { User } from './user.interface';

export interface MaterialListing {
  listing_id: number;
  seller_id: number;
  material_id: number;
  title: string;
  description?: string;
  quantity: number;
  unit: string;
  price_per_unit?: number;
  currency: string;
  minimum_order_quantity?: number;
  available_from: Date;
  available_until?: Date;
  origin_address?: string;
  origin_city?: string;
  origin_state?: string;
  origin_country?: string;
  origin_postal_code?: string;
  origin_latitude?: number;
  origin_longitude?: number;
  production_date?: Date;
  source_process_id?: number;
  quality_certification?: string;
  images?: string[];
  is_active: boolean;
  views_count: number;
  created_at: Date;
  updated_at: Date;
  
  // Join fields
  seller?: User;
  material?: Material;
  properties?: ListingProperty[];
}

export interface ListingProperty {
  property_id: number;
  listing_id: number;
  property_name: string;
  property_value: string;
  unit?: string;
  created_at: Date;
}

export interface SavedSearch {
  search_id: number;
  user_id: number;
  search_name: string;
  material_categories?: number[];
  material_names?: string[];
  location_radius?: number;
  location_lat?: number;
  location_lng?: number;
  min_quantity?: number;
  max_price?: number;
  other_filters?: Record<string, any>;
  email_notifications: boolean;
  frequency?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ListingCreateInput {
  material_id: number;
  title: string;
  description?: string;
  quantity: number;
  unit: string;
  price_per_unit?: number;
  currency?: string;
  minimum_order_quantity?: number;
  available_from: Date;
  available_until?: Date;
  origin_address?: string;
  origin_city?: string;
  origin_state?: string;
  origin_country?: string;
  origin_postal_code?: string;
  origin_latitude?: number;
  origin_longitude?: number;
  production_date?: Date;
  source_process_id?: number;
  quality_certification?: string;
  images?: string[];
  properties?: {
    property_name: string;
    property_value: string;
    unit?: string;
  }[];
}

export interface ListingSearchParams {
  material_id?: number;
  category_id?: number;
  keyword?: string;
  min_quantity?: number;
  max_price?: number;
  location_lat?: number;
  location_lng?: number;
  distance_km?: number;
  country?: string;
  state?: string;
  city?: string;
  sort_by?: 'price' | 'quantity' | 'date' | 'distance';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
} 