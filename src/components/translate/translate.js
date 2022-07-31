export function translate(text) {

  const translate = require("translate-js");

  // create translation registry
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
    user: 'Особистий кабінет',
    aa0001: 'Тіфані + білий',
    ab0001: 'Авокадо',
    ac0001: 'Вікторіанська ніч',
    ac0002: 'Кіт Санта',
    ac0003: 'Червоні маки',
    ac0004: 'Роза сантана',
    ac0005: 'Космополіс',
    ac0006: 'Лаванда',
    ad0001: 'Бравл Старс',
    ad0002: 'Молнія Маквін',
    ad0003: 'Фіолетовий ЛОЛ',
    ad0004: 'Крижане серце',
    ad0005: 'Веселковий єдиноріг',
    ad0006: 'Софійка прекрасна',
    ae0001: 'Квіткова насолода'
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

