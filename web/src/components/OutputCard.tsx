import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

type OutputCardProps = React.InputHTMLAttributes<HTMLInputElement> & {
  userName: string;
  createdAt: string;
  id: string;
  message: string;
};

const OutputCard: React.FC<OutputCardProps> = ({
  userName,
  createdAt,
  message,
  id,
}) => {
  return (
    <>
      <Box p={5} shadow='md' borderWidth='1px' id={id}>
        <Heading fontSize='xl'>{userName}</Heading>
        <Heading fontSize='xl'>{createdAt}</Heading>
        <Text>{message}</Text>
      </Box>
    </>
  );
};

export default OutputCard;
