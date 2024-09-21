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
  useToast 
} from '@chakra-ui/react';
import {useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { apiCall } from '../../../../services/api';
import { addPost, updatePost, CategoryType } from '../../../../redux/postsSlice';
import { defaultImages, authorImage, Category } from './assets/base64defaultImages';



const AddNewPostModal: React.FC<{ isOpen: boolean; onClose: () => void; post?: any }> = ({ isOpen, onClose, post }) => {
  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('opportunitiesAndPartnership');
  const [image, setImage] = useState<File | null>(null);

  useEffect(()=>{
    console.log("category value changed to: ",category)
  },[category])

  const getDefaultImageForCategory = (category: Category) => {
    return defaultImages[category];
  };

  useEffect(() => {
    console.log("printing post opened object: ", post)
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setCategory(post.type);
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
      const postData = {
        post_title: title,
        post_content: description,
        post_type: category,
      };
      
  
      console.log('Creating a new post with data:', postData);
  
      const response = await apiCall('/network/create-post', {
        method: 'POST',
        data: postData,
        requireAuth: true,
      }, token);
      toast({
        title: "Post created.",
        description: "Your post has been successfully created.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      console.log('Post created successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      } catch (error) {
        console.error('Failed to create new post:', error);
        toast({
          title: "Error",
          description: "Failed to create the post. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

  const updatePost = async () => {
    try {
      const postData = {
        post_title: title,
        post_content: description,
        post_type: category,
      };


      console.log("updating post with data: ", postData)
      
      const response = await apiCall(`/network/update-post/${post.postID}`, {
        method: 'PUT',
        data: postData,
        requireAuth: true,
      }, token);



      console.log('Post updated successfully');
      toast({
        title: "Post updated.",
        description: "Your post has been successfully updated.",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Failed to update post:', error);
      toast({
        title: "Error",
        description: "Failed to update the post. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
              <option value="businessPromotion">Business Promotion</option>
              <option value="opportunitiesAndPartnership">Opportunities and Partnerships</option>
              <option value="resourcesAndProducts">Products and Resources</option>
            </Select>
          </FormControl>

          {/* <FormControl mt={4}>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
          </FormControl> */}
        </ModalBody>

        <ModalFooter>
          <Button bg="#2ACC32" color="white" mr={3} onClick={handleSubmit}>
            {post ? 'Save Changes' : 'Post'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewPostModal;

