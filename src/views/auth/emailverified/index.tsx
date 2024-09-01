// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Alert, AlertDescription, AlertTitle, Box, CloseButton, Flex } from '@chakra-ui/react';
// import { EditOutlined } from '@ant-design/icons';
// import { updateUser } from '../../../redux/userSlice';
// import { useLocation } from 'react-router-dom';
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     Button,
//     useDisclosure,
// } from '@chakra-ui/react';
// import { AlertIcon } from '@chakra-ui/react';

// const EmailVerified: React.FC = () => {
//     const user = useSelector((state: any) => state.user);
//     const dispatch = useDispatch();

//     const location = useLocation();
//     const emailUpdated = location.state?.emailUpdated;
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         if (emailUpdated) {
//             setShowModal(true);
//             onOpen();
//         }
//     }, [emailUpdated, onOpen]);




//     const [isEditing, setIsEditing] = useState({
//         firstName: false,
//         lastName: false,
//         email: false,
//         phoneNumber: false,
//     });

//     const [formData, setFormData] = useState({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//     });

//     const handleEditToggle = (field: keyof typeof isEditing) => {
//         setIsEditing((prev) => ({
//             ...prev,
//             [field]: !prev[field],
//         }));
//     };

//     const handleInputChange = (field: keyof typeof formData, value: string) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     const handleSaveChanges = () => {
//         dispatch(updateUser(formData));
//         setIsEditing({
//             firstName: false,
//             lastName: false,
//             email: false,
//             phoneNumber: false,
//         });
//     };
//     const [showEmailVerificationAlert, setShowEmailVerificationAlert] = React.useState(true);
//     const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//     const handleEmailChange = async () => {
//         try {
//             const response = await fetch('/api/send-verification-email', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: formData.email }),
//             });

//             if (response.ok) {
//                 setShowSuccessAlert(true);
//             } else {
//                 // Handle error (e.g., show an error message within the UI)
//             }
//         } catch (error) {
//             console.error('Error sending verification email:', error);
//             // Handle error (e.g., show an error message within the UI)
//         }
//     };

//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const token = params.get('token');

//         if (token) {
//             const verifyEmail = async () => {
//                 try {
//                     const response = await fetch('/api/verify-email', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ token }),
//                     });

//                     if (response.ok) {
//                         alert('Email updated successfully.');
//                         setShowModal(true);
//                         onOpen();
//                     } else {
//                         alert('Failed to verify email. The link may have expired.');
//                     }
//                 } catch (error) {
//                     console.error('Error verifying email:', error);
//                     alert('An error occurred. Please try again.');
//                 }
//             };

//             verifyEmail();
//         }
//     }, [location.search, onOpen]);

//     return (
//         <Flex
//             width="100%"
//             display="flex"
//             direction="column"
//             justify="center"
//             align="center"
//             gap="40px"
//         >
//             <Flex
//                 direction="column"
//                 align="center"
//                 width={{ base: '100%', xl: '600px' }}
//                 background="#fff"
//                 padding="40px"
//                 gap="20px"
//             >
//                 <form
//                     style={{
//                         width: '100%',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: '20px',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                 >
//                     {['firstName', 'lastName', 'phoneNumber'].map((field) => (
//                         <div
//                             key={field}
//                             style={{
//                                 display: 'flex',
//                                 width: '80%',
//                                 gap: '20px',
//                                 border: `1px solid ${!isEditing[field as keyof typeof isEditing] ? '#78747A' : '#2ACC32'}`,
//                                 borderRadius: '8px',
//                                 padding: '0 10px 0 4px',
//                             }}
//                         >
//                             <input
//                                 style={{
//                                     border: 'none',
//                                     outline: 'none',
//                                     boxShadow: 'none',
//                                 }}
//                                 type="text"
//                                 value={formData[field as keyof typeof formData]}
//                                 readOnly={!isEditing[field as keyof typeof isEditing]}
//                                 onChange={(e) => handleInputChange(field as keyof typeof formData, e.target.value)}
//                             />
//                             <EditOutlined
//                                 onClick={() => handleEditToggle(field as keyof typeof isEditing)}
//                                 style={{
//                                     color: isEditing[field as keyof typeof isEditing] ? 'green' : 'inherit',
//                                 }}
//                             />
//                         </div>
//                     ))}
//                     <button className="btn-save" type="button" onClick={handleSaveChanges}>
//                         Save changes
//                     </button>
//                     <div
//                         key={'email'}
//                         style={{
//                             display: 'flex',
//                             width: '80%',
//                             gap: '20px',
//                             border: `1px solid ${!isEditing['email' as keyof typeof isEditing] ? '#78747A' : '#2ACC32'}`,
//                             borderRadius: '8px',
//                             padding: '0 10px 0 4px',
//                         }}
//                     >
//                         <input
//                             style={{
//                                 border: 'none',
//                                 outline: 'none',
//                                 boxShadow: 'none',
//                             }}
//                             type="text"
//                             value={formData['email' as keyof typeof formData]}
//                             readOnly={!isEditing['email' as keyof typeof isEditing]}
//                             onChange={(e) => handleInputChange('email' as keyof typeof formData, e.target.value)}
//                         />
//                         <EditOutlined
//                             onClick={() => handleEditToggle('email' as keyof typeof isEditing)}
//                             style={{
//                                 color: isEditing['email' as keyof typeof isEditing] ? 'green' : 'inherit',
//                             }}
//                         />
//                     </div>
//                     <button className="btn-save" type="button" onClick={handleEmailChange}>
//                         Change email
//                     </button>
//                 </form>
//             </Flex>
//             {showSuccessAlert && (
//                 <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
//                     <AlertIcon boxSize="40px" mr={0} />
//                     <AlertTitle mt={4} mb={1} fontSize="lg">
//                         Email Verification Sent!
//                     </AlertTitle>
//                     <AlertDescription maxWidth="sm">
//                         We've sent a verification link to your new email address. Please check your email to complete the process.
//                     </AlertDescription>
//                     <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowSuccessAlert(false)} />
//                 </Alert>
//             )}
//             {showEmailVerificationAlert && (
//                 <Alert status="success">
//                     <AlertIcon />
//                     <Box>
//                         <AlertTitle>Email Verified!</AlertTitle>
//                         <AlertDescription>
//                             Your email has been verified successfully. Please log in to continue.
//                         </AlertDescription>
//                     </Box>
//                     <CloseButton
//                         alignSelf="flex-start"
//                         position="relative"
//                         right={-1}
//                         top={-1}
//                         onClick={() => setShowEmailVerificationAlert(false)}
//                     />
//                 </Alert>
//             )}
//             <Modal isOpen={showModal} onClose={onClose} isCentered>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Email Updated</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         Your email has been updated successfully.
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme="blue" onClick={onClose}>
//                             Close
//                         </Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </Flex>
//     );
// };

// export default EmailVerified;





import React from "react";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// Chakra imports
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "../../../layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import { setToken } from '../../../redux/tokenSlice';
import { apiCall } from "../../../services/api";
import { useDispatch } from 'react-redux';

function LogIn() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const navigate = useNavigate();
  const handleClick = () => setShow(!show);

  const dispatch = useDispatch();

  const loginUser = async () => {
    try {
      const credentials = {
        email: email,
        password: password,
      };

      const response = await apiCall('/auth/login', {
        method: 'POST',
        data: credentials,
      });



      console.log(response.msg); // Logged in successfully !
      console.log("your token: ", response.token)
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        // Store token in Redux
        dispatch(setToken(response.token));
        navigate("/dashboard/home"); // Redirect to dashboard on successful login
      }, 1000)
    }
    catch (error: any) {
      setMessage(error.message || "Login failed. Please try again.");
    }
  };

  const [showEmailVerificationAlert, setShowEmailVerificationAlert] = React.useState(true);

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Log In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to log in!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='amel.feddag@ensia.edu.dz'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color='gray.400'
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={loginUser}
              disabled={!email || !password}
            >
              Log In
            </Button>
            {message && (
              <Text color={message.includes("success") ? "green.500" : "red.500"} mb="24px">
                {message}
              </Text>
            )}
          </FormControl>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='start'
          maxW='100%'
          mt='0px'>
          <Text color={textColorDetails} fontWeight='400' fontSize='14px' mb={4}>
            Not registered yet?
            <NavLink to='/auth/signup'>
              <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
                Sign Up
              </Text>
            </NavLink>
          </Text>
        </Flex>
        {showEmailVerificationAlert && (
                <Alert status="success">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Email Verified!</AlertTitle>
                        <AlertDescription>
                            Your email has been verified successfully. Please log in to continue.
                        </AlertDescription>
                    </Box>
                    <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setShowEmailVerificationAlert(false)}
                    />
                </Alert>
            )}
      </Flex>

    </DefaultAuth >
  );
}

export default LogIn;
