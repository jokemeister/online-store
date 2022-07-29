import React from 'react';
import { useDispatch } from 'react-redux';
import './ShowMore.css';
import { moreCounterIncrement, increaseLimiter } from '../../store/productsSlice';
import Button from 'react-bootstrap/Button';

export const ShowMore = () => {
    const dispatch = useDispatch();

    const showMore = () => {
        dispatch(moreCounterIncrement());
        dispatch(increaseLimiter());
    }

    return (
        <Button className='showMore-btn'
            variant="primary"
            onClick={ showMore }
            >
            Показати більше товарів
        </Button>
    )
}