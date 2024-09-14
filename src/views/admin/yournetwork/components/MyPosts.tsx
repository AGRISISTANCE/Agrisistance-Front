// components/MyPosts.tsx
import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PostCard from './PostCard';
import AddNewPostModal from './AddNewPostModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store'; // Adjust the import based on your store setup
import { apiCall } from 'services/api';
import ConfirmationPopup from '../../../../common/Popup/ConfirmationPopup';

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

  const openModal = (post?: any) => {
    setCurrentPost(post || null); // Set the post data or null for a new post
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const activePosts = posts.filter(post => post.authorId === user.userId && post.active);
  const archivedPosts = posts.filter(post => post.authorId === user.userId && !post.active);

  //! related to the popup
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

  const archivePost = async (postID: string) => {
    try {
      console.log('Archived');
      //! Add api request once beackend ready
      // const posts = await apiCall('/profile/get-profile', {
      //   method: 'POST',
      //   data: {postId : postID},
      //   requireAuth: true
      // },token);
      
      // dispatch(); Set all posts here

    } catch (error) {
      console.error('Failed to archive post:', error);
    }
  };

  const deletePost = async (postID: string) => {
    try {
      console.log('Deleted');
      //! Add api request once beackend ready
      // const posts = await apiCall('/profile/get-profile', {
      //   method: 'POST',
      //   data: {postId : postID},
      //   requireAuth: true
      // },token);
      
      // dispatch(); Set all posts here
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <Box>
      {activePosts.map(post => (
        <PostCard
          key={post.postID}
          author={{
            profilePicture: post.image,
            name: post.authorName,
            country: post.authorCountry,
            phoneNumber: post.authorPhoneNumber,
          }}
          content={{
            category: post.type,
            title: post.title,
            description: post.description,
            image: post.image,
            date: post.postDate,
          }}
          isMyPost
          onModify={() => openModal(post)} // Pass the post data to the modal
          onArchive={() => openConfirmationPopup('Are you sure you want to archive this post?', () => archivePost(post.postID), post.postID)}
          onDelete={() => openConfirmationPopup('Are you sure you want to delete this post?', () => deletePost(post.postID), post.postID)}
        />
      ))}

      <Box mt={6} mb={6} borderBottom="2px" borderColor="gray.200" />

      {archivedPosts.map(post => (
        <PostCard
          key={post.postID}
          author={{
            profilePicture: post.image,
            name: post.authorName,
            country: post.authorCountry,
            phoneNumber: post.authorPhoneNumber,
          }}
          content={{
            category: post.type,
            title: post.title,
            description: post.description,
            image: post.image,
            date: post.postDate,
          }}
          isMyPost
          isArchived
          onModify={() => openModal(post)} // Pass the post data to the modal
          onArchive={() => openConfirmationPopup('Are you sure you want to archive this post?', () => archivePost(post.postID), post.postID)}
          onDelete={() => openConfirmationPopup('Are you sure you want to delete this post?', () => deletePost(post.postID), post.postID)}
        />
      ))}

      <Button colorScheme="teal" mt={4} onClick={() => openModal()}>
        + Add New Post
      </Button>

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
