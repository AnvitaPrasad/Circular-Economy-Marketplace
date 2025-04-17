import React from 'react';
import styled from 'styled-components';

interface PageTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const TitleContainer = styled.div<{ align: string }>`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: ${props => props.align};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const PageTitle: React.FC<PageTitleProps> = ({ 
  children, 
  subtitle, 
  align = 'left',
  className 
}) => {
  return (
    <TitleContainer align={align} className={className}>
      <Title>{children}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </TitleContainer>
  );
};

export default PageTitle; 