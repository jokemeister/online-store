import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/images/logo/logo_2.png';
import { fetchCart } from '../../store/cartSlice';
import { fetchFavorite } from '../../store/favoriteSlice';
import { Search } from '../search/Search';


export const Header = () => {
  const сartProducts = useSelector(state => state.cart.cartProducts);
  const favoriteProducts = useSelector(state => state.favorite.favoriteProducts);
  const currentUser = useSelector(state => state.cart.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart(currentUser));
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchFavorite(currentUser));
  }, [currentUser]);

  return (
    <header>
      {/* Header-Top */}
      <div className="header-top-bg">
        <div className="container">
          <div className="header-top">
            <div className="header-top__left">
              <p>Інтернет-магазин автомобілів №1</p>
            </div>
            <div className="header-top__right">
              <ul className="header-top__right__menu">
                <NavLink to="/about">
                  <li className="header-top__right__menu__item header-top__right__menu__info">
                    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="m25 2c-12.691 0-23 10.309-23 23s10.309 23 23 23 23-10.309 23-23-10.309-23-23-23zm0 2c11.61 0 21 9.3902 21 21s-9.3902 21-21 21-21-9.3902-21-21 9.3902-21 21-21zm0 7a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm-4 10v2h1 1v13h-1-1v2h1 1 4 1 1v-2h-1-1v-15h-1-4-1z"/>
                    </svg>
                    <p>Про нас</p>
                  </li>
                </NavLink>
                <NavLink to="/delivery">
                  <li className="header-top__right__menu__item header-top__right__menu__delivery">
                    <svg enableBackground="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="m131.6 252.9v80.6c0 4.1 3.4 7.5 7.5 7.5h25.1c4.1 15.6 18.2 27.1 35 27.1s31-11.5 35-27.1h96.7c4.1 15.6 18.2 27.1 35 27.1s31-11.5 35-27.1h18.6c4.1 0 7.5-3.4 7.5-7.5v-70.7c0-1.6-0.5-3.1-1.4-4.3l-26-36.7c-1.4-2-3.7-3.2-6.1-3.2h-54.2v-23.6c0-4.1-3.4-7.5-7.5-7.5h-138.2c-5.2-24.9-27.3-43.7-53.7-43.7-30.3 0-54.9 24.6-54.9 54.9 0 27.4 20.3 50.2 46.6 54.2zm67.6 100.2c-11.7 0-21.2-9.5-21.2-21.2s9.5-21.2 21.2-21.2 21.2 9.5 21.2 21.2-9.6 21.2-21.2 21.2zm166.7 0c-11.7 0-21.2-9.5-21.2-21.2s9.5-21.2 21.2-21.2 21.2 9.5 21.2 21.2-9.5 21.2-21.2 21.2zm46.1-87.8v1.2h-40.8v-32.8h18.4l22.4 31.6zm-55.8-31.6v40.3c0 4.1 3.4 7.5 7.5 7.5h48.3v44.5h-10.4c-2.8-17.2-17.8-30.3-35.7-30.3-10.5 0-20 4.5-26.6 11.7v-73.7h16.9zm-31.9 92.4h-89.4c-2.8-17.2-17.8-30.3-35.7-30.3s-32.9 13.1-35.7 30.3h-16.9v-72.9c25.9-3.2 46.2-24.4 48-50.6h129.7v123.5zm-184.4-167.2c22 0 39.9 17.9 39.9 39.9s-17.9 39.9-39.9 39.9-39.9-17.9-39.9-39.9 17.9-39.9 39.9-39.9z"/>
                      <path d="m129.9 215.8c1.4 1.4 3.3 2.2 5.3 2.2s3.9-0.8 5.3-2.2l23.5-23.5c2.9-2.9 2.9-7.7 0-10.6s-7.7-2.9-10.6 0l-18.2 18.2-8.8-8.8c-2.9-2.9-7.7-2.9-10.6 0s-2.9 7.7 0 10.6l14.1 14.1z"/>
                    </svg>
                    <p>Доставка й оплата</p>
                  </li>
                </NavLink>

                <NavLink to="/user">
                  <li className="header-top__right__menu__item header-top__right__menu__user">
                    <svg enableBackground="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="m256 238.43c65.734 0 119.21-53.48 119.21-119.21 1e-3 -65.736-53.48-119.21-119.21-119.21-65.736 0-119.21 53.478-119.21 119.21 0 65.734 53.48 119.21 119.21 119.21zm0-199.72c44.394 0 80.511 36.118 80.511 80.511s-36.117 80.511-80.511 80.511c-44.395 0-80.511-36.118-80.511-80.511s36.117-80.511 80.511-80.511z"/>
                      <path d="m256 253.69c-97.918 0-177.58 79.662-177.58 177.58v61.375c0 10.687 8.664 19.351 19.351 19.351h316.46c10.687 0 19.352-8.664 19.352-19.351v-61.375c1e-3 -97.918-79.661-177.58-177.58-177.58zm-138.88 219.6v-42.024c0-76.578 62.3-138.88 138.88-138.88s138.88 62.3 138.88 138.88v42.024h-277.76z"/>
                    </svg>
                    <svg data-name="arrow down" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <clipPath id="a">
                          <rect width="24" height="24" fill="none" stroke="#000"/>
                        </clipPath>
                      </defs>
                      <g transform="translate(0 24) rotate(-90)" data-name="20x20/arrow-back--grey">
                        <rect width="24" height="24" fill="none" data-name="Mask"/>
                        <g clipPath="url(#a)" data-name="20x20/arrow-back--grey">
                          <g transform="translate(8 7)" data-name="Group 2">
                            <path transform="translate(.686 5.157) rotate(-45)" d="M0,6.586V0H6.586" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="1.5"/>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </li>
                </NavLink>

              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* /Header-Top */}

      {/* Header-Middle */}
      <div className="container">
        <div className="header-middle">
          <div className="header-middle__left">
            <NavLink to="/">
              <img className="header-middle__left__logo" src={logo} alt="" />
            </NavLink>
          </div>
          <div className="header-middle__center">
            <ul className="header-middle__center__menu">
              <li className="header-middle__center__menu__item header-middle__center__menu__phone">
                <svg enableBackground="new 0 0 201.629 201.629" version="1.1" viewBox="0 0 201.63 201.63" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="m139.32 201.63c-1.457 0-2.925-0.14-4.387-0.426-0.04-6e-3 -0.08-0.012-0.12-0.019-2.116-0.364-52.265-9.341-89.971-47.047-30.396-30.395-40.649-69.411-43.673-85.014-0.564-1.856-0.888-3.791-0.962-5.757-0.023-0.219-0.029-0.438-0.018-0.656-0.054-6.129 2.288-11.87 6.615-16.197l12.818-12.818c0.75-0.75 1.768-1.172 2.828-1.172s2.078 0.422 2.828 1.172l41.479 41.48c1.563 1.562 1.563 4.095 0 5.656l-12.816 12.818c-0.327 0.327-0.656 0.637-0.992 0.935-5.987 5.316-7.148 14.626-2.694 21.65 4.279 6.747 9.12 12.838 14.387 18.105 6.239 6.238 13.642 11.89 22.001 16.795 6.837 4.012 15.627 2.726 21.379-3.127l0.139-0.14 12.818-12.817c1.563-1.563 4.094-1.563 5.656 0l41.479 41.479c1.563 1.562 1.563 4.095 0 5.656l-12.817 12.818c-4.292 4.293-10.036 6.626-15.977 6.626zm-3.345-8.364c0.11 0.014 0.22 0.031 0.329 0.054 4.857 1.008 9.843-0.478 13.337-3.971l9.988-9.989-35.822-35.822-10.104 10.104c-8.302 8.448-21.105 10.265-31.108 4.396-8.946-5.25-16.889-11.319-23.608-18.039-5.682-5.682-10.893-12.234-15.486-19.478-6.531-10.301-4.75-24.024 4.145-31.923 0.226-0.198 0.438-0.4 0.646-0.608l9.984-9.984-35.825-35.825-9.99 9.989c-2.832 2.833-4.348 6.609-4.27 10.637 3e-3 0.044 5e-3 0.087 6e-3 0.131 0.04 1.376 0.266 2.725 0.672 4.008 0.046 0.147 0.084 0.298 0.113 0.45 2.831 14.729 12.544 52.113 41.517 81.087 34.782 34.782 82.052 44.144 85.476 44.783zm61.468-82.321c-2.209 0-4-1.791-4-4 0-54.557-44.386-98.944-98.944-98.944-2.209 0-4-1.791-4-4s1.791-4 4-4c58.97 0 106.94 47.975 106.94 106.94 0 2.209-1.791 4-4 4zm-24.82 0c-2.209 0-4-1.791-4-4 0-41.226-33.539-74.765-74.764-74.765-2.209 0-4-1.791-4-4s1.791-4 4-4c45.636 0 82.764 37.128 82.764 82.765 0 2.209-1.791 4-4 4zm-24.758 0c-2.209 0-4-1.791-4-4 0-27.573-22.433-50.006-50.006-50.006-2.209 0-4-1.791-4-4s1.791-4 4-4c31.984 0 58.006 26.021 58.006 58.006 0 2.209-1.791 4-4 4z"/>
                </svg>
                <div>
                  <p>Наші</p>
                  <p>телефони:</p>
                </div>
              </li>
              <li className="header-middle__center__menu__item header-middle__center__menu__numbers">
                <a href="tel: +380975113833">+38 096 511 37 33</a>
                <a href="tel: +380967313317">+38 097 731 32 17</a>
                <a href="tel: +380953434120">+38 050 343 40 20</a>
              </li>
              <li className="header-middle__center__menu__item header-middle__center__time">
                <svg enableBackground="new 0 0 300.988 300.988" version="1.1" viewBox="0 0 300.99 300.99" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="m150.49 1e-3c-82.983 0-150.49 67.511-150.49 150.49s67.511 150.49 150.49 150.49 150.49-67.511 150.49-150.49-67.512-150.49-150.49-150.49zm0 285.99c-74.712 0-135.49-60.781-135.49-135.49s60.782-135.49 135.49-135.49 135.49 60.782 135.49 135.49-60.783 135.49-135.49 135.49z"/>
                  <polygon points="142.99 143 83.148 143 83.148 158 157.99 158 157.99 43.883 142.99 43.883"/>
                </svg>
                <div>
                  <p><b>Пн-Пт: </b>9:00 - 20:00</p>
                  <p><b>Сб-Нд: </b>10:00 - 18:00</p>
                  <p>Відправляємо автомобілі</p>
                  <p>паромами</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="header-middle__right">
            <ul className="header-middle__right__menu">
              <NavLink to="/comparison">
                <li className="header-middle__right__menu__item header-middle__right__menu__comparison">
                  <svg enableBackground="new 0 0 344.581 344.581" version="1.1" viewBox="0 0 344.58 344.58" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="m341.18 258.01-58.024-40.053c-4.527-3.123-8.151-1.179-8.151 4.321v25.207h-47.913c-4.122 0-10.803-3.876-12.768-7.41l-37.73-67.794 37.731-67.986c2.029-3.649 8.83-7.81 12.766-7.81h47.913v25.82c0 5.5 3.624 7.445 8.151 4.322l58.024-40.054c4.528-3.123 4.548-8.233 0.02-11.356l-58.044-40.053c-4.527-3.123-8.151-1.178-8.151 4.322v25h-47.913c-15.531 0-33.042 10.429-40.739 24.27l-28.082 50.6-24.996-44.916c-7.595-13.656-25.105-23.955-40.731-23.955h-76.539c-8.837 0-16 7.163-16 16s7.163 16 16 16h76.539c4.094 0 10.774 3.929 12.768 7.512l34.674 62.305-34.676 62.482c-2.041 3.671-8.722 7.701-12.765 7.701h-76.54c-8.837 0-16 7.163-16 16s7.163 16 16 16h76.539c15.564 0 33.075-10.382 40.738-24.16l25.027-45.096 28.05 50.402c7.563 13.599 25.073 23.854 40.732 23.854h47.914v25.613c0 5.5 3.624 7.445 8.151 4.322l58.044-40.054c4.528-3.123 4.508-8.233-0.019-11.356z"/>
                  </svg>
                                    
                  <p>Порівняння</p>
                </li>
              </NavLink>
              <NavLink to="/favorite">
                <li className="header-middle__right__menu__item header-middle__right__menu__header-middle__right__menu__favorite">
                  <div className='header-middle__right__menu__item__counter'>
                    <span>{favoriteProducts.length}</span>
                  </div>
                  <svg enableBackground="new 0 0 485.3 485.3" version="1.1" viewBox="0 0 485.3 485.3" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="m349.6 28.95c-36.3 0-70.5 14.2-96.2 39.9l-10.6 10.6-10.8-10.8c-25.7-25.7-59.9-39.9-96.2-39.9-36.2 0-70.3 14.1-96 39.8s-39.8 59.8-39.8 96.1 14.2 70.4 39.9 96.1l190.9 190.9c3.3 3.3 7.7 4.9 12 4.9 4.4 0 8.8-1.7 12.1-5l190.5-190.5c25.7-25.7 39.9-59.8 39.9-96.1s-14.1-70.5-39.8-96.1c-25.6-25.8-59.7-39.9-95.9-39.9zm71.6 207.8-178.3 178.4-178.7-178.7c-19.2-19.2-29.8-44.7-29.9-71.9 0-27.1 10.5-52.6 29.7-71.8 19.2-19.1 44.7-29.7 71.7-29.7 27.2 0 52.7 10.6 72 29.9l22.9 22.9c6.4 6.4 17.8 6.4 24.3 0l22.8-22.8c19.2-19.2 44.8-29.8 71.9-29.8s52.6 10.6 71.8 29.8 29.8 44.7 29.7 71.9c0 27.1-10.6 52.6-29.9 71.8z"/>		
                  </svg>
                  <p>Обрані</p>
                </li>
              </NavLink>
              <NavLink to="/cart">
                <li className="header-middle__right__menu__item header-middle__right__menu__cart">
                  <div className='header-middle__right__menu__item__counter'>
                    <span>{сartProducts.length}</span>
                  </div>
                  <svg className="header-middle__right__menu__cart__svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <polygon className="ci-primary" points="160 96.039 160 128.04 464 128.04 464 191.38 428.5 304.04 149.93 304.04 109.93 16 16 16 16 48 82.068 48 122.07 336.04 451.97 336.04 496 196.31 496 96.039" fill="var(--ci-primary-color, currentColor)"/>
                    <path className="ci-primary" d="m176.98 368.34a64.073 64.073 0 0 0-64 64 64 64 0 0 0 128 0 64.072 64.072 0 0 0-64-64zm0 96a32 32 0 1 1 32-32 32.038 32.038 0 0 1-32 32z" fill="var(--ci-primary-color, currentColor)"/>
                    <path className="ci-primary" d="m400.98 368.34a64.073 64.073 0 0 0-64 64 64 64 0 0 0 128 0 64.072 64.072 0 0 0-64-64zm0 96a32 32 0 1 1 32-32 32.038 32.038 0 0 1-32 32z" fill="var(--ci-primary-color, currentColor)"/>
                  </svg>
                  <p>Кошик</p>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      {/* /Header-Middle */}

      {/* Header-Bottom */}
      <div className="header-bottom-bg">
        <div className="container">
          <div className="header-bottom">
            <ul className="header-bottom__list">
              <NavLink to="/cars">
                <li className="header-bottom__list__item">
                  <p>Усі автомобілі</p>
                  <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="m3 7c0-0.55229 0.44772-1 1-1h20c0.5523 0 1 0.44771 1 1s-0.4477 1-1 1h-20c-0.55228 0-1-0.44771-1-1z"/>
                    <path d="m3 14c0-0.5523 0.44772-1 1-1h20c0.5523 0 1 0.4477 1 1s-0.4477 1-1 1h-20c-0.55228 0-1-0.4477-1-1z"/>
                    <path d="m4 20c-0.55228 0-1 0.4477-1 1s0.44772 1 1 1h20c0.5523 0 1-0.4477 1-1s-0.4477-1-1-1h-20z"/>
                  </svg>
                </li>
              </NavLink>
              <Search />
            </ul>
          </div>
        </div>
      </div>
      {/* /Header-Bottom */}
    </header>  
  );
};