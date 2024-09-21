
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate, useLocation  } from "react-router-dom";

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

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState(""); // Optional: to color the message
  const [loading, setLoading] = useState(false);
  const [showOnBoarding, setShowOnBoarding] = useState(false)

  const [showEmailVerificationAlert, setShowEmailVerificationAlert] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Show email verification success alert if the URL matches
    if (location.pathname === '/auth/login/email-verified-successfully') {
      setShowEmailVerificationAlert(true);
      setShowOnBoarding(true)
    }
  }, [location]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => setShow(!show);

  // Helper function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginUser = async () => {
    // Clear previous messages
    setMessage("");

    // Client-side validation
    if (!email || !password) {
      setMessage("Please fill in both email and password.");
      setMessageColor("red");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setMessageColor("red");
      return;
    }

    // Proceed with login if inputs are valid
    setLoading(true);
    setMessage("The request may take some time, please wait...");
    setMessageColor("green");

    try {
      const credentials = {
        email: email,
        password: password,
      };
    
      const response = await apiCall('/auth/login', {
        method: 'POST',
        data: credentials,
      });
      
      if (response.token) {
        // Store token in Redux
        console.log(response.message); // Logged in successfully!
        console.log("Your token: ", response.token);
        setMessageColor("green");
        setMessage("Login successful! Redirecting...");
    
        setTimeout(() => {
          dispatch(setToken(response.token));
          if (showOnBoarding){
            navigate("/dashboard/home/onboarding"); // Redirect to dashboard on successful login  
          } else {
          navigate("/dashboard/home"); // Redirect to dashboard on successful login
        }
        }, 1000);
      } else {
        setMessageColor("red");
        setMessage(response.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage("Login failed. Please confirm your credentials and try again.");
        setMessageColor("red");
      } else {
        // Handle unexpected error types here
        setMessage("An unexpected error occurred.");
        setMessageColor("red");
      }
    } finally {
      setLoading(false);
    }
  }
  

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
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
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
                placeholder='Your password'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                value={password}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
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
              <Text color={message.includes("success")  ? "green.500" : "red.500"} mb="24px">
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
