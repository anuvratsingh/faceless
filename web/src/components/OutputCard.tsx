import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

type OutputCardProps = React.InputHTMLAttributes<HTMLInputElement> & {
  userName: string;
  createdAt: string;
  id: number;
  message: string;
};

const OutputCard: React.FC<OutputCardProps> = ({
  userName,
  createdAt,
  message,
  ...rest
}) => {
  return (
    <>
      <Box p={5} shadow='md' borderWidth='1px' {...rest}>
        <Heading fontSize='xl'>{userName}</Heading>
        <Heading fontSize='xl'>{userName}</Heading>
        <Text>{message}</Text>
      </Box>
    </>
  );
};

export default OutputCard;
