import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled(motion.section)`
  margin-bottom: 4rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin-bottom: 1.5rem;
`;

const TextContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.5;
`;

const AboutPage: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>About Our Circular Economy Marketplace</Title>
          <Subtitle>
            Connecting businesses to create sustainable supply chains and reduce waste through
            resource optimization and material reuse.
          </Subtitle>
        </motion.div>
      </Header>

      <Section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SectionTitle>Our Mission</SectionTitle>
        <TextContent>
          Our marketplace is built on the principles of the circular economy, where waste is
          minimized and resources are kept in use for as long as possible. We provide a platform
          for businesses to connect, trade recovered materials, and collaborate on creating
          closed-loop supply chains that benefit both the environment and the bottom line.
        </TextContent>
        <TextContent>
          By facilitating these connections, we aim to reduce the environmental impact of
          industrial processes, create new economic opportunities, and foster innovation in
          sustainable business practices.
        </TextContent>
      </Section>

      <Section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <SectionTitle>Key Benefits</SectionTitle>
        <Grid>
          <Card
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <CardTitle>Environmental Impact</CardTitle>
            <CardText>
              Reduce waste sent to landfills, cut greenhouse gas emissions, and preserve
              natural resources by keeping materials in circulation.
            </CardText>
          </Card>

          <Card
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <CardTitle>Economic Opportunities</CardTitle>
            <CardText>
              Create new revenue streams from waste materials, reduce disposal costs,
              and potentially lower material sourcing expenses.
            </CardText>
          </Card>

          <Card
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <CardTitle>Innovation & Collaboration</CardTitle>
            <CardText>
              Foster partnerships that drive innovation in product design,
              manufacturing processes, and business models.
            </CardText>
          </Card>
        </Grid>
      </Section>

      <Section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <SectionTitle>How It Works</SectionTitle>
        <TextContent>
          Our platform connects material suppliers (those with excess or waste materials)
          with buyers who can use these materials in their own processes. We provide
          tools for listing materials, finding opportunities, arranging transport,
          and tracking the impact of these exchanges.
        </TextContent>
        <TextContent>
          We also offer resources and support to help businesses transition to more
          circular models, including guidance on material recovery, process optimization,
          and product design for circularity.
        </TextContent>
      </Section>
    </PageContainer>
  );
};

export default AboutPage; 