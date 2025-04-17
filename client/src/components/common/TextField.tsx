import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const InputContainer = styled.div<{ $fullWidth: boolean }>`
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

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{
  $variant: string;
  $size: string;
  $hasError: boolean;
  $hasStartIcon: boolean;
  $hasEndIcon: boolean;
}>`
  width: 100%;
  font-family: inherit;
  background-color: ${({ $variant, theme }) => 
    $variant === 'filled' ? '#f5f5f5' : theme.colors.background.paper};
  border: ${({ $variant, $hasError, theme }) => 
    $variant === 'standard' 
      ? 'none' 
      : `1px solid ${$hasError ? theme.colors.error.main : theme.colors.border.main}`};
  border-bottom: 1px solid ${({ $hasError, theme }) => 
    $hasError ? theme.colors.error.main : theme.colors.border.main};
  border-radius: ${({ $variant, theme }) => 
    $variant === 'standard' ? '0' : theme.borderRadius.sm};
  outline: none;
  transition: all 0.2s;
  
  /* Size variations */
  padding: ${({ $size, $hasStartIcon, $hasEndIcon }) => {
    const base = {
      small: '0.4rem 0.75rem',
      medium: '0.75rem 1rem',
      large: '1rem 1.25rem'
    }[$size as string] || '0.75rem 1rem';
    
    const parts = base.split(' ');
    const paddingY = parts[0];
    const paddingX = parts[1];
    
    let paddingLeft = paddingX;
    let paddingRight = paddingX;
    
    if ($hasStartIcon) paddingLeft = '2.5rem';
    if ($hasEndIcon) paddingRight = '2.5rem';
    
    return `${paddingY} ${paddingRight} ${paddingY} ${paddingLeft}`;
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
    box-shadow: ${({ $variant }) => $variant !== 'standard' && '0 0 0 2px rgba(25, 118, 210, 0.2)'};
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

const IconContainer = styled.div<{ $position: 'start' | 'end' }>`
  position: absolute;
  top: 50%;
  ${props => props.$position === 'start' ? 'left: 0.75rem;' : 'right: 0.75rem;'}
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const HelperText = styled.span<{ $error: boolean }>`
  font-size: 0.75rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
  color: ${({ $error, theme }) => 
    $error ? theme.colors.error.main : theme.colors.text.secondary};
`;

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  variant = 'outlined',
  size = 'medium',
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  const hasError = !!error;
  const helperTextToShow = error || helperText;
  
  return (
    <InputContainer $fullWidth={fullWidth} className={className}>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {startIcon && (
          <IconContainer $position="start">
            {startIcon}
          </IconContainer>
        )}
        <StyledInput
          $variant={variant}
          $size={size}
          $hasError={hasError}
          $hasStartIcon={!!startIcon}
          $hasEndIcon={!!endIcon}
          {...props}
        />
        {endIcon && (
          <IconContainer $position="end">
            {endIcon}
          </IconContainer>
        )}
      </InputWrapper>
      {helperTextToShow && (
        <HelperText $error={hasError}>
          {helperTextToShow}
        </HelperText>
      )}
    </InputContainer>
  );
};

export default TextField; 