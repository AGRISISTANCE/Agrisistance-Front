import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { africanCountries } from "./africanCountries";
import { africanCountriesCodes } from './countryCodes'

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Select
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye, MdArrowDropDown } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import DefaultAuth from "../../../layouts/auth/Default";
import illustration from "../../../assets/img/auth/auth.png";
import { apiCall } from "../../../services/api";



function SignUp() {
  // Chakra color mode
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Select your Country");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('+213');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryCode(e.target.value);
    console.log("curent country code: ", selectedCountryCode)
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };



  const handleClick = () => setShow(!show);

  // Helper function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to validate password strength
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\-_.^])[A-Za-z\d@$!%*#?&\-_.^]{8,}$/;
    return passwordRegex.test(password);
  };

  const registerUser = async () => {
    // Clear any previous messages
    setMessage("");

    // Client-side validation
    if (!firstName || !lastName || !email || !password || !phoneNumber || country === "Select your Country") {
      setMessage("Please fill in all required fields.");
      setMessageColor("red");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setMessageColor("red");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters long and include numbers and special characters.");
      setMessageColor("red");
      return;
    }

    setLoading(true);
    setMessageColor("green");
    setMessage("Processing your registration. This may take a few moments, please wait...");

    try {
      const userData = {
        firstName,
        lastName,
        country,
        phoneNumber: `${selectedCountryCode}${phoneNumber}`,
        email,
        password,
      };
      
      const response = await apiCall('/auth/register', {
        method: 'POST',
        data: userData,
      });

      if (response.message = "E-mail already in use.") {
        setMessageColor("red");
        setMessage(response.message);
      }else if (response.message) {
        setMessageColor("green");
        setMessage(response.message);
      }
      else {
        setMessage("Registration successful!");
        setMessageColor("green");
      }
    } catch (error: any) {
      // Differentiating between different types of errors
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Something went wrong, please try again.");
      } else if (error.request) {
        setMessage("Network error: Unable to reach the server. Please check your internet connection.");
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
      }
      setMessageColor("red");
    } finally {
      setLoading(false);
    }
  }


  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={useColorModeValue("navy.700", "white")} fontSize="36px" mb="10px">
            Sign Up
          </Heading>
          <Text mb="36px" ms="4px" color="gray.400" fontWeight="400" fontSize="md">
            Enter all the fields below to sign up!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel color="navy.700">First Name</FormLabel>
            <Input value={firstName} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFirstName(e.target.value)} placeholder="First Name" mb="24px" />
            <FormLabel color="navy.700">Last Name</FormLabel>
            <Input value={lastName} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLastName(e.target.value)} placeholder="Last Name" mb="24px" />
            <FormLabel color="navy.700">Email</FormLabel>
            <Input value={email} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)} placeholder="Email" mb="24px" />
            <FormLabel color="navy.700">Country</FormLabel>
            <Box mb={4}>
              <Menu>
                <MenuButton as={Button} rightIcon={<MdArrowDropDown />}>
                  {country}
                </MenuButton>
                <MenuList maxHeight="200px" overflowY="auto">
                  {africanCountries.map((country, index) => (
                    <MenuItem key={index} onClick={() => setCountry(country)}>
                      {country}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
            <FormLabel color="navy.700">Phone Number</FormLabel>
            <Box display="flex" alignItems="center">
              <Select
                value={selectedCountryCode}
                onChange={handleCountryChange}
                mb="24px"
                width="200px"
                mr="10px"
              >
                {africanCountriesCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} {country.name}
                  </option>
                ))}
              </Select>
              <Input
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone Number"
                mb="24px"
                
              />
            </Box>
            <FormLabel color="navy.700">Password</FormLabel>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                placeholder="Min 8 chars with numbers and special chars"
                type={show ? "text" : "password"}
                mb="24px"
              />
              <InputRightElement>
                <Icon
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>
            {message && (
              <Text color={messageColor} mb="24px">
                {message}
              </Text>
            )}
            <Button /* onClick={handleSignUp} */ onClick={registerUser} fontSize="sm" variant="brand" fontWeight="500" w="100%" h="50px" mb="24px">
              Sign Up
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px' mb={4}>
              Already have an account?
              <NavLink to='/auth/login'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Log in
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
