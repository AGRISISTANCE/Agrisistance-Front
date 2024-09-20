// Import images temporarily
import defaultImages from './assets/defaultImages'; // Import default images
import noPostsImage from './assets/noposts.png'; // Import the no posts image

// components/AllPosts.tsx
import React from 'react';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store'; 
import { Box, Img } from '@chakra-ui/react';

interface AllPostsProps {
  category?: string;
}

const AllPosts: React.FC<AllPostsProps> = ({ category }) => {
  const posts = useSelector((state: RootState) => state.posts);


  const categoryImages: Record<string, string> = {
    businessPromotion: defaultImages.business,
    opportunitiesAndPartnership: defaultImages.partner,
    resourcesAndProducts: defaultImages.products,
  };

  // Check posts here
  console.log('Current Posts State:', posts);

  // Filter posts by category
  const filteredPosts = posts.filter(post => post.type === (category || post.type));

  return (
    <div>
      {filteredPosts.length === 0 ? (
        <Box display="flex" justifyContent="center" flexDir="column" alignItems="center" textAlign="center">
          <h1>Oops... There are no posts in this category.</h1>
          <Img
            height="auto" // Maintain aspect ratio
            maxHeight="512px" // Set a max height
            width="100%" // Full width
            objectFit="contain" // Ensure the image scales without stretching
            src={noPostsImage}
            alt="No posts available"
          />
      </Box>
      ) : (
        filteredPosts.map(post => {
          console.log('Post Object:', post);
          // Get the default image for the post type
          const postImage = categoryImages[post.type] || defaultImages.products;

          // Use the default avatar if no author picture is provided
          const authorPicture = defaultImages.avatar;

          return (
            <PostCard
              key={post.postID}
              author={{
                profilePicture: authorPicture,
                name: post.authorName,
                country: post.authorCountry,
                phoneNumber: post.authorPhoneNumber,
              }}
              content={{
                category: post.type,
                title: post.title,
                description: post.description,
                image: postImage,
                date: post.postDate,
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default AllPosts;
