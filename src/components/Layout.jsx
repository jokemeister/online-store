import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Breadcrumbs from './breadCrumbs';

export const Layout = () => {

    return (
        <>
            <Header />
            <Breadcrumbs />
            
            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}
