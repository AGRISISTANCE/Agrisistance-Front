
import React from "react";
import { NavLink } from "react-router-dom";

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

import { setToken } from '../../../redux/tokenSlice';
import { apiCall } from "../../../services/api";
import { useDispatch } from 'react-redux';

function ResetPassword() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorBrand = useColorModeValue("brand.500", "white");
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const [show, setShow] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const navigate = useNavigate();
    const handleClick = () => setShow(!show);

    const dispatch = useDispatch();

    const ResetPassword = async () => {
        try {
            const credentials = {
                confirmPassword: confirmPassword,
                password: password,
            };
            if (confirmPassword === password) {
                const response = await apiCall('/api/auth/reset-password/188a6d98-394d-4bd5-b92f-e90caa1eb5c4', {
                    method: 'POST',
                    data: credentials,
                });

                // Store token in Redux
                dispatch(setToken(response.token));

                console.log(response.msg); // Logged in successfully !
                console.log("your token: ", response.token)
                setMessage("Password changed! Redirecting...");
                setTimeout(() => {
                    navigate("/auth/login"); // Redirect to dashboard on successful login
                }, 1000)
            }
            else{
                setMessage("Confirm password should be the same as the password")
            }
        }
        catch (error: any) {
            setMessage(error.message || "Login failed. Please try again.");
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
                                placeholder='Min. 8 characters'
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            onClick={ResetPassword}
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


