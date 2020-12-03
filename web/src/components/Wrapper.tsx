import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      {/* 
        <Example />
      </Box> */}
      <Box maxW='400px' w='100%' mt='22vh' mx='auto'>
        {children}
      </Box>
    </>
  );
};

export default Wrapper;
