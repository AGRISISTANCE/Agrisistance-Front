import React, { useState } from "react";
import axios from "axios";    
import { AxiosError } from "axios";
import { NavLink } from "react-router-dom";
import { africanCountries } from "./africanCountries";

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
  useToast,
  Icon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye, MdArrowDropDown } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Select your Country");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const handleClick = () => setShow(!show);

  const toast = useToast();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/auth/register", {
        firstName,
        lastName,
        country,
        role: "Owner", // Static role value
        eMail: email,
        password,
      });
  
      if (response.data.message) {
        setMessage(response.data.message);
        setMessageColor("green");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        // This ensures that TypeScript knows the structure of the error object
        setMessage(error.response.data.error);
        setMessageColor("red");
      } else {
        // Handle any other types of errors, if necessary
        setMessage("An unexpected error occurred.");
        setMessageColor("red");
      }
    }
  };

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
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" mb="24px" />
            <FormLabel color="navy.700">Last Name</FormLabel>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" mb="24px" />
            <FormLabel color="navy.700">Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" mb="24px" />
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
            <FormLabel color="navy.700">Password</FormLabel>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
            <Button onClick={handleSignUp} fontSize="sm" variant="brand" fontWeight="500" w="100%" h="50px" mb="24px">
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
