// AddNewPostModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import {useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { apiCall } from 'services/api';
import { addPost, updatePost, CategoryType } from '../../../../redux/postsSlice';




const AddNewPostModal: React.FC<{ isOpen: boolean; onClose: () => void; post?: any }> = ({ isOpen, onClose, post }) => {
  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('opportunitiesAndPartnership');
  const [image, setImage] = useState<File | null>(null);

  // Convert image file to base64
  const toBase64 = (file: File) => {
    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(null);
    });
  };


  useEffect(() => {
    if (post) {
      setTitle(post.content.title);
      setDescription(post.content.description);
      setCategory(post.content.category);
      // Handle image if needed
    } else {
      setTitle('');
      setDescription('');
      setCategory('businessPromotion');
      setImage(null);
    }
  }, [post]);

  const createNewPost = async () => {
    try {
      // Convert image to base64 if there's an image
      let base64Image = null;
      if (image) {
        base64Image = await toBase64(image);
      }

      const postData = {
        post_title: title,
        post_content: description,
        post_image: base64Image,
        post_type: category,
      };

      const response = await apiCall('/network/create-post', {
        method: 'POST',
        data: postData,
        requireAuth: true,
      }, token);

      // Dispatch the new post to Redux store
      // dispatch(addPost({
      //   postID: response.post_id,
      //   title: title,
      //   type: category,
      //   description: description,
      //   image: base64Image,
      //   authorId: '', // Assuming you get the author data from a different part of the state
      //   authorName: '',
      //   authorPhoneNumber: '',
      //   authorCountry: '',
      //   authorPicture: '',
      //   postDate: new Date().toISOString(),
      //   active: true,
      // }));

      console.log('Post created successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      } catch (error) {
        console.error('Failed to create new post:', error);
      }
    };

  const updatePost = async () => {
    try {
      let base64Image = null;
      if (image) {
        base64Image = await toBase64(image);
      }

      const postData = {
        post_title: title,
        post_content: description,
        post_image: base64Image,
        post_type: category,
      };

      const response = await apiCall(`/network/update-post/${post.postID}`, {
        method: 'PUT',
        data: postData,
        requireAuth: true,
      }, token);

      // Update the post in Redux store
    //   dispatch(updatePost({
    //     index: post.index, // Assuming you know the index of the post in the Redux store
    //     updates: {
    //       title,
    //       type: category,
    //       description,
    //       image: base64Image || '',
    //     },
    //   })
    // );

      console.log('Post updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleSubmit = async () => {
    if (post) {
      await updatePost();
    } else {
      await createNewPost();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{post ? 'Edit Post' : 'Add New Post'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Post Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Post Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value as CategoryType)}>
              <option value="Business Promotion">Business Promotion</option>
              <option value="Opportunities and Partnerships">Opportunities and Partnerships</option>
              <option value="Products and Resources">Products and Resources</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {post ? 'Save Changes' : 'Post'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewPostModal;

