import React, { useState } from "react";
import { Center, Flex, Text, Button, Box } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../navbar/navbar";

const monthPlan = [
    {
        id: 1,
        price: 19,
        title: 'Starter',
        des: 'Unleash the power of automation for small farmers.',
        options: [
            'Basic chatbot support',
            'Simple business planning tools',
            'Foundational crop prediction',
            'Limited network access',
            'One-month free trial'
        ]
    },
    {
        id: 2,
        price: 59,
        title: 'Professional',
        des: 'Advanced tools for growing agribusinesses.',
        options: [
            'Enhanced chatbot support',
            'Comprehensive business planning',
            'Advanced crop prediction',
            'Broader network access',
            'Enhanced visibility and priority suggestions',
            'One-month free trial'
        ]
    },
    {
        id: 3,
        price: 99,
        title: 'Company',
        des: 'Comprehensive solutions for large agricultural enterprises.',
        options: [
            'Priority chatbot support',
            'Customizable business planning tools',
            'Precision agriculture tools and crop prediction',
            'Unlimited network and partnership access',
            'Top priority suggestions and visibility',
            'Custom data retention',
            'One-month free trial'
        ]
    }
];

export default function Plan() {
    const [planType, setPlanType] = useState('monthly');
    const handleChangePlan = () => {
        setPlanType(planType === "monthly" ? 'yearly' : 'monthly');
    };

    return (
        <>
            <Navbar />
            <Flex mt={8} width={'100%'} direction={'column'}>
                <Flex width={'100%'} direction={'column'} align={'center'} padding={'40px'} gap={'40px'}>
                    <Flex gap={'122px'} align={'center'}>
                        <Flex direction={'column'} gap={'30px'}>
                            <Text fontSize={'4xl'}>Plans & Pricing</Text>
                            <Text width={'600px'} fontSize={'xl'} color={'#848199'}>
                                Whether your time-saving automation needs are large or small, we’re here to help you scale.
                            </Text>
                        </Flex>
                        <Flex background={'#d0f7c5'} height={'fit-content'} borderRadius={'3xl'}>
                            <Button
                                backgroundColor={planType === "monthly" ? '#FFFFF' : 'transparent'}
                                color={'#000'}
                                borderRadius={'40px'}
                                padding={'10px 20px'}
                                fontSize={'18px'}
                                onClick={handleChangePlan}
                            >
                                Monthly
                            </Button>
                            <Button
                                backgroundColor={planType === "yearly" ? '#FFFFF' : 'transparent'}
                                color={'#000'}
                                borderRadius={'40px'}
                                padding={'10px 20px'}
                                fontSize={'18px'}
                                onClick={handleChangePlan}
                            >
                                Yearly
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex width={'950px'} bgColor={'#d0f7c5'} padding={'20px'} borderRadius={'xl'}>
                        {monthPlan.map((plan) => (
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'space-between'}
                                key={plan.id}
                                width={'30.33%'}
                                padding={'10px'}
                                borderColor={'white'}
                                borderWidth={'2px'}
                                borderRadius={'md'}
                                margin={'10px'}
                            >
                                <Flex direction={'column'}>
                                    <Text fontSize={'3xl'} fontWeight={'bold'} padding={'10px'}>
                                        ${plan.price} <span style={{ color: '#848199', fontWeight: 'normal', fontSize: '20px' }}>/month</span>
                                    </Text>
                                    <Text fontSize={'2xl'} fontWeight={'semibold'} padding={'5px 10px'}>
                                        {plan.title}
                                    </Text>
                                    <Text color={'#848199'} padding={'10px'}>{plan.des}</Text>
                                    <ul style={{ padding: '10px' }}>
                                        {plan.options.map((option, index) => (
                                            <li
                                                key={index}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    color: '#848199',
                                                    padding: '5px 0px'
                                                }}
                                            >
                                                <FaCheckCircle color='' /> {option}
                                            </li>
                                        ))}
                                    </ul>
                                </Flex>
                                <Button colorScheme="blackAlpha">Choose Plan</Button>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
