import React, { useState, useEffect } from 'react';
import asset from '../../../../assets/img/dashboards/asset';
import { Flex, Text, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Progress } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Form, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { addLand } from '../../../../redux/LandSlice';

interface AddNewLandProps {
    initialStep?: number;
}

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

    const [step, setStep] = useState<number>(initialStep);
    const [modalContent, setModalContent] = useState<string>('');
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [progressMessage, setProgressMessage] = useState<string>('Starting...');

    const handleAddLand = () => {
        if (landName && latitude && longitude && landSize && budget && phLevel && phosphorus && potassium && oxygenLevel && nitrogen) {
            const newLand = {
                land_id: Date.now(),
                land_name: landName,
                latitude: Number(latitude),
                longitude: Number(longitude),
                land_size: Number(landSize),
                budget: Number(budget),
                ph_level: Number(phLevel),
                phosphorus: Number(phosphorus),
                potassium: Number(potassium),
                oxygen_level: Number(oxygenLevel),
                nitrogen: Number(nitrogen),
            };

//            dispatch(addLand(newLand));

            setLandName('');
            setLatitude('');
            setLongitude('');
            setLandSize('');
            setBudget('');
            setPhLevel('');
            setPhosphorus('');
            setPotassium('');
            setOxygenLevel('');
            setNitrogen('');
        }
    };

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
            setProgressMessage('Getting prediction...');
            setTimeout(() => {
                setProgressMessage('Completed!');
                setTimeout(() => {
                    setShowProgress(false);
                    onClose();
                    navigate('/dashboard/yourland');
                }, 1000);
            }, 1500);
        }, 1500);
    };

    const openModal = (content: string) => {
        setModalContent(content);
        onOpen();
    };

    return (
        <Flex zIndex={3} direction={'column'} backgroundImage={asset.image} backgroundSize={'cover'} backgroundPosition={'center'} width={'1013px'} height={'677px'} align={'center'} justify={'center'}>
            <Form
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
                                placeholder='Enter nitrogen level'
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
            </Form>
                
            {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalBody>
                        {modalContent}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}

            {showProgress && (
                <Flex
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    direction="column"
                    align="center"
                    background="rgba(0, 0, 0, 0.8)"
                    padding="20px"
                    borderRadius="10px"
                >
                    <Text color="white" fontSize="xl" mb="10px">{progressMessage}</Text>
                    <Progress hasStripe value={100} size="lg" isAnimated />
                </Flex>
            )}
        </Flex>
    );
}
