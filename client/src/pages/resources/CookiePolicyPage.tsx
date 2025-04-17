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
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
`;

const SubsectionTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary.main};
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

const HighlightBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-left: 4px solid ${({ theme }) => theme.colors.warning.main};
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  border-radius: 4px;
`;

const CookieIcon = styled.span`
  font-size: 1.2rem;
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const SmallNote = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.disabled};
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-style: italic;
`;

const CookiePolicyPage: React.FC = () => {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="Just accept them already">
          Cookie Policy
        </PageTitle>
        
        <Introduction>
          <p>
            This Cookie Policy explains how we use digital cookies on our website, and why
            we've created a whole policy for something that could have been explained in a sentence: 
            "We track everything you do." But that would be too straightforward and honest, so here's 
            3,000 words instead.
          </p>
        </Introduction>
        
        <HighlightBox>
          <Paragraph>
            <CookieIcon>🍪</CookieIcon> By continuing to use our website, you tacitly agree to our 
            use of cookies in exchange for services that were free anyway. If you don't like it, 
            you're welcome to leave and miss out on all the circular economy goodness. 
            Your choice! (But not really.)
          </Paragraph>
        </HighlightBox>
        
        <ContentSection>
          <SectionTitle>1. What Are Cookies? <CookieIcon>🍪</CookieIcon></SectionTitle>
          
          <Paragraph>
            Cookies are small text files placed on your device when you visit our website. 
            They're like digital breadcrumbs that help us track your journey through our site, 
            except unlike Hansel and Gretel, you can't follow them back home to privacy. 
            Cookies remember information about your visit, like what pages you looked at, 
            how long you looked at them, and whether you were wearing pants at the time (okay, not that last one...yet).
          </Paragraph>
          
          <Paragraph>
            Some cookies expire when you close your browser (session cookies), while others 
            stay on your device until they expire or you delete them (persistent cookies). 
            Think of session cookies as one-night stands and persistent cookies as the 
            ex who just won't go away.
          </Paragraph>
          
          <SmallNote>
            Note: Cookies are not actual cookies. We know that's disappointing. We're also disappointed.
          </SmallNote>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>2. Types of Cookies We Use <CookieIcon>🍪</CookieIcon></SectionTitle>
          
          <Paragraph>
            We use a smorgasbord of cookies on our website:
          </Paragraph>
          
          <SubsectionTitle>Absolutely Essential Cookies</SubsectionTitle>
          <Paragraph>
            These cookies are "essential" for the website to function, which is why we pre-check this 
            option in your consent form and make it impossible to uncheck. They help with things like 
            logging in and remembering items in your cart.
          </Paragraph>
          
          <SubsectionTitle>Performance Cookies (For Our Performance, Not Yours)</SubsectionTitle>
          <Paragraph>
            These cookies collect information about how you use our website, like which pages you visit 
            and if you experience any errors. We use this information to "improve the user experience," 
            which primarily means figuring out how to make you stay longer and click more things.
          </Paragraph>
          
          <SubsectionTitle>Targeting/Advertising Cookies (The Money Makers)</SubsectionTitle>
          <Paragraph>
            These cookies track your browsing habits so we can show you ads that you'll probably ignore anyway. 
            They remember what you've looked at, both on our site and others, to build a creepily accurate 
            profile of your interests. We share this data with advertisers who will then haunt you across 
            the internet with ads for products you looked at once, three weeks ago, by accident.
          </Paragraph>
          
          <SubsectionTitle>Third-Party Cookies (The Cookie Monster's Buffet)</SubsectionTitle>
          <Paragraph>
            These are cookies placed by our "trusted partners," which is corporate speak for "random companies 
            we sell your data to." These might include social media platforms, analytics services, and advertising 
            networks. We have absolutely no idea what they do with your data once they have it, but we're 
            sure it's fine.
          </Paragraph>
          
          <SubsectionTitle>Zombie Cookies</SubsectionTitle>
          <Paragraph>
            These cookies resurrect themselves after being deleted. Just kidding! (But not really; these exist, 
            though we pinky-promise we don't use them... unless we do.)
          </Paragraph>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>3. Why We Love Cookies <CookieIcon>🍪</CookieIcon></SectionTitle>
          
          <List>
            <li>
              <b>To "Remember Your Preferences":</b> Like remembering that you already clicked "no" to our 
              newsletter popup, so we can show it to you again tomorrow anyway.
            </li>
            <li>
              <b>To "Analyze Our Website Performance":</b> So we can see how many people abandon our 
              checkout page when they see the shipping costs.
            </li>
            <li>
              <b>To "Provide Personalized Experiences":</b> By showing you products similar to ones you've already 
              looked at, creating the illusion that we're reading your mind.
            </li>
            <li>
              <b>To "Improve Our Marketing":</b> By figuring out which ads make you click, so we can show you more of those.
            </li>
            <li>
              <b>To "Monetize Our Free Services":</b> The real reason for all of this. Nothing is ever truly free.
            </li>
          </List>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>4. Your Cookie Choices (Limited Though They May Be) <CookieIcon>🍪</CookieIcon></SectionTitle>
          
          <Paragraph>
            You can manage cookies in several ways:
          </Paragraph>
          
          <List>
            <li>
              <b>Browser Settings:</b> You can change your browser settings to block cookies, though this 
              will break approximately 97% of websites, including ours.
            </li>
            <li>
              <b>Our Cookie Banner:</b> You can click through our intentionally confusing cookie consent 
              banner. Pro tip: The "Accept All" button is big and colorful while the "Manage Preferences" 
              button is tiny and gray for a reason.
            </li>
            <li>
              <b>Delete Your Cookies:</b> You can regularly delete your cookies, but they'll come back as 
              soon as you revisit our site, like a digital game of whack-a-mole that you will inevitably lose.
            </li>
            <li>
              <b>Use Incognito Mode:</b> You can browse in incognito mode, but we both know that's not 
              what you typically use it for.
            </li>
            <li>
              <b>Abandon Technology and Live in the Woods:</b> The only 100% effective method.
            </li>
          </List>
          
          <HighlightBox>
            <Paragraph>
              <CookieIcon>⚠️</CookieIcon> If you disable cookies, certain features of our website may not work, 
              like the "remember me" function, your shopping cart, and probably a bunch of other things we'll 
              blame on your cookie settings when they break.
            </Paragraph>
          </HighlightBox>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>5. Updates to This Cookie Policy <CookieIcon>🍪</CookieIcon></SectionTitle>
          
          <Paragraph>
            We may update this Cookie Policy whenever we feel like it, probably to add more cookies or to make 
            our explanations even more vague. We'll update the "Last Updated" date at the bottom of this page, 
            which nobody checks. Your continued use of our website means you accept these changes, even if you 
            have no idea they happened.
          </Paragraph>
          
          <Paragraph>
            Last Updated: When our legal team last had nothing better to do
          </Paragraph>
          
          <SmallNote>
            Fun Fact: The average internet user encounters over 34,000 cookie notices per year and ignores all of them.
          </SmallNote>
        </ContentSection>
      </PageContainer>
    </MotionContainer>
  );
};

export default CookiePolicyPage; 