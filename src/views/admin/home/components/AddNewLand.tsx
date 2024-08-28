import React, { useState, useEffect } from 'react';
import asset from '../../../../assets/img/dashboards/asset';
import { Flex, Text, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Progress } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Removed the `Form` import
import { useDispatch } from 'react-redux';
import animationData from '../../../../assets/img/dashboards/cropanimated.json'
import Lottie from 'lottie-react';

interface AddNewLandProps {
    initialStep?: number;
}

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};


export default function AddNewLand({ initialStep = 0 }: AddNewLandProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [landName, setLandName] = useState('');
    const [latitude, setLatitude] = useState<number | ''>('');
    const [longitude, setLongitude] = useState<number | ''>('');
    const [landSize, setLandSize] = useState<number | ''>('');
    const [budget, setBudget] = useState<number | ''>('');
    const [phLevel, setPhLevel] = useState<number | ''>('');
    const [phosphorus, setPhosphorus] = useState<number | ''>('');
    const [potassium, setPotassium] = useState<number | ''>('');
    const [oxygenLevel, setOxygenLevel] = useState<number | ''>('');
    const [nitrogen, setNitrogen] = useState<number | ''>('');
    const [azote, setAzote] = useState<number | ''>('');

    const [step, setStep] = useState<number>(initialStep);
    const [modalContent, setModalContent] = useState<string>('');
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [progressMessage, setProgressMessage] = useState<string>('Starting...');
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const handleAddLand = () => {
        if (landName && latitude && longitude && landSize && budget && phLevel && phosphorus && potassium && oxygenLevel && nitrogen) {
            const newLand = {
                //land_id: Date.now(),
                land_name: landName,
                latitude: Number(latitude),
                longitude: Number(longitude),
                land_size: Number(landSize),
                budget: Number(budget),
                oxygen_level: Number(oxygenLevel),
                nitrogen: Number(nitrogen),
                potassium: Number(potassium),
                phosphorus: Number(phosphorus),
                ph_level: Number(phLevel),
            };
            console.log("land created successfully with data: ", newLand)
        }}
        
    //         setLandName('');
    //         setLatitude('');
    //         setLongitude('');
    //         setLandSize('');
    //         setBudget('');
    //         setPhLevel('');
    //         setPhosphorus('');
    //         setPotassium('');
    //         setOxygenLevel('');
    //         setNitrogen('');
    //     }
    // };

    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    useEffect(() => {
        if (initialStep === 5) {
            setStep(5);
            setShowProgress(true);
        }
    }, [initialStep]);

    const handleFinish = () => {
        handleAddLand();
        handleNext();
        setShowProgress(true);
        setProgressMessage('Starting...');
        setTimeout(() => {
            setProgressMessage('Getting predictions...');
            setTimeout(() => {
                setProgressMessage('Completed!');
                setTimeout(() => {
                    setShowProgress(false);
                    onClose();
                    navigate('/dashboard/yourland');
                }, 1000);
            }, 4000);
        }, 1000);
    };

    const openModal = (content: string) => {
        setModalContent(content);
        onOpen();
    };

    return (
        <Flex zIndex={3} direction={'column'} backgroundImage={asset.image} backgroundSize={'cover'} backgroundPosition={'center'} width={'1013px'} height={'677px'} align={'center'} justify={'center'}>
            <form // Use a standard HTML form tag
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddLand();
                }}>
                {step === 0 && (
                    <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                        <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                            <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>What is your land name?</Text>
                        </Flex>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'3xl'}>Land name</Text>
                        <Input
                            type="text"
                            placeholder='Enter land name'
                            value={landName}
                            onChange={(e) => setLandName(e.target.value)}
                            style={{
                                borderRadius: '0px',
                                width: '562px',
                                height: '40px',
                                background: '#fff',
                                color: '#000'
                            }}
                        />
                        <Flex gap={'30px'}>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handleNext}
                                width={'150px'}
                            >
                                Next <FaArrowRight />
                            </Button>
                        </Flex>
                    </Flex>
                )}
                {step === 1 && (
                    <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                        <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                            <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>What are your land coordinates?</Text>
                        </Flex>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'3xl'}>Land coordinates</Text>
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Latitude</label>
                            <Input
                                type="text"
                                placeholder='Enter latitude'
                                value={latitude}
                                onChange={(e) => setLatitude(Number(e.target.value) || '')}
                                style={{
                                    borderRadius: '0px',
                                    width: '562px',
                                    height: '40px',
                                    background: '#fff',
                                    color: '#000'
                                }}
                            />
                        </Flex>
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Longitude</label>
                            <Input
                                type="text"
                                placeholder='Enter longitude'
                                value={longitude}
                                onChange={(e) => setLongitude(Number(e.target.value) || '')}
                                style={{
                                    borderRadius: '0px',
                                    width: '562px',
                                    height: '40px',
                                    background: '#fff',
                                    color: '#000'
                                }}
                            />
                        </Flex>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'2xl'} onClick={() => openModal('To get your land coordinates, use a GPS device or a mapping service. Enter the latitude and longitude separated by a comma.')} style={{ cursor: 'pointer' }}>
                            How to get land coordinates
                        </Text>
                        <Flex>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handlePrevious}
                                width={'150px'}
                            >
                                <FaArrowLeft /> Previous
                            </Button>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handleNext}
                                width={'150px'}
                            >
                                Next <FaArrowRight />
                            </Button>
                        </Flex>
                    </Flex>
                )}
                {step === 2 && (
                    <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                        <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                            <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>What is your land size?</Text>
                        </Flex>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'3xl'}>Land size (in hectares)</Text>
                        <Input
                            type="text"
                            placeholder='Enter land size'
                            value={landSize}
                            onChange={(e) => setLandSize(Number(e.target.value) || '')}
                            style={{
                                borderRadius: '0px',
                                width: '562px',
                                height: '40px',
                                background: '#fff',
                                color: '#000'
                            }}
                        />
                        <Flex>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handlePrevious}
                                width={'150px'}
                            >
                                <FaArrowLeft /> Previous
                            </Button>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handleNext}
                                width={'150px'}
                            >
                                Next <FaArrowRight />
                            </Button>
                        </Flex>
                    </Flex>
                )}
                {step === 3 && (
                    <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                    <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>What is your budget?</Text>
                    </Flex>
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Budget</label>
                            <Input
                                type="text"
                                placeholder='Enter budget'
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value) || '')}
                                style={{
                                    borderRadius: '0px',
                                    width: '562px',
                                    height: '40px',
                                    background: '#fff',
                                    color: '#000'
                                }}
                            />
                        </Flex>
                        <Flex>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handlePrevious}
                                width={'150px'}
                            >
                                <FaArrowLeft /> Previous
                            </Button>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handleNext}
                                width={'150px'}
                            >
                                Next <FaArrowRight />
                                    </Button>
                                </Flex>
                            </Flex>
                        )}
                        {step === 4 && (
                            <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                            <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                                <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>Entre those details about your soil:</Text>
                            </Flex>
                            <Flex direction={'column'} align={'center'} gap={'10px'}>
                                <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Oxygen Level</label>
                                <Input
                                    type="text"
                                    placeholder='Enter oxygen level'
                                    value={oxygenLevel}
                                    onChange={(e) => setOxygenLevel(Number(e.target.value) || '')}
                                    style={{
                                        borderRadius: '0px',
                                        width: '562px',
                                        height: '40px',
                                        background: '#fff',
                                        color: '#000'
                                    }}
                                />
                            </Flex>
                            <Flex direction={'column'} align={'center'} gap={'10px'}>
                                <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Nitrogen</label>
                                <Input
                                    type="text"
                                    placeholder='Enter Nitrogen level'
                                    value={nitrogen}
                                    onChange={(e) => setNitrogen(Number(e.target.value) || '')}
                                    style={{
                                        borderRadius: '0px',
                                        width: '562px',
                                        height: '40px',
                                        background: '#fff',
                                        color: '#000'
                                    }}
                                />
                            </Flex>
                            <Flex direction={'column'} align={'center'} gap={'10px'}>
                                <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Potassium</label>
                                <Input
                                    type="text"
                                    placeholder='Enter potassium level'
                                    value={potassium}
                                    onChange={(e) => setPotassium(Number(e.target.value) || '')}
                                    style={{
                                        borderRadius: '0px',
                                        width: '562px',
                                        height: '40px',
                                        background: '#fff',
                                        color: '#000'
                                    }}
                                />
                            </Flex>
                            <Flex direction={'column'} align={'center'} gap={'10px'}>
                                <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Phosphorus</label>
                                <Input
                                    type="text"
                                    placeholder='Enter phosphorus level'
                                    value={phosphorus}
                                    onChange={(e) => setPhosphorus(Number(e.target.value) || '')}
                                    style={{
                                        borderRadius: '0px',
                                        width: '562px',
                                        height: '40px',
                                        background: '#fff',
                                        color: '#000'
                                    }}
                                />
                            </Flex>
                            <Flex direction={'column'} align={'center'} gap={'10px'}>
                                <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Ph level</label>
                                <Input
                                    type="text"
                                    placeholder='Enter ph Level'
                                    value={phLevel}
                                    onChange={(e) => setPhLevel(Number(e.target.value) || '')}
                                    style={{
                                        borderRadius: '0px',
                                        width: '562px',
                                        height: '40px',
                                        background: '#fff',
                                        color: '#000'
                                    }}
                                />
                            </Flex>
                        {/* 
                        Leave this commented idk if we will need it
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>pH Level</label>
                            <Input
                                type="text"
                                placeholder='Enter pH level'
                                value={phLevel}
                                onChange={(e) => setPhLevel(Number(e.target.value) || '')}
                                style={{
                                    borderRadius: '0px',
                                    width: '562px',
                                    height: '40px',
                                    background: '#fff',
                                    color: '#000'
                                }}
                            />
                        </Flex> */}
                        <Flex gap={'30px'}>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handlePrevious}
                                width={'150px'}
                            >
                                <FaArrowLeft /> Previous
                            </Button>
                            <Button
                                bg={'#2acc32'}
                                color={'#fff'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                p={'10px 20px'}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                gap={'20px'}
                                borderRadius={'10px'}
                                onClick={handleFinish}
                                width={'150px'}
                            >
                                Finish
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </form>
            {showProgress && (
                
                    <Flex
							direction={'column'}
							align={'center'}
							justify={'center'}
							position={'fixed'}
							top={'50%'}
							left={'50%'}
							transform={'translate(-50%, -50%)'}
							p={'20px'}
							bg={'#fff'}
							borderRadius={'10px'}
							shadow={'md'}
							zIndex={1000} // Ensure it's above the blur overlay
                            maxWidth={'60%'} // Limit the maximum width to 90% of the parent container
                            maxHeight={'60%'} // Limit the maximum height to 90% of the parent container
                            width={'auto'} // Adjust width based on content
                            height={'auto'} // Adjust height based on content
						>
                            <Lottie animationData={animationData} style={{ width: '100%', maxWidth: '300px', height: 'auto' }} />

							<Text my={4} fontSize={20} fontWeight={'bold'}>{progressMessage}</Text>
							<Progress size='md' isIndeterminate />
						</Flex>
               
            )}
        </Flex>
    );
    }
