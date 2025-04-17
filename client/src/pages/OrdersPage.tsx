import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * OrdersPage component that redirects to the TransactionsPage
 * This is a placeholder component to handle the "View Orders" functionality
 * and ensure users aren't shown a 404 page when clicking those links
 */
const OrdersPage: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to transactions page when this component mounts
  useEffect(() => {
    navigate('/transactions');
  }, [navigate]);

  // This component will only be rendered briefly before redirecting
  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '50vh'
    }}>
      Redirecting to Transactions page...
    </div>
  );
};

export default OrdersPage; 