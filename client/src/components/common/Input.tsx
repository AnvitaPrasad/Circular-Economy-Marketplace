import React, { InputHTMLAttributes, useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

type InputSize = 'small' | 'medium' | 'large';
type InputVariant = 'outlined' | 'filled' | 'standard';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  error?: string;
  success?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  helperText?: string;
}

// Size styles
const getSizeStyles = (size: InputSize) => {
  switch (size) {
    case 'small':
      return css`
        height: 36px;
        font-size: 0.75rem;
      `;
    case 'large':
      return css`
        height: 56px;
        font-size: 1rem;
      `;
    default: // medium
      return css`
        height: 48px;
        font-size: 0.875rem;
      `;
  }
};

// Variant styles
const getVariantStyles = (variant: InputVariant, hasError: boolean, isSuccess: boolean) => {
  const errorColor = theme.colors.feedback.error;
  const successColor = theme.colors.feedback.success;
  const borderColor = hasError 
    ? errorColor 
    : isSuccess 
      ? successColor 
      : theme.colors.border.main;
  
  switch (variant) {
    case 'filled':
      return css`
        background-color: ${theme.colors.neutral.light};
        border-bottom: 2px solid ${borderColor};
        border-radius: ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0 0;
        
        &:focus-within {
          background-color: ${theme.colors.background.paper};
          border-bottom-color: ${hasError 
            ? errorColor 
            : isSuccess 
              ? successColor 
              : theme.colors.primary.main};
        }
      `;
    case 'standard':
      return css`
        background-color: transparent;
        border-bottom: 1px solid ${borderColor};
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        
        &:focus-within {
          border-bottom: 2px solid ${hasError 
            ? errorColor 
            : isSuccess 
              ? successColor 
              : theme.colors.primary.main};
        }
      `;
    default: // outlined
      return css`
        background-color: ${theme.colors.background.paper};
        border: 1px solid ${borderColor};
        border-radius: ${theme.borderRadius.md};
        
        &:focus-within {
          border: 2px solid ${hasError 
            ? errorColor 
            : isSuccess 
              ? successColor 
              : theme.colors.primary.main};
          padding: calc(0.75rem - 1px) calc(1rem - 1px);
        }
      `;
  }
};

const InputContainer = styled.div<{
  $fullWidth: boolean;
  $error: boolean;
  $success: boolean;
}>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  margin-bottom: ${props => (props.$error || props.$success) ? '1.5rem' : '1rem'};
`;

const InputWrapper = styled.div<{
  $variant: InputVariant;
  $size: InputSize;
  $hasLabel: boolean;
  $error: boolean;
  $success: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  transition: all 0.2s ${theme.transitions.easing.easeInOut};
  
  ${props => getSizeStyles(props.$size)}
  ${props => getVariantStyles(props.$variant, props.$error, props.$success)}
`;

const StyledInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: ${theme.typography.fontFamily};
  color: ${theme.colors.text.primary};
  font-size: inherit;
  
  &::placeholder {
    color: ${theme.colors.text.hint};
    opacity: 1;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const InputLabel = styled.label<{
  $size: InputSize;
  $error: boolean;
  $success: boolean;
  $isFocused: boolean;
  $hasValue: boolean;
}>`
  position: absolute;
  top: ${props => (props.$isFocused || props.$hasValue) ? '-0.5rem' : '50%'};
  left: 1rem;
  transform: translateY(${props => (props.$isFocused || props.$hasValue) ? '0' : '-50%'});
  font-size: ${props => (props.$isFocused || props.$hasValue) ? '0.75rem' : 'inherit'};
  color: ${props => {
    if (props.$error) return theme.colors.feedback.error;
    if (props.$success) return theme.colors.feedback.success;
    if (props.$isFocused) return theme.colors.primary.main;
    return theme.colors.text.secondary;
  }};
  background-color: ${props => (props.$isFocused || props.$hasValue) ? theme.colors.background.paper : 'transparent'};
  padding: 0 0.25rem;
  transition: all 0.2s ${theme.transitions.easing.easeInOut};
  pointer-events: none;
  z-index: 1;
`;

const HelperText = styled.p<{ $error: boolean; $success: boolean }>`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${props => {
    if (props.$error) return theme.colors.feedback.error;
    if (props.$success) return theme.colors.feedback.success;
    return theme.colors.text.secondary;
  }};
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartIconWrapper = styled(IconWrapper)`
  margin-right: 0.5rem;
`;

const EndIconWrapper = styled(IconWrapper)`
  margin-left: 0.5rem;
`;

const Input: React.FC<InputProps> = ({
  label,
  variant = 'outlined',
  size = 'medium',
  fullWidth = false,
  error,
  success = false,
  startIcon,
  endIcon,
  helperText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  // Update hasValue state when value changes
  useEffect(() => {
    setHasValue(!!props.value);
  }, [props.value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <InputContainer $fullWidth={fullWidth} $error={!!error} $success={success}>
      <InputWrapper
        $variant={variant}
        $size={size}
        $hasLabel={!!label}
        $error={!!error}
        $success={success}
        as={motion.div}
        whileTap={{ scale: 0.99 }}
        onClick={() => inputRef.current?.focus()}
      >
        {startIcon && <StartIconWrapper>{startIcon}</StartIconWrapper>}
        
        <StyledInput
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {label && (
          <InputLabel
            $size={size}
            $error={!!error}
            $success={success}
            $isFocused={isFocused}
            $hasValue={hasValue}
          >
            {label}
          </InputLabel>
        )}
        
        {endIcon && <EndIconWrapper>{endIcon}</EndIconWrapper>}
      </InputWrapper>
      
      {(helperText || error) && (
        <HelperText $error={!!error} $success={success}>
          {error || helperText}
        </HelperText>
      )}
    </InputContainer>
  );
};

export default Input; 