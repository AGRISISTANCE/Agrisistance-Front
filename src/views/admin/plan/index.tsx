import React, { useState } from "react";
import AdminNavbarLinks from '../Navbar/NavbarLinksAdmin';
import { Center, Flex, Text, Button, Box } from "@chakra-ui/react";
import logo from '../../../assets/img/icons/newlogogreen.png';
import { FaCheckCircle } from "react-icons/fa";

const monthPlan = [
    {
        id: 1,
        price: 19,
        title: 'Starter',
        des: 'Unleash the power of automation.',
        options: [
            'Multi-step Zaps',
            '3 premium apps',
            '3 users team'
        ]
    },
    {
        id: 2,
        price: 54,
        title: 'Professional',
        des: 'Advanced tools to take your work to the next level.',
        options: [
            'Multi-step Zaps',
            'Unlimited Premium',
            '50 users team',
            'Shared Workspace'
        ]
    },
    {
        id: 3,
        price: 89,
        title: 'Company',
        des: 'Automation plus enterprise-grade features.',
        options: [
            'Multi-step Zaps',
            'Unlimited Premium',
            'Unlimited users team',
            'Advanced admin',
            'Custom Data Retention'
        ]
    }
];

export default function Plan() {
    const [planType, setPlanType] = useState('monthly');
    const handleChangePlan = () => {
        if (planType === "monthly")
            setPlanType('yearly');
        else setPlanType('monthly')
    }
    return (
        <Flex width={'100%'} direction={'column'}>
            <Flex width={'100%'} justify={'space-between'} padding={'20px'}>
                <a href="/">
                    <Flex width='100%' align={'center'}>
                        <img src={logo} alt="Logo" width={'30px'} height={'30px'} />
                        <Text fontSize={'4xl'} marginLeft={'10px'}>grisistance</Text>
                    </Flex>
                </a>
                <AdminNavbarLinks
                    //onOpen={() => { /* Handler function here */ }}
                    secondary={false}
                    //fixed={true}
                />
            </Flex>
            <Flex width={'100%'} direction={'column'} align={'center'} background={'#A2EF8C'} padding={'40px'} gap={'40px'}>
                <Flex gap={'122px'} align={'center'}>
                    <Flex direction={'column'} gap={'30px'}>
                        <Text fontSize={'4xl'}>Plans & Pricing</Text>
                        <Text width={'600px'} fontSize={'xl'} color={'#848199'}>
                            Whether your time-saving automation needs are large or small, we’re here to help you scale.
                        </Text>
                    </Flex>
                    <Flex background={'#d0f7c5'} height={'fit-content'} borderRadius={'3xl'}>
                        <Button
                            backgroundColor={planType === "monthly" ? '#BB6BD9' : 'transparent'}
                            color={'#000'}
                            borderRadius={'40px'}
                            padding={'10px 20px'}
                            fontSize={'18px'}
                            onClick={handleChangePlan}
                        >
                            Monthly
                        </Button>
                        <Button
                            backgroundColor={planType === "yearly" ? '#BB6BD9' : 'transparent'}
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
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} key={plan.id} width={'30.33%'} padding={'10px'} borderWidth={'1px'} borderRadius={'md'} margin={'10px'}>
                            <Flex direction={'column'}>
                                <Text fontSize={'3xl'} fontWeight={'bold'} padding={'10px'}>${plan.price} <span style={{ color: '#848199', fontWeight: 'normal', fontSize: '20px' }}>/month</span></Text>
                                <Text fontSize={'2xl'} fontWeight={'semibold'} padding={'5px 10px'}>{plan.title}</Text>
                                <Text color={'#848199'} padding={'10px'}>{plan.des}</Text>
                                <ul style={{ padding: '10px' }}>
                                    {plan.options.map((option, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#848199', padding: '5px 0px' }}><FaCheckCircle color='' />  {option}</li>
                                    ))}
                                </ul>
                            </Flex>
                            <Button colorScheme="blackAlpha">choose plan</Button>
                        </Box>
                    ))}
                </Flex>
            </Flex >
        </Flex >
    );
}
