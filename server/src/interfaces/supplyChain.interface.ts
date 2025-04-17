import { Material } from './material.interface';
import { IndustrialProcess } from './material.interface';
import { User } from './user.interface';
import { Transaction } from './transaction.interface';
import { TransportMethod } from './transaction.interface';

export interface CircularSupplyChain {
  chain_id: number;
  chain_name: string;
  description?: string;
  initiator_id?: number;
  industry_sector?: string;
  total_companies: number;
  total_transactions: number;
  total_materials: number;
  carbon_impact_kg: number;
  chain_diagram_url?: string;
  created_at: Date;
  updated_at: Date;
  
  // Join fields
  initiator?: User;
  nodes?: SupplyChainNode[];
  links?: SupplyChainLink[];
}

export interface SupplyChainNode {
  node_id: number;
  chain_id: number;
  user_id: number;
  node_type: string;
  node_position: number;
  process_id?: number;
  input_materials?: number[];
  output_materials?: number[];
  carbon_impact_kg?: number;
  water_usage_liters?: number;
  energy_usage_kwh?: number;
  created_at: Date;
  updated_at: Date;
  
  // Join fields
  chain?: CircularSupplyChain;
  user?: User;
  process?: IndustrialProcess;
  inputMaterialsData?: Material[];
  outputMaterialsData?: Material[];
}

export interface SupplyChainLink {
  link_id: number;
  chain_id: number;
  source_node_id: number;
  target_node_id: number;
  material_id?: number;
  transaction_ids?: number[];
  link_strength?: number;
  annual_volume?: number;
  volume_unit?: string;
  transport_distance_km?: number;
  transport_method?: TransportMethod;
  transport_emissions_kg?: number;
  created_at: Date;
  updated_at: Date;
  
  // Join fields
  chain?: CircularSupplyChain;
  sourceNode?: SupplyChainNode;
  targetNode?: SupplyChainNode;
  material?: Material;
  transactions?: Transaction[];
}

export interface ChainCreateInput {
  chain_name: string;
  description?: string;
  industry_sector?: string;
  initial_nodes?: {
    user_id: number;
    node_type: string;
    process_id?: number;
    input_materials?: number[];
    output_materials?: number[];
  }[];
}

export interface NodeCreateInput {
  chain_id: number;
  user_id: number;
  node_type: string;
  node_position: number;
  process_id?: number;
  input_materials?: number[];
  output_materials?: number[];
}

export interface LinkCreateInput {
  chain_id: number;
  source_node_id: number;
  target_node_id: number;
  material_id?: number;
  transaction_ids?: number[];
  link_strength?: number;
  annual_volume?: number;
  volume_unit?: string;
  transport_distance_km?: number;
  transport_method?: TransportMethod;
} 