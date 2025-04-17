import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

// This is a wrapper component to ensure SPA routing works correctly
const Link: React.FC<LinkProps> = ({ to, children, ...props }) => {
  // Handle click to prevent default if needed
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
    
    // If it's an external link or has a file extension, let it behave normally
    if (typeof to === 'string' && (to.startsWith('http') || to.includes('.'))) {
      return;
    }
    
    // For relative links, prevent default and use router navigation
    e.preventDefault();
    
    // Use history API to avoid full page reload
    window.history.pushState({}, '', to.toString());
    
    // Dispatch a popstate event to trigger route change
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <RouterLink to={to} {...props} onClick={handleClick}>
      {children}
    </RouterLink>
  );
};

export default Link; 