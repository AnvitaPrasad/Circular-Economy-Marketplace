export type MaterialState = 'solid' | 'liquid' | 'gas' | 'mixed';

export interface MaterialCategory {
  category_id: number;
  category_name: string;
  parent_category_id?: number;
  description?: string;
  icon_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Material {
  material_id: number;
  category_id?: number;
  material_name: string;
  chemical_composition?: string;
  physical_form: MaterialState;
  description?: string;
  hazardous: boolean;
  recyclable: boolean;
  biodegradable?: boolean;
  shelf_life?: number;
  shelf_life_unit?: string;
  storage_requirements?: string;
  handling_instructions?: string;
  created_at: Date;
  updated_at: Date;
  properties?: MaterialProperty[];
  category?: MaterialCategory;
}

export interface MaterialProperty {
  property_id: number;
  material_id: number;
  property_name: string;
  property_value: string;
  unit?: string;
  test_method?: string;
  created_at: Date;
}

export interface IndustrialProcess {
  process_id: number;
  process_name: string;
  description?: string;
  industry_sector?: string;
  typical_inputs?: string[];
  typical_outputs?: string[];
  average_energy_consumption?: number;
  energy_unit?: string;
  sustainability_rating?: number;
  created_at: Date;
  updated_at: Date;
}

export interface MaterialProcessCompatibility {
  compatibility_id: number;
  material_id: number;
  process_id: number;
  compatibility_level: number; // 1 to 5
  notes?: string;
  created_at: Date;
  material?: Material;
  process?: IndustrialProcess;
}

export interface MaterialCategoryCreateInput {
  category_name: string;
  parent_category_id?: number;
  description?: string;
  icon_url?: string;
}

export interface MaterialCreateInput {
  category_id?: number;
  material_name: string;
  chemical_composition?: string;
  physical_form: MaterialState;
  description?: string;
  hazardous: boolean;
  recyclable: boolean;
  biodegradable?: boolean;
  shelf_life?: number;
  shelf_life_unit?: string;
  storage_requirements?: string;
  handling_instructions?: string;
  properties?: {
    property_name: string;
    property_value: string;
    unit?: string;
    test_method?: string;
  }[];
} 