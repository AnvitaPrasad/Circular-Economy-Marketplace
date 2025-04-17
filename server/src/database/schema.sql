-- Create the database (run this separately)
-- CREATE DATABASE circular_economy_marketplace;

-- Connect to the database
-- \c circular_economy_marketplace;

-- User Roles
CREATE TYPE user_role AS ENUM ('company', 'transporter', 'admin');

-- Company Types
CREATE TYPE company_type AS ENUM ('manufacturer', 'recycler', 'processor', 'distributor');

-- Material States
CREATE TYPE material_state AS ENUM ('solid', 'liquid', 'gas', 'mixed');

-- Transportation Methods
CREATE TYPE transport_method AS ENUM ('road', 'rail', 'sea', 'air');

-- Transaction Status
CREATE TYPE transaction_status AS ENUM ('pending', 'approved', 'in_transit', 'delivered', 'completed', 'cancelled');

-- Certification Types
CREATE TYPE certification_type AS ENUM ('iso14001', 'iso9001', 'greenCircle', 'cradleToCradle', 'fairTrade', 'other');

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'company',
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    logo_url VARCHAR(255),
    website VARCHAR(255),
    company_description TEXT,
    registration_number VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Company Profiles Table (extending user information for companies)
CREATE TABLE company_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    company_type company_type NOT NULL,
    founding_year INTEGER,
    employee_count INTEGER,
    annual_revenue DECIMAL(15, 2),
    sustainability_goals TEXT,
    industry_sector VARCHAR(255),
    primary_materials TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certifications Table
