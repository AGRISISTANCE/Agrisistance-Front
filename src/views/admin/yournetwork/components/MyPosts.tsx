// src/views/admin/yournetwork/components/MyPosts.tsx

import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PostCard from './PostCard';
import AddNewPostModal from './AddNewPostModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store'; // Adjust the import based on your store setup
import defaultImages from './assets/defaultImages'; // Import default images
import { apiCall } from '../../../../services/api';
import ConfirmationPopup from '../../../../components/Popup/ConfirmationPopup';
import { useToast } from '@chakra-ui/react';

const MyPosts: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null); // Track the current post being edited
  const posts = useSelector((state: RootState) => state.posts);
  const user = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  
  const [showPopup, setShowPopup] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<() => void>(() => () => {});
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  const toast = useToast(); // Initialize Chakra's useToast hook

  const openModal = (post?: any) => {
    setCurrentPost(post || null); // Set the post data or null for a new post
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const activePosts = posts.filter(post => post.authorId === user.userId && post.active);
  const archivedPosts = posts.filter(post => post.authorId === user.userId && !post.active);

  const handleConfirm = async () => {
    if (currentPostId) {
      await confirmationAction();
      setShowPopup(false);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const openConfirmationPopup = (message: string, action: () => void, postId: string) => {
    setConfirmationMessage(message);
    setConfirmationAction(() => action);
    setCurrentPostId(postId);
    setShowPopup(true);
  };

  // Reloads the page after a short timeout
  const refreshPage = (delay: number = 1500) => {
    setTimeout(() => {
      window.location.reload();
    }, delay);
  };

  const archivePost = async (postID: string) => {
    try {
      const response = await apiCall('/network/archive-post', {
        method: 'PATCH',
        data: { post_id: postID },
        requireAuth: true,
      }, token);

      toast({
        title: "Post archived.",
        description: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // showNotification(response.message, 'success'); // Display success message
      refreshPage(); // Refresh the page after success
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive the post. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error('Failed to archive post:', error);
    }
  };

  const repostPost = async (postID: string) => {
    try {
      const response = await apiCall('/network/unarchive-post', {
        method: 'PATCH',
        data: { post_id: postID },
        requireAuth: true,
      }, token);
      toast({
        title: "Post unarchived.",
        description: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // showNotification(response.message, 'success'); // Display success message
      refreshPage(); // Refresh the page after success
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to repost the post. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error('Failed to repost post:', error);
    }
  };

  const deletePost = async (postID: string) => {
    try {
      const response = await apiCall('/network/delete-post', {
        method: 'DELETE',
        data: { post_id: postID },
        requireAuth: true,
      }, token);
      toast({
        title: "Post deleted.",
        description: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refreshPage(); // Refresh the page after success
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error('Failed to delete post:', error);
    }
  };

  const categoryImages: Record<string, string> = {
    businessPromotion: defaultImages.business,
    opportunitiesAndPartnership: defaultImages.partner,
    resourcesAndProducts: defaultImages.products,
  };
  return (
    <Box>
      <Button my={8} bgColor="#2ACC32" _hover={{ bgColor: "#239B43" }} color="white" mt={4} onClick={() => openModal()}>
        + Add New Post
      </Button>


      {activePosts.map(post => {
        // // Default image for posts based on category
        // const postImage = defaultImages[post.type as keyof typeof defaultImages] || defaultImages.products;

        // // Use default avatar if post.image is not available
        // const profilePicture = post.image || defaultImages.avatar;
        
         // Get the default image for the post type
        const postImage = categoryImages[post.type] || defaultImages.products;

        // Use the default avatar if no author picture is provided
        // const authorPicture = post.authorPicture ? post.authorPicture : defaultImages.avatar;
        const authorPicture = defaultImages.avatar;


        return (
          <PostCard
            key={post.postID}
            author={{
              profilePicture:authorPicture, // Use default avatar if post.image is not available
              name: post.authorName,
              country: post.authorCountry,
              phoneNumber: post.authorPhoneNumber,
            }}
            content={{
              category: post.type,
              title: post.title,
              description: post.description,
              image: postImage, // Use default image based on post type
              date: post.postDate,
            }}
            isMyPost
            onModify={() => openModal(post)} // Pass the post data to the modal
            onArchive={() => openConfirmationPopup('Are you sure you want to archive this post?', () => archivePost(post.postID), post.postID)}
            onRepost={() => openConfirmationPopup('Are you sure you want to Repost this post?', () => repostPost(post.postID), post.postID)}
            onDelete={() => openConfirmationPopup('Are you sure you want to delete this post?', () => deletePost(post.postID), post.postID)}
          />
        );
      })}

      <Box mt={6} mb={6} borderBottom="2px" borderColor="gray.200" />

      {archivedPosts.map(post => {

      // Get the default image for the post type
      const postImage = categoryImages[post.type] || defaultImages.products;

      // Use the default avatar if no author picture is provided
      // const authorPicture = post.authorPicture ? post.authorPicture : defaultImages.avatar;
      const authorPicture = defaultImages.avatar;

        // // Default image for posts based on category
        // const postImage = defaultImages[post.type as keyof typeof defaultImages] || defaultImages.products;

        // // Use default avatar if post.image is not available
        // const profilePicture = post.image || defaultImages.avatar;

        return (
          <PostCard
            key={post.postID}
            author={{
              profilePicture: authorPicture, // Use default avatar if post.image is not available
              name: post.authorName,
              country: post.authorCountry,
              phoneNumber: post.authorPhoneNumber,
            }}
            content={{
              category: post.type,
              title: post.title,
              description: post.description,
              image: postImage, // Use default image based on post type
              date: post.postDate,
            }}
            isMyPost
            isArchived
            onModify={() => openModal(post)} // Pass the post data to the modal
            onArchive={() => openConfirmationPopup('Are you sure you want to archive this post?', () => archivePost(post.postID), post.postID)}
            onDelete={() => openConfirmationPopup('Are you sure you want to delete this post?', () => deletePost(post.postID), post.postID)}
            onRepost={() => openConfirmationPopup('Are you sure you want to repost this post?', () => repostPost(post.postID), post.postID)}
          />
        );
      })}

      <AddNewPostModal isOpen={isModalOpen} onClose={closeModal} post={currentPost} />

      {showPopup && (
        <ConfirmationPopup
          title="Confirmation Required"
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isConfirmPhase={true}
          showPopup={showPopup}
        />
      )}
    </Box>
  );
};

export default MyPosts;
