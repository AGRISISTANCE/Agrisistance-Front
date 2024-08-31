
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

      // Store token in Redux
      dispatch(setToken(response.token));

      console.log(response.msg); // Logged in successfully !
      console.log("your token: ", response.token)
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard/home"); // Redirect to dashboard on successful login
      }, 1000)
    }
    catch (error: any) {
      setMessage(error.message || "Login failed. Please try again.");
    }
  };
  const [showEmailVerificationAlert, setShowEmailVerificationAlert] = React.useState(false);
  const [showPasswordResetAlert, setShowPasswordResetAlert] = React.useState(false);
  
  const handleEmailVerification = async () => {
    // Simulate email verification logic
    // If successful, show the email verification modal
    setShowEmailVerificationAlert(true);
  };

  const handlePasswordReset = async () => {
    // Simulate password reset logic
    // If successful, show the password reset modal
    setShowPasswordResetAlert(true);
  };

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

      {/* Password Reset Alert */}
      {showPasswordResetAlert && (
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Password Reset!</AlertTitle>
            <AlertDescription>
              Your password has been reset successfully. Please log in with your new password.
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => setShowPasswordResetAlert(false)}
          />
        </Alert>
      )}  
      </Flex>

    </DefaultAuth >
  );
}

export default LogIn;
