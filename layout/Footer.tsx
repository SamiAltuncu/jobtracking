import React from 'react';
import styles from '../styles/footer.module.scss';

const Footer: React.FC<any> = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <span>repository</span>
                <span>@ 2022 Sami Altuncu</span>
            </div>
        </footer>
    )
}

export default Footer