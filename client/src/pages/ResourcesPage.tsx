import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../components/common/PageTitle';
import Card from '../components/common/Card';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const ResourceCard = styled(motion.div)`
  height: 100%;
`;

const CardLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  display: block;
  height: 100%;
  cursor: pointer;
  /* Force page to render properly */
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.2s linear;
  
  &:active, &:focus {
    outline: none;
    text-decoration: none;
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardImage = styled.div<{ $bgColor: string }>`
  height: 160px;
  background-color: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
`;

const CardTitle = styled.h3`
  margin: ${({ theme }) => theme.spacing(2)} 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  
  &::after {
    content: "→";
    margin-left: ${({ theme }) => theme.spacing(1)};
    transition: transform 0.2s;
  }
  
  ${CardLink}:hover &::after {
    transform: translateX(4px);
  }
`;

const resources = [
  {
    title: "Blog",
    icon: "📝",
    description: "Where we pretend to know what we're talking about while using buzzwords like 'synergy' and 'blockchain'.",
    link: "/blog",
    color: "#FF5722"
  },
  {
    title: "Case Studies",
    icon: "🔍",
    description: "Made-up success stories that definitely weren't written by our marketing team at 4am before a deadline.",
    link: "/case-studies",
    color: "#2196F3"
  },
  {
    title: "Policies",
    icon: "📋",
    description: "Regulations we found online that sound important but we've never actually read ourselves.",
    link: "/policies",
    color: "#673AB7"
  },
  {
    title: "Sustainability Guide",
    icon: "🌱",
    description: "Tips on how to feel good about yourself while still buying way too much stuff you don't need.",
    link: "/sustainability-guide",
    color: "#4CAF50",
    forceReload: true
  },
  {
    title: "FAQ",
    icon: "❓",
    description: "Questions nobody actually asks, answered in a way that makes our lawyers happy.",
    link: "/faq",
    color: "#9C27B0",
    forceReload: true
  },
  {
    title: "Support Center",
    icon: "🆘",
    description: "Where your tickets go to die. Try turning it off and on again while we're busy ignoring you.",
    link: "/support",
    color: "#F44336",
    forceReload: true
  },
  {
    title: "Terms of Service",
    icon: "📜",
    description: "A novel-length document written to ensure you click 'I Agree' without reading a single word.",
    link: "/terms",
    color: "#607D8B",
    forceReload: true
  },
  {
    title: "Privacy Policy",
    icon: "🔒",
    description: "Our creative fiction about how we 'value your privacy' while selling your data to literally everyone.",
    link: "/privacy",
    color: "#795548"
  },
  {
    title: "Cookie Policy",
    icon: "🍪",
    description: "We track everything you do online but hey, at least you get this annoying popup about it!",
    link: "/cookies",
    color: "#FFC107",
    forceReload: true
  },
  {
    title: "Sitemap",
    icon: "🗺️",
    description: "A detailed map of our website that nobody has looked at since 2005, including our developers.",
    link: "/sitemap",
    color: "#009688"
  }
];

const ResourcesPage: React.FC = () => {
  const navigate = useNavigate();

  // Ensure everything is fully rendered
  React.useEffect(() => {
    // Force repaint after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle links with React Router or direct navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, forceReload = false) => {
    e.preventDefault();
    
    if (forceReload) {
      // For problematic pages, use a hard navigation
      window.location.href = path;
    } else {
      // For normal pages, use React Router
      navigate(path);
    }
  };
  
  return (
    <PageContainer>
      <PageTitle subtitle="Everything you never knew you didn't need to know">Resources</PageTitle>
      
      <ResourceGrid>
        {resources.map((resource, index) => (
          <ResourceCard 
            key={index}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CardLink 
              href={resource.link}
              onClick={(e) => handleLinkClick(e, resource.link, resource.forceReload)}
            >
              <Card elevation="low">
                <div style={{ height: "100%" }}>
                  <CardImage $bgColor={resource.color}>
                    {resource.icon}
                  </CardImage>
                  <CardContent>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                    <CardFooter>Browse {resource.title}</CardFooter>
                  </CardContent>
                </div>
              </Card>
            </CardLink>
          </ResourceCard>
        ))}
      </ResourceGrid>
    </PageContainer>
  );
};

export default ResourcesPage; 