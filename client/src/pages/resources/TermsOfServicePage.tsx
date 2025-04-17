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

const ContentSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary?.main || theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary?.light || theme.colors.primary};
`;

const SubsectionTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary?.dark || theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(4)};
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

const WarningBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-left: 4px solid ${({ theme }) => theme.colors.error?.main || theme.colors.error};
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  border-radius: 4px;
`;

const ImportantNote = styled.div`
  font-size: 1rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px dashed ${({ theme }) => theme.colors.secondary?.main || theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(3)} 0;
  border-radius: 4px;
`;

const LawyerNote = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.disabled};
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-style: italic;
  line-height: 1.4;
`;

const LegalIcon = styled.span`
  font-size: 1.2rem;
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const StrikethroughText = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.text.disabled};
`;

const TermsOfServicePage: React.FC = () => {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="The legal agreement nobody actually reads">
          Terms of Service
        </PageTitle>
        
        <Introduction>
          <p>
            Welcome to our Terms of Service ("Terms"), a legally binding document that you're 
            agreeing to without reading. Congratulations on joining the 99.8% of internet users 
            who blindly accept these terms while hoping they didn't just sell their firstborn child.
          </p>
        </Introduction>
        
        <WarningBox>
          <Paragraph>
            <LegalIcon>⚖️</LegalIcon> By accessing our Circular Economy Marketplace, you agree to 
            these Terms. If you disagree with any part, you should close this tab immediately, 
            throw your device into the sea, and live off the grid for the foreseeable future.
          </Paragraph>
        </WarningBox>
        
        <ContentSection>
          <SectionTitle>1. Acceptance of Terms <LegalIcon>📜</LegalIcon></SectionTitle>
          
          <Paragraph>
            By using our Circular Economy Marketplace, you certify that you are at least 13 years 
            old, not a robot (unless you identify as one), and have read and understood these Terms 
            in their entirety (we know you haven't, but our lawyers made us put this in).
          </Paragraph>
          
          <Paragraph>
            We reserve the right to change these Terms at any time without notification, 
            telepathic message, or carrier pigeon. It's your responsibility to check back 
            every 17 minutes for updates, which you definitely won't do.
          </Paragraph>
          
          <LawyerNote>
            Note from Legal: This paragraph meets the minimum requirement for making 
            users feel guilty about not reading our terms while simultaneously ensuring 
            they never will. Mission accomplished.
          </LawyerNote>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>2. User Accounts <LegalIcon>🧑‍💻</LegalIcon></SectionTitle>
          
          <Paragraph>
            To access certain features of our Marketplace, you must create an account. When creating 
            your account, you agree to provide information that is accurate, complete, and current. 
            Failure to do so constitutes a breach of these Terms, and we may terminate your account 
            for such breach while quietly judging your ethics.
          </Paragraph>
          
          <SubsectionTitle>2.1 Password Security</SubsectionTitle>
          <Paragraph>
            You are responsible for safeguarding your password. We strongly recommend against 
            using "password123," your pet's name, or any combination of your birthday. However, 
            we know you'll probably do it anyway. When your account inevitably gets hacked, you 
            agree not to blame us for your terrible password choices.
          </Paragraph>
          
          <SubsectionTitle>2.2 Account Termination</SubsectionTitle>
          <Paragraph>
            We reserve the right to suspend or terminate your account at any time for any reason, 
            including but not limited to: violating these Terms, inactivity, Mercury being in retrograde, 
            or our content moderator having a bad day. If we do terminate your account, we promise to 
            be a tad remorseful for at least 3 seconds.
          </Paragraph>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>3. User Content <LegalIcon>📝</LegalIcon></SectionTitle>
          
          <Paragraph>
            By posting content to our Circular Economy Marketplace, you grant us a non-exclusive, 
            fully-paid, royalty-free, universe-wide, perpetual, irrevocable, and sublicensable 
            right to use, reproduce, modify, adapt, publish, translate, create derivative works, 
            distribute, and display such content in any form, media, or technology now known or 
            later developed. In other words, that meme you posted might end up on a billboard in 
            Alpha Centauri, and you won't see a penny.
          </Paragraph>
          
          <Paragraph>
            You represent and warrant that you own or have the necessary permissions to use and 
            authorize us to use all intellectual property rights in and to any content you post. 
            In simpler terms: don't steal stuff, or we'll both get in trouble, but mostly you.
          </Paragraph>
          
          <ImportantNote>
            <Paragraph>
              <LegalIcon>📌</LegalIcon> We do not endorse any User Content or any opinion, recommendation, 
              or advice expressed therein. If someone posts that eating rocks improves circular supply 
              chain efficiency, we're not responsible when you break your teeth.
            </Paragraph>
          </ImportantNote>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>4. Prohibited Activities <LegalIcon>🚫</LegalIcon></SectionTitle>
          
          <Paragraph>
            In connection with your use of our Circular Economy Marketplace, you agree not to:
          </Paragraph>
          
          <List>
            <li>Break any law, rule, or regulation (obviously)</li>
            <li>Post anything obscene, offensive, or harmful (subjectively defined by our moderator, who was raised in a monastery)</li>
            <li>Impersonate any person or entity (even if your celebrity impression is spot-on)</li>
            <li>Collect user information without their consent (we already do that, and we don't like competition)</li>
            <li>Use our platform to send spam, chain letters, or pyramid schemes (save those for your family WhatsApp group)</li>
            <li>Upload any viruses or malicious code (unless it's a really cool virus that only targets printers)</li>
            <li>Attempt to reverse engineer our website (flattering, but still prohibited)</li>
            <li>Use our platform to arrange sales of illegal or unauthorized materials (including those mixtapes you made in college)</li>
            <li>Attempt to manipulate our review system (your mom's five-star reviews aren't fooling anyone)</li>
            <li>Wear socks with sandals while using our platform (this is unenforceable but morally reprehensible)</li>
          </List>
          
          <WarningBox>
            <Paragraph>
              <LegalIcon>⚠️</LegalIcon> Violation of these prohibitions may result in termination of your 
              account and/or legal action, depending on which coffee our legal team has had that morning.
            </Paragraph>
          </WarningBox>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>5. Intellectual Property <LegalIcon>™️</LegalIcon></SectionTitle>
          
          <Paragraph>
            Our website and its original content, features, and functionality are owned by us and 
            are protected by international copyright, trademark, patent, trade secret, and other 
            intellectual property laws. Yes, we copyrighted our "404 Error" page; it's that good.
          </Paragraph>
          
          <SubsectionTitle>5.1 Trademarks</SubsectionTitle>
          <Paragraph>
            Our company name, logo, product names, and slogans are our trademarks. Any use of these 
            trademarks without our express written consent is strictly prohibited. Even saying our 
            name three times fast in front of a mirror is technically a violation, but we'll let that one slide.
          </Paragraph>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>6. Marketplace Listings <LegalIcon>🏪</LegalIcon></SectionTitle>
          
          <Paragraph>
            Our Circular Economy Marketplace allows users to list recovered materials, sustainable 
            products, and services. By listing an item, you agree to:
          </Paragraph>
          
          <List>
            <li>Provide accurate and complete information about what you're selling</li>
            <li>Deliver the goods or services as described (no "picture vs. reality" memes should be made about your listings)</li>
            <li>Comply with all applicable laws regarding the sale of your items (especially important for those selling "slightly radioactive" materials)</li>
            <li>Set reasonable prices (price gouging will earn you our disappointment, which is devastating)</li>
            <li>Respond to buyer inquiries within a reasonable timeframe (3-5 business months is not reasonable)</li>
          </List>
          
          <Paragraph>
            We reserve the right to remove any listing that violates these Terms, contains fraudulent 
            information, or uses the words "<StrikethroughText>moist</StrikethroughText>," "synergy," 
            or "disrupt" excessively in the description.
          </Paragraph>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>7. Disclaimer of Warranties <LegalIcon>🙅</LegalIcon></SectionTitle>
          
          <Paragraph>
            YOUR USE OF OUR CIRCULAR ECONOMY MARKETPLACE IS AT YOUR SOLE RISK. OUR WEBSITE IS PROVIDED 
            ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, 
            WHETHER EXPRESS OR IMPLIED.
          </Paragraph>
          
          <Paragraph>
            WE DO NOT GUARANTEE THAT OUR WEBSITE WILL ALWAYS BE SAFE, SECURE, OR ERROR-FREE, OR THAT 
            IT WILL FUNCTION WITHOUT DISRUPTIONS, DELAYS, OR IMPERFECTIONS. YOUR RESULTS MAY VARY, 
            BATTERIES NOT INCLUDED, SOME ASSEMBLY REQUIRED.
          </Paragraph>
          
          <ImportantNote>
            <Paragraph>
              <LegalIcon>🔍</LegalIcon> Translation: If our website crashes while you're in the middle of 
              a very important transaction, causing you to lose your life savings, you agree that it's 
              just one of those things that happens sometimes. Like rain on your wedding day. Isn't it ironic?
            </Paragraph>
          </ImportantNote>
          
          <LawyerNote>
            Note from Legal: This is the part where we legally absolve ourselves of all responsibility. 
            We insisted on ALL CAPS to ensure maximum "scrolling past without reading."
          </LawyerNote>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>8. Limitation of Liability <LegalIcon>⚖️</LegalIcon></SectionTitle>
          
          <Paragraph>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR ACCESS TO OR USE OF, OR INABILITY 
            TO ACCESS OR USE, OUR WEBSITE.
          </Paragraph>
          
          <Paragraph>
            OUR TOTAL LIABILITY FOR ANY CLAIMS UNDER THESE TERMS SHALL NOT EXCEED THE GREATER OF $100 OR 
            THE AMOUNT YOU PAID US IN THE PAST SIX MONTHS. GIVEN THAT OUR SERVICE IS FREE, THAT'S PROBABLY 
            $100. YOU COULD BUY APPROXIMATELY 20 CUPS OF COFFEE WITH THAT. CHOOSE WISELY.
          </Paragraph>
          
          <LawyerNote>
            Note from Legal: The CEO wanted to cap liability at "one firm handshake and a sincere apology," 
            but we convinced them this was legally questionable.
          </LawyerNote>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>9. Governing Law <LegalIcon>👨‍⚖️</LegalIcon></SectionTitle>
          
          <Paragraph>
            These Terms shall be governed by and construed in accordance with the laws of the state of 
            [INSERT STATE], without regard to its conflict of law provisions. Unless you're reading this 
            from space, in which case space law applies (we're working on it).
          </Paragraph>
          
          <Paragraph>
            Any disputes arising out of or relating to these Terms shall be resolved exclusively in the 
            state or federal courts located in [INSERT COUNTY/CITY, STATE]. By agreeing to these Terms, 
            you consent to the jurisdiction of these courts and waive any objections to such jurisdiction. 
            If you'd prefer to settle disputes via a dance-off, we're open to discussion, but our legal 
            team has some surprisingly smooth moves.
          </Paragraph>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>10. Termination <LegalIcon>🚪</LegalIcon></SectionTitle>
          
          <Paragraph>
            We may terminate or suspend your account and bar access to our Circular Economy Marketplace 
            immediately, without prior notice or liability, under our sole discretion, for any reason 
            whatsoever and without limitation, including but not limited to a breach of the Terms.
          </Paragraph>
          
          <Paragraph>
            If you wish to terminate your account, you may simply discontinue using our website, or submit 
            a request to delete your account. Please note that even after account deletion, some information 
            may remain in our databases forever, like that embarrassing username you chose.
          </Paragraph>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>11. Updates to Terms <LegalIcon>🔄</LegalIcon></SectionTitle>
          
          <Paragraph>
            We may update these Terms at any time without notice. Changes will be effective immediately 
            upon posting to our website. Your continued use of our Marketplace after any changes to the 
            Terms constitutes your acceptance of such changes. This paragraph is basically a repeat of 
            section 1, but our lawyers get paid by the word.
          </Paragraph>
          
          <Paragraph>
            Last Updated: The day before you read this
          </Paragraph>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>12. Contact Information <LegalIcon>📞</LegalIcon></SectionTitle>
          
          <Paragraph>
            Questions about the Terms should be sent to us at: terms@circularmarketplace.example.com
          </Paragraph>
          
          <Paragraph>
            (Please note: Emails to this address will be automatically filed into a folder labeled 
            "To Read When Hell Freezes Over." For faster response, try sending a carrier pigeon or 
            telepathic message.)
          </Paragraph>
          
          <LawyerNote>
            The entire legal team contributed to these Terms of Service while consuming exactly 
            17 cups of coffee and 3 boxes of donuts. No lawyers were harmed in the making of this 
            document, though several developed carpal tunnel syndrome from typing all these disclaimers.
          </LawyerNote>
        </ContentSection>
      </PageContainer>
    </MotionContainer>
  );
};

export default TermsOfServicePage; 