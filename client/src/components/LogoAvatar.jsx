import React, { useState } from 'react';
import styles from '../styles/Charity.css';

const LogoAvatar = () => {

    const [imageFile, setImageFile] = useState('');
    console.log(imageFile)
    return (
        
        <>
            <div className={styles.logoAvatarWrapper}>

                <div className={styles.imageWrapper}>
                    <div>

                    </div>
                </div>
                <div>
                    <input type="file" onChange={() => setImageFile(event.target.value)}/>
                </div>
                <div className={styles.nameWrapper}>
                    <h2 className={styles.avatarName}>Charity/User name</h2>
                </div>

            </div>
        </>
    )
}

export default LogoAvatar;

