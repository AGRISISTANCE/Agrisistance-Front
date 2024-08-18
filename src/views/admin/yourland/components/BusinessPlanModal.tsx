import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Box,
  Text,
  Flex
} from '@chakra-ui/react';
import asset from 'assets/img/dashboards/asset';
import { IoClose } from 'react-icons/io5';
const text = [
  {
    title: 'Resource Managemnet',
    text1: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers',
    text2: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers'
  },
  {
    title: 'Profit Expectations',
    text1: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers',
    text2: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers'
  },
  {
    title: 'Crop/ Soil Maintnance',
    text1: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers',
    text2: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers'
  },
  {
    title: 'Expected Revenue ',
    text1: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers',
    text2: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers'
  },
  {
    title: 'Weather Predictions',
    text1: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers',
    text2: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers'
  },
  {
    title: 'Other',
    text1: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers',
    text2: 'You will Need about 17 workers, each of them with a salary of 10$ per week, it is recommended to pick experienced workers'
  },
]
const BusinessPlanModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className='btn-view' colorScheme="blackAlpha">
        View your business plan
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxWidth="80%"
          maxHeight="80%"
          bgImage={asset.image}
          bgSize="cover"
          bgPosition="center"
        >
          <ModalHeader>
            <Text background={'#218225'} borderRadius={'20px'} padding={3} fontSize="2xl" color="white">Business Plan for Land: LandName  21/08/2024    10:50pm</Text>
          </ModalHeader>
          <ModalBody
            overflowY="scroll"
            maxHeight="calc(100vh - 120px)" // Adjust based on header and footer height
            p={4}
            color="white"
          >
            <Flex direction="column" gap={4}>
              {text.map((index) => (
                <Box
                  bg="#fff"
                  borderRadius="md"
                  p={4}
                  w="100%"
                >
                  <Text fontSize="xl" color="#2acc32" mb={2}>
                    {index.title}
                  </Text>
                  <Text>
                    {index.text1}
                  </Text>
                  <Text>
                    {index.text2}
                  </Text>
                </Box>
              ))}
              <Button width={'fit-content'} colorScheme='#2ACC32' bg={'#2ACC32'} alignSelf={'center'}>Download</Button>
            </Flex>
            <Button colorScheme="" padding={'10px'} border={'2px'} borderRadius={'50%'} position={'absolute'} top={'-20px'} right={'-40px'} onClick={onClose}><IoClose /></Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BusinessPlanModal;
