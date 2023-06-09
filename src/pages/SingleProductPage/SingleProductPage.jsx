import React from 'react';
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './SingleProductPage.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addToCart, fetchCart } from '../../store/cartSlice';
import { addToFavorite, fetchFavorite } from '../../store/favoriteSlice';

export const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const products = useSelector(state => state.products.products);
  const { user } = useSelector(state => state.cart);
  const { error, status } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const { queryId} = useParams();

  // get product for render
  const findProduct = () => {
    let currentProduct = products.find(product => product.id === queryId);
    if (currentProduct) {
      localStorage.setItem('currentProduct', JSON.stringify(currentProduct));
    } else currentProduct = JSON.parse(localStorage.getItem('currentProduct'));
    return currentProduct;
  };

  useEffect(() => {
    setProduct(findProduct());
  }, []);
  // /get product for render

  // cart
  const addProductToCart = (product, currentUser) => {
    dispatch(addToCart({product, currentUser}));
    dispatch(fetchCart(currentUser));
  };
  // /cart

  // favorite
  const addProductToFavorite = (product, currentUser) => {
    dispatch(addToFavorite({product, currentUser}));
    dispatch(fetchFavorite(currentUser));
  };
  // /favorite

  //   gallery
  const changePrimaryImage = (e, image) => {
    const primaryImage = document.querySelector('.primary-image');
    const secondaryImages = document.querySelectorAll('.secondary-image');

    primaryImage.setAttribute('src', process.env.PUBLIC_URL+`${image}`);
    secondaryImages.forEach(element => {
      element.classList.remove('selected');
    });
    e.target.classList.add('selected');
  };
  //   /gallery

  return (
    <Container>
      { status === 'loading' && <h2>Loading products...</h2> }
      { error && <h2>Error: { error }</h2> }
      <Row>
        <Col sm={4}>
          <Row>
            { (product.images) ? <img className='primary-image' src={process.env.PUBLIC_URL+`${product.images[0]}`} alt="" /> : <img className='primary-image' src={process.env.PUBLIC_URL+`${product.img}`} alt="" /> }
          </Row>
          <Row>
            <div className="gallery-block">
              <img onClick={(e) => changePrimaryImage(e, product.img)} className='secondary-image' src={process.env.PUBLIC_URL+`${product.img}`} alt="" />
              {product.images && product.images.map((image) => (
                <img className='secondary-image' key={image} onClick={(e) => changePrimaryImage(e, image)} src={process.env.PUBLIC_URL+`${image}`} alt="" />
              ))}
            </div>
          </Row>
        </Col>
        <Col sm={8}>
          <h1 className='product-title'>Комплект постільної білизни "{product.title}"</h1>
          <h2 className='product-subtitle'>Опис</h2>
          <p className='product-text'>{product.body}</p>
          <h2 className='product-subtitle'>Характеристики</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Характеристика</th>
                <th>Значення</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Виробник</td>
                <td>{product.manufacturer}</td>
              </tr>
              <tr>
                <td>Рік виробництва</td>
                <td>{product.year}</td>
              </tr>
              <tr>
                <td>Обʼєм двигуна</td>
                <td>{product.engine} л</td>
              </tr>
              <tr>
                <td>Потужність</td>
                <td>{product.hp} к.с.</td>
              </tr>
              <tr>
                <td>Колір</td>
                <td>{product.color}</td>
              </tr>
            </tbody>
          </Table>
          <h3>{product.price} USD</h3>
          <ButtonGroup aria-label="Basic example">
            <Button onClick={() => addProductToFavorite(product, user)} variant="info">
              <svg enableBackground="new 0 0 485.3 485.3" version="1.1" viewBox="0 0 485.3 485.3" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="m349.6 28.95c-36.3 0-70.5 14.2-96.2 39.9l-10.6 10.6-10.8-10.8c-25.7-25.7-59.9-39.9-96.2-39.9-36.2 0-70.3 14.1-96 39.8s-39.8 59.8-39.8 96.1 14.2 70.4 39.9 96.1l190.9 190.9c3.3 3.3 7.7 4.9 12 4.9 4.4 0 8.8-1.7 12.1-5l190.5-190.5c25.7-25.7 39.9-59.8 39.9-96.1s-14.1-70.5-39.8-96.1c-25.6-25.8-59.7-39.9-95.9-39.9zm71.6 207.8-178.3 178.4-178.7-178.7c-19.2-19.2-29.8-44.7-29.9-71.9 0-27.1 10.5-52.6 29.7-71.8 19.2-19.1 44.7-29.7 71.7-29.7 27.2 0 52.7 10.6 72 29.9l22.9 22.9c6.4 6.4 17.8 6.4 24.3 0l22.8-22.8c19.2-19.2 44.8-29.8 71.9-29.8s52.6 10.6 71.8 29.8 29.8 44.7 29.7 71.9c0 27.1-10.6 52.6-29.9 71.8z"/>		
              </svg>
            </Button>
            <Button onClick={() => addProductToCart(product, user)} variant="info">
              <svg className="header-middle__right__menu__cart__svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <polygon className="ci-primary" points="160 96.039 160 128.04 464 128.04 464 191.38 428.5 304.04 149.93 304.04 109.93 16 16 16 16 48 82.068 48 122.07 336.04 451.97 336.04 496 196.31 496 96.039" fill="var(--ci-primary-color, currentColor)"/>
                <path className="ci-primary" d="m176.98 368.34a64.073 64.073 0 0 0-64 64 64 64 0 0 0 128 0 64.072 64.072 0 0 0-64-64zm0 96a32 32 0 1 1 32-32 32.038 32.038 0 0 1-32 32z" fill="var(--ci-primary-color, currentColor)"/>
                <path className="ci-primary" d="m400.98 368.34a64.073 64.073 0 0 0-64 64 64 64 0 0 0 128 0 64.072 64.072 0 0 0-64-64zm0 96a32 32 0 1 1 32-32 32.038 32.038 0 0 1-32 32z" fill="var(--ci-primary-color, currentColor)"/>
              </svg>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

