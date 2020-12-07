import React from 'react';
import AllMessages from '../components/AllMessages';
import MsgInput from '../components/MsgInput';

interface BoardProps {}

const Board: React.FC<BoardProps> = ({}) => {
  return (
    <>
      <AllMessages />
      <MsgInput />
    </>
  );
};

export default Board;
