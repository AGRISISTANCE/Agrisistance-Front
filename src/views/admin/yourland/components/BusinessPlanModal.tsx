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
import asset from '../../../../assets/img/dashboards/asset';
import { IoClose } from 'react-icons/io5';
const text = [
  {
    title: 'Resource Managemnet',
    text1: 'Workers: Hire 5-7 workers to cover planting, maintenance, and harvesting tasks.',
    text2: 'Rainfall: With 700 mm of rainfall, irrigation may only be necessary during dry spells. Ensure that irrigation systems are ready to provide additional water if needed.'
  },
  {
    title: 'Crop/Soil Maintenance',
    text1: 'Implement crop rotation and cover cropping to maintain soil fertility, Add organic matter like compost or manure to improve soil structure and nutrient content.',
    text2: 'Regularly test the soil and adjust fertilizer use to maintain optimal nutrient levels and pH balance.'
  },
  {
    title: 'Weather Expectation',
    text1: 'Stay prepared for sudden weather changes; invest in weather monitoring tools for early alerts.',
    text2: 'Use mulching, shade nets, or windbreaks to protect crops from extreme weather conditions.'
  },
  {
    title: 'Profit',
    text1: 'Total spending: $23,046.75. Expected revenue: $61,505.125.',
    text2: 'Profit: $38,458.375.'
  },
  {
    title: 'Other',
    text1: 'Consider investing in beneficial insects like ladybugs and bees for natural pest control and pollination.',
    text2: 'Explore the use of solar panels to reduce irrigation system costs and enhance sustainability.'
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
            <Text background={'#218225'} borderRadius={'20px'} padding={3} fontSize="2xl" color="white">Business Plan for Land: MyLand 1 21/08/2024 10:50pm</Text>
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
