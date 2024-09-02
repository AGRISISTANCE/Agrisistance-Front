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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { apiCall } from 'services/api';

const AddNewPostModal: React.FC<{ isOpen: boolean; onClose: () => void; post?: any }> = ({ isOpen, onClose, post }) => {
  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  const dispatch = useDispatch();
  
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);


  useEffect(() => {
    if (post) {
      setTitle(post.content.title);
      setDescription(post.content.description);
      setCategory(post.content.category);
      // handle image if needed
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
    }
  }, [post]);

  const createNewPost = async () => {
    try {
      const postData = {
        title:title,
        description:description,
        category:category,
        postDate:"", //here get current date and time
        image:image
      }
      const posts = await apiCall('/create-new-post', {
        method: 'POST',
        data: postData,
        requireAuth: true
      },token);

      // dispatch(); Set all posts here
    } catch (error) {
      console.error('Failed to create new post:', error);
    }
  };

  const updatePost = async () => {
    try {
      const postData = {
        title:title,
        description:description,
        category:category,
        postDate:"", //here get current date and time
        image:image
      }
      const posts = await apiCall('/update-post', {
        method: 'POST',
        data: postData,
        requireAuth: true
      },token);

      // dispatch(); Set all posts here
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleSubmit = () => {
    if (post) {
      console.log('Update Post:', { title, description, category, image });
      createNewPost()
    } else {
      console.log('Create New Post:', { title, description, category, image });
      updatePost()
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
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
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
