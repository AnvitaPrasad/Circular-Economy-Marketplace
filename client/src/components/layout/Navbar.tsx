import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import Button from '../common/Button';

interface NavbarProps {
  isLoggedIn: boolean;
  userRole?: 'company' | 'transporter' | 'admin';
  userName?: string;
  userAvatar?: string;
  onLogout: () => void;
}

const NavbarContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${theme.colors.background.paper};
  box-shadow: ${theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.xl};
  z-index: ${theme.zIndex.appBar};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: ${theme.typography.fontWeightBold};
  color: ${theme.colors.primary.main};
  text-decoration: none;
  height: 100%;
  
  img {
    height: 40px;
    margin-right: ${theme.spacing.sm};
  }
  
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.2;
    
    small {
      font-size: 0.7rem;
      color: ${theme.colors.text.secondary};
      font-weight: ${theme.typography.fontWeightRegular};
      letter-spacing: 0.05rem;
      margin-top: -2px;
      line-height: 1;
    }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.25rem;
    
    img {
      height: 32px;
    }
    
    span small {
      display: none;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  margin-right: ${theme.spacing.lg};
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? theme.colors.primary.main : theme.colors.text.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  position: relative;
  font-weight: ${props => props.$isActive ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$isActive ? '80%' : '0'};
    height: 2px;
    background-color: ${theme.colors.primary.main};
    transition: width 0.3s ${theme.transitions.easing.easeInOut};
  }
  
  &:hover::after {
    width: 80%;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div<{ $image?: string }>`
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.round};
  background-color: ${theme.colors.primary.light};
  background-image: ${props => props.$image ? `url(${props.$image})` : 'none'};
  background-size: cover;
  background-position: center;
  margin-right: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary.contrastText};
  font-weight: ${theme.typography.fontWeightMedium};
  cursor: pointer;
`;

const UserName = styled.span`
  margin-right: ${theme.spacing.md};
  font-weight: ${theme.typography.fontWeightMedium};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 8px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const HamburgerIcon = styled.div<{ $isOpen: boolean }>`
  position: relative;
  width: 100%;
  height: 2px;
  background-color: ${props => props.$isOpen ? 'transparent' : theme.colors.text.primary};
  transition: all 0.3s ${theme.transitions.easing.easeInOut};
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${theme.colors.text.primary};
    transition: all 0.3s ${theme.transitions.easing.easeInOut};
  }
  
  &::before {
    top: ${props => props.$isOpen ? '0' : '-8px'};
    transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'rotate(0)'};
  }
  
  &::after {
    bottom: ${props => props.$isOpen ? '0' : '-8px'};
    transform: ${props => props.$isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background-color: ${theme.colors.background.paper};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.md};
  z-index: ${theme.zIndex.appBar - 1};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  display: block;
  color: ${props => props.$isActive ? theme.colors.primary.main : theme.colors.text.primary};
  padding: ${theme.spacing.md};
  font-weight: ${props => props.$isActive ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular};
  border-bottom: 1px solid ${theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`;

const MobileUserSection = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border.light};
`;

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/supply-chains', label: 'Supply Chains' },
  { to: '/about', label: 'About' }
];

const companyLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/my-listings', label: 'My Listings' },
  { to: '/transactions', label: 'Transactions' }
];

const transporterLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/my-routes', label: 'My Routes' },
  { to: '/shipments', label: 'Shipments' }
];

const adminLinks = [
  { to: '/admin', label: 'Admin Panel' },
  { to: '/users', label: 'Users' },
  { to: '/stats', label: 'Statistics' }
];

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  userRole = 'company',
  userName = '',
  userAvatar,
  onLogout
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Get the first letter of the username for the avatar
  const userInitial = userName ? userName.charAt(0).toUpperCase() : '';
  
  // Get role-specific links
  const getRoleLinks = () => {
    if (userRole === 'admin') return adminLinks;
    if (userRole === 'transporter') return transporterLinks;
    return companyLinks;
  };
  
  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <>
      <NavbarContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          height: scrolled ? '60px' : '70px',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.97)' : theme.colors.background.paper
        }}
      >
        <Logo to="/">
          <img src="/eco-logo.svg" alt="Logo" />
          <span>
            Circular<strong>Eco</strong>
            <small>Materials Marketplace</small>
          </span>
        </Logo>
        
        <Nav>
          <NavLinks>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                $isActive={location.pathname === link.to}
              >
                {link.label}
              </NavLink>
            ))}
            
            {isLoggedIn && getRoleLinks().map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                $isActive={location.pathname === link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </NavLinks>
          
          {isLoggedIn ? (
            <UserSection>
              <UserAvatar $image={userAvatar}>
                {!userAvatar && userInitial}
              </UserAvatar>
              <UserName>{userName}</UserName>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={onLogout}
              >
                Logout
              </Button>
            </UserSection>
          ) : (
            <div>
              <Button 
                size="small" 
                variant="text" 
                as={Link} 
                to="/login" 
                style={{ marginRight: theme.spacing.sm }}
              >
                Login
              </Button>
              <Button 
                size="small" 
                variant="primary" 
                as={Link} 
                to="/register"
              >
                Register
              </Button>
            </div>
          )}
        </Nav>
        
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <HamburgerIcon $isOpen={isMenuOpen} />
        </MenuButton>
      </NavbarContainer>
      
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoggedIn && (
              <MobileUserSection>
                <UserAvatar $image={userAvatar}>
                  {!userAvatar && userInitial}
                </UserAvatar>
                <UserName>{userName}</UserName>
              </MobileUserSection>
            )}
            
            {navLinks.map(link => (
              <MobileNavLink
                key={link.to}
                to={link.to}
                $isActive={location.pathname === link.to}
              >
                {link.label}
              </MobileNavLink>
            ))}
            
            {isLoggedIn && getRoleLinks().map(link => (
              <MobileNavLink
                key={link.to}
                to={link.to}
                $isActive={location.pathname === link.to}
              >
                {link.label}
              </MobileNavLink>
            ))}
            
            {isLoggedIn ? (
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={onLogout} 
                style={{ marginTop: theme.spacing.md }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outlined" 
                  fullWidth 
                  style={{ marginTop: theme.spacing.md }}
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary" 
                  fullWidth 
                  style={{ marginTop: theme.spacing.sm }}
                >
                  Register
                </Button>
              </>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 