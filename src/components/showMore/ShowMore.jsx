import React from 'react';
import { useDispatch } from 'react-redux';

import './ShowMore.css';
import Button from 'react-bootstrap/Button';

import { moreCounterIncrement, increaseLimiter } from '../../store/productsSlice';

export const ShowMore = () => {
  const dispatch = useDispatch();

  const showMore = () => {
    dispatch(moreCounterIncrement());
    dispatch(increaseLimiter());
  };

  return (
    <Button className='showMore-btn'
      variant="primary"
      onClick={ showMore }
    >
      Показати більше товарів
    </Button>
  );
};