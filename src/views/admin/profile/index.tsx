import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertDescription, Input, InputGroup, InputRightElement,  AlertTitle, CloseButton, Flex, AlertIcon, useDisclosure, Icon } from '@chakra-ui/react';
import { EditOutlined } from '@ant-design/icons';
import { setUser, updateUser } from '../../../redux/userSlice';
import { useLocation } from 'react-router-dom';
import { RiEyeCloseLine } from 'react-icons/ri';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RootState } from '../../../redux/store';
import { apiCall } from '../../../services/api';


const UserProfile: React.FC = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();
  
  // Get the user state from the Redux store
  const user = useSelector((state: any) => state.user);

  // Initialize formData with empty values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    country: '',
    currentPassword: '',
    newPassword: '',
  });

  const fetchUserProfile = async () => {
    try {
      const profile = await apiCall('/profile/get-profile', {
        method: 'GET',
        requireAuth: true,
      }, token);

      dispatch(setUser({
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        phoneNumber: profile.phone_number,
        country: profile.country,
        userId: profile.user_id,
        profilePicture: profile.profile_picture,
        currentPlan: profile.subscription_type === 'Basic' ? 'Basic' : 'premium',
      }));
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    //! Comment when using dummy data
    fetchUserProfile();
  }, []);

  // Update formData when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        country: user.country,
        currentPassword: '',
        newPassword: '',
      });
    }
  }, [user]); // Dependency on user


  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const [show1, setShow1] = useState(false);

  const handleClick1 = () => setShow1(!show1);

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });

  const handleUserInfoChanges = async () => {
    try {
      await apiCall('/profile/edit-profile', {
        method: 'PUT',
        requireAuth: true,
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phoneNumber,
          country: user.country, // Assuming user.country is available
        },
      }, token);

      setShowInformationUpdate(true);

      setIsEditing({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        email: false,
      });
      console.log("form data after handleUserInfoChanges: ", formData);
      setTimeout(()=>{
        window.location.reload();
      },1000)

    } catch (error) {
      console.error('Failed to update user information', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await apiCall('/profile/update-password', {
        method: 'PUT',
        requireAuth: true,
        data: {
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      }, token);

      setShowPasswordUpdate(true);
      console.log("form data after password: ", formData);
      setTimeout(()=>{
        window.location.reload();
      },1000)
    } catch (error) {
      console.error('Failed to update password', error);
    }
  };

  const handleChangeEmail = async () => {
    try {
      await apiCall('/profile/update-email', {
        method: 'PUT',
        requireAuth: true,
        data: {
          eMail: formData.email,
        },
      }, token);

      setShowSuccessAlert(true);
      console.log("form data after email change: ", formData);
      setTimeout(()=>{
        window.location.reload();
      },1000)
    } catch (error) {
      console.error('Failed to update email', error);
    }
  };

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



  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showInformationUpdate, setShowInformationUpdate] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);

  


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
        >{showInformationUpdate && (
          <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Information updated successfully
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Your information have been recorded.
            </AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowInformationUpdate(false)} />
          </Alert>
        )}
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
          {/* //! mapping user info */}
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
          <button className="btn-save" type="button" onClick={handleUserInfoChanges}>
            Save changes
          </button>
          {/* //! Email */}
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
          <button className="btn-save" type="button" onClick={handleChangeEmail}>
            Change email
          </button>
          {/* //! Password */}
          {showPasswordUpdate && (
        <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Password changed successfully!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Next time login with you new password
          </AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowPasswordUpdate(false)} />
        </Alert>
      )}
          <InputGroup size="md" style={{
            width: '80%',
            border: `1px solid #78747A`,
            borderRadius: '8px',
          }}>
            <Input
              value={formData['currentPassword' as keyof typeof formData]}
              onChange={(e) => handleInputChange('currentPassword' as keyof typeof formData, e.target.value)}
              placeholder="Current password"
              type={show ? "text" : "password"}
            />
            <InputRightElement>
              <Icon
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleClick}
                cursor="pointer"
              />
            </InputRightElement>
          </InputGroup>

          <InputGroup size="md" style={{
            width: '80%',
            border: `1px solid #78747A`,
            borderRadius: '8px',
          }}>
            <Input
              value={formData['newPassword' as keyof typeof formData]}
              onChange={(e) => handleInputChange('newPassword' as keyof typeof formData, e.target.value)}
              placeholder="New password"
              type={show1 ? "text" : "password"}
            />
            <InputRightElement>
              <Icon
                as={show1 ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleClick1}
                cursor="pointer"
              />
            </InputRightElement>
          </InputGroup>

          <button className="btn-save" type="button" onClick={handleChangePassword}>
            Change password
          </button>
        </form>
      </Flex>

      
    </Flex>
  );
};

export default UserProfile;

