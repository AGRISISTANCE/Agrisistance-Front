import React from 'react';
import { Flex, Button, Text, useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { selectLand, removeLand } from '../../../../redux/landsSlice'; // Ensure this import is correct
import land from '../../../../assets/img/land/land';


interface LandProps {
  landId: string;
  name: string;
  coordinates: [string, string];
  select?: boolean;
  isNew?: boolean;
  onAddLand?: (landData: { name: string; coordinates: [string, string] }) => void;
}

export default function Land({
  landId,
  name,
  coordinates,
  select = false,
  isNew = false,
  onAddLand
}: LandProps) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const backgroundImage = name ? `url('${land.land1}')` : '#C4C4C4'; // Adjust image path if necessary

  const handleSelect = () => {
    dispatch(selectLand(landId));
  };

  const handleDelete = () => {
    dispatch(removeLand(landId));
  };

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
            <Text fontSize="17px">{coordinates[0]}, {coordinates[1]}</Text>
          </Flex>
        )}
        {!select && (
          <Flex direction="column" gap="10px">
            <Button colorScheme="green" borderRadius="20px" height="40px" fontSize="18px" onClick={handleSelect}>Select</Button>
            <Button colorScheme="gray" borderRadius="20px" height="40px" fontSize="18px" onClick={handleDelete}>Delete</Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
