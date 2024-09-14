//Importing temporal pictures
import farmer from './farmer.jpg'
import land from './land.jpg'
import tool from './tool.jpg'

// components/PostCard.tsx
import React from 'react';
import { Box, Text, Image, Flex, Button, Divider } from '@chakra-ui/react';

interface PostCardProps {
  author: {
    profilePicture: string;
    name: string;
    country: string;
    phoneNumber: string;
  };
  content: {
    category: string;
    title: string;
    description: string;
    image: string;
    date: string;
  };
  isMyPost?: boolean;
  isArchived?: boolean;
  onModify?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  isMyPost,
  isArchived,
  onModify,
  onArchive,
  onDelete,
}) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
      <Flex>
        {/* Author Information */}
        <Box flex="1" maxW="30%">
          <Image borderRadius="full" boxSize="50px" src={author.profilePicture} alt={author.name} />
          <Text mt={2} fontWeight="bold">{author.name}</Text>
          <Text>{author.country}</Text>
          <Text>{author.phoneNumber}</Text>
        </Box>

        {/* Post Content */}
        <Box flex="2" ml={4}>
          <Text fontWeight="bold">{content.category}</Text>
          <Text fontSize="xl">{content.title}</Text>
          <Text>{content.description}</Text>
          {content.image && <Image mt={2} src={content.image} alt={content.title} />}
          <Text mt={2} fontSize="sm" color="gray.500">{content.date}</Text>
        </Box>
      </Flex>

      {isMyPost && (
        <>
          <Divider my={4} />
          <Flex justifyContent="space-between">
            <Button onClick={onModify} colorScheme="blue">Modify</Button>
            <Button onClick={onArchive} colorScheme={isArchived ? "green" : "yellow"}>
              {isArchived ? "Repost" : "Archive"}
            </Button>
            <Button onClick={onDelete} colorScheme="red">Delete</Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default PostCard;
