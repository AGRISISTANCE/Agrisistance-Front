import React, { useState } from 'react';
import { Flex, Button, Box, Text, useDisclosure } from '@chakra-ui/react';
import land from 'assets/img/land/land';
import AddNewLand from './AddNewLand';
import { IoIosClose } from 'react-icons/io';

interface LandProps {
  name?: string;
  coordinates?: [string, string];
  select?: boolean;
  isNew?: boolean;
  selected?: boolean;
  onAddLand?: (landData: { name: string; coordinates: [string, string] }) => void;
}

export default function Land({
  name = '',
  coordinates = ['0', '0'],
  select = false,
  isNew = false,
  onAddLand
}: LandProps) {
  const [selected, setSelected] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const coordinateX = coordinates[0];
  const coordinateY = coordinates[1];

  const backgroundImage = name && land.land1 ? `url('${land.land1}')` : '#C4C4C4';

  const handleSelect = () => setSelected(!selected);
  const handleButtonClick = () => onOpen();

  const handleAddNewLand = () => {
    if (onAddLand) {
      onAddLand({ name, coordinates });
    }
    onClose();
  };

  return (
    <Flex direction="column" width="288px" background="#fff" borderRadius="12px" boxShadow="10px 10px 10px -14px rgba(0,0,0,0.61)">
      <Flex
        height="180px"
        width="100%"
        background={backgroundImage}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="12px 12px 0 0"
      />
      <Flex direction="row" padding="20px" justifyContent="space-between" alignItems="center">
        {!isNew && (
          <Flex direction="column" gap="10px">
            <Text fontSize="25px" fontWeight="bold">{name}</Text>
            <Text fontSize="17px">{coordinateX}, {coordinateY}</Text>
          </Flex>
        )}
        {select && !isNew && (
          <Flex direction="column" gap="10px">
            <Button colorScheme="green" borderRadius="20px" height="40px" fontSize="18px" onClick={handleSelect}>Select</Button>
            <Button colorScheme="gray" borderRadius="20px" height="40px" fontSize="18px">Delete</Button>
          </Flex>
        )}
        {isNew && (
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
                  <AddNewLand  />
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
        )}
      </Flex>
    </Flex>
  );
}
