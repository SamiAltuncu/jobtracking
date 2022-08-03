import Link from 'next/link';
import React from 'react';
import styles from '../styles/header.module.scss';

const Header: React.FC<any> = () => {
    return (
        <header>
            <div className={styles.logo}>
                <Link href={"/"} passHref>
                    <a>
                        <img src="img/logo.png" alt="Logo" />
                    </a>
                </Link>
            </div>
        </header>
    )
}

export default Header