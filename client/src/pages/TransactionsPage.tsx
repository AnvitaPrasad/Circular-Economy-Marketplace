import React, { useState, useEffect, ChangeEvent, ErrorInfo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// Components
import PageTitle from '../components/common/PageTitle';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import TextField from '../components/common/TextField';
import Modal from '../components/common/Modal';

// Error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error in Transactions page:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px', 
          backgroundColor: '#ffebee', 
          border: '1px solid #ef9a9a',
          borderRadius: '4px'
        }}>
          <h2>Something went wrong</h2>
          <p>Error: {this.state.error?.message}</p>
          <p>Check the console for more details.</p>
          <Button variant="primary" onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap the original component with the ErrorBoundary
const TransactionsPageWithErrorBoundary: React.FC = () => {
  return (
    <ErrorBoundary>
      <TransactionsPageContent />
    </ErrorBoundary>
  );
};

// Move the original component content here
const TransactionsPageContent: React.FC = () => {
  try {
    // Mock data - would be replaced with API calls
    const MOCK_TRANSACTIONS = [
      {
        id: 'tx-001',
        type: 'purchase' as TransactionType,
        date: new Date(2023, 10, 15),
        amount: 2500,
        status: 'completed' as TransactionStatus,
        counterpartyName: 'EcoRenew Inc.',
        counterpartyId: 'eco-001',
        material: 'Recycled PET',
        quantity: '500kg',
        invoiceNumber: 'INV-2023-001',
        paymentMethod: 'Bank Transfer',
        deliveryStatus: 'Delivered',
        notes: 'Material quality as expected. Will order again.'
      },
      {
        id: 'tx-002',
        type: 'sale' as TransactionType,
        date: new Date(2023, 10, 10),
        amount: 1800,
        status: 'pending' as TransactionStatus,
        counterpartyName: 'GreenManufacturing Co.',
        counterpartyId: 'green-001',
        material: 'Reclaimed Aluminum',
        quantity: '200kg',
        invoiceNumber: 'INV-2023-002',
        paymentMethod: 'Credit Card',
        deliveryStatus: 'In Transit',
        notes: ''
      },
      {
        id: 'tx-003',
        type: 'purchase' as TransactionType,
        date: new Date(2023, 9, 28),
        amount: 3200,
        status: 'completed' as TransactionStatus,
        counterpartyName: 'CircularPlastics Ltd.',
        counterpartyId: 'circ-001',
        material: 'HDPE Regranulate',
        quantity: '800kg',
        invoiceNumber: 'INV-2023-003',
        paymentMethod: 'Bank Transfer',
        deliveryStatus: 'Delivered',
        notes: 'Material met all specifications. Excellent quality.'
      },
      {
        id: 'tx-004',
        type: 'sale' as TransactionType,
        date: new Date(2023, 9, 15),
        amount: 4500,
        status: 'cancelled' as TransactionStatus,
        counterpartyName: 'SustainableProducts GmbH',
        counterpartyId: 'sust-001',
        material: 'Reclaimed Textiles',
        quantity: '1000kg',
        invoiceNumber: 'INV-2023-004',
        paymentMethod: 'PayPal',
        deliveryStatus: 'Cancelled',
        notes: 'Order cancelled due to logistics issues.'
      },
      {
        id: 'tx-005',
        type: 'purchase' as TransactionType,
        date: new Date(2023, 8, 20),
        amount: 1200,
        status: 'completed' as TransactionStatus,
        counterpartyName: 'BioMaterials Co.',
        counterpartyId: 'bio-001',
        material: 'Recycled Paper Pulp',
        quantity: '300kg',
        invoiceNumber: 'INV-2023-005',
        paymentMethod: 'Bank Transfer',
        deliveryStatus: 'Delivered',
        notes: ''
      }
    ];

    // Types
    type TransactionStatus = 'pending' | 'completed' | 'cancelled';
    type TransactionType = 'purchase' | 'sale';

    interface Transaction {
      id: string;
      type: TransactionType;
      date: Date;
      amount: number;
      status: TransactionStatus;
      counterpartyName: string;
      counterpartyId: string;
      material: string;
      quantity: string;
      invoiceNumber: string;
      paymentMethod: string;
      deliveryStatus: string;
      notes: string;
    }

    // Styled Components
    const PageContainer = styled.div`
      max-width: 1200px;
      margin: 0 auto;
      padding: ${({ theme }) => theme.spacing(4)};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding: ${({ theme }) => theme.spacing(3)};
      }
    `;

    const FilterBar = styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: ${({ theme }) => theme.spacing(2)};
      margin-bottom: ${({ theme }) => theme.spacing(4)};
      padding: ${({ theme }) => theme.spacing(3)};
      background-color: ${({ theme }) => theme.colors.background.default};
      border-radius: ${({ theme }) => theme.borderRadius.lg};
      box-shadow: ${({ theme }) => theme.shadows.sm};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        flex-direction: column;
      }
    `;

    const FilterGroup = styled.div`
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing(1)};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
      }
    `;

    const FilterLabel = styled.label`
      font-weight: 500;
      color: ${({ theme }) => theme.colors.text.secondary};
      white-space: nowrap;
    `;

    const StatsBar = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: ${({ theme }) => theme.spacing(3)};
      margin-bottom: ${({ theme }) => theme.spacing(4)};
    `;

    const StatCard = styled(Card)`
      padding: ${({ theme }) => theme.spacing(3)};
      text-align: center;
    `;

    const StatValue = styled.div`
      font-size: 2rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.primary.main};
      margin-bottom: ${({ theme }) => theme.spacing(0.5)};
    `;

    const StatLabel = styled.div`
      color: ${({ theme }) => theme.colors.text.secondary};
      font-size: 0.9rem;
    `;

    const TransactionGrid = styled.div`
      display: grid;
      gap: ${({ theme }) => theme.spacing(2)};
      margin-bottom: ${({ theme }) => theme.spacing(4)};
    `;

    const TransactionRow = styled(motion.div)`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 0.8fr 0.8fr 0.8fr;
      gap: ${({ theme }) => theme.spacing(2)};
      padding: ${({ theme }) => theme.spacing(2)};
      background-color: ${({ theme }) => theme.colors.background.paper};
      border-radius: ${({ theme }) => theme.borderRadius.md};
      box-shadow: ${({ theme }) => theme.shadows.sm};
      cursor: pointer;
      
      &:hover {
        box-shadow: ${({ theme }) => theme.shadows.md};
        transform: translateY(-2px);
      }
      
      @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto auto;
        padding: ${({ theme }) => theme.spacing(3)};
      }
      
      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6, auto);
      }
    `;

    const TransactionRowHeader = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 0.8fr 0.8fr 0.8fr;
      gap: ${({ theme }) => theme.spacing(2)};
      padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
      font-weight: 500;
      color: ${({ theme }) => theme.colors.text.secondary};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
        display: none;
      }
    `;

    const TransactionCell = styled.div`
      @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        &::before {
          content: attr(data-label);
          font-weight: 500;
          color: ${({ theme }) => theme.colors.text.secondary};
        }
      }
    `;

    const DetailGrid = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${({ theme }) => theme.spacing(3)};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        grid-template-columns: 1fr;
      }
    `;

    const DetailSection = styled.div`
      margin-bottom: ${({ theme }) => theme.spacing(3)};
      
      h3 {
        font-size: 1.2rem;
        margin-bottom: ${({ theme }) => theme.spacing(2)};
        color: ${({ theme }) => theme.colors.text.primary};
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: ${({ theme }) => theme.spacing(0.5)};
      }
    `;

    const DetailItem = styled.div`
      display: flex;
      justify-content: space-between;
      margin-bottom: ${({ theme }) => theme.spacing(1)};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        flex-direction: column;
        margin-bottom: ${({ theme }) => theme.spacing(2)};
      }
    `;

    const DetailLabel = styled.span`
      font-weight: 500;
      color: ${({ theme }) => theme.colors.text.secondary};
    `;

    const DetailValue = styled.span`
      text-align: right;
      
      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        text-align: left;
        margin-top: ${({ theme }) => theme.spacing(0.5)};
      }
    `;

    const LoadMoreButton = styled(Button)`
      margin: 0 auto;
      display: block;
    `;

    const EmptyState = styled.div`
      text-align: center;
      padding: ${({ theme }) => theme.spacing(4)} 0;
      color: ${({ theme }) => theme.colors.text.secondary};
      
      h3 {
        margin-bottom: ${({ theme }) => theme.spacing(2)};
      }
    `;

    const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [filters, setFilters] = useState({
      type: 'all',
      status: 'all',
      search: '',
      dateRange: 'all'
    });
    
    // Calculate stats
    const totalPurchases = transactions
      .filter(tx => tx.type === 'purchase')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    const totalSales = transactions
      .filter(tx => tx.type === 'sale')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    const pendingAmount = transactions
      .filter(tx => tx.status === 'pending')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    // Handle filter changes
    useEffect(() => {
      let result = [...transactions];
      
      // Filter by type
      if (filters.type !== 'all') {
        result = result.filter(tx => tx.type === filters.type);
      }
      
      // Filter by status
      if (filters.status !== 'all') {
        result = result.filter(tx => tx.status === filters.status);
      }
      
      // Filter by search term
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(tx => 
          tx.counterpartyName.toLowerCase().includes(searchLower) ||
          tx.material.toLowerCase().includes(searchLower) ||
          tx.invoiceNumber.toLowerCase().includes(searchLower)
        );
      }
      
      // Filter by date range
      if (filters.dateRange === 'lastMonth') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        result = result.filter(tx => tx.date >= oneMonthAgo);
      } else if (filters.dateRange === 'lastThreeMonths') {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        result = result.filter(tx => tx.date >= threeMonthsAgo);
      } else if (filters.dateRange === 'thisYear') {
        const thisYear = new Date().getFullYear();
        result = result.filter(tx => tx.date.getFullYear() === thisYear);
      }
      
      setFilteredTransactions(result);
    }, [filters, transactions]);
    
    const handleFilterChange = (name: string, value: string) => {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
    const handleTransactionClick = (transaction: Transaction) => {
      setSelectedTransaction(transaction);
      setIsDetailModalOpen(true);
    };
    
    const getStatusColor = (status: TransactionStatus) => {
      switch (status) {
        case 'completed': return 'success';
        case 'pending': return 'warning';
        case 'cancelled': return 'error';
        default: return 'default';
      }
    };
    
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(amount);
    };
    
    return (
      <PageContainer>
        <PageTitle>Transactions</PageTitle>
        
        <StatsBar>
          <StatCard>
            <StatValue>{formatCurrency(totalPurchases)}</StatValue>
            <StatLabel>Total Purchases</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{formatCurrency(totalSales)}</StatValue>
            <StatLabel>Total Sales</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{formatCurrency(pendingAmount)}</StatValue>
            <StatLabel>Pending Transactions</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatValue>{transactions.length}</StatValue>
            <StatLabel>Total Transactions</StatLabel>
          </StatCard>
        </StatsBar>
        
        <FilterBar>
          <FilterGroup>
            <FilterLabel>Type:</FilterLabel>
            <Select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              options={[
                { value: 'all', label: 'All' },
                { value: 'purchase', label: 'Purchases' },
                { value: 'sale', label: 'Sales' }
              ]}
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Status:</FilterLabel>
            <Select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'pending', label: 'Pending' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Date:</FilterLabel>
            <Select 
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              options={[
                { value: 'all', label: 'All Time' },
                { value: 'lastMonth', label: 'Last Month' },
                { value: 'lastThreeMonths', label: 'Last 3 Months' },
                { value: 'thisYear', label: 'This Year' }
              ]}
            />
          </FilterGroup>
          
          <FilterGroup style={{ flexGrow: 1 }}>
            <TextField
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange('search', e.target.value)}
              fullWidth
            />
          </FilterGroup>
        </FilterBar>
        
        {filteredTransactions.length > 0 ? (
          <>
            <TransactionGrid>
              <TransactionRowHeader>
                <div>Date & ID</div>
                <div>Counterparty</div>
                <div>Material & Quantity</div>
                <div>Amount</div>
                <div>Status</div>
                <div>Type</div>
              </TransactionRowHeader>
              
              {filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  onClick={() => handleTransactionClick(transaction)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TransactionCell data-label="Date & ID">
                    <div>
                      <div>{format(transaction.date, 'MMM dd, yyyy')}</div>
                      <div style={{ color: 'grey', fontSize: '0.9em' }}>{transaction.id}</div>
                    </div>
                  </TransactionCell>
                  
                  <TransactionCell data-label="Counterparty">
                    {transaction.counterpartyName}
                  </TransactionCell>
                  
                  <TransactionCell data-label="Material & Quantity">
                    <div>
                      <div>{transaction.material}</div>
                      <div style={{ color: 'grey', fontSize: '0.9em' }}>{transaction.quantity}</div>
                    </div>
                  </TransactionCell>
                  
                  <TransactionCell data-label="Amount">
                    {formatCurrency(transaction.amount)}
                  </TransactionCell>
                  
                  <TransactionCell data-label="Status">
                    <Badge color={getStatusColor(transaction.status)}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                  </TransactionCell>
                  
                  <TransactionCell data-label="Type">
                    <Badge color={transaction.type === 'purchase' ? 'info' : 'success'}>
                      {transaction.type === 'purchase' ? 'Purchase' : 'Sale'}
                    </Badge>
                  </TransactionCell>
                </TransactionRow>
              ))}
            </TransactionGrid>
            
            {/* Load more button if needed */}
            {transactions.length > filteredTransactions.length && (
              <LoadMoreButton variant="outlined">
                Load More Transactions
              </LoadMoreButton>
            )}
          </>
        ) : (
          <EmptyState>
            <h3>No transactions found</h3>
            <p>Adjust your filters or create your first transaction</p>
            <Button variant="primary" style={{ marginTop: '1rem' }}>
              New Transaction
            </Button>
          </EmptyState>
        )}
        
        {/* Transaction Detail Modal */}
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={selectedTransaction ? `Transaction Details: ${selectedTransaction.id}` : 'Transaction Details'}
        >
          {selectedTransaction && (
            <>
              <DetailGrid>
                <DetailSection>
                  <h3>Transaction Information</h3>
                  <DetailItem>
                    <DetailLabel>Transaction Type:</DetailLabel>
                    <DetailValue>
                      <Badge color={selectedTransaction.type === 'purchase' ? 'info' : 'success'}>
                        {selectedTransaction.type === 'purchase' ? 'Purchase' : 'Sale'}
                      </Badge>
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Date:</DetailLabel>
                    <DetailValue>{format(selectedTransaction.date, 'MMMM dd, yyyy')}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Status:</DetailLabel>
                    <DetailValue>
                      <Badge color={getStatusColor(selectedTransaction.status)}>
                        {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                      </Badge>
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Amount:</DetailLabel>
                    <DetailValue>{formatCurrency(selectedTransaction.amount)}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Invoice Number:</DetailLabel>
                    <DetailValue>{selectedTransaction.invoiceNumber}</DetailValue>
                  </DetailItem>
                </DetailSection>
                
                <DetailSection>
                  <h3>Material Information</h3>
                  <DetailItem>
                    <DetailLabel>Material:</DetailLabel>
                    <DetailValue>{selectedTransaction.material}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Quantity:</DetailLabel>
                    <DetailValue>{selectedTransaction.quantity}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Delivery Status:</DetailLabel>
                    <DetailValue>{selectedTransaction.deliveryStatus}</DetailValue>
                  </DetailItem>
                </DetailSection>
              </DetailGrid>
              
              <DetailSection>
                <h3>Counterparty Information</h3>
                <DetailItem>
                  <DetailLabel>Name:</DetailLabel>
                  <DetailValue>{selectedTransaction.counterpartyName}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>ID:</DetailLabel>
                  <DetailValue>{selectedTransaction.counterpartyId}</DetailValue>
                </DetailItem>
              </DetailSection>
              
              <DetailSection>
                <h3>Payment Information</h3>
                <DetailItem>
                  <DetailLabel>Payment Method:</DetailLabel>
                  <DetailValue>{selectedTransaction.paymentMethod}</DetailValue>
                </DetailItem>
              </DetailSection>
              
              {selectedTransaction.notes && (
                <DetailSection>
                  <h3>Notes</h3>
                  <p>{selectedTransaction.notes}</p>
                </DetailSection>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                {selectedTransaction.status === 'pending' && (
                  <>
                    <Button variant="primary">Confirm Transaction</Button>
                    <Button variant="error">Cancel Transaction</Button>
                  </>
                )}
                
                <Button variant="secondary">Generate Invoice</Button>
              </div>
            </>
          )}
        </Modal>
      </PageContainer>
    );
  } catch (error) {
    console.error("Caught error in TransactionsPageContent:", error);
    return (
      <div style={{ 
        padding: '20px', 
        margin: '20px', 
        backgroundColor: '#ffebee', 
        border: '1px solid #ef9a9a',
        borderRadius: '4px'
      }}>
        <h2>Something went wrong</h2>
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
        <p>Check the console for more details.</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    );
  }
};

export default TransactionsPageWithErrorBoundary; 