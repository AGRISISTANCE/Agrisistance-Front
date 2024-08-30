// components/MyPosts.tsx
import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PostCard from './PostCard';
import AddNewPostModal from './AddNewPostModal';
import farmerImage from './farmer.jpg';
import toolImage from './tool.jpg';


const MyPosts: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (post: any) => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const activePosts: any[] = [
    {
      author: {
        profilePicture: farmerImage,
        name: 'Alice Johnson',
        country: 'Kenya',
        phoneNumber: '+254 700 123456',
      },
      content: {
        category: 'Business Promotion',
        title: 'Promoting Sustainable Agriculture',
        description: 'Join us in promoting sustainable agriculture practices in Kenya.',
        image: toolImage,
        date: '2 days ago',
      },
    },
  ];

  const archivedPosts: any[] = [
    {
      author: {
        profilePicture: farmerImage,
        name: 'Bob Williams',
        country: 'South Africa',
        phoneNumber: '+27 123 456789',
      },
      content: {
        category: 'Products and Resources',
        title: 'Affordable Irrigation Systems',
        description: 'Find the best deals on irrigation systems for your farm.',
        image: toolImage,
        date: '01/08/2024',
      },
    },
  ];

  return (
    <Box>
      {activePosts.map((post, index) => (
        <PostCard
          key={index}
          author={post.author}
          content={post.content}
          isMyPost
          onModify={() => openModal(post)}
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

      <Button colorScheme="teal" mt={4} onClick={openModal}>
        + Add New Post
      </Button>

      <AddNewPostModal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
  );
};

export default MyPosts;
