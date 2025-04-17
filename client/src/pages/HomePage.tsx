import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 2rem;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9fa;
  transition: all 0.5s ease-in-out;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 700;
  margin-bottom: 1.5rem;
  max-width: 800px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2.5rem;
  max-width: 700px;
  line-height: 1.6;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;
`;

const Button = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const OutlineButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.main};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light}20;
  }
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
  min-width: 150px;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FeaturesSection = styled.section`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: 4rem 2rem;
  position: relative;
  z-index: 1;
  scroll-margin-top: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const FeatureIcon = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.light}20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary.main};
`;

const FeatureContent = styled.div`
  padding: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const CTASection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
  scroll-margin-top: 60px;
`;

const CTATitle = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  color: white;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: ${({ theme }) => theme.colors.primary.main};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

// Function to load scripts
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

const HomePage: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [vantaInitialized, setVantaInitialized] = useState(false);
  
  // Load required scripts
  useEffect(() => {
    const loadRequiredScripts = async () => {
      try {
        console.log('Starting to load scripts for Vanta.js');
        
        // Load THREE.js if not already loaded
        if (!window.THREE) {
          console.log('Loading THREE.js');
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        } else {
          console.log('THREE.js already loaded');
        }
        
        // Load Vanta.js if not already loaded
        if (!window.VANTA) {
          console.log('Loading Vanta.js WAVES effect');
          await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js');
        } else {
          console.log('Vanta.js already loaded');
        }
        
        console.log('Scripts loaded successfully');
        setScriptsLoaded(true);
      } catch (error) {
        console.error('Failed to load scripts:', error);
      }
    };
    
    loadRequiredScripts();
    
    // Add listener to check when Vanta effect is actually visible
    const checkVantaVisibility = () => {
      const bgElement = document.getElementById('vanta-bg');
      if (bgElement) {
        console.log('Vanta background element properties:', {
          width: bgElement.offsetWidth,
          height: bgElement.offsetHeight,
          visible: bgElement.offsetWidth > 0 && bgElement.offsetHeight > 0,
          style: window.getComputedStyle(bgElement)
        });
      }
    };
    
    window.addEventListener('load', checkVantaVisibility);
    const timer = setTimeout(checkVantaVisibility, 1500);
    
    return () => {
      window.removeEventListener('load', checkVantaVisibility);
      clearTimeout(timer);
    };
  }, []);
  
  // Initialize Vanta effect once scripts are loaded
  useEffect(() => {
    if (scriptsLoaded && vantaRef.current && window.VANTA && !vantaInitialized) {
      console.log('Preparing to initialize Vanta effect');
      
      // Add delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        console.log('Initializing Vanta effect on element:', vantaRef.current);
        
        try {
          const vantaEffect = window.VANTA.WAVES({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 800.00,
            minWidth: 800.00,
            scale: 1.00,
            color: '#81C784',
            shininess: 15,
            waveHeight: 12,
            waveSpeed: 0.5,
            zoom: 1.0
          });
          
          setVantaInitialized(true);
          
          // Store the effect in a ref to prevent it from being destroyed prematurely
          return () => {
            if (vantaEffect) {
              console.log('Destroying Vanta effect');
              vantaEffect.destroy();
              setVantaInitialized(false);
            }
          };
        } catch (error) {
          console.error('Error initializing Vanta:', error);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [scriptsLoaded, vantaInitialized]);
  
  // Add scroll animation
  const featuresRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Handle smooth scrolling to sections
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground ref={vantaRef} id="vanta-bg" />
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Building a Sustainable Future through Circular Economy
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Connect with businesses to buy, sell, and exchange recovered materials. 
            Create closed-loop supply chains and reduce waste through our innovative marketplace.
          </HeroSubtitle>
          
          <ButtonContainer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button to="/marketplace">Explore Marketplace</Button>
            <OutlineButton to="/register">Create Account</OutlineButton>
          </ButtonContainer>
          
          <StatsContainer
            ref={statsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <StatItem>
              <StatNumber>1,500+</StatNumber>
              <StatLabel>Materials Listed</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>350+</StatNumber>
              <StatLabel>Companies</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>12K+</StatNumber>
              <StatLabel>Tons Recycled</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>30%</StatNumber>
              <StatLabel>Cost Savings</StatLabel>
            </StatItem>
          </StatsContainer>
          
          <motion.div 
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            onClick={scrollToFeatures}
            style={{ 
              cursor: 'pointer', 
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#555' }}>
              Scroll to learn more
            </div>
            <div style={{ fontSize: '1.5rem', color: '#555' }}>
              ↓
            </div>
          </motion.div>
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection ref={featuresRef}>
        <SectionTitle>How It Works</SectionTitle>
        <FeaturesGrid>
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeatureIcon>🔄</FeatureIcon>
            <FeatureContent>
              <FeatureTitle>List Recovered Materials</FeatureTitle>
              <FeatureDescription>
                List your recoverable waste, by-products, or excess materials on our marketplace for others to discover and purchase.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Find Sustainable Materials</FeatureTitle>
              <FeatureDescription>
                Search for recovered materials that meet your specifications, reducing your reliance on virgin resources.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeatureIcon>🤝</FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Build Supply Chains</FeatureTitle>
              <FeatureDescription>
                Create circular supply chains by connecting with other businesses to exchange materials and resources.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeatureIcon>📊</FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Track Impact</FeatureTitle>
              <FeatureDescription>
                Measure and report on your environmental impact, including waste reduction, carbon savings, and more.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeatureIcon>🚚</FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Arrange Transport</FeatureTitle>
              <FeatureDescription>
                Connect with logistics providers to facilitate the movement of materials between businesses.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeatureIcon>💰</FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Save Costs</FeatureTitle>
              <FeatureDescription>
                Reduce disposal costs for waste materials and lower procurement costs for recovered resources.
              </FeatureDescription>
            </FeatureContent>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <CTASection>
        <CTATitle>Ready to Join the Circular Economy?</CTATitle>
        <CTADescription>
          Register today and start connecting with businesses committed to 
          sustainability and resource efficiency.
        </CTADescription>
        <CTAButton to="/register">Create Your Account</CTAButton>
      </CTASection>
    </PageContainer>
  );
};

// Add TypeScript interface for the window object to include VANTA and THREE
declare global {
  interface Window {
    VANTA: {
      CELLS: (options: any) => any;
      WAVES: (options: any) => any;
      [key: string]: any;
    };
    THREE: any;
  }
}

export default HomePage; 