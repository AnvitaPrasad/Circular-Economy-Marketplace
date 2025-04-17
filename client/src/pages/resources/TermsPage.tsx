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

const Introduction = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  font-size: 1.1rem;
`;

const TermsSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
`;

const SubsectionTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: ${({ theme }) => theme.spacing(3)} 0 ${({ theme }) => theme.spacing(2)};
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const List = styled.ul`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-left: ${({ theme }) => theme.spacing(4)};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

const ImportantText = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.error};
`;

const SillyText = styled.span`
  font-style: italic;
  font-size: 0.8rem;
  display: block;
  color: ${({ theme }) => theme.colors.text.disabled};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const TermsPage: React.FC = () => {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="The contract nobody reads but everyone agrees to">
          Terms of Service
        </PageTitle>
        
        <Introduction>
          <p>
            By using our platform, you acknowledge that you have not read a single word of this 
            agreement, will never read it, and wouldn't understand it even if you did. 
            Nevertheless, you're legally bound by every ridiculous clause we've included below.
          </p>
        </Introduction>
        
        <TermsSection>
          <SectionTitle>1. Acceptance of Terms</SectionTitle>
          
          <Paragraph>
            By accessing this website, you agree to be bound by these Terms of Service, all applicable laws, 
            regulations, and <ImportantText>the whims of our legal department</ImportantText>, 
            and you agree that you are responsible for compliance with any applicable local laws, 
            even the ones you've never heard of.
          </Paragraph>
          
          <Paragraph>
            If you do not agree with any of these terms, you are prohibited from using or accessing 
            this site. The materials contained in this website are protected by copyright, trademark, 
            and other laws that we're pretty sure exist.
          </Paragraph>
          
          <SillyText>
            Our legal team spent 48 consecutive hours drafting this section while surviving on nothing 
            but energy drinks and spite.
          </SillyText>
        </TermsSection>
        
        <TermsSection>
          <SectionTitle>2. Use License</SectionTitle>
          
          <Paragraph>
            Permission is granted to temporarily download one copy of the materials on our website 
            for personal, non-commercial transitory viewing only. This is the grant of a license, 
            not a transfer of title, and under this license you may not:
          </Paragraph>
          
          <List>
            <li>Modify or copy the materials in any way that might make them better than our original design;</li>
            <li>Use the materials for any commercial purpose, including the perfectly reasonable ones;</li>
            <li>Attempt to decompile or reverse engineer any software contained on our website, even if it's to fix our bugs;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server, even if that server is more reliable than ours.</li>
          </List>
          
          <Paragraph>
            This license shall automatically terminate if you violate any of these restrictions and may be 
            terminated by us at any time for any reason or no reason at all. <ImportantText>We reserve the right to terminate 
            your license while you're in the middle of something important.</ImportantText>
          </Paragraph>
          
          <SillyText>
            We definitely won't exercise this right when you're about to complete a 2-hour form submission process.
          </SillyText>
        </TermsSection>
        
        <TermsSection>
          <SectionTitle>3. User Account</SectionTitle>
          
          <Paragraph>
            To access certain features of the website, you may be required to create an account. 
            When you create an account, you must provide information that is accurate, complete, and current at all times. 
            Failure to do so constitutes a breach of the Terms, and may result in immediate termination of your account.
          </Paragraph>
          
          <Paragraph>
            <ImportantText>You are responsible for safeguarding the password</ImportantText> that you use to access the website and for 
            any activities or actions under your password. We recommend using a password that you've never used anywhere else, 
            contains at least one uppercase letter, one lowercase letter, one number, one special character, one hieroglyphic symbol, 
            and one emoji.
          </Paragraph>
          
          <SillyText>
            Recommended password example: "Tr0ub4dor&3😂𓂀" (Please don't actually use this password. Or do. We're a terms page, not the police.)
          </SillyText>
        </TermsSection>
        
        <TermsSection>
          <SectionTitle>4. Data Collection</SectionTitle>
          
          <Paragraph>
            By using our website, you agree that we may collect, use, and store your personal data as described in our 
            Privacy Policy, which you also haven't read. We may collect information about your device, browsing habits, 
            favorite colors, deepest fears, and that embarrassing thing you did in third grade that keeps you up at night.
          </Paragraph>
          
          <SubsectionTitle>4.1 Cookies</SubsectionTitle>
          
          <Paragraph>
            Our website uses cookies, which are small text files that definitely aren't tracking your every move online. 
            By using our website, you consent to our use of cookies in accordance with the terms of our Cookie Policy, 
            which—let's be honest—you're never going to read either.
          </Paragraph>
          
          <SillyText>
            We use exactly 217 cookies, including but not limited to: chocolate chip, oatmeal raisin, and essential tracking.
          </SillyText>
        </TermsSection>
        
        <TermsSection>
          <SectionTitle>5. Disclaimer</SectionTitle>
          
          <Paragraph>
            THE MATERIALS ON OUR WEBSITE ARE PROVIDED ON AN 'AS IS' BASIS. 
            WE MAKE NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIM AND NEGATE ALL OTHER WARRANTIES, 
            INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A 
            PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.
          </Paragraph>
          
          <Paragraph>
            <ImportantText>
              FURTHER, WE DO NOT WARRANT OR MAKE ANY REPRESENTATIONS CONCERNING THE ACCURACY, LIKELY RESULTS, 
              OR RELIABILITY OF THE USE OF THE MATERIALS ON OUR WEBSITE OR OTHERWISE RELATING TO SUCH MATERIALS 
              OR ON ANY SITES LINKED TO THIS SITE.
            </ImportantText>
          </Paragraph>
          
          <SillyText>
            The lawyer who wrote this section was paid by the capital letter. They're now retired in Barbados.
          </SillyText>
        </TermsSection>
        
        <TermsSection>
          <SectionTitle>6. Updates to Terms</SectionTitle>
          
          <Paragraph>
            We may revise these Terms of Service at any time without notice. By using this website, 
            you are agreeing to be bound by the then-current version of these Terms. We recommend 
            checking this page every 15 minutes for changes, though we know you won't.
          </Paragraph>
          
          <SillyText>
            Last Updated: Just now. No, now. Actually, now. Wait, now. You get the idea.
          </SillyText>
        </TermsSection>
      </PageContainer>
    </MotionContainer>
  );
};

export default TermsPage; 