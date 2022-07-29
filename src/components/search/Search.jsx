import React from "react";
import './Search.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../store/productsSlice';
import { useEffect } from "react";

export const Search = () => {
    const dispatch = useDispatch(),
        filteredProducts = useSelector(state => state.products.filteredProducts);
        const SearchInput = document.querySelector('.searchInput');

    function searchItems(str, subStr) {
        return str.toUpperCase().includes(subStr.trim().toUpperCase());
    }
    
    function filterItems(arr, searchStr) {
        if (searchStr.length > 0) {
            let filteredArray = arr.filter((product) => {
                if (product.title) {
                    return searchItems(product.title, searchStr);
                } else return true;
            });
            dispatch(searchProducts(filteredArray));
        } else dispatch(searchProducts(filteredProducts));
    }

    useEffect(() => {
        dispatch(searchProducts(filteredProducts))
    }, [filteredProducts])
    // /list 

    return (
        <li className="header-bottom__list__item">
            <input onChange={() => filterItems(filteredProducts, SearchInput.value)} className="searchInput" type="text" placeholder="Пошук" />
        </li>
    )
}