import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary.dark};
  color: ${theme.colors.primary.contrastText};
  padding: ${theme.spacing.xl} 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: ${theme.typography.fontWeightBold};
  color: ${theme.colors.primary.contrastText};
  text-decoration: none;
  margin-bottom: ${theme.spacing.md};
  
  img {
    height: 40px;
    margin-right: ${theme.spacing.sm};
  }
`;

const FooterHeading = styled.h4`
  font-size: 1.125rem;
  font-weight: ${theme.typography.fontWeightBold};
  margin-bottom: ${theme.spacing.md};
  position: relative;
  padding-bottom: ${theme.spacing.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: ${theme.colors.accent.main};
  }
`;

const FooterText = styled.p`
  color: ${theme.colors.neutral.medium};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.6;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: ${theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.neutral.medium};
  text-decoration: none;
  transition: color 0.2s ${theme.transitions.easing.easeInOut};
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${theme.colors.accent.main};
  }
`;

const SocialMediaLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.sm};
`;

const SocialMediaIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.round};
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.primary.contrastText};
  transition: background-color 0.2s ${theme.transitions.easing.easeInOut};
  font-size: 1.25rem;
  
  &:hover {
    background-color: ${theme.colors.accent.main};
    color: ${theme.colors.accent.contrastText};
  }
`;

const BottomFooter = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.lg} 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${theme.colors.neutral.medium};
`;

const BottomLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const BottomLink = styled(Link)`
  color: ${theme.colors.neutral.medium};
  text-decoration: none;
  transition: color 0.2s ${theme.transitions.easing.easeInOut};
  font-size: 0.85rem;
  
  &:hover {
    color: ${theme.colors.accent.main};
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo to="/">
            <img src="/eco-logo-light.svg" alt="Logo" />
            CircularEco
          </FooterLogo>
          <FooterText>
            Connecting industries to transform waste into resources,
            creating a sustainable circular economy for a greener future.
          </FooterText>
          <SocialMediaLinks>
            <SocialMediaIcon 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-x-twitter"></i>
            </SocialMediaIcon>
            <SocialMediaIcon 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-linkedin-in"></i>
            </SocialMediaIcon>
            <SocialMediaIcon 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-facebook-f"></i>
            </SocialMediaIcon>
            <SocialMediaIcon 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-instagram"></i>
            </SocialMediaIcon>
          </SocialMediaLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink to="/marketplace">Material Marketplace</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/supply-chains">Supply Chains</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/transport">Transport Solutions</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/dashboard">Dashboard</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/about">About Us</FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Resources</FooterHeading>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink to="/blog">Blog</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/case-studies">Case Studies</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/sustainability">Sustainability Guide</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/faq">FAQ</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/support">Support Center</FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Contact Us</FooterHeading>
          <FooterText>
            IIITDM Kancheepuram<br />
            Eco City, EC 12345<br />
            anvita.prasad1@gmail.com<br />
            +91 9113553975
          </FooterText>
          <FooterText>
            <strong>Working Hours:</strong><br />
            Monday - Friday: 9AM - 5PM<br />
            Saturday: 10AM - 2PM<br />
            Sunday: Closed
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <BottomFooter>
        <Copyright>
          &copy; {currentYear} CircularEco. All rights reserved.
        </Copyright>
        <BottomLinks>
          <BottomLink to="/terms">Terms of Service</BottomLink>
          <BottomLink to="/privacy">Privacy Policy</BottomLink>
          <BottomLink to="/cookies">Cookie Policy</BottomLink>
          <BottomLink to="/sitemap">Sitemap</BottomLink>
        </BottomLinks>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer; 