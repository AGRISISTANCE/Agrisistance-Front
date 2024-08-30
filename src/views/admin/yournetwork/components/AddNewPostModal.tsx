// components/AddNewPostModal.tsx
import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Image,
} from '@chakra-ui/react';

interface AddNewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewPostModal: React.FC<AddNewPostModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Post Title</FormLabel>
            <Input placeholder="Enter post title" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Post Description</FormLabel>
            <Textarea placeholder="Enter post description" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Select>
              <option value="Business Promotion">Business Promotion</option>
              <option value="Opportunities and Partnerships">Opportunities and Partnerships</option>
              <option value="Products and Resources">Products and Resources</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Add a Picture</FormLabel>
            <Input type="file" accept="image/*" />
            <Image mt={2} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Post
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewPostModal;
``
