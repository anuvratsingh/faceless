import React from 'react';
import AllMessages from '../components/AllMessages';
import MsgInput from '../components/MsgInput';
import ToggleColor from '../components/ToggleColor';

interface BoardProps {}

const Board: React.FC<BoardProps> = ({}) => {
  return (
    <div className='board-page'>
      <div className='navbar'>
        <ToggleColor />
      </div>
      <div className='messages'>
        <AllMessages />
        <MsgInput />
      </div>
    </div>
  );
};

export default Board;
