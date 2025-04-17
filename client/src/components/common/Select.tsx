import React, { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const SelectContainer = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StyledSelect = styled.select<{ $size: string; $hasError: boolean }>`
  appearance: none;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.error.main : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  font-family: inherit;
  outline: none;
  position: relative;
  transition: all 0.2s;
  width: 100%;
  
  /* Size variations */
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.375rem 2rem 0.375rem 0.75rem';
      case 'large': return '0.75rem 2rem 0.75rem 0.75rem';
      default: return '0.5rem 2rem 0.5rem 0.75rem';
    }
  }};
  
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.875rem';
      case 'large': return '1.125rem';
      default: return '1rem';
    }
  }};
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${({ theme }) => theme.colors.text.secondary};
    pointer-events: none;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: 0.75rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  fullWidth = false,
  size = 'medium',
  ...props
}) => {
  return (
    <SelectContainer $fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <SelectWrapper>
        <StyledSelect $size={size} $hasError={!!error} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </SelectWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectContainer>
  );
};

export default Select; 