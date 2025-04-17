import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data - Replace with API calls in production
const mockStats = {
  totalTransactions: 24,
  activeListings: 8,
  pendingOrders: 3,
  carbonSaved: '1,250 kg CO2e',
  wasteRecycled: '3,500 kg',
  revenues: '$12,450'
};

const mockRecentTransactions = [
  {
    id: 'txn-001',
    date: '2023-09-15',
    material: 'Recycled HDPE Pellets',
    amount: '500 kg',
    value: '$600',
    status: 'completed',
    partner: 'EcoPlastics Inc.'
  },
  {
    id: 'txn-002',
    date: '2023-09-12',
    material: 'Wood Offcuts',
    amount: '200 kg',
    value: '$100',
    status: 'completed',
    partner: 'GreenWood Solutions'
  },
  {
    id: 'txn-003',
    date: '2023-09-08',
    material: 'Aluminum Scrap',
    amount: '150 kg',
    value: '$270',
    status: 'processing',
    partner: 'MetalWorks Ltd.'
  },
  {
    id: 'txn-004',
    date: '2023-09-05',
    material: 'Textile Remnants',
    amount: '75 kg',
    value: '$187.50',
    status: 'completed',
    partner: 'FabricCycle'
  }
];

const mockActiveSupplyChains = [
  {
    id: 'chain-001',
    name: 'Plastic Recycling Loop',
    role: 'Supplier',
    materials: ['HDPE', 'PP'],
    partners: 7
  },
  {
    id: 'chain-002',
    name: 'Textile Recovery Network',
    role: 'Processor',
    materials: ['Cotton', 'Polyester'],
    partners: 11
  }
];

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 0;
`;

const WelcomeMessage = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
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

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 7fr 3fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  
  &:nth-child(1) {
    border-top: 3px solid ${({ theme }) => theme.colors.primary.main};
  }
  
  &:nth-child(2) {
    border-top: 3px solid ${({ theme }) => theme.colors.secondary.main};
  }
  
  &:nth-child(3) {
    border-top: 3px solid ${({ theme }) => theme.colors.warning};
  }
  
  &:nth-child(4) {
    border-top: 3px solid ${({ theme }) => theme.colors.success};
  }
  
  &:nth-child(5) {
    border-top: 3px solid ${({ theme }) => theme.colors.info};
  }
  
  &:nth-child(6) {
    border-top: 3px solid ${({ theme }) => theme.colors.error};
  }
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.default};
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${({ status, theme }) => 
    status === 'completed' ? `${theme.colors.success}20` : `${theme.colors.warning}20`};
  color: ${({ status, theme }) => 
    status === 'completed' ? theme.colors.success : theme.colors.warning};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-transform: capitalize;
`;

const SupplyChainItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SupplyChainName = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin: 0 0 0.5rem 0;
`;

const SupplyChainDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SupplyChainDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.disabled};
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const MaterialTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const MaterialTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary.light}30;
  color: ${({ theme }) => theme.colors.primary.dark};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
`;

const ViewLink = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Handler functions for button clicks
  const handleAddListing = () => {
    navigate('/create-listing');
  };
  
  const handleViewOrders = () => {
    navigate('/transactions');
  };
  
  const handleManageSupplyChains = () => {
    navigate('/supply-chains');
  };
  
  const handleViewTransaction = (transactionId: string) => {
    navigate(`/transactions`);
  };
  
  const handleViewImpactReport = () => {
    navigate('/transactions');
  };
  
  return (
    <PageContainer>
      <Header>
        <div>
          <Title>Dashboard</Title>
          <WelcomeMessage>
            Welcome back, {user?.name || 'User'}!
          </WelcomeMessage>
        </div>
        <ActionButtons>
          <Button onClick={handleAddListing}>Add New Listing</Button>
          <OutlineButton onClick={handleViewOrders}>View Orders</OutlineButton>
        </ActionButtons>
      </Header>
      
      <DashboardGrid>
        <MainColumn>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <StatsGrid>
                <StatCard>
                  <StatLabel>Total Transactions</StatLabel>
                  <StatValue>{mockStats.totalTransactions}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Active Listings</StatLabel>
                  <StatValue>{mockStats.activeListings}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Pending Orders</StatLabel>
                  <StatValue>{mockStats.pendingOrders}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Carbon Saved</StatLabel>
                  <StatValue>{mockStats.carbonSaved}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Waste Recycled</StatLabel>
                  <StatValue>{mockStats.wasteRecycled}</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Revenues</StatLabel>
                  <StatValue>{mockStats.revenues}</StatValue>
                </StatCard>
              </StatsGrid>
            </CardContent>
          </Card>
          
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <OutlineButton onClick={() => navigate('/transactions')}>View All</OutlineButton>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Material</TableHeader>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Value</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Partner</TableHeader>
                    <TableHeader>Action</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {mockRecentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.material}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.value}</TableCell>
                      <TableCell>
                        <StatusBadge status={transaction.status}>
                          {transaction.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{transaction.partner}</TableCell>
                      <TableCell>
                        <ViewLink onClick={() => handleViewTransaction(transaction.id)}>
                          View
                        </ViewLink>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </MainColumn>
        
        <SideColumn>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardHeader>
              <CardTitle>Your Supply Chains</CardTitle>
            </CardHeader>
            <CardContent>
              {mockActiveSupplyChains.map((chain) => (
                <SupplyChainItem key={chain.id}>
                  <SupplyChainName>{chain.name}</SupplyChainName>
                  <SupplyChainDetails>
                    <SupplyChainDetail>
                      <DetailLabel>Role</DetailLabel>
                      <DetailValue>{chain.role}</DetailValue>
                    </SupplyChainDetail>
                    <SupplyChainDetail>
                      <DetailLabel>Partners</DetailLabel>
                      <DetailValue>{chain.partners}</DetailValue>
                    </SupplyChainDetail>
                  </SupplyChainDetails>
                  <MaterialTags>
                    {chain.materials.map((material, index) => (
                      <MaterialTag key={index}>{material}</MaterialTag>
                    ))}
                  </MaterialTags>
                </SupplyChainItem>
              ))}
              {mockActiveSupplyChains.length === 0 && (
                <div>You haven't joined any supply chains yet.</div>
              )}
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <OutlineButton onClick={handleManageSupplyChains}>Manage Supply Chains</OutlineButton>
              </div>
            </CardContent>
          </Card>
          
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardHeader>
              <CardTitle>Impact Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <StatCard style={{ marginBottom: '1rem' }}>
                <StatLabel>Carbon Footprint Reduction</StatLabel>
                <StatValue>{mockStats.carbonSaved}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Material Circularity</StatLabel>
                <StatValue>75%</StatValue>
              </StatCard>
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <OutlineButton onClick={handleViewImpactReport}>View Impact Report</OutlineButton>
              </div>
            </CardContent>
          </Card>
        </SideColumn>
      </DashboardGrid>
    </PageContainer>
  );
};

export default DashboardPage; 