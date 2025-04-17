import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Mock data - would be fetched from API in production
const mockSupplyChains = [
  {
    id: 1,
    name: 'Plastic Recycling Loop',
    description: 'Closed-loop supply chain for recycled plastics from collection to manufacturing.',
    longDescription: 'Our plastic recycling loop creates a fully circular system for plastic waste. We connect collection points, sorting facilities, recyclers, and manufacturers to ensure that plastic materials remain in use for as long as possible. This reduces the need for virgin plastic production and keeps valuable materials out of landfills and oceans.',
    participants: 8,
    companies: [
      { id: 1, name: 'EcoRecycle Ltd', role: 'Collection & Sorting' },
      { id: 2, name: 'PlastiPure Processing', role: 'Recycling' },
      { id: 3, name: 'GreenMold Manufacturing', role: 'Manufacturing' },
      { id: 4, name: 'CircularPackaging Co', role: 'End Product Manufacturing' },
      { id: 5, name: 'RetailRevolution', role: 'Distribution' }
    ],
    materials: ['HDPE', 'PET', 'PP'],
    carbonSaved: '2,500 tons CO2e',
    wasteRecycled: '1,200 tons',
    energySaved: '45,000 kWh',
    waterSaved: '12 million liters',
    status: 'active',
    createdAt: '2023-02-15',
    admin: 'EcoRecycle Ltd',
    location: 'Western Europe',
    certifications: ['ISO 14001', 'Circular Economy Standard 1.0'],
    nextMeeting: '2025-05-20'
  },
  {
    id: 2,
    name: 'Textile Recovery Network',
    description: 'Collaborative supply chain for textile waste recovery and reuse.',
    longDescription: 'The Textile Recovery Network brings together fashion brands, recyclers, and manufacturers to transform textile waste into new products. By implementing advanced sorting and fiber recycling technologies, we can recover valuable materials from end-of-life textiles and reintroduce them into the supply chain.',
    participants: 12,
    companies: [
      { id: 6, name: 'FashionForward', role: 'Collection' },
      { id: 7, name: 'FiberSort Technologies', role: 'Sorting & Processing' },
      { id: 8, name: 'TextileInnovate', role: 'Fiber Recycling' },
      { id: 9, name: 'EcoFabrics', role: 'Yarn & Fabric Production' }
    ],
    materials: ['Cotton', 'Polyester', 'Nylon'],
    carbonSaved: '1,800 tons CO2e',
    wasteRecycled: '850 tons',
    energySaved: '32,000 kWh',
    waterSaved: '28 million liters',
    status: 'active',
    createdAt: '2023-05-10',
    admin: 'FashionForward',
    location: 'Global',
    certifications: ['Global Recycled Standard', 'Textile Exchange'],
    nextMeeting: '2025-05-12'
  },
  {
    id: 3,
    name: 'Construction Materials Exchange',
    description: 'Regional network for reusing and recycling construction and demolition waste.',
    longDescription: 'Our Construction Materials Exchange creates a marketplace and logistics network for reclaiming, processing, and reusing construction and demolition waste. We work with demolition companies, processors, and builders to ensure materials like concrete, wood, and metal can be recovered and reused in new construction projects.',
    participants: 15,
    companies: [
      { id: 10, name: 'BuildReclaim', role: 'Demolition & Collection' },
      { id: 11, name: 'ConstructionRecyclers', role: 'Processing' },
      { id: 12, name: 'GreenBuild Materials', role: 'Distribution' },
      { id: 13, name: 'Sustainable Structures Inc.', role: 'Construction' }
    ],
    materials: ['Concrete', 'Wood', 'Metal'],
    carbonSaved: '3,200 tons CO2e',
    wasteRecycled: '4,500 tons',
    energySaved: '65,000 kWh',
    waterSaved: '8 million liters',
    status: 'active',
    createdAt: '2023-01-05',
    admin: 'BuildReclaim',
    location: 'Northeast Region',
    certifications: ['LEED', 'Circular Construction Standard'],
    nextMeeting: '2025-05-25'
  },
  {
    id: 4,
    name: 'Electronics Takeback System',
    description: 'Reverse logistics system for electronics recovery and component reuse.',
    longDescription: 'The Electronics Takeback System creates a pathway for recovering valuable components from used electronics. Through our network of collection points, disassembly facilities, and component recovery specialists, we can extract rare earth elements, precious metals, and reusable parts from e-waste that would otherwise end up in landfills.',
    participants: 6,
    companies: [
      { id: 14, name: 'ElectroCollect', role: 'Collection' },
      { id: 15, name: 'TechDisassembly', role: 'Processing' },
      { id: 16, name: 'RareMetals Recovery', role: 'Material Recovery' },
      { id: 17, name: 'CircuitRenew', role: 'Component Refurbishment' }
    ],
    materials: ['PCBs', 'Precious Metals', 'Plastics'],
    carbonSaved: '950 tons CO2e',
    wasteRecycled: '380 tons',
    energySaved: '28,000 kWh',
    waterSaved: '4 million liters',
    status: 'planning',
    createdAt: '2023-08-20',
    admin: 'ElectroCollect',
    location: 'National',
    certifications: ['e-Stewards', 'R2 Standard'],
    nextMeeting: '2025-05-15'
  }
];

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const MainInfo = styled.div`
  flex: 2;
`;

