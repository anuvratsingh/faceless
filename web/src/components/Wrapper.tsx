import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <Box maxW='40px' w='10%' display='none'>
        {children}
      </Box>
    </>
  );
};

export default Wrapper;
