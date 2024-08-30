// components/AllPosts.tsx
import React from 'react';
import PostCard from './PostCard';
import farmerImage from './farmer.jpg';
import toolImage from './tool.jpg';
import landImage from './land.jpg';

interface AllPostsProps {
  category?: string;
}

const AllPosts: React.FC<AllPostsProps> = ({ category }) => {
  const posts = [
    {
      author: {
        profilePicture: farmerImage,
        name: 'John Doe',
        country: 'USA',
        phoneNumber: '+1 123 456 7890',
      },
      content: {
        category: category || 'General',
        title: 'Organic Farming Techniques',
        description: 'Learn about the latest organic farming techniques to boost your yield.',
        image: toolImage,
        date: '1h ago',
      },
    },
    {
      author: {
        profilePicture: farmerImage,
        name: 'Jane Smith',
        country: 'Canada',
        phoneNumber: '+1 987 654 3210',
      },
      content: {
        category: category || 'General',
        title: 'Agricultural Machinery for Sale',
        description: 'Top-quality machinery at unbeatable prices. Get yours today!',
        image: landImage,
        date: '30/08/2024',
      },
    },
  ];

  return (
    <div>
      {posts.map((post, index) => (
        <PostCard key={index} author={post.author} content={post.content} />
      ))}
    </div>
  );
};

export default AllPosts;
