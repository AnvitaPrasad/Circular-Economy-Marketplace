import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { theme } from '../../styles/theme';
import { Outlet, useLocation } from 'react-router-dom';

interface LayoutProps {
  isLoggedIn: boolean;
  userRole?: 'company' | 'transporter' | 'admin';
  userName?: string;
  userAvatar?: string;
  onLogout: () => void;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding-top: 70px; // Height of the navbar
`;

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

const PageTransition = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Layout: React.FC<LayoutProps> = ({
  isLoggedIn,
  userRole,
  userName,
  userAvatar,
  onLogout
}) => {
  const location = useLocation();
  
  return (
    <LayoutContainer>
      <Navbar
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        userName={userName}
        userAvatar={userAvatar}
        onLogout={onLogout}
      />
      
      <Main>
        <AnimatePresence mode="wait">
          <PageTransition
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
          >
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </Main>
      
      <Footer />
    </LayoutContainer>
  );
};

export default Layout; 