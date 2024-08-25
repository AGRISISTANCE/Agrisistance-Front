import React from 'react';
import {
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
import { Button } from 'antd';
import { Button as ChakraButton } from '@chakra-ui/react';
import { LandBusinessPlan } from '../../../../redux/landsSlice';

interface BusinessPlanModalProps {
  isDisabled: boolean;
  businessPlan: LandBusinessPlan[] | null;
}

const BusinessPlanModal: React.FC<BusinessPlanModalProps> = ({ isDisabled, businessPlan }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isDisabled || !businessPlan) {
    return <Text>No business plan available</Text>;
  }

  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={onOpen}
        className='btn-view'
        style={{
          background: isDisabled ? '#c5c0b6' : '#2acc32',  // Gray color when disabled
          color: isDisabled ? '#6c757d' : '#fff',          // Slightly muted gray text color when disabled
          cursor: isDisabled ? 'not-allowed' : 'pointer',  // Change cursor style when disabled
        }}
      >
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
              {businessPlan.map((plan, index) => (
                <Box
                  key={index} // Added key prop
                  bg="#fff"
                  borderRadius="md"
                  p={4}
                  w="100%"
                >
                  <Text fontSize="xl" color="#2acc32" mb={2}>
                    {plan.title}
                  </Text>
                  <Text>
                    {plan.description}
                  </Text>
                </Box>
              ))}
              <ChakraButton width={'fit-content'} colorScheme='#2ACC32' bg={'#2ACC32'} alignSelf={'center'}>Download</ChakraButton>
            </Flex>
            <ChakraButton colorScheme="" padding={'10px'} border={'2px'} borderRadius={'50%'} position={'absolute'} top={'-20px'} right={'-40px'} onClick={onClose}>
              <IoClose />
            </ChakraButton>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BusinessPlanModal;
