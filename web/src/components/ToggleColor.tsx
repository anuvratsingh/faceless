import { useColorMode, Button, Box } from '@chakra-ui/react';
import React from 'react';

interface ToggleColorProps {}

const ToggleColor: React.FC<ToggleColorProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <header>
        <Box mt='10vh' mx='68vw'>
          <Button
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
            outline='none'
            borderStyle='solid'
            bg='none'
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? '🌙' : '☀'}
          </Button>
        </Box>
      </header>
      {children}
    </>
  );
};

export default ToggleColor;
