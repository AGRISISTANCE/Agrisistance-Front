// components/MyPosts.tsx
import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import PostCard from './PostCard';

const MyPosts: React.FC = () => {
  // Fetch posts from your backend or use static data for now
  const activePosts: any[] = [
    // Active posts data
  ];

  const archivedPosts: any[] = [
    // Archived posts data
  ];

  return (
    <Box>
      {activePosts.map((post, index) => (
        <PostCard
          key={index}
          author={post.author}
          content={post.content}
          isMyPost
          onModify={() => console.log('Modify')}
          onArchive={() => console.log('Archive')}
          onDelete={() => console.log('Delete')}
        />
      ))}

      <Box mt={6} mb={6} borderBottom="2px" borderColor="gray.200" />

      {archivedPosts.map((post, index) => (
        <PostCard
          key={index}
          author={post.author}
          content={post.content}
          isMyPost
          isArchived
          onModify={() => console.log('Modify')}
          onArchive={() => console.log('Repost')}
          onDelete={() => console.log('Delete')}
        />
      ))}

      <Button colorScheme="teal" mt={4} onClick={() => console.log('Add New Post')}>
        + Add New Post
      </Button>
    </Box>
  );
};

export default MyPosts;
