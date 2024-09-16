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
import { defaultImages, authorImage, Category } from './assets/base64defaultImages';



const AddNewPostModal: React.FC<{ isOpen: boolean; onClose: () => void; post?: any }> = ({ isOpen, onClose, post }) => {
  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('opportunitiesAndPartnership');
  const [image, setImage] = useState<File | null>(null);

  const resizeImage = (file: File) => {
    return new Promise<Blob>((resolve, reject) => {
      const img = document.createElement('img');
      const reader = new FileReader();
      reader.onload = (e: any) => {
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width / 2;  // Resize as needed
            canvas.height = img.height / 2;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject('Failed to resize image');
            }, 'image/jpeg');
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };
  
  const toBase64 = (file: File) => {
    return resizeImage(file).then(blob => {
      return new Promise<string | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(null);
      });
    });
  };


  const getDefaultImageForCategory = (category: Category) => {
    return defaultImages[category];
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
      let base64Image = null;
      if (image) {
        base64Image = await toBase64(image);
      }
      
      console.log('Base64 image:', base64Image);
      
      const defaultImage = getDefaultImageForCategory(category);
      
      //! empty because too large not supported
      // post_image: base64Image, // Should be in the format "data:image/jpeg;base64,..."
      // post_image: defaultImage, // Should be in the format "data:image/jpeg;base64,..."
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

      // const defaultImage = getDefaultImageForCategory(category);
        //! empty because too large not supported
        // post_image: base64Image,
        // post_image: defaultImage,
      const postData = {
        post_title: title,
        post_content: description,
        post_type: category,
      };


      console.log("updating post with data: ")
      
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

