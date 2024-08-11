// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

export default function Profile(props: {
    avatar: string;
    name: string;
    days: string;
    suggestions: string;
}) {
    const { avatar, name, days, suggestions, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = 'gray.400';
    const borderColor = useColorModeValue('white !important', '#111C44 !important');
    return (
        <Card mb={{ base: '0px', lg: '20px' }} alignItems='center' {...rest} width='552px' height='164px'>
            <Flex
                height='100%'
                width='100%'
                direction='column'
                gap='24px'
            >
                <Flex justify='space-between'>
                    <Avatar src={avatar} h='70px' w='70px' border='4px solid' borderColor={borderColor} />
                    <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
                        Welcome back {name}
                    </Text>
                </Flex>
                <Flex justify='space-between'>
                    <Text>
                        - {days} for harvest
                    </Text>
                    <Text>
                        {suggestions == '0' ? 'no new suggestions' : `${suggestions} new suggestion`}
                    </Text>
                </Flex>

            </Flex>
        </Card>
    );
}
