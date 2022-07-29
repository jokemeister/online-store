import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import { HomePage, CategoriesPage, ProductsPage, SingleProductPage, ComparisonPage, FavoritePage, CartPage, UserPage, AboutPage, DeliveryPage, ContactsPage, BlogPage } from './pages';

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={ <Layout />}>
            <Route index path="" element={ <HomePage /> } />
            <Route path="/about" element={ <AboutPage /> } />
            <Route path="/delivery" element={ <DeliveryPage /> } />
            <Route path="/user" element={ <UserPage /> } />
            <Route path="/comparison" element={ <ComparisonPage /> } />
            <Route path="/favorite" element={ <FavoritePage /> } />
            <Route path="/cart" element={ <CartPage /> } />
            <Route path="/categories" element={ <CategoriesPage /> } />
            <Route path="/categories/:queryTitle" element={ <ProductsPage /> } />
            <Route path="/categories/:queryTitle/:queryTag" element={ <SingleProductPage /> } />
            <Route path="/contacts" element={ <ContactsPage /> } />
            <Route path="/blog" element={ <BlogPage /> } />
            </Route>
        </Routes>
    )
}
