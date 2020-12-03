import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import ToggleColor from '../components/ToggleColor';
import Username from '../components/Username';

const Index = () => (
  <Box maxW='70vw' margin='auto'>
    <ToggleColor />
    <Flex justifyContent='center' align='center'>
      <Username />
    </Flex>
  </Box>
);

export default Index;
