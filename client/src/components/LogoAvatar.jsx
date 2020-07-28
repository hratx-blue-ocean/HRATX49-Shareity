import React, { useState } from 'react';
import Axios from 'axios';
import styles from '../styles/Charity.css';

const LogoAvatar = () => {

    const [imageFile, setImageFile] = useState('');

    const uploadImage = (file) => {
        console.log(file);
        Axios.post('./', {params: file})
            .then( res => {

                
            })
            .catch( err => {

                console.error(err);
            })
    }

    console.log(imageFile)
    return (
        
        <>
            <div className={styles.logoAvatarWrapper}>

                <div className={styles.imageWrapper}>
                    <div>

                    </div>
                </div>
                <div>
                    <input className="charityInputButton" type="file" onChange={() => setImageFile(event.target.files[0])} />
                    <button className="charityInputSubmitButton" onClick={() => uploadImage(imageFile)} />
                </div>
                <div className={styles.nameWrapper}>
                    <h2 className={styles.avatarName}>Charity/User name</h2>
                </div>

            </div>
        </>
    )
}

export default LogoAvatar;

