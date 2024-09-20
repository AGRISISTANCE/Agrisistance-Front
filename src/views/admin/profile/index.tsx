import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertDescription, Input, InputGroup, InputRightElement,  AlertTitle, CloseButton, Flex, AlertIcon, useDisclosure, Icon, Button } from '@chakra-ui/react';
import { EditOutlined } from '@ant-design/icons';
import { setUser, updateUser } from '../../../redux/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiEyeCloseLine } from 'react-icons/ri';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RootState } from '../../../redux/store';
import { apiCall } from '../../../services/api';
import Tour from 'reactour';



const UserProfile: React.FC = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState<{message: string} | null>(null);
  const [showInformationUpdate, setShowInformationUpdate] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);


  // Helper function to validate password strength
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\-_.^])[A-Za-z\d@$!%*#?&\-_.^]{8,}$/;
    return passwordRegex.test(password);
  };

  // Helper function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUserInfoChanges = async () => {
    try {
      await apiCall('/profile/edit-profile', {
        method: 'PUT',
        requireAuth: true,
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phoneNumber,
          country: user.country,
        },
      }, token);

      setShowInformationUpdate(true);
      setIsEditing({ firstName: false, lastName: false, phoneNumber: false, email: false });
      setTimeout(() => window.location.reload(), 1000);

    } catch (error) {
      console.error('Failed to update user information', error);
      setShowErrorAlert({message: 'Failed to update user information. Please try again.'});
    }
  };

  const handleChangePassword = async () => {
    // Validate password before submitting
    if (!validatePassword(formData.newPassword)) {
      setShowErrorAlert({message: 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.'});
      return;
    }

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
      setTimeout(() => window.location.reload(), 1000);

    } catch (error) {
      console.error('Failed to update password', error);
      setShowErrorAlert({message: 'Failed to update password. Please try again.'});
    }
  };

  const handleChangeEmail = async () => {
    // Validate email before submitting
    if (!validateEmail(formData.email)) {
      setShowErrorAlert({message: 'Invalid email format. Please enter a valid email address.'});
      return;
    }

    try {
      await apiCall('/profile/update-email', {
        method: 'PUT',
        requireAuth: true,
        data: {
          eMail: formData.email,
        },
      }, token);

      setShowSuccessAlert(true);
      setTimeout(() => window.location.reload(), 1000);

    } catch (error) {
      console.error('Failed to update email', error);
      setShowErrorAlert({message: 'Failed to update email. Please try again.'});
    }
  };

  useEffect(() => {
    // Show email success alert if the URL is /dashboard/profile/email-updated-successfully
    if (location.pathname === '/dashboard/profile/email-updated-successfully') {
      setShowSuccessAlert(true);
    }
  }, [location]);

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

  const [showOnboarding, setShowOnboarding] = useState(false);


  const steps = [
    {
      selector: '.profile',
      content: (
        <div>
          <p>Here you can see details about your profile and modify them.</p>
        </div>
      ),
    },
    {
      selector: '', // Target element class
      content: (
        <Button p={4} m={4} bg={'#2BCC33'} color={'white'} onClick={() => navigate('/dashboard/yourland/onboarding')}>
            Go to Your Land Onboarding
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (location.pathname === '/dashboard/profile/onboarding') {
      setTimeout(() => {
        setShowOnboarding(true);
      }, 500); // Adjust the delay as needed
    } else {
      setShowOnboarding(false);
    }
  }, [location.pathname]);



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




  
  


  return (
    <Flex
      width="100%"
      display="flex"
      direction="column"
      justify="center"
      align="center"
      gap="40px"
      className="profile"
    >
      
      <Flex
        direction="column"
        align="center"
        width={{ base: '100%', xl: '600px' }}
        background="#fff"
        padding="40px"
        gap="20px"
        >
          {/* //! errors */}
          {showErrorAlert && (
          <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">Error</AlertTitle>
            <AlertDescription maxWidth="sm">{showErrorAlert.message}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowErrorAlert(null)} />
          </Alert>
        )}
          {/* //! User informations  */}
          {showInformationUpdate && (
          <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">Information updated successfully</AlertTitle>
            <AlertDescription maxWidth="sm">Your information has been recorded.</AlertDescription>
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
          <AlertTitle mt={4} mb={1} fontSize="lg">Email Verification Sent!</AlertTitle>
          <AlertDescription maxWidth="sm">We've sent a verification link to your new email address. Please check your email to complete the process.</AlertDescription>
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
          <AlertTitle mt={4} mb={1} fontSize="lg">Password changed successfully!</AlertTitle>
          <AlertDescription maxWidth="sm">Next time, login with your new password.</AlertDescription>
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

      {showOnboarding && (
        <Tour
          steps={steps}
          isOpen={showOnboarding}
          onRequestClose={() => setShowOnboarding(false)}
          rounded={5} // Customize tooltip style
          accentColor="#5cb85c" // Customize accent color
        />
      )}
    </Flex>
  );
};

export default UserProfile;

