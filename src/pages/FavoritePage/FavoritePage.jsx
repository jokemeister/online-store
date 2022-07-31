import React from 'react';

import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from 'react-redux';

import './FavoritePage.css';
import { fetchFavorite, removeFromFavorite } from '../../store/favoriteSlice';

export const FavoritePage = () =>{
  const favoriteProducts = useSelector(state => state.favorite.favoriteProducts);
  const currentUser = useSelector(state => state.cart.user);
  const dispatch = useDispatch();
    
  const removeProduct = (product, currentUser) => {
    dispatch(removeFromFavorite({product, currentUser}));
    dispatch(fetchFavorite(currentUser));
  };

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
          {favoriteProducts?.map((product) => (
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
  );
};