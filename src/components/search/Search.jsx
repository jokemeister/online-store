import React from "react";
import './Search.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterRules, fetchProducts } from '../../store/productsSlice';
import { useEffect } from "react";

export const Search = () => {
    const dispatch = useDispatch(),
        filterRules = useSelector(state => state.products.filterRules);
    
    useEffect(() => {
        console.log(filterRules);
        const SearchInput = document.querySelector('.searchInput');
        console.log('====================================');
        console.log(SearchInput.value);
        console.log('====================================');
    }, [])

    return (
        <li className="header-bottom__list__item">
            <input className="searchInput" type="text" placeholder="Пошук" />
        </li>
    )
}