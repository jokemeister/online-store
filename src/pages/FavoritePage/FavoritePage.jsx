import React from 'react';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from 'react-redux';
import './FavoritePage.css';
import { removeFromFavorite } from '../../store/favoriteSlice';

export const FavoritePage = () =>{
    const products = useSelector(state => state.favorite.products);
    const currentUser = useSelector(state => state.favorite.user);
    const dispatch = useDispatch();
    
    const removeProduct = (product, currentUser) => {
        dispatch(removeFromFavorite({product, currentUser}));
    }

    return (
        <div className="container">
            <h1>Обране</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Зображення</th>
                        <th>Назва</th>
                        <th>Ціна</th>
                        <th>Видалити з обраного</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                    <tr key={product.tag}>
                        <td><img className='table__img' src={product.img} alt={product.title} /></td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td><CloseButton onClick={() => removeProduct(product, currentUser)} /></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="info" size="lg">Купити</Button>
        </div>
    )
}