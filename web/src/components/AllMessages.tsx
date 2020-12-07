import { Box, Stack } from '@chakra-ui/react';
import React from 'react';
import { useAllMessagesQuery } from '../generated/graphql';
import OutputCard from './OutputCard';

interface AllMessagesProps {}

const AllMessages: React.FC<AllMessagesProps> = () => {
  const [allMessages] = useAllMessagesQuery();
  return (
    <>
      <Box>
        {!allMessages.data ? (
          <div>loading...</div>
        ) : (
          <Stack spacing={2}>
            {allMessages.data.allMessages.map((x) => (
              <OutputCard
                userName={x.userName}
                message={x.message}
                createdAt={x.createdAt}
                id={x.id}
              />
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default AllMessages;
