// components/MyPosts.tsx
import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PostCard from './PostCard';
import AddNewPostModal from './AddNewPostModal';
import farmerImage from './farmer.jpg';
import toolImage from './tool.jpg';
import landImage from './land.jpg';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../redux/store'; // Adjust the import based on your store setup

const MyPosts: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const posts = useSelector((state: RootState) => state.posts);
  const user = useSelector((state: RootState) => state.user);
  
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const activePosts = posts.filter(post => post.authorId === user.userId && post.active);
  const archivedPosts = posts.filter(post => post.authorId === user.userId && !post.active);

  return (
    <Box>
      {activePosts.map(post => (
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
            title: post.Title,
            description: post.Description,
            image: post.image, // Assuming the first image is the main content image
            date: post.postDate,
          }}
          isMyPost
          onModify={() => openModal()}
          onArchive={() => console.log('Archive')}
          onDelete={() => console.log('Delete')}
        />
      ))}

      <Box mt={6} mb={6} borderBottom="2px" borderColor="gray.200" />

      {archivedPosts.map(post => (
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
            title: post.Title,
            description: post.Description,
            image: post.image, // Assuming the first image is the main content image
            date: post.postDate,
          }}
          isMyPost
          isArchived
          onModify={() => console.log('Modify')}
          onArchive={() => console.log('Repost')}
          onDelete={() => console.log('Delete')}
        />
      ))}

      <Button colorScheme="teal" mt={4} onClick={openModal}>
        + Add New Post
      </Button>

      <AddNewPostModal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
  );
};

export default MyPosts;
