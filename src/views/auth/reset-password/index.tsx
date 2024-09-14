
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// Chakra imports
import {
    Box,
    Button,
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

import { apiCall } from "../../../services/api";

function ResetPassword() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorBrand = useColorModeValue("brand.500", "white");
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const [show, setShow] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState(""); // Optional: for message color
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>(); // Extract the token from the URL

    const handleClick = () => setShow(!show);

    // Helper function to validate password strength
    const validatePassword = (password: string) => {
        // Example: Password must be at least 8 characters long and include letters and numbers
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleResetPassword = async () => {
        // Clear previous messages
        setMessage("");

        // Client-side validation
        if (!password || !confirmPassword) {
        setMessage("Please enter both password fields.");
        setMessageColor("red");
        return;
        }

        if (!validatePassword(password)) {
        setMessage("Password must be at least 8 characters long and include both letters and numbers.");
        setMessageColor("red");
        return;
        }

        if (password !== confirmPassword) {
        setMessage("Confirm password should match the new password.");
        setMessageColor("red");
        return;
        }

        // Proceed with password reset if inputs are valid
        setLoading(true);
        setMessage("Processing your request. Please wait...");
        setMessageColor("green");

        try {
        const credentials = { newPassword: password };

        const response = await apiCall(`/auth/reset-password/${token}`, {
            method: 'PUT',
            data: credentials,
        });

        setMessage("Password changed successfully! Redirecting...");
        setMessageColor("green");
        setTimeout(() => {
            navigate("/auth/login"); // Redirect to login on successful reset
        }, 1000);
        } catch (error: any) {
        setMessage("Password reset failed. Please confirm your inputs and try again.");
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
                        Reset Password
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your new password!
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
                                placeholder='Min 8 chars with numbers and special chars'
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
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Confirm Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='sm'
                                placeholder='Confirm your password'
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
                                value={confirmPassword}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setConfirmPassword(e.target.value)}
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
                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'
                            onClick={handleResetPassword}
                            disabled={!confirmPassword !== !password}
                        >
                            Reset Password
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
                        Remember your password?
                        <NavLink to='/auth/login'>
                            <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
                                login
                            </Text>
                        </NavLink>
                    </Text>
                </Flex>
            </Flex>

        </DefaultAuth >
    );
}

export default ResetPassword;


