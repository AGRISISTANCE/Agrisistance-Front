// components/AllPosts.tsx
import React from 'react';
import PostCard from './PostCard';
import farmerImage from './farmer.jpg';
import toolImage from './tool.jpg';
import landImage from './land.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store'; 

interface AllPostsProps {
  category?: string;
}

const AllPosts: React.FC<AllPostsProps> = ({ category }) => {
  const posts = useSelector((state: RootState) => state.posts);


  // Check posts here
  console.log('Current Posts State:', posts);

  return (
    <div>
      {posts
        .filter(post => post.type === (category || post.type)) // Filter by category if provided
        .map(post => (
          <PostCard
            key={post.postID}
            author={{
              profilePicture: post.image, // Assuming the first image is the profile picture
              name: post.authorName,
              country: post.authorCountry,
              phoneNumber: post.authorPhoneNumber,
            }}
            content={{
              category: post.type,
              title: post.title,
              description: post.description,
              image: post.image, // Assuming the first image is the main content image
              date: post.postDate,
            }}
          />
        ))}
    </div>
  );
};

export default AllPosts;
