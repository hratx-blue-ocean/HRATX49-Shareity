import React, { useState } from 'react';
import styles from '../styles/Charity.css';

const LogoAvatar = () => {
    const source = '';
    const [prview, setPreview] = useState(null, src);

    const onClose = () => {

        setPreviewt(null);
    }
    
    const onCrop = () => {

        setPreviewt(preview);
    }

    return (
        
        <>
            <div className={styles.logoAvatarWrapper}>

                <div className={styles.imageWrapper}>
                    <img>{preview}</img>
                </div>
                <div> 
                    <h2>Charity/User name</h2>
                </div>

            </div>
        </>
    )
}

export default LogoAvatar;