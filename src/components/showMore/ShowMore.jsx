import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ShowMore.css';
import { setQueryParams } from '../../store/productsSlice';
import Button from 'react-bootstrap/Button';

export const ShowMore = () => {
    const [isLoading, setLoading] = useState(false);
    const { status } = useSelector(state => state.products);
    const { queryParams } = useSelector(state => state.products);
    let queryLimit = queryParams.queryLimit;
    const dispatch = useDispatch();

    const showMore = () => {
        queryLimit += queryLimit;
        dispatch(setQueryParams({ queryLimit }));
    }

    useEffect(() => {
        if (status === 'resolved' || status === 'rejected') setLoading(false);
        else setLoading(true);
    }, [status])

    return (
        <Button className='showMore-btn'
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? showMore : null}
            >
            {isLoading ? 'Loading…' : 'Показати більше товарів'}
        </Button>
    )
}