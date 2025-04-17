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

const PrivacySection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
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

const SubtleText = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.text.disabled};
`;

const PrivacyPage: React.FC = () => {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="Where we pretend to value your privacy">
          Privacy Policy
        </PageTitle>
        
        <Introduction>
          <p>
            We wrote this Privacy Policy to help you understand what information we collect, 
            how we use it, and what choices you have about it. We've tried to make it as clear as possible, 
            but let's be honest—you're not reading this. <ImportantText>Literally nobody reads privacy policies.</ImportantText> 
            This could be a recipe for chocolate cake and you'd never know.
          </p>
        </Introduction>
        
        <PrivacySection>
          <SectionTitle>1. Information We Collect <SubtleText>(Everything, Basically)</SubtleText></SectionTitle>
          
          <Paragraph>
            We may collect the following information when you use our platform:
          </Paragraph>
          
          <List>
            <li>
              <b>Personal Information:</b> Name, email address, physical address, phone number, social security number, 
              blood type, childhood memories, hopes, dreams, and deepest fears.
            </li>
            <li>
              <b>Device Information:</b> IP address, browser type, operating system, screen size, 
              typing speed, how long you stare at each page, and whether you're using our site during work hours.
            </li>
            <li>
              <b>Usage Information:</b> Pages visited, time spent, clicks, taps, swipes, 
              scrolls, mouse movement patterns, frustrated sighs, and rage-quits.
            </li>
            <li>
              <b>Biometric Data:</b> <ImportantText>We may use your device's camera to analyze your facial expressions</ImportantText> while using our 
              platform so we can determine if our UI makes you angry, confused, or just generally disappointed.
            </li>
          </List>
          
          <Paragraph>
            We may also collect information through cookies, beacons, pixels, tags, 
            magical elves who live in your computer, and other tracking technologies.
          </Paragraph>
        </PrivacySection>
        
        <PrivacySection>
          <SectionTitle>2. How We Use Your Information <SubtleText>(However We Want)</SubtleText></SectionTitle>
          
          <Paragraph>
            We use the information we collect for various purposes, including but not limited to:
          </Paragraph>
          
          <List>
            <li>To provide and maintain our platform (the actual reason)</li>
            <li>To improve our platform based on how you interact with it (also reasonable)</li>
            <li>To develop new products and services that you definitely don't need</li>
            <li>To send you marketing emails that you'll immediately delete</li>
            <li>To create eerily accurate personality profiles and sell them to advertisers <SubtleText>(main revenue stream)</SubtleText></li>
            <li>To predict your future purchasing habits with scary accuracy</li>
            <li>To share with our "trusted partners" (read: literally anyone who pays us)</li>
            <li>To conduct internal research on how to extract more data from users</li>
          </List>
          
          <Paragraph>
            <ImportantText>You give us a lot more control than you think by clicking "I Agree."</ImportantText> Remember 
            the South Park episode where people were turned into Human CentiPads because they didn't read 
            the iTunes Terms and Conditions? Yeah, we're not saying we'd do that, but we're not saying we wouldn't either.
          </Paragraph>
        </PrivacySection>
        
        <PrivacySection>
          <SectionTitle>3. Information Sharing <SubtleText>(Everyone Gets a Copy!)</SubtleText></SectionTitle>
          
          <Paragraph>
            We may share your personal information with:
          </Paragraph>
          
          <List>
            <li>
              <b>Service Providers:</b> Third parties that help us operate our platform, 
              like cloud hosting providers, payment processors, and the IT guy who sometimes fixes our printers.
            </li>
            <li>
              <b>Advertising Partners:</b> Companies that want to sell you things based on that one time 
              you looked at camping equipment three years ago and now see nothing but tent ads.
            </li>
            <li>
              <b>Analytics Providers:</b> Companies that turn your behavior into colorful charts that make our executives say "hmm, interesting."
            </li>
            <li>
              <b>Law Enforcement:</b> If we receive a legal request, or if we think you're doing something sketchy, 
              or honestly if we just feel like it.
            </li>
            <li>
              <b>New Owners:</b> If we get acquired or merge with another company, your data is part of the deal. 
              <ImportantText> Congratulations, you've been sold!</ImportantText>
            </li>
          </List>
        </PrivacySection>
        
        <PrivacySection>
          <SectionTitle>4. Your Privacy Rights <SubtleText>(Theoretical, At Best)</SubtleText></SectionTitle>
          
          <Paragraph>
            Depending on where you live, you may have certain rights regarding your personal information:
          </Paragraph>
          
          <List>
            <li>
              <b>Right to Access:</b> You can request a copy of your data, which we'll provide in a 
              completely unusable format after 45 business days.
            </li>
            <li>
              <b>Right to Deletion:</b> You can ask us to delete your data, which we'll do from our main 
              systems while keeping copies in seventeen backup databases "for legal purposes."
            </li>
            <li>
              <b>Right to Correction:</b> You can ask us to fix inaccurate information. 
              We'll pretend to do this while quietly noting in our system that you're "difficult."
            </li>
            <li>
              <b>Right to Opt-Out:</b> You can opt out of data sales, which will cause our internal 
              systems to categorize you as "non-monetizable" and significantly degrade your user experience.
            </li>
          </List>
          
          <Paragraph>
            To exercise these rights, please contact our Privacy Team at privacy@blackhole.example. 
            <SubtleText> (Average response time: 6-8 months, if ever.)</SubtleText>
          </Paragraph>
        </PrivacySection>
        
        <PrivacySection>
          <SectionTitle>5. Security <SubtleText>(We Googled "How to Encrypt")</SubtleText></SectionTitle>
          
          <Paragraph>
            We implement reasonable security measures to protect your personal information. 
            "Reasonable" means we have a password on our admin portal and we don't keep your credit card numbers 
            on sticky notes (anymore). However, no method of transmission over the Internet or electronic 
            storage is 100% secure, so we cannot guarantee absolute security.
          </Paragraph>
          
          <Paragraph>
            <ImportantText>In the event of a data breach</ImportantText>, we will notify you by sending an 
            email that will definitely go to your spam folder, or by posting a notice on our website in 
            8-point font at the bottom of a page nobody visits.
          </Paragraph>
        </PrivacySection>
        
        <PrivacySection>
          <SectionTitle>6. Changes to This Policy <SubtleText>(Surprise Updates, Always)</SubtleText></SectionTitle>
          
          <Paragraph>
            We may update this Privacy Policy from time to time. We'll notify you of any changes by 
            posting the new Privacy Policy on this page and changing the "Last Updated" date, which 
            you definitely won't notice. <ImportantText>Your continued use of our platform after such modifications 
            will constitute your acknowledgment of the modified Privacy Policy and agreement to be bound by it.</ImportantText>
          </Paragraph>
          
          <Paragraph>
            Last Updated: A date in the past that makes it look like we care about regular updates
          </Paragraph>
        </PrivacySection>
      </PageContainer>
    </MotionContainer>
  );
};

export default PrivacyPage; 