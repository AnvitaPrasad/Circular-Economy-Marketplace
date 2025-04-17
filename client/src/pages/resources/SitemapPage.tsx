import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import PageTitle from '../../components/common/PageTitle';

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const MotionContainer = styled(motion.div)`
  width: 100%;
`;

const SitemapSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
  }

  &::before {
    content: "→";
    margin-right: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

// Regular pages
const mainPages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Marketplace', path: '/marketplace' },
  { name: 'Supply Chains', path: '/supply-chains' },
];

// User-related pages
const userPages = [
  { name: 'Login', path: '/login' },
  { name: 'Register', path: '/register' },
  { name: 'Profile', path: '/profile' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Listings', path: '/my-listings' },
  { name: 'Create Listing', path: '/create-listing' },
  { name: 'Transactions', path: '/transactions' },
];

// Resource pages
const resourcePages = [
  { name: 'Resources Overview', path: '/resources' },
  { name: 'Blog', path: '/blog' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Policies', path: '/policies' },
  { name: 'Sustainability Guide', path: '/sustainability-guide' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Support Center', path: '/support' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Terms (Simple Version)', path: '/terms-simple' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Cookie Policy', path: '/cookies' },
];

const SitemapPage: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.location.href = path;
    
    // Force a reload for reliable page loading
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="The map no one asked for">Sitemap</PageTitle>
        
        <SitemapSection>
          <SectionTitle>Main Pages</SectionTitle>
          <LinkList>
            {mainPages.map((page, index) => (
              <LinkItem key={index}>
                <StyledLink 
                  href={page.path}
                  onClick={(e) => handleLinkClick(e, page.path)}
                >
                  {page.name}
                </StyledLink>
              </LinkItem>
            ))}
          </LinkList>
        </SitemapSection>
        
        <SitemapSection>
          <SectionTitle>User Pages</SectionTitle>
          <LinkList>
            {userPages.map((page, index) => (
              <LinkItem key={index}>
                <StyledLink 
                  href={page.path}
                  onClick={(e) => handleLinkClick(e, page.path)}
                >
                  {page.name}
                </StyledLink>
              </LinkItem>
            ))}
          </LinkList>
        </SitemapSection>
        
        <SitemapSection>
          <SectionTitle>Resource Pages</SectionTitle>
          <LinkList>
            {resourcePages.map((page, index) => (
              <LinkItem key={index}>
                <StyledLink 
                  href={page.path}
                  onClick={(e) => handleLinkClick(e, page.path)}
                >
                  {page.name}
                </StyledLink>
              </LinkItem>
            ))}
          </LinkList>
        </SitemapSection>
      </PageContainer>
    </MotionContainer>
  );
};

export default SitemapPage; 