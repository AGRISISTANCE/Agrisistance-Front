// components/PostCard.tsx
import React, { ReactNode } from 'react';
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
    title: ReactNode; // Changed from string to ReactNode
    description: ReactNode; // Changed from string to ReactNode
    // title: string;
    // description: string;
    image: string;
    date: string;
  };
  isMyPost?: boolean;
  isArchived?: boolean;
  onModify?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onRepost?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  isMyPost,
  isArchived,
  onModify,
  onArchive,
  onDelete,
  onRepost,
}) => {
  return (
    <Box
      p={4}
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
      borderWidth="1px"
      borderRadius="md"
      mb={4}
    >
      <Flex align="stretch">
        {/* Author Information */}
        {/* <Box flex="1" maxW="30%" pr={4}>
          <Image borderRadius="full" boxSize="120px" src={author.profilePicture} alt={author.name} />
          <Text mt={2} fontWeight="bold" fontSize="3xl">{author.name}</Text>
          <Text fontSize="xl">{author.country}</Text>
          <Text fontSize="xl">{author.phoneNumber}</Text>
        </Box> */}
        <Box display="flex" alignItems="center" minW="30%" maxW="30%"> {/* Align items vertically */}
          <Image
            borderRadius="full"
            boxSize="120px"
            src={author.profilePicture}
            alt={author.name}
            mr={4} // Margin right for spacing
          />
          <Box flex="1"> {/* Adjust max width as needed */}
            <Text fontWeight="bold" fontSize="2xl" color="black">
              {author.name}
            </Text>
            <Text fontSize="xl" color="gray.400">
              {author.country}
            </Text>
            <Text fontSize="xl" color="#2ACC32">
              {author.phoneNumber}
            </Text>
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          borderColor="gray.600"
          borderWidth="2px"
          height="auto" // or set a fixed height if needed
          mx={4} // Optional: to add horizontal spacing
        />


        {/* Post Content */}
        <Box flex="2" pl={4}>
          <Box as="span" bg="#2ACC32" color="white" p={2} borderRadius="md" my={4}>
            <Text as="span" fontWeight="bold" fontSize="xl" color="white">{content.category}</Text>
          </Box>
          <Text fontSize="2xl" fontWeight="bold" my={2}>{content.title}</Text>
          <Text mb={2}>{content.description}</Text>
          {content.image && (
            <Box overflow="hidden" borderRadius="md" mb={2}>
              <Image
                src={content.image}
                alt={content.title as string}
                maxW="50%"
                height="auto"
                // objectFit="cover"
              />
            </Box>
          )}
          <Text mt={2} fontSize="sm" color="gray.500">{content.date}</Text>
        </Box>
      </Flex>

      {isMyPost && (
        <>
          <Divider my={4} />
          <Flex justifyContent="space-between">
            <Button onClick={onModify} colorScheme="blue">Modify</Button>
            <Button onClick={isArchived ? onRepost : onArchive} colorScheme={isArchived ? "green" : "yellow"}>
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
