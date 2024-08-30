// components/AllPosts.tsx
import React from 'react';
import PostCard from './PostCard';

interface AllPostsProps {
  category?: string;
}

const AllPosts: React.FC<AllPostsProps> = ({ category }) => {
  // Fetch posts from your backend or use static data for now
  const posts = [
    {
      author: {
        profilePicture: '/path/to/profile.jpg',
        name: 'John Doe',
        country: 'USA',
        phoneNumber: '+1 123 456 7890',
      },
      content: {
        category: category || 'General',
        title: 'Sample Post Title',
        description: 'This is a description of the post.',
        image: '/path/to/image.jpg',
        date: '1h ago',
      },
    },
    // More posts...
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
