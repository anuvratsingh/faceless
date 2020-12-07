import React from 'react';
import { useAllMessagesQuery } from '../generated/graphql';
import OutputCard from './OutputCard';

interface AllMessagesProps {}

const AllMessages: React.FC<AllMessagesProps> = () => {
  const [allMessages] = useAllMessagesQuery();
  return (
    <div>
      {!allMessages.data ? (
        <div>loading...</div>
      ) : (
        <div className='message-stack'>
          {allMessages.data.allMessages.map((x) => (
            <OutputCard
              userName={x.userName}
              message={x.message}
              createdAt={x.createdAt}
              id={x.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMessages;
