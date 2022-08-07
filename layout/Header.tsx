import React from 'react';
import styles from '../styles/header.module.scss';

const Header: React.FC<any> = () => {
    return (
        <header>
            <div className={styles.logo}>
                <img src="img/logo.png" alt="Logo" />
            </div>
        </header>
    )
}

export default Header