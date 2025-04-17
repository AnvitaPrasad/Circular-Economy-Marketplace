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

const GuideSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
`;

const Introduction = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  font-size: 1.1rem;
`;

const Subsection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const SubsectionTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary.dark};
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

const TipBox = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.light + '20'}; // 20% opacity
  border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  border-radius: 4px;
`;

const SustainabilityGuidePage: React.FC = () => {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="Slightly better than nothing">Sustainability Guide</PageTitle>
        
        <Introduction>
          <p>
            Welcome to our Sustainability Guide, where we pretend to know how to save the planet 
            while still consuming way too much stuff. Follow these tips to feel slightly better 
            about your environmental impact without making any significant lifestyle changes!
          </p>
        </Introduction>
        
        <GuideSection>
          <SectionTitle>1. Reduce, Reuse, Recycle (In That Order, But We Know You'll Skip To #3)</SectionTitle>
          
          <Subsection>
            <SubsectionTitle>Reduce</SubsectionTitle>
            <Paragraph>
              The most effective way to decrease your environmental footprint is to simply consume less. 
              But that's no fun and definitely not good for the economy, so let's move on to more 
              Instagram-friendly options!
            </Paragraph>
            
            <TipBox>
              <Paragraph>
                <strong>Pro Tip:</strong> Tell everyone you're "minimalist" while still buying new things, 
                just in neutral colors and more expensive versions.
              </Paragraph>
            </TipBox>
          </Subsection>
          
          <Subsection>
            <SubsectionTitle>Reuse</SubsectionTitle>
            <Paragraph>
              Give your items a second life by reusing them. This works particularly well for:
            </Paragraph>
            
            <List>
              <li>That tote bag collection taking over your closet (just add another!)</li>
              <li>Glass jars (perfect for storing more things you'll eventually throw away)</li>
              <li>Shipping boxes (until they become too embarrassing to keep in your home)</li>
              <li>Single-use plastic containers (until they warp in the dishwasher)</li>
            </List>
          </Subsection>
          
          <Subsection>
            <SubsectionTitle>Recycle</SubsectionTitle>
            <Paragraph>
              Recycling is what we all default to when we're too lazy to reduce or reuse. Just toss it in 
              the blue bin and let someone else figure it out! Remember, recycling absolves you of all guilt, 
              even if only 9% of plastic ever actually gets recycled.
            </Paragraph>
            
            <TipBox>
              <Paragraph>
                <strong>Pro Tip:</strong> Don't bother checking if something is actually recyclable in your area. 
                That's what we call "wishcycling" and it keeps recycling workers entertained!
              </Paragraph>
            </TipBox>
          </Subsection>
        </GuideSection>
        
        <GuideSection>
          <SectionTitle>2. Sustainable Materials (That Are Still Terrible For The Environment)</SectionTitle>
          
          <Paragraph>
            Look for these buzzwords on products to feel better about your purchases:
          </Paragraph>
          
          <List>
            <li><strong>Bamboo:</strong> Grows quickly, but is often processed with harsh chemicals and shipped across the world.</li>
            <li><strong>Organic Cotton:</strong> Uses less pesticides but still requires massive amounts of water.</li>
            <li><strong>Recycled Polyester:</strong> Made from plastic bottles that will now shed microplastics for eternity!</li>
            <li><strong>Bioplastic:</strong> Compostable in industrial facilities that probably don't exist near you.</li>
            <li><strong>Vegan Leather:</strong> AKA plastic that will outlive your great-grandchildren.</li>
          </List>
        </GuideSection>
        
        <GuideSection>
          <SectionTitle>3. Circular Economy (A Fancy Way To Say "Sell Your Old Stuff")</SectionTitle>
          
          <Paragraph>
            Participate in the circular economy by:
          </Paragraph>
          
          <List>
            <li>Selling your barely used items on Marketplace (so someone else can barely use them)</li>
            <li>Buying second-hand (but only the good stuff from rich neighborhoods)</li>
            <li>Renting clothes you'll wear once (which are then shipped back and forth across the country)</li>
            <li>Using our platform to find materials that would otherwise go to waste (our actual good suggestion)</li>
          </List>
          
          <TipBox>
            <Paragraph>
              <strong>Pro Tip:</strong> The circular economy works best when you participate by buying new things 
              that promise to be recyclable in 50 years when the technology catches up.
            </Paragraph>
          </TipBox>
        </GuideSection>
        
        <GuideSection>
          <SectionTitle>4. Carbon Offsets (Pay To Make The Guilt Go Away)</SectionTitle>
          
          <Paragraph>
            Can't give up your private jet lifestyle? Just pay for some trees to be planted somewhere! 
            Carbon offsets are the modern equivalent of medieval indulgences, letting you buy your way 
            out of climate sin.
          </Paragraph>
          
          <Paragraph>
            The best part about carbon offsets is that they're completely unregulated, so you can choose 
            the cheapest option without any real verification that they're doing anything at all!
          </Paragraph>
        </GuideSection>
        
        <GuideSection>
          <SectionTitle>5. Conclusion: It's The Thought That Counts</SectionTitle>
          
          <Paragraph>
            Remember, sustainability is all about making yourself feel better while continuing to live 
            basically the same lifestyle. The most important thing is to lecture others about their 
            choices while making minimal changes yourself.
          </Paragraph>
          
          <Paragraph>
            For actual sustainability, consider using our marketplace to find and trade recovered materials 
            that would otherwise go to waste. It won't save the planet, but it's a start that's slightly 
            better than buying everything new.
          </Paragraph>
        </GuideSection>
      </PageContainer>
    </MotionContainer>
  );
};

export default SustainabilityGuidePage; 