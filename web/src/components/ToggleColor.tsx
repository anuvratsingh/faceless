import { useColorMode, Box, IconButton } from '@chakra-ui/react';
import { BsSun, BsMoon } from 'react-icons/bs';
import React from 'react';

interface ToggleColorProps {}

const ToggleColor: React.FC<ToggleColorProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign='right' mt='5vh' mr='8'>
      <IconButton
        aria-label='Toggle'
        icon={
          colorMode === 'light' ? (
            <BsMoon fill='gold' />
          ) : (
            <BsSun fill='yellow' />
          )
        }
        onClick={toggleColorMode}
        variant='ghost'
        _hover={{
          outline: 'none',
          boxShadow: 'none',
          backgroundColor: 'transparent',
        }}
        _active={{
          outline: 'none',
          boxShadow: 'none',
          backgroundColor: 'transparent',
        }}
        _focus={{
          outline: 'none',
          boxShadow: 'none',
          backgroundColor: 'transparent',
        }}
      />
    </Box>
  );
};

export default ToggleColor;
