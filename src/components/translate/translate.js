export function translate(text) {

  const translate = require("translate-js");

  // create translation registry
  translate.add({
    home: 'Домашня сторінка',
    categories: 'Категорії',
    cars: "Автомобілі",
    sales: 'Акції',
    contacts: 'Контакти',
    blog: 'Блог',
    comparison: 'Порівняння',
    favorite: 'Обрані',
    cart: 'Корзина',
    about: 'Про нас',
    delivery: 'Доставка й оплата',
    user: 'Особистий кабінет',
  });

  translate.add({
    home: 'Домашня сторінка',
    categories: 'Категорії',
    calico: 'Бязь',
    'stripe sateen': 'Страйп-сатин',
    ranfors: 'Ранфорс',
    velor: 'Велюр',
    sales: 'Акції',
    contacts: 'Контакти',
    blog: 'Блог',
    comparison: 'Порівняння',
    favorite: 'Обрані',
    cart: 'Корзина',
    about: 'Про нас',
    delivery: 'Доставка й оплата',
    user: 'Особистий кабінет'
  });
     
  // get translations
  return translate(text);
}

