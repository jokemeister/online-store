import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';

import Products from '../../components/products';
import ShowMore from '../../components/showMore';
import { Sort } from '../../components/sort/Sort';
import { Filter } from '../../components/filter/Filter';
import { fetchCart, createUserCart, setCurrentUser } from '../../store/cartSlice';
import { fetchFavorite, createUserFavorite } from '../../store/favoriteSlice';

import './HomePage.css';

export const HomePage = () =>{
  // get user Ip
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(createUserCart('109.227.87.143'));
    // dispatch(setCurrentUser('109.227.87.143'));

    var xmlhttp = new XMLHttpRequest();
    var auth = '83310e97-0129-458d-b71b-36ab9f204ac8';
    var url = "https://api.ipfind.com/me?auth=" + auth ;
        
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var result = JSON.parse(this.responseText);

        dispatch(setCurrentUser(result.ip_address));
        dispatch(createUserCart(result.ip_address));
        dispatch(fetchCart(result.ip_address));
        dispatch(createUserFavorite(result.ip_address));
        dispatch(fetchFavorite(result.ip_address));
      }
    };
        
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }, []);
  // /get user Ip

  return (
    <div className="container">
      <Row>
        <Col xs={3}>
          <Filter />
        </Col>
        <Col>
          <Sort />
          <Products />
          <ShowMore />
        </Col>
      </Row>

    </div>
  );
};