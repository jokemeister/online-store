import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UserPage from './pages/UserPage';
import CartPage from './pages/CartPage';
import DeliveryPage from './pages/DeliveryPage';
import ComparisonPage from './pages/ComparisonPage';
import FavoritePage from './pages/FavoritePage';
import CategoriesPage from './pages/CategoriesPage';
import SalesPage from './pages/SalesPage';
import ProductsPage from './pages/ProductsPage';
import ContactsPage from './pages/ContactsPage';
import BlogPage from './pages/BlogPage';

import "./fireBase";
import SingleProductPage from './pages/SingleProductPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Layout />}>
          
          <Route index path="/" element={ <HomePage /> } />
          <Route path="/about" element={ <AboutPage /> } />
          <Route path="/delivery" element={ <DeliveryPage /> } />
          <Route path="/user" element={ <UserPage /> } />
          <Route path="/comparison" element={ <ComparisonPage /> } />
          <Route path="/favorite" element={ <FavoritePage /> } />
          <Route path="/cart" element={ <CartPage /> } />
          <Route path="/categories" element={ <CategoriesPage /> } />
          <Route path="/categories/:queryTitle" element={ <ProductsPage /> } />
          <Route path="/categories/:queryTitle/:queryTag" element={ <SingleProductPage /> } />
          <Route path="/sales" element={ <SalesPage /> } />
          <Route path="/contacts" element={ <ContactsPage /> } />
          <Route path="/blog" element={ <BlogPage /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;