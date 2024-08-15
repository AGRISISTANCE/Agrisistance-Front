import React, { useState } from 'react';
import { Flex, Button, Box } from '@chakra-ui/react';
import land from '../../../../assets/img/land/land';
import AddNewLand from './addNewLand';

interface LandProps {
  name?: string;
  coordinates?: [string, string];
  select?: boolean;
  isNew?: boolean;
}

export default function Land(props: LandProps) {
  const { name, coordinates, select, isNew } = props;

  const coordinateX = coordinates ? coordinates[0] : '';
  const coordinateY = coordinates ? coordinates[1] : '';

  const backgroundImage = name && land.land1 ? `url('${land.land1}')` : '#C4C4C4';
  const [showAddNewLand, setShowAddNewLand] = useState(false);

  const handleButtonClick = () => {
    setShowAddNewLand(true);
  };

  const handleClose = () => {
    setShowAddNewLand(false);
  };

  return (
    <Flex
      direction='column'
      width='288px'
      background='#fff'
      borderRadius='12px'
      boxShadow='10px 10px 10px -14px rgba(0,0,0,0.61)'
    >
      <Flex
        height='180px'
        width='100%'
        background={backgroundImage}
        backgroundSize='cover'
        backgroundPosition='center'
        borderRadius='12px 12px 0 0'
      />
      <Flex direction='row' padding='20px' justifyContent='space-between' alignItems='center'>
        {!isNew && (
          <Flex direction='column' gap='10px'>
            <h3 style={{ fontSize: '25px' }}>{name}</h3>
            <p style={{ fontSize: '17px' }}>{coordinateX}, {coordinateY}</p>
          </Flex>
        )}
        {select && !isNew && (
          <Flex direction='column' gap='10px'>
            <Button colorScheme='green' borderRadius='20px' height='40px' fontSize='18px'>
              Select
            </Button>
            <Button colorScheme='gray' borderRadius='20px' height='40px' fontSize='18px'>
              Delete
            </Button>
          </Flex>
        )}
        {isNew && (
          <Flex direction='column'>
            <Button onClick={handleButtonClick} fontSize='25px'>
              + Add New Land
            </Button>
            {showAddNewLand && (
              <Box className="modal-overlay" position='fixed' top='0' left='0' width='100%' height='100%' background='rgba(0,0,0,0.5)' zIndex='999'>
                <AddNewLand />
                <Button onClick={handleClose} position='absolute' top='10px' right='10px'>
                  Close
                </Button>
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
