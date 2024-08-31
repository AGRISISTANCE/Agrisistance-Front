
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

import { setToken } from '../../../redux/tokenSlice';
import { apiCall } from "../../../services/api";
import { useDispatch } from 'react-redux';

function ForgotPassword() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorBrand = useColorModeValue("brand.500", "white");
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const [show, setShow] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const navigate = useNavigate();
    const handleClick = () => setShow(!show);

    const dispatch = useDispatch();

    const loginUser = async () => {
        try {
            const credentials = {
                email: email,
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
    const [showCodeAlert, setShowCodeAlert] = React.useState(false);




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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'
                            onClick={loginUser}
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
