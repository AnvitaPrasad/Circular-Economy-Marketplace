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

const SupportSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
`;

const SupportCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ContactValue = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DisclaimerText = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: inherit;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const SupportPage: React.FC = () => {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="Where your questions go to die">
          Support Center
        </PageTitle>
        
        <Introduction>
          <p>
            Welcome to our Support Center, where we pretend to care about your problems 
            while secretly hoping you'll just give up and figure it out yourself.
            Our team of highly trained support specialists (who definitely exist) are standing by 
            to ignore your requests at lightning speed.
          </p>
        </Introduction>
        
        <SupportSection>
          <SectionTitle>Contact Us</SectionTitle>
          
          <SupportCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p>
              Our support team is available during business hours, which conveniently happen to be 
              whenever we feel like working. Here's how to reach us (or at least try):
            </p>
            
            <ContactInfo>
              <ContactRow>
                <ContactIcon>📧</ContactIcon>
                <ContactDetails>
                  <ContactLabel>Email:</ContactLabel>
                  <ContactValue>black-hole@circulareconomy.example</ContactValue>
                </ContactDetails>
              </ContactRow>
              
              <ContactRow>
                <ContactIcon>☎️</ContactIcon>
                <ContactDetails>
                  <ContactLabel>Phone:</ContactLabel>
                  <ContactValue>1-800-GOOD-LUCK (Estimated wait time: your entire lifespan)</ContactValue>
                </ContactDetails>
              </ContactRow>
              
              <ContactRow>
                <ContactIcon>💬</ContactIcon>
                <ContactDetails>
                  <ContactLabel>Live Chat:</ContactLabel>
                  <ContactValue>Currently offline (since 2019)</ContactValue>
                </ContactDetails>
              </ContactRow>
            </ContactInfo>
            
            <DisclaimerText>
              * Response times may vary from "eventually" to "when pigs fly." Please adjust your expectations accordingly.
            </DisclaimerText>
          </SupportCard>
        </SupportSection>
        
        <SupportSection>
          <SectionTitle>Submit a Support Ticket</SectionTitle>
          
          <SupportCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <p>
              Fill out this form to send your question directly to our automated 
              system that's programmed to lose it immediately.
            </p>
            
            <form>
              <FormGroup>
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" type="text" placeholder="We'll forget this anyway" />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="For our marketing team to spam" />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Keep it short, we won't read it" />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Your Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please describe your issue in excruciating detail so we can completely misunderstand it"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Input id="urgency" type="text" placeholder="All tickets are treated with equal indifference" />
              </FormGroup>
              
              <Button type="button">Submit to Void</Button>
            </form>
            
            <DisclaimerText>
              By submitting this form, you acknowledge that your request is going directly to /dev/null and you agree to solve your own problems.
            </DisclaimerText>
          </SupportCard>
        </SupportSection>
      </PageContainer>
    </MotionContainer>
  );
};

export default SupportPage; 