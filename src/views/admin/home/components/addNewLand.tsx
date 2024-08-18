import React, { useState } from 'react';
import asset from '../../../../assets/img/dashboards/asset';
import { Flex, Text } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

export default function AddNewLand() {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(2);
    };

    return (
        <Flex zIndex={3} direction={'column'} backgroundImage={asset.image} backgroundSize={'cover'} backgroundPosition={'center'} width={'1013px'} height={'677px'} align={'center'} justify={'center'}>
            {step === 1 && (
                <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                    <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'} >
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>What are your land coordinates</Text>
                    </Flex>
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'3xl'}>Land coordinates</Text>
                    <input type="text" placeholder='Example 41.40338, 2.17403' style={{
                        borderRadius: '0px',
                        width: '562px',
                        height: '40px'
                    }} />
                    <a href=""><Text color={'white'} fontWeight={'semibold'} fontSize={'2xl'}>How to get land coordinates</Text></a>
                    <button style={{
                        background: '#2acc32',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 20px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        gap: '20px',
                        borderRadius: '10px'
                    }}
                        onClick={handleNext}>Next <FaArrowRight /></button>
                </Flex>
            )}
            {step === 2 && (
                <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                    <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>How much Budget do you have?</Text>
                    </Flex>
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'3xl'}>Your Budget</Text>
                    <input type="text" style={{
                        borderRadius: '0px',
                        width: '562px',
                        height: '40px'
                    }}/>
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'2xl'}>Please Use the dollars currency</Text>
                    <button style={{
                        background: '#2acc32',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        borderRadius: '10px'
                    }}>Finish</button>
                </Flex>
            )}
        </Flex>
    );
}
