import { MaterialListing } from './listing.interface';
import { User } from './user.interface';

export type TransactionStatus = 'pending' | 'approved' | 'in_transit' | 'delivered' | 'completed' | 'cancelled';

export interface Transaction {
  transaction_id: number;
  listing_id?: number;
  buyer_id?: number;
  seller_id?: number;
  quantity: number;
  unit_price: number;
  currency: string;
  total_price: number;
  transaction_fee?: number;
  status: TransactionStatus;
  payment_method?: string;
  payment_status?: string;
  payment_date?: Date;
  contract_url?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  
  // Join fields
  listing?: MaterialListing;
  buyer?: User;
  seller?: User;
  shipment?: Shipment;
  sustainability_metrics?: SustainabilityMetrics;
  reviews?: Review[];
}

export interface Shipment {
  shipment_id: number;
  transaction_id: number;
  route_id?: number;
  provider_id?: number;
  pickup_date?: Date;
  delivery_date?: Date;
  status?: string;
  tracking_number?: string;
  tracking_url?: string;
  actual_weight?: number;
  weight_unit?: string;
  volume?: number;
  volume_unit?: string;
  shipping_cost?: number;
  currency: string;
  carbon_footprint?: number;
  carbon_offset_purchased: boolean;
  special_handling_notes?: string;
  created_at: Date;
  updated_at: Date;
  
  // Join fields
  transaction?: Transaction;
  provider?: TransportationProvider;
  route?: TransportationRoute;
}

export interface SustainabilityMetrics {
  metric_id: number;
  transaction_id: number;
  carbon_saved_kg?: number;
  water_saved_liters?: number;
  energy_saved_kwh?: number;
  landfill_avoided_kg?: number;
  virgin_material_avoided_kg?: number;
  calculation_methodology?: string;
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Review {
  review_id: number;
  transaction_id?: number;
  reviewer_id?: number;
  reviewee_id?: number;
  material_rating?: number;
  communication_rating?: number;
  logistics_rating?: number;
  overall_rating: number;
  review_text?: string;
  response_text?: string;
  response_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export type TransportMethod = 'road' | 'rail' | 'sea' | 'air';

export interface TransportationProvider {
  provider_id: number;
  user_id: number;
  transport_types: TransportMethod[];
  service_areas?: string[];
  fleet_size?: number;
  eco_friendly_options: boolean;
  has_hazmat_certification: boolean;
  insurance_info?: string;
  created_at: Date;
  updated_at: Date;
  
  // Join fields
  user?: User;
}

export interface TransportationRoute {
  route_id: number;
  provider_id: number;
  origin_city: string;
  origin_state?: string;
  origin_country: string;
  destination_city: string;
  destination_state?: string;
  destination_country: string;
  transport_method: TransportMethod;
  distance_km?: number;
  typical_duration_hours?: number;
  base_cost?: number;
  cost_currency: string;
  carbon_emissions_kg?: number;
  route_frequency?: string;
  created_at: Date;
  updated_at: Date;
  
  // Join fields
  provider?: TransportationProvider;
}

export interface TransactionCreateInput {
  listing_id: number;
  quantity: number;
  payment_method?: string;
  notes?: string;
  shipping_address?: string;
}

export interface ShipmentCreateInput {
  transaction_id: number;
  route_id?: number;
  provider_id?: number;
  pickup_date?: Date;
  actual_weight?: number;
  weight_unit?: string;
  volume?: number;
  volume_unit?: string;
  special_handling_notes?: string;
} 