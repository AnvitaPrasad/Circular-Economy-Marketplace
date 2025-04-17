import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Mock categories - would be fetched from API in production
const materialCategories = [
  { id: 1, name: 'Plastics', subcategories: ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Other'] },
  { id: 2, name: 'Metals', subcategories: ['Aluminum', 'Steel', 'Copper', 'Brass', 'Iron', 'Other'] },
  { id: 3, name: 'Paper & Pulp', subcategories: ['Cardboard', 'Office Paper', 'Newspaper', 'Magazines', 'Wood Pulp', 'Other'] },
  { id: 4, name: 'Textiles', subcategories: ['Cotton', 'Polyester', 'Wool', 'Nylon', 'Other'] },
  { id: 5, name: 'Glass', subcategories: ['Clear', 'Green', 'Brown', 'Other'] },
  { id: 6, name: 'Organics', subcategories: ['Food Waste', 'Agricultural Waste', 'Other'] },
  { id: 7, name: 'Construction', subcategories: ['Concrete', 'Wood', 'Masonry', 'Metal', 'Other'] },
  { id: 8, name: 'Electronics', subcategories: ['PCBs', 'Batteries', 'Displays', 'Precious Metals', 'Other'] }
];

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  line-height: 1.6;
`;

const FormContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const FormSection = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FormGroup = styled.div<{ $span?: number }>`
  flex: ${({ $span }) => $span || 1};
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.default};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.default};
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.default};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const FormHint = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.25rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const BackButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.default};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Redirect if not logged in
  if (!isLoggedIn) {
    navigate('/login?redirect=/create-listing');
  }
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    quantity: '',
    unit: 'kg',
    price: '',
    priceUnit: 'per kg',
    location: '',
    images: [] as File[],
    certification: '',
    availabilityDate: ''
  });
  
  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    
    // Find subcategories for the selected category
    const categoryObj = materialCategories.find(cat => cat.name === selectedCategory);
    if (categoryObj) {
      setSubcategories(categoryObj.subcategories);
      setFormData({
        ...formData,
        category: selectedCategory,
        subcategory: ''
      });
    } else {
      setSubcategories([]);
    }
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.category || 
        !formData.subcategory || !formData.quantity || !formData.price || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Create a new listing object
      const newListing = {
        id: Date.now(), // Use timestamp as unique ID
        title: formData.title,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory,
        quantity: `${formData.quantity} ${formData.unit}`,
        price: `€${formData.price} ${formData.priceUnit}`,
        location: formData.location,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active',
        views: 0,
        inquiries: 0,
        certification: formData.certification,
        availabilityDate: formData.availabilityDate
      };
      
      // Get existing listings from localStorage or initialize empty array
      const existingListings = JSON.parse(localStorage.getItem('materialListings') || '[]');
      
      // Add new listing
      const updatedListings = [...existingListings, newListing];
      
      // Save to localStorage
      localStorage.setItem('materialListings', JSON.stringify(updatedListings));
      
      // Simulate a network delay
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Listing created successfully!');
        navigate('/my-listings');
      }, 1000);
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to create listing. Please try again.');
    }
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Create New Listing</Title>
          <Subtitle>
            List your circular materials and connect with potential buyers. Provide detailed information to increase visibility and interest.
          </Subtitle>
        </motion.div>
      </PageHeader>
      
      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            <FormRow>
              <FormGroup $span={2}>
                <FormLabel htmlFor="title">Listing Title*</FormLabel>
                <FormInput
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="E.g., Recycled PET Flakes, Clean Grade"
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="description">Description*</FormLabel>
                <FormTextarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your material, its quality, source, and potential applications"
                  required
                />
                <FormHint>Detailed descriptions attract more serious buyers</FormHint>
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="category">Category*</FormLabel>
                <FormSelect
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  {materialCategories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="subcategory">Subcategory*</FormLabel>
                <FormSelect
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  disabled={!category}
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </FormSelect>
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Quantity & Pricing</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="quantity">Quantity*</FormLabel>
                <FormInput
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="E.g., 5000"
                  min="1"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="unit">Unit</FormLabel>
                <FormSelect
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="ton">Metric Tons (ton)</option>
                  <option value="lb">Pounds (lb)</option>
                  <option value="m3">Cubic Meters (m³)</option>
                  <option value="piece">Pieces</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="price">Price*</FormLabel>
                <FormInput
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="E.g., 1.25"
                  step="0.01"
                  min="0"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="priceUnit">Price Unit</FormLabel>
                <FormSelect
                  id="priceUnit"
                  name="priceUnit"
                  value={formData.priceUnit}
                  onChange={handleChange}
                >
                  <option value="per kg">per kg</option>
                  <option value="per ton">per ton</option>
                  <option value="per lb">per lb</option>
                  <option value="per m3">per m³</option>
                  <option value="per piece">per piece</option>
                  <option value="total">total (for entire quantity)</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Location & Availability</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="location">Location*</FormLabel>
                <FormInput
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="E.g., Hamburg, Germany"
                  required
                />
                <FormHint>City and country where the material is located</FormHint>
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="availabilityDate">Available From</FormLabel>
                <FormInput
                  type="date"
                  id="availabilityDate"
                  name="availabilityDate"
                  value={formData.availabilityDate}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="certification">Certification (if any)</FormLabel>
                <FormInput
                  type="text"
                  id="certification"
                  name="certification"
                  value={formData.certification}
                  onChange={handleChange}
                  placeholder="E.g., ISO 14001, GRS, Cradle to Cradle"
                />
              </FormGroup>
            </FormRow>
          </FormSection>
          
          {error && <FormSection>
            <ErrorMessage>{error}</ErrorMessage>
          </FormSection>}
          
          <FormSection>
            <ButtonsContainer>
              <BackButton to="/my-listings">Cancel</BackButton>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Listing'}
              </Button>
            </ButtonsContainer>
          </FormSection>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default CreateListingPage; 