import React, { useState } from 'react';
import { Flex, Button, Box, Text, useDisclosure } from '@chakra-ui/react';
import land from '../../../../assets/img/land/land';
import AddNewLand from './AddNewLand';
import { IoIosClose } from 'react-icons/io';
export default function LandAdd() {
    
    const [selected, setSelected] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleSelect = () => setSelected(!selected);
    const handleButtonClick = () => onOpen();


    return (
        <Flex direction="column" width="288px" background="#fff" borderRadius="12px" boxShadow="10px 10px 10px -14px rgba(0,0,0,0.61)">
            <Flex
                height="180px"
                width="100%"
                background={'#'}
                backgroundSize="cover"
                backgroundPosition="center"
                borderRadius="12px 12px 0 0"
            />
            <Flex direction="row" padding="20px" justifyContent="space-between" alignItems="center">
                <Flex direction="column">
                    <Button onClick={handleButtonClick} fontSize="25px">+ Add New Land</Button>
                    {isOpen && (
                        <Box
                            className="modal-overlay"
                            position="fixed"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            background="rgba(0,0,0,0.5)"
                            zIndex="999"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box background="#fff" borderRadius="30px" position="relative">
                                <AddNewLand />
                                <Button
                                    onClick={onClose}
                                    position="absolute"
                                    top="-20px"
                                    right="-40px"
                                    colorScheme="none"
                                    border="2px"
                                    color="#fff"
                                    padding="10px"
                                    borderRadius="50%"
                                    fontSize="30px"
                                >
                                    <IoIosClose />
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}
