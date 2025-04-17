import React, { useState } from 'react';
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

const FaqSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
`;

const FaqItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
`;

const QuestionButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ $isOpen, theme }) => 
    $isOpen ? theme.colors.primary.light : 'transparent'};
  color: ${({ $isOpen, theme }) => 
    $isOpen ? theme.colors.primary.dark : theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background-color: ${({ theme, $isOpen }) => 
      $isOpen ? theme.colors.primary.light : 'rgba(0, 0, 0, 0.03)'};
  }
  
  &:focus {
    outline: none;
  }
`;

const Icon = styled.span<{ $isOpen: boolean }>`
  font-size: 1.5rem;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
`;

const Answer = styled(motion.div)`
  padding: 0 ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const faqData = [
  {
    section: "General Questions",
    items: [
      {
        question: "What exactly is a circular economy?",
        answer: "It's what happens when PowerPoint presentations from consulting firms come to life. Imagine a regular economy, but with more arrows going in circles, and executives feeling very pleased with themselves for reinventing the concept of 'reusing stuff'."
      },
      {
        question: "Is this the same as recycling?",
        answer: "No, it's MUCH fancier than recycling. Recycling is what your grandmother does with glass jars. A circular economy is what Silicon Valley startups do with glass jars but with an app, blockchain technology, and a $50 million Series A funding round."
      },
      {
        question: "How can I explain circular economy to my friends?",
        answer: "Just say 'it's like recycling, but make it fashion.' Then use words like 'paradigm shift,' 'systems thinking,' and 'regenerative design' until they either nod in agreement or walk away. Either outcome is acceptable."
      }
    ]
  },
  {
    section: "Platform Questions",
    items: [
      {
        question: "Is your platform actually helping the environment?",
        answer: "Our digital platform consumes about as much energy as a small country, but we offset this by posting really nice nature photos on our Instagram. So yes, technically."
      },
      {
        question: "Do you have an app?",
        answer: "We have three apps actually, none of which work properly. Our development team assures us this is 'by design' and part of our 'iterative approach.' We suggest using our mobile website instead, which is just our desktop site but smaller and more frustrating."
      },
      {
        question: "How do I delete my account?",
        answer: "That's the neat part - you don't! Just kidding (legal made us add this part). You can delete your account by sending a handwritten letter to our headquarters, performing a ritual at midnight, and then navigating through 17 confirmation screens designed to make you give up halfway through."
      }
    ]
  },
  {
    section: "Technical Questions",
    items: [
      {
        question: "I found a bug on your website",
        answer: "No you didn't. That's a feature! But if you insist on calling it a 'bug,' please submit detailed documentation including screenshots, screen recordings, your operating system, browser version, astrological sign, and mother's maiden name to our support team who will promptly mark it as 'won't fix'."
      },
      {
        question: "Do you offer API access?",
        answer: "Yes! Our API is documented on a series of Post-it notes stuck to our lead developer's monitor. For access, simply email api@example.com and wait 3-6 business months for a response. Our API is RESTful in the sense that our developers need a lot of rest after building it."
      },
      {
        question: "Is your website carbon neutral?",
        answer: "We've placed a small potted plant next to our server, which we believe makes it carbon negative. In fact, according to our math (which no one has verified), simply viewing our website actually removes greenhouse gases from the atmosphere. You're welcome!"
      }
    ]
  }
];

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<{[key: string]: boolean}>({});
  
  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const isItemOpen = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    return !!openItems[key];
  };
  
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <PageTitle subtitle="Questions nobody asked, answered with questionable accuracy">
          Frequently Asked Questions
        </PageTitle>
        
        <Introduction>
          <p>
            Welcome to our FAQ section, where we've preemptively answered all the questions 
            you might have if you were a slightly different person with completely different concerns. 
            If your actual question isn't answered here, that's probably your fault.
          </p>
        </Introduction>
        
        {faqData.map((section, sectionIndex) => (
          <FaqSection key={sectionIndex}>
            <SectionTitle>{section.section}</SectionTitle>
            
            {section.items.map((item, itemIndex) => (
              <FaqItem 
                key={itemIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: itemIndex * 0.1 }}
              >
                <QuestionButton 
                  $isOpen={isItemOpen(sectionIndex, itemIndex)}
                  onClick={() => toggleItem(sectionIndex, itemIndex)}
                  aria-expanded={isItemOpen(sectionIndex, itemIndex)}
                >
                  {item.question}
                  <Icon $isOpen={isItemOpen(sectionIndex, itemIndex)}>+</Icon>
                </QuestionButton>
                
                {isItemOpen(sectionIndex, itemIndex) && (
                  <Answer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </Answer>
                )}
              </FaqItem>
            ))}
          </FaqSection>
        ))}
      </PageContainer>
    </MotionContainer>
  );
};

export default FAQPage; 