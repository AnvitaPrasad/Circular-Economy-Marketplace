import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageTitle from '../../components/common/PageTitle';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(2)}`};
`;

// Create a motion wrapper for the page
const MotionContainer = styled(motion.div)`
  width: 100%;
`;

const PolicyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PolicyCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const RegionFlag = styled.div`
  padding: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  display: inline-block;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const PolicyTitle = styled.h3`
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PolicyType = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-style: italic;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  flex-grow: 1;
`;

const KeyPoints = styled.ul`
  margin-top: ${({ theme }) => theme.spacing(1)};
  padding-left: ${({ theme }) => theme.spacing(2)};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  }
`;

const EffectiveDate = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.disabled};
`;

const LearnMoreLink = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const Introduction = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
};

// Sample policies data
const policies = [
  {
    region: 'European Union',
    title: 'Circular Economy Action Plan',
    type: 'Framework Policy',
    description: 'A comprehensive policy framework that aims to accelerate the transition towards a circular economy in the EU by promoting sustainable resource use, waste reduction, and product lifecycle extension.',
    keyPoints: [
      'Sustainable product design',
      'Waste reduction targets',
      'Extended producer responsibility',
      'Consumer empowerment'
    ],
    effectiveDate: 'March 2020',
    link: 'https://environment.ec.europa.eu/strategy/circular-economy-action-plan_en'
  },
  {
    region: 'United States',
    title: 'Save Our Seas 2.0 Act',
    type: 'Legislation',
    description: 'Focuses on reducing plastic waste and improving recycling through research, innovation, and international cooperation.',
    keyPoints: [
      'Marine debris prevention',
      'Recycling infrastructure improvement',
      'Waste management enhancement',
      'International cooperation'
    ],
    effectiveDate: 'December 2020',
    link: 'https://www.congress.gov/bill/116th-congress/senate-bill/1982'
  },
  {
    region: 'China',
    title: 'Circular Economy Promotion Law',
    type: 'National Law',
    description: 'A comprehensive legal framework for promoting circular economy practices across industrial sectors, focusing on resource conservation and waste reduction.',
    keyPoints: [
      'Resource efficiency requirements',
      'Industrial park integration',
      'Extended producer responsibility',
      'Financial incentives for compliance'
    ],
    effectiveDate: 'January 2009 (Amended 2018)',
    link: 'http://www.lawinfochina.com/display.aspx?id=7025&lib=law'
  },
  {
    region: 'Japan',
    title: 'Fundamental Law for Establishing a Sound Material-Cycle Society',
    type: 'Framework Law',
    description: 'Establishes a legal framework for transitioning to a circular economy through waste hierarchy principles and resource efficiency.',
    keyPoints: [
      '3R principle (Reduce, Reuse, Recycle)',
      'Material flow accounting',
      'Extended producer responsibility',
      'Green purchasing mandates'
    ],
    effectiveDate: 'January 2001',
    link: 'https://www.env.go.jp/en/laws/recycle/12.pdf'
  },
  {
    region: 'France',
    title: 'Anti-Waste Law for a Circular Economy',
    type: 'National Law',
    description: 'Comprehensive legislation that bans single-use plastics, prevents waste, and promotes reuse and recycling across multiple sectors.',
    keyPoints: [
      'Single-use plastic ban',
      'Mandatory repairability index',
      'Product lifecycle extension',
      'End of unsold inventory destruction'
    ],
    effectiveDate: 'February 2020',
    link: 'https://www.ecologie.gouv.fr/loi-anti-gaspillage-economie-circulaire-1'
  },
  {
    region: 'United Kingdom',
    title: 'Resources and Waste Strategy',
    type: 'National Strategy',
    description: 'A long-term strategy for waste management and resource efficiency, focusing on plastic pollution, food waste, and the circular economy.',
    keyPoints: [
      'Extended producer responsibility',
      'Consistent recycling collections',
      'Deposit return scheme',
      'Plastic packaging tax'
    ],
    effectiveDate: 'December 2018',
    link: 'https://www.gov.uk/government/publications/resources-and-waste-strategy-for-england'
  }
];

const PoliciesPage: React.FC = () => {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="Learn about key regulations shaping the circular economy globally">
          Circular Economy Policies & Regulations
        </PageTitle>
        
        <Introduction>
          <p>
            Policies and regulations play a crucial role in accelerating the transition to a circular economy by creating the necessary legal frameworks, 
            incentives, and standards. Below are key policies from around the world that are shaping the circular economy landscape.
          </p>
        </Introduction>
        
        <PolicyGrid 
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {policies.map((policy, index) => (
            <PolicyCard key={index} variants={cardVariants}>
              <CardContent>
                <RegionFlag>{policy.region}</RegionFlag>
                <PolicyTitle>{policy.title}</PolicyTitle>
                <PolicyType>{policy.type}</PolicyType>
                <Description>{policy.description}</Description>
                
                <div>
                  <strong>Key points:</strong>
                  <KeyPoints>
                    {policy.keyPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </KeyPoints>
                </div>
                
                <EffectiveDate>Effective: {policy.effectiveDate}</EffectiveDate>
                <LearnMoreLink href={policy.link} target="_blank" rel="noopener noreferrer">
                  Learn more →
                </LearnMoreLink>
              </CardContent>
            </PolicyCard>
          ))}
        </PolicyGrid>
      </PageContainer>
    </MotionContainer>
  );
};

export default PoliciesPage; 