CREATE TABLE certifications (
    certification_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    certification_type certification_type NOT NULL,
    certification_name VARCHAR(255) NOT NULL,
    issuing_body VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    certificate_url VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Material Categories Table
CREATE TABLE material_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    parent_category_id INTEGER REFERENCES material_categories(category_id) ON DELETE SET NULL,
    description TEXT,
    icon_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Industrial Processes Table
CREATE TABLE industrial_processes (
    process_id SERIAL PRIMARY KEY,
    process_name VARCHAR(255) NOT NULL,
    description TEXT,
    industry_sector VARCHAR(255),
    typical_inputs TEXT[],
    typical_outputs TEXT[],
    average_energy_consumption DECIMAL(12, 2),
    energy_unit VARCHAR(50),
    sustainability_rating INTEGER CHECK (sustainability_rating BETWEEN 1 AND 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Materials Table
CREATE TABLE materials (
    material_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES material_categories(category_id) ON DELETE SET NULL,
    material_name VARCHAR(255) NOT NULL,
    chemical_composition TEXT,
    physical_form material_state NOT NULL,
    description TEXT,
    hazardous BOOLEAN DEFAULT FALSE,
    recyclable BOOLEAN DEFAULT TRUE,
    biodegradable BOOLEAN,
    shelf_life INTEGER,
    shelf_life_unit VARCHAR(20),
    storage_requirements TEXT,
    handling_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Material Properties Table
CREATE TABLE material_properties (
    property_id SERIAL PRIMARY KEY,
    material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
    property_name VARCHAR(255) NOT NULL,
    property_value VARCHAR(255) NOT NULL,
    unit VARCHAR(50),
    test_method VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Material Process Compatibility Table
CREATE TABLE material_process_compatibility (
    compatibility_id SERIAL PRIMARY KEY,
    material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
    process_id INTEGER REFERENCES industrial_processes(process_id) ON DELETE CASCADE,
    compatibility_level INTEGER CHECK (compatibility_level BETWEEN 1 AND 5),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(material_id, process_id)
);

-- Material Listings Table
CREATE TABLE material_listings (
    listing_id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    material_id INTEGER REFERENCES materials(material_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    quantity DECIMAL(12, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    price_per_unit DECIMAL(12, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    minimum_order_quantity DECIMAL(12, 2),
    available_from DATE NOT NULL,
    available_until DATE,
    origin_address TEXT,
    origin_city VARCHAR(100),
    origin_state VARCHAR(100),
    origin_country VARCHAR(100),
    origin_postal_code VARCHAR(20),
    origin_latitude DECIMAL(10, 8),
    origin_longitude DECIMAL(11, 8),
    production_date DATE,
    source_process_id INTEGER REFERENCES industrial_processes(process_id) ON DELETE SET NULL,
    quality_certification TEXT,
    images TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Listing Properties Table (for specific values that may differ from general material properties)
CREATE TABLE listing_properties (
    property_id SERIAL PRIMARY KEY,
    listing_id INTEGER REFERENCES material_listings(listing_id) ON DELETE CASCADE,
    property_name VARCHAR(255) NOT NULL,
    property_value VARCHAR(255) NOT NULL,
    unit VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transportation Providers Table
CREATE TABLE transportation_providers (
    provider_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    transport_types transport_method[] NOT NULL,
    service_areas TEXT[],
    fleet_size INTEGER,
    eco_friendly_options BOOLEAN DEFAULT FALSE,
    has_hazmat_certification BOOLEAN DEFAULT FALSE,
    insurance_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transportation Routes Table
CREATE TABLE transportation_routes (
    route_id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES transportation_providers(provider_id) ON DELETE CASCADE,
    origin_city VARCHAR(100) NOT NULL,
    origin_state VARCHAR(100),
    origin_country VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    destination_state VARCHAR(100),
    destination_country VARCHAR(100) NOT NULL,
    transport_method transport_method NOT NULL,
    distance_km DECIMAL(10, 2),
    typical_duration_hours INTEGER,
    base_cost DECIMAL(12, 2),
    cost_currency VARCHAR(10) DEFAULT 'USD',
    carbon_emissions_kg DECIMAL(10, 2),
    route_frequency VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Saved Searches Table
CREATE TABLE saved_searches (
    search_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    search_name VARCHAR(255) NOT NULL,
    material_categories INTEGER[],
    material_names VARCHAR(255)[],
    location_radius INTEGER,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    min_quantity DECIMAL(12, 2),
    max_price DECIMAL(12, 2),
    other_filters JSONB,
    email_notifications BOOLEAN DEFAULT FALSE,
    frequency VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    listing_id INTEGER REFERENCES material_listings(listing_id) ON DELETE SET NULL,
    buyer_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    seller_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    quantity DECIMAL(12, 2) NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    total_price DECIMAL(15, 2) NOT NULL,
    transaction_fee DECIMAL(12, 2),
    status transaction_status NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(100),
    payment_status VARCHAR(50),
    payment_date TIMESTAMP WITH TIME ZONE,
    contract_url VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shipments Table
CREATE TABLE shipments (
    shipment_id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    route_id INTEGER REFERENCES transportation_routes(route_id) ON DELETE SET NULL,
    provider_id INTEGER REFERENCES transportation_providers(provider_id) ON DELETE SET NULL,
    pickup_date TIMESTAMP WITH TIME ZONE,
    delivery_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50),
    tracking_number VARCHAR(100),
    tracking_url VARCHAR(255),
    actual_weight DECIMAL(10, 2),
    weight_unit VARCHAR(20),
    volume DECIMAL(10, 2),
    volume_unit VARCHAR(20),
    shipping_cost DECIMAL(12, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    carbon_footprint DECIMAL(10, 2),
    carbon_offset_purchased BOOLEAN DEFAULT FALSE,
    special_handling_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sustainability Metrics Table
CREATE TABLE sustainability_metrics (
    metric_id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    carbon_saved_kg DECIMAL(12, 2),
    water_saved_liters DECIMAL(12, 2),
    energy_saved_kwh DECIMAL(12, 2),
    landfill_avoided_kg DECIMAL(12, 2),
    virgin_material_avoided_kg DECIMAL(12, 2),
    calculation_methodology TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(transaction_id) ON DELETE SET NULL,
    reviewer_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    reviewee_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    material_rating INTEGER CHECK (material_rating BETWEEN 1 AND 5),
    communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
    logistics_rating INTEGER CHECK (logistics_rating BETWEEN 1 AND 5),
    overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
    review_text TEXT,
    response_text TEXT,
    response_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    recipient_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    listing_id INTEGER REFERENCES material_listings(listing_id) ON DELETE SET NULL,
    transaction_id INTEGER REFERENCES transactions(transaction_id) ON DELETE SET NULL,
    subject VARCHAR(255),
    message_text TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    replied BOOLEAN DEFAULT FALSE,
    attachment_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    notification_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_id INTEGER,
    related_type VARCHAR(100),
    read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Circular Supply Chain Table
CREATE TABLE circular_supply_chains (
    chain_id SERIAL PRIMARY KEY,
    chain_name VARCHAR(255) NOT NULL,
    description TEXT,
    initiator_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    industry_sector VARCHAR(255),
    total_companies INTEGER DEFAULT 0,
    total_transactions INTEGER DEFAULT 0,
    total_materials INTEGER DEFAULT 0,
    carbon_impact_kg DECIMAL(15, 2) DEFAULT 0,
    chain_diagram_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Supply Chain Nodes Table
CREATE TABLE supply_chain_nodes (
    node_id SERIAL PRIMARY KEY,
    chain_id INTEGER REFERENCES circular_supply_chains(chain_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    node_type VARCHAR(100) NOT NULL,
    node_position INTEGER NOT NULL,
    process_id INTEGER REFERENCES industrial_processes(process_id) ON DELETE SET NULL,
    input_materials INTEGER[] REFERENCES materials(material_id),
    output_materials INTEGER[] REFERENCES materials(material_id),
    carbon_impact_kg DECIMAL(12, 2),
    water_usage_liters DECIMAL(12, 2),
    energy_usage_kwh DECIMAL(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Supply Chain Links Table
CREATE TABLE supply_chain_links (
    link_id SERIAL PRIMARY KEY,
    chain_id INTEGER REFERENCES circular_supply_chains(chain_id) ON DELETE CASCADE,
    source_node_id INTEGER REFERENCES supply_chain_nodes(node_id) ON DELETE CASCADE,
    target_node_id INTEGER REFERENCES supply_chain_nodes(node_id) ON DELETE CASCADE,
    material_id INTEGER REFERENCES materials(material_id) ON DELETE SET NULL,
    transaction_ids INTEGER[] REFERENCES transactions(transaction_id),
    link_strength INTEGER CHECK (link_strength BETWEEN 1 AND 10),
    annual_volume DECIMAL(12, 2),
    volume_unit VARCHAR(50),
    transport_distance_km DECIMAL(10, 2),
    transport_method transport_method,
    transport_emissions_kg DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reports Table
CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    report_type VARCHAR(100) NOT NULL,
    report_name VARCHAR(255) NOT NULL,
    parameters JSONB,
    result_data JSONB,
    file_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Settings Table
CREATE TABLE system_settings (
    setting_id SERIAL PRIMARY KEY,
    setting_name VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    editable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_material_listings_material_id ON material_listings(material_id);
CREATE INDEX idx_material_listings_seller_id ON material_listings(seller_id);
CREATE INDEX idx_transactions_buyer_id ON transactions(buyer_id);
CREATE INDEX idx_transactions_seller_id ON transactions(seller_id);
CREATE INDEX idx_transactions_listing_id ON transactions(listing_id);
CREATE INDEX idx_material_category_id ON materials(category_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_circular_supply_chains_initiator_id ON circular_supply_chains(initiator_id);
CREATE INDEX idx_supply_chain_nodes_chain_id ON supply_chain_nodes(chain_id);
CREATE INDEX idx_supply_chain_links_chain_id ON supply_chain_links(chain_id); 