import React, { useState } from 'react';
import asset from '../../../../assets/img/dashboards/asset';
import { Flex, Text, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Progress } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AddNewLand() {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState({
        coordinates: '',
        area: '',
        budget: '',
        o2Levels: '',
        nitrogen: '',
        potassium: '',
        phosphorus: '',
        phLevels: ''
    });
    const [modalContent, setModalContent] = useState<string>('');
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [progressMessage, setProgressMessage] = useState<string>('Starting...');
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFinish = () => {
        // Show the progress bar
        handleNext();
        setShowProgress(true);

        // Update progress messages
        setProgressMessage('Starting...');
        setTimeout(() => {
            setProgressMessage('Getting prediction...');
            setTimeout(() => {
                setProgressMessage('Completed!');
                setTimeout(() => {
                    setShowProgress(false);
                    onClose(); // Close the modal after submission
                    navigate('/dashboard/yourland'); // Redirect to another page
                }, 1000); // Duration for the completed message
            }, 1500); // Duration for the "Almost Done" message
        }, 1500); // Duration for the "Starting" message
    };

    const openModal = (content: string) => {
        setModalContent(content);
        onOpen();
    };

    return (
        <Flex zIndex={3} direction={'column'} backgroundImage={asset.image} backgroundSize={'cover'} backgroundPosition={'center'} width={'1013px'} height={'677px'} align={'center'} justify={'center'}>
            {step === 1 && (
                <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                    <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>What are your land coordinates</Text>
                    </Flex>
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'3xl'}>Land coordinates</Text>
                    <Input
                        type="text"
                        name="coordinates"
                        placeholder='Example 41.40338, 2.17403'
                        value={formData.coordinates}
                        onChange={handleInputChange}
                        style={{
                            borderRadius: '0px',
                            width: '562px',
                            height: '40px',
                            background: '#fff',
                            color: '#000'
                        }}
                    />
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'2xl'} onClick={() => openModal('To get your land coordinates, use a GPS device or a mapping service. Enter the latitude and longitude separated by a comma.')} style={{ cursor: 'pointer' }}>
                        How to get land coordinates
                    </Text>
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
                    >
                        Next <FaArrowRight />
                    </Button>
                </Flex>
            )}
            {step === 2 && (
                <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                    <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>What is the area of your land?</Text>
                    </Flex>
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'3xl'}>Land area</Text>
                    <Input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        style={{
                            borderRadius: '0px',
                            width: '562px',
                            height: '40px',
                            background: '#fff',
                            color: '#000'
                        }}
                    />
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'2xl'} onClick={() => openModal('Provide the land area in square meters or hectares. Ensure to use the correct unit as per your requirement.')} style={{ cursor: 'pointer' }}>
                        How to determine land area
                    </Text>
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
                    >
                        Next <FaArrowRight />
                    </Button>
                </Flex>
            )}
            {step === 3 && (
                <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                    <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>How much Budget do you have?</Text>
                    </Flex>
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'3xl'}>Your Budget</Text>
                    <Input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        style={{
                            borderRadius: '0px',
                            width: '562px',
                            height: '40px',
                            background: '#fff'
                        }}
                    />
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'2xl'} onClick={() => openModal('Specify your budget in the local currency or dollars. Make sure to enter a realistic figure.')} style={{ cursor: 'pointer' }}>
                        How to set your budget
                    </Text>
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
                    >
                        Next <FaArrowRight />
                    </Button>
                </Flex>
            )}
            {step === 4 && (
                <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                    <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>What are your soil parameters?</Text>
                    </Flex>
                    <Text color={'white'} fontWeight={'semibold'} fontSize={'2xl'}>How to get your soil parameters</Text>
                    <Flex flexWrap={'wrap'} gap={'20px'} align={'center'} justify={'center'}>
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>O2 levels</label>
                            <Input
                                type="text"
                                name="o2Levels"
                                value={formData.o2Levels}
                                onChange={handleInputChange}
                                style={{ borderRadius: '0px', width: '250px', height: '40px', background: '#fff' }}
                            />
                            <Text style={{ color: '#fff', fontSize: '20px', fontWeight: 'normal' }}>Percentage of gas volume in the soil</Text>
                        </Flex>
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Nitrogen(N)</label>
                            <Input
                                type="text"
                                name="nitrogen"
                                value={formData.nitrogen}
                                onChange={handleInputChange}
                                style={{ borderRadius: '0px', width: '250px', height: '40px', background: '#fff' }}
                            />
                            <Text style={{ color: '#fff', fontSize: '20px', fontWeight: 'normal' }}>Kg/ha</Text>
                        </Flex>
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Potassium(K)</label>
                            <Input
                                type="text"
                                name="potassium"
                                value={formData.potassium}
                                onChange={handleInputChange}
                                style={{ borderRadius: '0px', width: '250px', height: '40px', background: '#fff' }}
                            />
                            <Text style={{ color: '#fff', fontSize: '20px', fontWeight: 'normal' }}>Kg/ha</Text>
                        </Flex>
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Phosphorus</label>
                            <Input
                                type="text"
                                name="phosphorus"
                                value={formData.phosphorus}
                                onChange={handleInputChange}
                                style={{ borderRadius: '0px', width: '250px', height: '40px', background: '#fff' }}
                            />
                            <Text style={{ color: '#fff', fontSize: '20px', fontWeight: 'normal' }}>Kg/ha</Text>
                        </Flex>
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>Ph levels</label>
                            <Input
                                type="text"
                                name="phLevels"
                                value={formData.phLevels}
                                onChange={handleInputChange}
                                style={{ borderRadius: '0px', width: '250px', height: '40px', background: '#fff' }}
                            />
                            <Text style={{ color: '#fff', fontSize: '20px', fontWeight: 'normal' }}>Ph scale</Text>
                        </Flex>
                    </Flex>
                    <Button
                        bg={'#2acc32'}
                        color={'#fff'}
                        p={'10px 20px'}
                        fontSize={'20px'}
                        fontWeight={'bold'}
                        borderRadius={'10px'}
                        onClick={handleFinish}
                    >
                        Finish
                    </Button>
                </Flex>
            )}
            {
                step === 5 && showProgress &&
                <Flex direction={'column'} align={'center'} width={'100%'} gap={'20px'}>
                    <Flex backgroundColor={'#218225'} padding={'20px'} borderRadius={'50px'}>
                        <Text color={'white'} fontWeight={'semibold'} fontSize={'30px'}>Generating your business plan...</Text>
                    </Flex>
                    <Flex direction={'column'} align={'center'} justify={'center'} width={'300px'}>
                        <Text mb={'10px'} color={'#fff'} fontSize={'2xl'}>{progressMessage}</Text>
                        <Progress size='md' isIndeterminate colorScheme='green' width={'100%'} />
                    </Flex>
                </Flex>
            }

            {/* Modal Popup */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Information</ModalHeader>
                    <ModalBody>
                        <Text>{modalContent}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
