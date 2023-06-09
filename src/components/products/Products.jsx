import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './Products.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts, filterProducts, deleteProduct } from '../../store/productsSlice';
import { addToCart, fetchCart } from '../../store/cartSlice';
import { addToFavorite, fetchFavorite } from '../../store/favoriteSlice';

export const Products = () => {
  // working with store
  const dispatch = useDispatch(),
    { error, status, queryParams, searchedProducts, products, rowLength, moreLimiter } = useSelector(state => state.products),
    { user } = useSelector(state => state.cart),
    filterRules = useSelector(state => state.products.filterRules);
  // /working with store

  // working with routing
    const navigate = useNavigate(),
    goProduct = (product) => navigate(`/cars/${product.id}`);
  // /working with routing

  // fetching products from store
  useEffect(() => {
    console.log(queryParams);
    dispatch(fetchProducts(queryParams));
  }, [queryParams]);


  // /fetching products from store

  // filtering products
  useEffect(() => {
    console.log(products);
    dispatch(filterProducts(filterRules));
  }, [products]);

  useEffect(() => {
    dispatch(filterProducts(filterRules));
  }, [filterRules]);
  // /filtering products

    // cart
    const removeProduct = (productId, e) => {
      e.stopPropagation();
      dispatch(deleteProduct(productId));
      dispatch(fetchProducts(queryParams));
    };
    // /cart

  // cart
  const addProductToCart = (product, currentUser, e) => {
    e.stopPropagation();
    dispatch(addToCart({product, currentUser}));
    dispatch(fetchCart(currentUser));
  };
  // /cart

  // favorite
  const addProductToFavorite = (product, currentUser, e) => {
    e.stopPropagation();
    dispatch(addToFavorite({product, currentUser}));
    dispatch(fetchFavorite(currentUser));
  };
  // /favorite
  
  return (
    <div>
      { status === 'loading' && <h2>Loading products...</h2> }
      { error && <h2>Error: { error }</h2> }
      <Row xs={1} md={rowLength} className="g-4">
        {searchedProducts.map((product, index) => (index < moreLimiter) && (
          <Col key={ product.id }>
            <Card onClick={() => goProduct(product)}>
              <Card.Img variant="top" src={process.env.PUBLIC_URL+`${product.images[0]}`} />
              <Card.Body>
                <Card.Title>{ product.title }</Card.Title>
                <Card.Text>
                  { product.body }
                </Card.Text>
                <Card.Title>{ product.price + ' USD'}</Card.Title>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="info">Більше</Button>
                  <Button onClick={(e) => addProductToFavorite(product, user, e)} variant="info">
                    <svg enableBackground="new 0 0 485.3 485.3" version="1.1" viewBox="0 0 485.3 485.3" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="m349.6 28.95c-36.3 0-70.5 14.2-96.2 39.9l-10.6 10.6-10.8-10.8c-25.7-25.7-59.9-39.9-96.2-39.9-36.2 0-70.3 14.1-96 39.8s-39.8 59.8-39.8 96.1 14.2 70.4 39.9 96.1l190.9 190.9c3.3 3.3 7.7 4.9 12 4.9 4.4 0 8.8-1.7 12.1-5l190.5-190.5c25.7-25.7 39.9-59.8 39.9-96.1s-14.1-70.5-39.8-96.1c-25.6-25.8-59.7-39.9-95.9-39.9zm71.6 207.8-178.3 178.4-178.7-178.7c-19.2-19.2-29.8-44.7-29.9-71.9 0-27.1 10.5-52.6 29.7-71.8 19.2-19.1 44.7-29.7 71.7-29.7 27.2 0 52.7 10.6 72 29.9l22.9 22.9c6.4 6.4 17.8 6.4 24.3 0l22.8-22.8c19.2-19.2 44.8-29.8 71.9-29.8s52.6 10.6 71.8 29.8 29.8 44.7 29.7 71.9c0 27.1-10.6 52.6-29.9 71.8z"/>		
                    </svg>
                  </Button>
                  <Button onClick={(e) => addProductToCart(product, user, e)} variant="info">
                    <svg className="header-middle__right__menu__cart__svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <polygon className="ci-primary" points="160 96.039 160 128.04 464 128.04 464 191.38 428.5 304.04 149.93 304.04 109.93 16 16 16 16 48 82.068 48 122.07 336.04 451.97 336.04 496 196.31 496 96.039" fill="var(--ci-primary-color, currentColor)"/>
                      <path className="ci-primary" d="m176.98 368.34a64.073 64.073 0 0 0-64 64 64 64 0 0 0 128 0 64.072 64.072 0 0 0-64-64zm0 96a32 32 0 1 1 32-32 32.038 32.038 0 0 1-32 32z" fill="var(--ci-primary-color, currentColor)"/>
                      <path className="ci-primary" d="m400.98 368.34a64.073 64.073 0 0 0-64 64 64 64 0 0 0 128 0 64.072 64.072 0 0 0-64-64zm0 96a32 32 0 1 1 32-32 32.038 32.038 0 0 1-32 32z" fill="var(--ci-primary-color, currentColor)"/>
                    </svg>
                  </Button>
                  <Button onClick={(e) => removeProduct(product.id, e)} variant="info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

