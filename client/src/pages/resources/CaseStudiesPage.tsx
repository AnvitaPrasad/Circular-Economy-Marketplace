import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import PageTitle from '../../components/common/PageTitle';
import Card from '../../components/common/Card';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const CaseStudyCard = styled(motion.div)`
  height: 100%;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const CompanyLogo = styled.div<{ $bgColor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$bgColor};
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
`;

const CompanyDetails = styled.div`
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const CompanyName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Industry = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
`;

const ResultsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ResultBadge = styled.div<{ $good: boolean }>`
  background-color: ${props => props.$good ? '#81C784' : '#EF9A9A'};
  color: ${props => props.$good ? '#2E7D32' : '#C62828'};
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1.5)};
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CaseTitle = styled.h4`
  font-size: 1.1rem;
  margin: ${({ theme }) => theme.spacing(2)} 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const FullCaseLink = styled.a`
  display: block;
  text-align: right;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const caseStudies = [
  {
    companyName: "GreenWash Inc.",
    companyInitial: "G",
    bgColor: "#4CAF50",
    industry: "Bottled Water",
    title: "How We Reduced Our Plastic Use by Redesigning Our Labels (But Not The Bottles)",
    description: "GreenWash Inc. proudly reduced their environmental impact by making their plastic labels 0.01mm thinner while continuing to sell 500 million single-use plastic bottles annually. The CEO received a sustainability award that he flew to in his private jet.",
    results: [
      { text: "0.01mm thinner labels", good: true },
      { text: "500M plastic bottles sold", good: false },
      { text: "1 sustainability award", good: true },
      { text: "0 actual progress", good: false }
    ]
  },
  {
    companyName: "FutureJunk",
    companyInitial: "F",
    bgColor: "#2196F3",
    industry: "Electronics Manufacturing",
    title: "Planned Obsolescence 2.0: How We Made Our Products Recyclable (After They Break in 13 Months)",
    description: "FutureJunk revolutionized the smartphone industry by designing phones that are 'theoretically recyclable' but require sending them to a special facility in Antarctica. Meanwhile, they shortened battery life to ensure regular replacements.",
    results: [
      { text: "100% theoretically recyclable", good: true },
      { text: "0.01% actually recycled", good: false },
      { text: "13-month lifespan", good: false },
      { text: "200% profit increase", good: true }
    ]
  },
  {
    companyName: "CircleBurger",
    companyInitial: "C",
    bgColor: "#FF9800",
    industry: "Fast Food",
    title: "From Farm to Landfill: Our Journey to Compostable Packaging (That No One Composts)",
    description: "CircleBurger replaced their plastic straws with paper ones that dissolve halfway through your milkshake. They now offer compostable packaging that requires industrial composting facilities, which exist in exactly three cities nationwide.",
    results: [
      { text: "Paper straws implemented", good: true },
      { text: "Customer satisfaction down 45%", good: false },
      { text: "99.8% ends up in landfill anyway", good: false },
      { text: "Marketing budget increased", good: true }
    ]
  },
  {
    companyName: "Textilwaste",
    companyInitial: "T",
    bgColor: "#9C27B0",
    industry: "Fast Fashion",
    title: "Our 'Recycled' Clothing Collection Made From 5% Recycled Materials",
    description: "Textilwaste launched an eco-collection featuring items with at least 5% recycled polyester, which they marketed as 'revolutionary circular fashion.' They produced the collection in 52 micro-seasons to ensure customers bought new 'sustainable' clothes every week.",
    results: [
      { text: "5% recycled materials used", good: true },
      { text: "95% virgin materials used", good: false },
      { text: "Production increased 300%", good: false },
      { text: "Greenwashing awards won: 7", good: true }
    ]
  },
  {
    companyName: "CloudFume",
    companyInitial: "C",
    bgColor: "#E91E63",
    industry: "Cloud Computing",
    title: "We Offset Our Massive Carbon Footprint By Buying a Forest (That Was Already Protected)",
    description: "CloudFume's data centers consume as much electricity as a small country, so they purchased carbon offsets by 'protecting' a forest that was already a national park. They sent every customer an email about it, consuming an additional 6 tons of CO2.",
    results: [
      { text: "100% carbon neutral on paper", good: true },
      { text: "Energy consumption up 250%", good: false },
      { text: "70M emails sent about initiative", good: false },
      { text: "Customer guilt reduced", good: true }
    ]
  },
  {
    companyName: "EcoCruise",
    companyInitial: "E",
    bgColor: "#3F51B5",
    industry: "Cruise Lines",
    title: "Our New Ships Only Dump 80% of Waste Into the Ocean Instead of 100%",
    description: "EcoCruise proudly announced their new fleet that reduces ocean waste dumping by 20% while increasing the size of their ships by 40%. They installed recycling bins on the lido deck that all empty into the same garbage chute.",
    results: [
      { text: "20% waste reduction (per ton)", good: true },
      { text: "40% larger ships", good: false },
      { text: "Net pollution increased", good: false },
      { text: "Recycling theater implemented", good: true }
    ]
  }
];

const CaseStudiesPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle subtitle="Where imagination meets exaggeration">Case Studies</PageTitle>
      
      <CaseStudyGrid>
        {caseStudies.map((study, index) => (
          <CaseStudyCard 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent>
                <CompanyInfo>
                  <CompanyLogo $bgColor={study.bgColor}>{study.companyInitial}</CompanyLogo>
                  <CompanyDetails>
                    <CompanyName>{study.companyName}</CompanyName>
                    <Industry>{study.industry}</Industry>
                  </CompanyDetails>
                </CompanyInfo>
                
                <CaseTitle>{study.title}</CaseTitle>
                <Description>{study.description}</Description>
                
                <ResultsContainer>
                  {study.results.map((result, idx) => (
                    <ResultBadge key={idx} $good={result.good}>
                      {result.text}
                    </ResultBadge>
                  ))}
                </ResultsContainer>
                
                <FullCaseLink href="#">Read full case study</FullCaseLink>
              </CardContent>
            </Card>
          </CaseStudyCard>
        ))}
      </CaseStudyGrid>
    </PageContainer>
  );
};

export default CaseStudiesPage; 