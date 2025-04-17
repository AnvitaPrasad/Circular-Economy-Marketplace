import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Mock data - Replace with API call in production
const mockSupplyChains = [
  {
    id: 1,
    name: 'Plastic Recycling Loop',
    description: 'Closed-loop supply chain for recycled plastics from collection to manufacturing.',
    participants: 8,
    materials: ['HDPE', 'PET', 'PP'],
    carbonSaved: '2,500 tons CO2e',
    status: 'active'
  },
  {
    id: 2,
    name: 'Textile Recovery Network',
    description: 'Collaborative supply chain for textile waste recovery and reuse.',
    participants: 12,
    materials: ['Cotton', 'Polyester', 'Nylon'],
    carbonSaved: '1,800 tons CO2e',
    status: 'active'
  },
  {
    id: 3,
    name: 'Construction Materials Exchange',
    description: 'Regional network for reusing and recycling construction and demolition waste.',
    participants: 15,
    materials: ['Concrete', 'Wood', 'Metal'],
    carbonSaved: '3,200 tons CO2e',
    status: 'active'
  },
  {
    id: 4,
    name: 'Electronics Takeback System',
    description: 'Reverse logistics system for electronics recovery and component reuse.',
    participants: 6,
    materials: ['PCBs', 'Precious Metals', 'Plastics'],
    carbonSaved: '950 tons CO2e',
    status: 'planning'
  }
];

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  line-height: 1.6;
`;

const ChainCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: 2rem;
`;

const ChainHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 1.5rem;
  color: white;
`;

const ChainName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ChainDetails = styled.div`
  padding: 1.5rem;
`;

const ChainDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ChainStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
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
`;

const VisualizationSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const VisualizationTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const SupplyChainDiagram = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  overflow-x: auto;
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

const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.info}10;
  border-left: 4px solid ${({ theme }) => theme.colors.info};
  padding: 1rem;
  margin-top: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.info};
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

const SupplyChainsPage: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState(mockSupplyChains[0]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [currentChain, setCurrentChain] = useState<typeof mockSupplyChains[0] | null>(null);
  
  // Function to handle view details button
  const handleViewDetails = (chainId: number) => {
    // In a real app, this would navigate to a detailed view of the supply chain
    navigate(`/supply-chains/${chainId}`);
  };
  
  // Function to handle join chain button
  const handleJoinChain = (chain: typeof mockSupplyChains[0]) => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/login?redirect=/supply-chains');
      return;
    }
    
    setCurrentChain(chain);
    setShowJoinModal(true);
    
    // For demo purposes, just show an alert
    alert(`You have requested to join the "${chain.name}" supply chain. The administrator will review your request.`);
  };
  
  // Function to create a new supply chain
  const handleCreateSupplyChain = () => {
    if (!isLoggedIn) {
      navigate('/login?redirect=/supply-chains/create');
      return;
    }
    
    // For demo purposes, just show an alert
    alert('Supply chain creation form will be added soon!');
  };
  
  return (
    <PageContainer>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Circular Supply Chains</Title>
          <Subtitle>
            Connect with companies across industries to create closed-loop supply chains,
            track material flows, and measure environmental impact.
          </Subtitle>
        </motion.div>
      </Header>
      
      {mockSupplyChains.map((chain) => (
        <ChainCard 
          key={chain.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChainHeader>
            <ChainName>{chain.name}</ChainName>
            <StatusBadge status={chain.status}>
              {chain.status === 'active' ? 'Active' : 'Planning Phase'}
            </StatusBadge>
          </ChainHeader>
          
          <ChainDetails>
            <ChainDescription>{chain.description}</ChainDescription>
            
            <ChainStats>
              <StatItem>
                <StatLabel>Participants</StatLabel>
                <StatValue>{chain.participants} companies</StatValue>
              </StatItem>
              
              <StatItem>
                <StatLabel>Carbon Saved</StatLabel>
                <StatValue>{chain.carbonSaved}</StatValue>
              </StatItem>
            </ChainStats>
            
            <StatLabel>Materials</StatLabel>
            <MaterialsList>
              {chain.materials.map((material, index) => (
                <MaterialTag key={index}>{material}</MaterialTag>
              ))}
            </MaterialsList>
            
            <VisualizationSection>
              <VisualizationTitle>Supply Chain Flow</VisualizationTitle>
              
              <SupplyChainDiagram>
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
              </SupplyChainDiagram>
            </VisualizationSection>
            
            <ButtonsContainer>
              <Button onClick={() => handleViewDetails(chain.id)}>View Details</Button>
              <OutlineButton onClick={() => handleJoinChain(chain)}>Join Chain</OutlineButton>
            </ButtonsContainer>
          </ChainDetails>
        </ChainCard>
      ))}
      
      <InfoBox>
        <InfoTitle>Create a New Supply Chain</InfoTitle>
        <InfoText>
          Have a circular economy initiative in mind? Start a new supply chain to connect with 
          potential partners and create closed-loop material flows. Our platform helps with 
          planning, coordination, and impact measurement.
        </InfoText>
        <ButtonsContainer>
          <OutlineButton onClick={handleCreateSupplyChain}>Create Supply Chain</OutlineButton>
        </ButtonsContainer>
      </InfoBox>
    </PageContainer>
  );
};

export default SupplyChainsPage; 