const SideInfo = styled.div`
  flex: 1;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 1.5rem;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const LongDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${({ status, theme }) => 
    status === 'active' ? `${theme.colors.success}20` : `${theme.colors.warning}20`};
  color: ${({ status, theme }) => 
    status === 'active' ? theme.colors.success : theme.colors.warning};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-left: 1rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: 2rem;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.25rem;
`;

const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.primary.dark};
`;

const MaterialsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const MaterialTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary.light}30;
  color: ${({ theme }) => theme.colors.primary.dark};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  display: block;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CompanyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CompanyItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background.default};
`;

const CompanyName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: 0.25rem;
`;

const CompanyRole = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin-bottom: 1.5rem;
`;

const FlowDiagram = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  overflow-x: auto;
  margin-bottom: 2rem;
`;

const DiagramNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
`;

const NodeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NodeLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

const NodeConnection = styled.div`
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  flex-grow: 1;
  margin: 0 0.5rem;
  position: relative;
  
  &::after {
    content: '→';
    position: absolute;
    top: -10px;
    right: -5px;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
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

const CertificationList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CertificationTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.info}20;
  color: ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
`;

const SupplyChainDetailPage: React.FC = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [chain, setChain] = useState<typeof mockSupplyChains[0] | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch the supply chain data from an API
    const chainId = parseInt(id || '0');
    const foundChain = mockSupplyChains.find(c => c.id === chainId);
    setChain(foundChain || null);
  }, [id]);
  
  // Handle joining the supply chain
  const handleJoinChain = () => {
    if (!isLoggedIn) {
      // Redirect to login would happen here
      alert('Please log in to join this supply chain');
      return;
    }
    
    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      alert(`You have requested to join the "${chain?.name}" supply chain. The administrator will review your request.`);
    }, 1000);
  };
  
  // Handle contacting the admin
  const handleContactAdmin = () => {
    alert(`Contact form to reach out to ${chain?.admin} will be implemented soon.`);
  };
  
  if (!chain) {
    return (
      <PageContainer>
        <BackButton to="/supply-chains">← Back to Supply Chains</BackButton>
        <Card>
          <CardContent>
            <p>Supply chain not found. Please check the URL and try again.</p>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton to="/supply-chains">← Back to Supply Chains</BackButton>
        
        <TopSection>
          <MainInfo>
            <HeaderSection>
              <Name>
                {chain.name}
                <StatusBadge status={chain.status}>
                  {chain.status === 'active' ? 'Active' : 'Planning Phase'}
                </StatusBadge>
              </Name>
              <Description>{chain.description}</Description>
              <LongDescription>{chain.longDescription}</LongDescription>
            </HeaderSection>
            
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsGrid>
                  <StatItem>
                    <StatLabel>Carbon Saved</StatLabel>
                    <StatValue>{chain.carbonSaved}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Waste Recycled</StatLabel>
                    <StatValue>{chain.wasteRecycled}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Energy Saved</StatLabel>
                    <StatValue>{chain.energySaved}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Water Saved</StatLabel>
                    <StatValue>{chain.waterSaved}</StatValue>
                  </StatItem>
                </StatsGrid>
              </CardContent>
            </Card>
            
            <Section>
              <SectionTitle>Material Flow</SectionTitle>
              <FlowDiagram>
                <DiagramNode>
                  <NodeIcon>1</NodeIcon>
                  <NodeLabel>Collection</NodeLabel>
                </DiagramNode>
                
                <NodeConnection />
                
                <DiagramNode>
                  <NodeIcon>2</NodeIcon>
                  <NodeLabel>Sorting</NodeLabel>
                </DiagramNode>
                
                <NodeConnection />
                
                <DiagramNode>
                  <NodeIcon>3</NodeIcon>
                  <NodeLabel>Processing</NodeLabel>
                </DiagramNode>
                
                <NodeConnection />
                
                <DiagramNode>
                  <NodeIcon>4</NodeIcon>
                  <NodeLabel>Manufacturing</NodeLabel>
                </DiagramNode>
                
                <NodeConnection />
                
                <DiagramNode>
                  <NodeIcon>5</NodeIcon>
                  <NodeLabel>Distribution</NodeLabel>
                </DiagramNode>
              </FlowDiagram>
            </Section>
            
            <Card>
              <CardHeader>
                <CardTitle>Partner Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <CompanyList>
                  {chain.companies.map((company) => (
                    <CompanyItem key={company.id}>
                      <CompanyName>{company.name}</CompanyName>
                      <CompanyRole>{company.role}</CompanyRole>
                    </CompanyItem>
                  ))}
                </CompanyList>
              </CardContent>
            </Card>
          </MainInfo>
          
          <SideInfo>
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Details</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoItem>
                  <InfoLabel>Materials</InfoLabel>
                  <MaterialsList>
                    {chain.materials.map((material, index) => (
                      <MaterialTag key={index}>{material}</MaterialTag>
                    ))}
                  </MaterialsList>
                </InfoItem>
                
                <InfoItem>
                  <InfoLabel>Administrator</InfoLabel>
                  <InfoValue>{chain.admin}</InfoValue>
                </InfoItem>
                
                <InfoItem>
                  <InfoLabel>Participants</InfoLabel>
                  <InfoValue>{chain.participants} companies</InfoValue>
                </InfoItem>
                
                <InfoItem>
                  <InfoLabel>Location</InfoLabel>
                  <InfoValue>{chain.location}</InfoValue>
                </InfoItem>
                
                <InfoItem>
                  <InfoLabel>Created</InfoLabel>
                  <InfoValue>{chain.createdAt}</InfoValue>
                </InfoItem>
                
                <InfoItem>
                  <InfoLabel>Next Meeting</InfoLabel>
                  <InfoValue>{chain.nextMeeting}</InfoValue>
                </InfoItem>
                
                <InfoItem>
                  <InfoLabel>Certifications</InfoLabel>
                  <CertificationList>
                    {chain.certifications.map((cert, index) => (
                      <CertificationTag key={index}>{cert}</CertificationTag>
                    ))}
                  </CertificationList>
                </InfoItem>
                
                <ButtonsContainer>
                  <Button 
                    onClick={handleJoinChain}
                    disabled={isJoining}
                  >
                    {isJoining ? 'Submitting...' : 'Join Supply Chain'}
                  </Button>
                  <OutlineButton onClick={handleContactAdmin}>
                    Contact Admin
                  </OutlineButton>
                </ButtonsContainer>
              </CardContent>
            </Card>
          </SideInfo>
        </TopSection>
      </motion.div>
    </PageContainer>
  );
};

export default SupplyChainDetailPage; 