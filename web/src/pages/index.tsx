import React from 'react';
import ToggleColor from '../components/ToggleColor';
import Username from '../components/Username';

const Index = () => (
  <div className='index-page'>
    <div className='navbar'>
      <ToggleColor />
    </div>
    <div className='index-main'>
      <Username />
    </div>
  </div>
);

export default Index;
