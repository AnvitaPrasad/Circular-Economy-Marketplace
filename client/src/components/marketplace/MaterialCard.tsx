import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import Button from '../common/Button';

interface MaterialCardProps {
  id: number;
  title: string;
  material: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
  unit: string;
  location: string;
  availableFrom: string;
  sellerName: string;
  sellerVerified: boolean;
  imageUrl?: string;
  isHazardous?: boolean;
  isRecyclable?: boolean;
  onClick?: () => void;
}

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background-color: ${theme.colors.background.paper};
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ${theme.transitions.easing.easeInOut};
  height: 100%;
  position: relative;
`;

const CardImage = styled.div<{ $imageUrl?: string }>`
  height: 180px;
  background-color: ${theme.colors.neutral.light};
  background-image: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const CardBadges = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
  left: ${theme.spacing.sm};
  display: flex;
  gap: ${theme.spacing.xs};
`;

const Badge = styled.span<{ $variant: 'hazardous' | 'recyclable' | 'category' }>`
  font-size: 0.7rem;
  font-weight: ${theme.typography.fontWeightMedium};
  padding: 4px 8px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  
  ${props => {
    switch (props.$variant) {
      case 'hazardous':
        return `
          background-color: ${theme.colors.feedback.error};
          color: white;
        `;
      case 'recyclable':
        return `
          background-color: ${theme.colors.feedback.success};
          color: white;
        `;
      case 'category':
        return `
          background-color: ${theme.colors.neutral.white};
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.border.light};
        `;
      default:
        return '';
    }
  }}
`;

const CardContent = styled.div`
  padding: ${theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: ${theme.typography.fontWeightMedium};
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text.primary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MaterialInfo = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.primary.main};
  margin-bottom: ${theme.spacing.sm};
  font-weight: ${theme.typography.fontWeightMedium};
`;

const CardDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.text.secondary};
`;

const DetailValue = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.fontWeightMedium};
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border.light};
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceValue = styled.span`
  font-size: 1.1rem;
  font-weight: ${theme.typography.fontWeightBold};
  color: ${theme.colors.text.primary};
`;

const PriceUnit = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.text.secondary};
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border.light};
`;

const SellerName = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.text.secondary};
  display: flex;
  align-items: center;
  
  svg {
    color: ${theme.colors.feedback.success};
    margin-left: 4px;
  }
`;

const cardVariants = {
  hover: {
    y: -5,
    boxShadow: theme.shadows.lg,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98
  }
};

const MaterialCard: React.FC<MaterialCardProps> = ({
  id,
  title,
  material,
  category,
  price,
  currency,
  quantity,
  unit,
  location,
  availableFrom,
  sellerName,
  sellerVerified,
  imageUrl,
  isHazardous = false,
  isRecyclable = true,
  onClick
}) => {
  // Format the price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(price);
  
  // Format the date
  const formattedDate = new Date(availableFrom).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <CardContainer
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      <CardImage $imageUrl={imageUrl}>
        <CardBadges>
          {isHazardous && (
            <Badge $variant="hazardous">
              Hazardous
            </Badge>
          )}
          {isRecyclable && (
            <Badge $variant="recyclable">
              Recyclable
            </Badge>
          )}
          <Badge $variant="category">
            {category}
          </Badge>
        </CardBadges>
      </CardImage>
      
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <MaterialInfo>{material}</MaterialInfo>
        
        <CardDetails>
          <DetailItem>
            <DetailLabel>Quantity</DetailLabel>
            <DetailValue>
              {quantity.toLocaleString()} {unit}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Available From</DetailLabel>
            <DetailValue>{formattedDate}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Location</DetailLabel>
            <DetailValue>{location}</DetailValue>
          </DetailItem>
        </CardDetails>
        
        <PriceSection>
          <Price>
            <PriceValue>{formattedPrice}</PriceValue>
            <PriceUnit>per {unit}</PriceUnit>
          </Price>
          
          <Button 
            variant="primary" 
            size="small"
            as={Link}
            to={`/marketplace/${id}`}
          >
            View Details
          </Button>
        </PriceSection>
        
        <SellerInfo>
          <SellerName>
            Seller: {sellerName}
            {sellerVerified && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
          </SellerName>
        </SellerInfo>
      </CardContent>
    </CardContainer>
  );
};

export default MaterialCard; 