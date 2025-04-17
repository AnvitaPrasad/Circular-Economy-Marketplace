import React, { ReactElement, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './theme/theme';
import Layout from './components/layout/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Basic pages (eagerly loaded)
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ResourcesPage from './pages/ResourcesPage';

// Lazily loaded pages to improve performance
const AboutPage = lazy(() => import('./pages/AboutPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const MaterialDetailPage = lazy(() => import('./pages/MaterialDetailPage'));
const SupplyChainsPage = lazy(() => import('./pages/SupplyChainsPage'));
const SupplyChainDetailPage = lazy(() => import('./pages/SupplyChainDetailPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const MyListingsPage = lazy(() => import('./pages/MyListingsPage'));
const CreateListingPage = lazy(() => import('./pages/CreateListingPage'));
const EditListingPage = lazy(() => import('./pages/EditListingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));

// Resource Pages (lazily loaded)
const BlogPage = lazy(() => import('./pages/resources/BlogPage'));
const CaseStudiesPage = lazy(() => import('./pages/resources/CaseStudiesPage'));
const PoliciesPage = lazy(() => import('./pages/resources/PoliciesPage'));
const FAQPage = lazy(() => import('./pages/resources/FAQPage'));
const SustainabilityGuidePage = lazy(() => import('./pages/resources/SustainabilityGuidePage'));
const SupportPage = lazy(() => import('./pages/resources/SupportPage'));
const TermsOfServicePage = lazy(() => import('./pages/resources/TermsOfServicePage'));
const TermsPage = lazy(() => import('./pages/resources/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/resources/PrivacyPage'));
const CookiePolicyPage = lazy(() => import('./pages/resources/CookiePolicyPage'));
const SitemapPage = lazy(() => import('./pages/resources/SitemapPage'));

// Loading component for suspense fallback
const Loading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
  }}>
    Loading...
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout
                isLoggedIn={isLoggedIn}
                userRole={user?.role}
                userName={user?.name}
                userAvatar={user?.avatar}
                onLogout={logout}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="marketplace/:id" element={<MaterialDetailPage />} />
            <Route path="supply-chains" element={<SupplyChainsPage />} />
            <Route path="supply-chains/:id" element={<SupplyChainDetailPage />} />
            
            <Route path="dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="transactions" element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            } />
            
            <Route path="orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            
            <Route path="my-listings" element={
              <ProtectedRoute>
                <MyListingsPage />
              </ProtectedRoute>
            } />
            
            <Route path="create-listing" element={
              <ProtectedRoute>
                <CreateListingPage />
              </ProtectedRoute>
            } />
            
            <Route path="edit-listing/:id" element={
              <ProtectedRoute>
                <EditListingPage />
              </ProtectedRoute>
            } />
            
            <Route path="profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Resources routes */}
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="resources/blog" element={<BlogPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="resources/case-studies" element={<CaseStudiesPage />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route path="resources/policies" element={<PoliciesPage />} />
            <Route path="policies" element={<PoliciesPage />} />
            <Route path="resources/faq" element={<FAQPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="resources/sustainability-guide" element={<SustainabilityGuidePage />} />
            <Route path="sustainability-guide" element={<SustainabilityGuidePage />} />
            <Route path="resources/support" element={<SupportPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="resources/terms" element={<TermsOfServicePage />} />
            <Route path="terms" element={<TermsOfServicePage />} />
            <Route path="resources/terms-simple" element={<TermsPage />} />
            <Route path="terms-simple" element={<TermsPage />} />
            <Route path="resources/privacy" element={<PrivacyPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="resources/cookies" element={<CookiePolicyPage />} />
            <Route path="cookies" element={<CookiePolicyPage />} />
            <Route path="resources/sitemap" element={<SitemapPage />} />
            <Route path="sitemap" element={<SitemapPage />} />
            
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
