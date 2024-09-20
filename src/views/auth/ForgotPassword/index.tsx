
import React, { useState } from "react";
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
    CloseButton,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "../../../layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/auth/auth.png";

import { apiCall } from "../../../services/api";

function ForgotPassword() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorBrand = useColorModeValue("brand.500", "white");
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState(""); // Optional: to color the message
    const [loading, setLoading] = useState(false);
    const [showCodeAlert, setShowCodeAlert] = useState(false);

    // Helper function to validate email format
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const sendVerificationCode = async () => {
        // Clear previous messages
        setMessage("");

        // Client-side validation
        if (!email) {
        setMessage("Please enter your email address.");
        setMessageColor("red");
        return;
        }

        if (!validateEmail(email)) {
        setMessage("Please enter a valid email address.");
        setMessageColor("red");
        return;
        }

    // Proceed if input is valid
    setLoading(true);
    setMessage("Sending verification code. Please wait...");
    setMessageColor("green");

    try {
    const credentials = {
        eMail: email,
    };

    const response = await apiCall('/auth/forgot-password', {
        method: 'POST',
        data: credentials,
    });

    // Assuming the API returns a success message if the email exists
    if (response.success) {
        setMessage("Verification code sent! Please check your email.");
        setMessageColor("green");
        setShowCodeAlert(true);
    } else {
        setMessage(response.message || "An error occurred. Please try again.");
        setMessageColor("red");
    }
    } catch (error: any) {
    setMessage("Password reset failed. Please confirm your email and try again.");
    setMessageColor("red");
    } finally {
    setLoading(false);
    }
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
                        Forgot password
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your email
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
                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'
                            onClick={sendVerificationCode}
                            disabled={!email}
                        >
                            Send verification code
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
                        Remember password?
                        <NavLink to='/auth/login'>
                            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
                                Login
                            </Text>
                        </NavLink>
                    </Text>
                </Flex>


                {/* Password Reset Alert */}
                {showCodeAlert && (
                    <Alert status="success">
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Verification sent!</AlertTitle>
                            <AlertDescription>
                                Your verification code has been sent. check .
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf="flex-start"
                            position="relative"
                            right={-1}
                            top={-1}
                            onClick={() => setShowCodeAlert(false)}
                        />
                    </Alert>
                )}
            </Flex>

        </DefaultAuth >
    );
}

export default ForgotPassword;
