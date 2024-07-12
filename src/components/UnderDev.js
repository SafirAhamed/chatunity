import React from 'react';
import './UnderDev.scss';
import PrimaryButton from './common/buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

function UnderDev() {
  const navigate = useNavigate();

  return (
    <div className='under-dev'>
      <div className='under-dev__button-container'>
        <PrimaryButton value={'Country Details'} onClick={() => navigate('tools/country_details')} />
      </div>
      <div className='under-dev__content under-dev__content--main'>
        CHAT UNITY
        <div className='under-dev__content--main-sub'>
          LET'S CONNECT WITH THIS WORLD
        </div>
      </div>
      <div className='under-dev__content under-dev__content--secondary'>
        UNDER CONSTRUCTION
        <div className='under-dev__content--secondary-sub'>
          STAY TUNED!! And chat with anyone, anytime, anywhere
        </div>
      </div>
      <div className='under-dev__content under-dev__content--signature'>
        -Safir Ahamed
      </div>
    </div>
  );
}

export default UnderDev;
