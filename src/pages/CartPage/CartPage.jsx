import React from 'react';

import Table from 'react-bootstrap/Table';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from 'react-redux';

import { fetchCart, removeFromCart } from '../../store/cartSlice';
import './CartPage.css';

export const CartPage = () =>{
  const products = useSelector(state => state.cart.cartProducts);
  const currentUser = useSelector(state => state.cart.user);
  const dispatch = useDispatch();
    
  const removeProduct = (product, currentUser) => {
    dispatch(removeFromCart({product, currentUser}));
    dispatch(fetchCart(currentUser));
  };

  return (
    <div className="container">
      <h1>Кошик</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Зображення</th>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Видалити з кошика</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.tag}>
              <td><img className='table__img' src={process.env.PUBLIC_URL+`${product.images[0]}`} alt={product.title} /></td>
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