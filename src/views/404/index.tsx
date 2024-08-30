import { Flex, Text } from "@chakra-ui/react";
import Container from "../../common/Container";
import Header from "./Header";
import React from "react";
import { useNavigate } from 'react-router-dom';
import bgImage from "../../assets/img/404/bg.png";
import { Button } from "../../common/Button";
interface ErrorProps {
    header?: boolean;
}
const Error: React.FC<ErrorProps> = ({ header }) => {
    const navigate = useNavigate();

    return (
        <Flex direction={'column'} width={'100%'} height={'100vh'}>
            {!header && <Header />}
            <Flex
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                width='100%'
                height={'100%'}
                align={'center'}
                justify={'center'}
            >
                <Flex direction={'column'} background={'#fff'} padding={'40px'} borderRadius={'lg'} shadow={'-7px 4px 5px rgba(0,0,0,0.25)'}>
                    <Text fontSize={'7xl'} color={'#2C4026'} fontWeight={'semibold'} textShadow={'-7px 4px 5px rgba(0,0,0,0.25)'}>Oops 404 ...</Text>
                    <Text fontSize={'7xl'} color={'#2C4026'} fontWeight={'semibold'} textShadow={'-7px 4px 5px rgba(0,0,0,0.25)'}>Page not found</Text>
                </Flex>
                <Flex direction={'column'} align={'center'} maxW={'400px'} padding={'40px'}>
                    <Text fontSize={'2xl'} fontWeight={'semibold'} align={'center'}>This page seems to have a problem or is not avaliable. <br/> Please make sure the website URL is correct.</Text>
                    <Button  onClick={() => navigate(-1)}>&nbsp; &nbsp; Go back &nbsp; &nbsp;</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Error;
