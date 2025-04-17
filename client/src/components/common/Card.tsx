import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  elevation?: 'flat' | 'low' | 'medium' | 'high';
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
  onClick?: () => void;
}

const getShadow = (elevation: string, theme: any) => {
  switch (elevation) {
    case 'flat':
      return 'none';
    case 'low':
      return theme.shadows.sm;
    case 'high':
      return theme.shadows.lg;
    case 'medium':
    default:
      return theme.shadows.md;
  }
};

const getBackground = (variant: string, theme: any) => {
  switch (variant) {
    case 'outlined':
      return 'transparent';
    case 'filled':
      return theme.colors.background.default;
    case 'default':
    default:
      return theme.colors.background.paper;
  }
};

const getBorder = (variant: string, theme: any) => {
  switch (variant) {
    case 'outlined':
      return `1px solid ${theme.colors.border.main}`;
    default:
      return 'none';
  }
};

const StyledCard = styled.div<{
  $elevation: string;
  $variant: string;
  $interactive: boolean;
}>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $variant, theme }) => getBackground($variant, theme)};
  box-shadow: ${({ $elevation, theme }) => getShadow($elevation, theme)};
  border: ${({ $variant, theme }) => getBorder($variant, theme)};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  
  ${({ $interactive }) => $interactive && `
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
    }
  `}
`;

const Card: React.FC<CardProps> = ({
  children,
  elevation = 'medium',
  variant = 'default',
  className,
  onClick
}) => {
  return (
    <StyledCard
      $elevation={elevation}
      $variant={variant}
      $interactive={!!onClick}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
};

export default Card; 