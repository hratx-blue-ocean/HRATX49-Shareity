import React, { useState } from 'react';
import styles from '../styles/Charity.css';

const LogoAvatar = () => {

    return (
        
        <>
            <div className={styles.logoAvatarWrapper}>

                <div className={styles.imageWrapper}>
                    <div>

                    </div>
                </div>
                
                <div className={styles.nameWrapper}>
                    <h2 className={styles.avatarName}>Charity/User name</h2>
                </div>

            </div>
        </>
    )
}

export default LogoAvatar;