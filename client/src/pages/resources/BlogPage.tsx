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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const BlogCard = styled(motion.div)`
  overflow: hidden;
  height: 100%;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
`;

const BlogImage = styled.div<{ $bgImage: string }>`
  height: 200px;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4));
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing(2)};
  left: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 1;
`;

const BlogTitle = styled.h3`
  margin: ${({ theme }) => theme.spacing(1)} 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BlogExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  line-height: 1.5;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  border-top: 1px solid #eee;
  padding-top: ${({ theme }) => theme.spacing(2)};
`;

const ReadMore = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const blogPosts = [
  {
    title: "10 Ways to Recycle Your Coffee Grounds and Still Be Dead Inside",
    excerpt: "Did you know you can use coffee grounds in your garden? Of course you did, because everyone tells you this fact like they've discovered electricity. Here are 9 more obvious tips and one that's just made up.",
    category: "Sustainability Hacks",
    date: "June 12, 2023",
    author: "Depresso Espresso",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600"
  },
  {
    title: "I Made a Sweater from My Dog's Fur and Now People Avoid Me",
    excerpt: "Yes, it's sustainable. Yes, it's free. Yes, it smells terrible when it rains. My journey into pet-based textiles and social isolation.",
    category: "DIY Disasters",
    date: "July 23, 2023",
    author: "Wooly Bully",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=600"
  },
  {
    title: "Corporate Sustainability Reports: A Masterclass in Creative Fiction",
    excerpt: "We analyze how companies manage to make shipping millions of plastic widgets sound like they're personally hugging each polar bear. Spoiler: they use the word 'journey' a lot.",
    category: "Corporate BS",
    date: "August 5, 2023",
    author: "Green Washer",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600"
  },
  {
    title: "I Built a Tiny House from Recycled Materials and Now I'm Divorced",
    excerpt: "Turns out living in 89 square feet of reclaimed pallet wood with another human being isn't the Instagram dream I was promised. At least my carbon footprint is smaller than my living space.",
    category: "Minimal Living",
    date: "September 18, 2023",
    author: "Claustrophobic Carpenter",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600"
  },
  {
    title: "5 Circular Economy Startups That Are Definitely Just Regular Companies",
    excerpt: "We interview founders who have mastered the art of rebranding normal business practices with sustainability buzzwords. Learn how 'selling stuff' became 'circular material flow facilitation'.",
    category: "Startup Satire",
    date: "October 3, 2023",
    author: "Venture Capitalist Vulture",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=600"
  },
  {
    title: "I Haven't Used Plastic for a Year and Now My Personality is 'Not Using Plastic'",
    excerpt: "My journey from regular person to someone who can't go five minutes without mentioning bamboo toothbrushes. Includes tips on how to lose friends by judging their waste management choices.",
    category: "Zero Waste",
    date: "November 11, 2023",
    author: "Smug McJudgey",
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?q=80&w=600"
  }
];

const BlogPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle subtitle="Where recycled content meets recycled jokes">Blog</PageTitle>
      
      <BlogGrid>
        {blogPosts.map((post, index) => (
          <BlogCard 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <BlogImage $bgImage={post.image}>
                <CategoryBadge>{post.category}</CategoryBadge>
              </BlogImage>
              <CardContent>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <span>{post.date} • {post.author}</span>
                  <ReadMore href="#">Read more</ReadMore>
                </BlogMeta>
              </CardContent>
            </Card>
          </BlogCard>
        ))}
      </BlogGrid>
    </PageContainer>
  );
};

export default BlogPage; 