import React from 'react';
import styles from '../styles/layout.module.scss';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC<any> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout