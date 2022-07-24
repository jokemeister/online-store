import React from 'react';
import Categories from '../../components/categories';
import './HomePage.css'

export const HomePage = () =>{
    return (
        <>
            <h1>Тут немає нічого цікавого</h1>
            <h2>Контент лише на наступних елемента:</h2>
            <ul>
                <li>Категорії</li>
                <li>Постільна білизна</li>
                <li>Окремі карточки товарів в рамках постільної білизни</li>
                <li>Обране (сердечко)</li>
                <li>Кошик</li>
                <li>Акції</li>
            </ul>
        </>
    )
}