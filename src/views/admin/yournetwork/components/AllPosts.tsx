// Import images temporarily
import defaultImages from './assets/defaultImages'; // Import default images
import noPostsImage from './assets/noposts.png'; // Import the no posts image

// components/AllPosts.tsx
import React from 'react';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store'; 
import { Box, Img, Spinner, Text } from '@chakra-ui/react';

interface AllPostsProps {
  category?: string;
  loading?: boolean;
  searchQuery: string; // Add searchQuery prop
}

  const AllPosts: React.FC<AllPostsProps> = ({ category,loading, searchQuery }) => {
  const posts = useSelector((state: RootState) => state.posts);


  const highlightText = (text: string, query: string) => {
    if (!query) return text; // If there's no query, return the original text
    const parts = text.split(new RegExp(`(${query})`, 'gi')); // Split text by the search query
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
    );
  };

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
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Spinner size="xl" color="green.500" />
        </Box>
      ) : filteredPosts.length === 0 ? (
        <Box display="flex" justifyContent="center" flexDir="column" alignItems="center" textAlign="center" p={5}>
          <Text fontSize="3xl" color="gray.500">Oops... There are no posts in this category.</Text>
          <Img
            height="auto"
            maxHeight="512px"
            width="100%"
            objectFit="contain"
            src={noPostsImage} // Keep your no posts image
            alt="No posts available"
            mt={4}
          />
        </Box>
      ) : (
        filteredPosts.map(post => 
          {
            console.log('Post Object:', post);
          const postImage = categoryImages[post.type] || defaultImages.products;
          const authorPicture = defaultImages.avatar;
          return(
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
              title: highlightText(post.title, searchQuery), // Highlight title
              description: highlightText(post.description, searchQuery), // Highlight description
              image: postImage,
              date: post.postDate,
            }}
          />
        )})
      )}
    </Box>
  );
};

export default AllPosts;
