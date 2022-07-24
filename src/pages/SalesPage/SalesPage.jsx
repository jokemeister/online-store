import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../../components/products';
import { fetchProducts, setQueryParams } from '../../store/productsSlice';

export const SalesPage = () => {
    // const { error, status, queryParams } = useSelector(state => state.products);
    // let { queryFilterRules } = useSelector(state => state.products.queryParams);
    // const dispatch = useDispatch();
  
  
    // useEffect(() => {
    //     console.log('start', queryFilterRules);
    //     queryFilterRules = {
    //         filterBy: "sale",
    //         operator: "==",
    //         comparator: true
    //     }
    //     console.log('end', queryFilterRules);
    //     dispatch(setQueryParams( queryFilterRules ));
    //     console.log(queryParams);
    // }, [])

    // useEffect(() => {
    //     console.log(queryParams);
    //     dispatch(fetchProducts(queryParams))
    // }, [queryFilterRules])

    return (
        <div className="container">
            <Products />
        </div>
    )
}