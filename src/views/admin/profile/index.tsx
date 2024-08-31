import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertDescription, AlertTitle, CloseButton, Flex } from '@chakra-ui/react';
import { EditOutlined } from '@ant-design/icons';
import { updateUser } from '../../../redux/userSlice';
import { useLocation } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AlertIcon } from '@chakra-ui/react';

const UserProfile: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const location = useLocation();
  const emailUpdated = location.state?.emailUpdated;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (emailUpdated) {
      setShowModal(true);
      onOpen();
    }
  }, [emailUpdated, onOpen]);

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleEditToggle = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    dispatch(updateUser(formData));
    setIsEditing({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
    });
  };

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const handleEmailChange = async () => {
    try {
      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setShowSuccessAlert(true);
      } else {
        // Handle error (e.g., show an error message within the UI)
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      // Handle error (e.g., show an error message within the UI)
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await fetch('/api/verify-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            alert('Email updated successfully.');
            setShowModal(true);
            onOpen();
          } else {
            alert('Failed to verify email. The link may have expired.');
          }
        } catch (error) {
          console.error('Error verifying email:', error);
          alert('An error occurred. Please try again.');
        }
      };

      verifyEmail();
    }
  }, [location.search, onOpen]);

  return (
    <Flex
      width="100%"
      display="flex"
      direction="column"
      justify="center"
      align="center"
      gap="40px"
    >
      <Flex
        direction="column"
        align="center"
        width={{ base: '100%', xl: '600px' }}
        background="#fff"
        padding="40px"
        gap="20px"
      >
        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {['firstName', 'lastName', 'phoneNumber'].map((field) => (
            <div
              key={field}
              style={{
                display: 'flex',
                width: '80%',
                gap: '20px',
                border: `1px solid ${!isEditing[field as keyof typeof isEditing] ? '#78747A' : '#2ACC32'}`,
                borderRadius: '8px',
                padding: '0 10px 0 4px',
              }}
            >
              <input
                style={{
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                }}
                type="text"
                value={formData[field as keyof typeof formData]}
                readOnly={!isEditing[field as keyof typeof isEditing]}
                onChange={(e) => handleInputChange(field as keyof typeof formData, e.target.value)}
              />
              <EditOutlined
                onClick={() => handleEditToggle(field as keyof typeof isEditing)}
                style={{
                  color: isEditing[field as keyof typeof isEditing] ? 'green' : 'inherit',
                }}
              />
            </div>
          ))}
          <button className="btn-save" type="button" onClick={handleSaveChanges}>
            Save changes
          </button>
          <div
            key={'email'}
            style={{
              display: 'flex',
              width: '80%',
              gap: '20px',
              border: `1px solid ${!isEditing['email' as keyof typeof isEditing] ? '#78747A' : '#2ACC32'}`,
              borderRadius: '8px',
              padding: '0 10px 0 4px',
            }}
          >
            <input
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              }}
              type="text"
              value={formData['email' as keyof typeof formData]}
              readOnly={!isEditing['email' as keyof typeof isEditing]}
              onChange={(e) => handleInputChange('email' as keyof typeof formData, e.target.value)}
            />
            <EditOutlined
              onClick={() => handleEditToggle('email' as keyof typeof isEditing)}
              style={{
                color: isEditing['email' as keyof typeof isEditing] ? 'green' : 'inherit',
              }}
            />
          </div>
          <button className="btn-save" type="button" onClick={handleEmailChange}>
            Change email
          </button>
        </form>
      </Flex>
      {showSuccessAlert && (
        <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Email Verification Sent!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            We've sent a verification link to your new email address. Please check your email to complete the process.
          </AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowSuccessAlert(false)} />
        </Alert>
      )}  
      <Modal isOpen={showModal} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Email Updated</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Your email has been updated successfully.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UserProfile;
