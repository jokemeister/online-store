import React from "react"
import './Sort.css'
import { useDispatch, useSelector } from 'react-redux';
import { setQueryParams, fetchProducts } from '../../store/productsSlice';


export const Sort = () => {
    const dispatch = useDispatch();
    const { queryParams } = useSelector(state => state.products);
    let queryOrder = queryParams.queryOrder;
    const changeSortingRule = () => {
        const selector = document.getElementById('selector');
        console.log(selector.value);
        if (selector.value == 'default') {
            queryOrder = {
                orderBy: 'id',
                orderType: 'asc'
            }
            dispatch(setQueryParams({queryOrder}))
        } else if (selector.value == 'titleAsc') {
            queryOrder = {
                orderBy: 'title',
                orderType: 'asc'
            }
            dispatch(setQueryParams({queryOrder}));
        } else if (selector.value == 'titleDesc') {
            queryOrder = {
                orderBy: 'title',
                orderType: 'desc'
            }
            dispatch(setQueryParams({queryOrder}));
        } else if (selector.value == 'priceAsc') {
            queryOrder = {
                orderBy: 'price',
                orderType: 'asc'
            }
            dispatch(setQueryParams({queryOrder}))
        } else if (selector.value == 'priceDesc') {
            queryOrder = {
                orderBy: 'price',
                orderType: 'desc'
            }
            dispatch(setQueryParams({queryOrder}))
        }
    }
    return (
        <div className="sortGroup">
        <label htmlFor="selector">Сортування:</label>
        <select defaultValue={'default'} onChange={changeSortingRule} id="selector" name="selector">
                <option  value="default">По замовченню</option>
                <option value="titleAsc">Назва (А - Я)</option>
                <option value="titleDesc">Назва (Я - А)</option>
                <option value="priceAsc">Ціна (низька {'<'} висока)</option>
                <option value="priceDesc">Ціна (висока {'>'} низька)</option>
        </select>
        </div>
    )
}