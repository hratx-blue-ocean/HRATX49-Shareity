import React, { useState } from 'react';
import Axios from 'axios';
import styles from '../styles/Charity.css';

const LogoAvatar = () => {

    const [imageFile, setImageFile] = useState('');
    const [currentAvatar, setCurrentAvatar] = useState('some Image');

    const uploadImage = (file) => {
        console.log(file);
        // sends the object containing the image object that is uploaded
        Axios.post('./', {params: file})
            .then( res => {

                setCurrentAvatar(res.data);
            })
            .catch( err => {

                console.error(err);
            })
    }

    console.log(imageFile)
    return (
        
        <>
            <div className={styles.logoAvatarWrapper}>
                
                {/* image container */}
                <div className={styles.imageWrapper}>
                        <img className={styles.charityCurrentAvatar} src={currentAvatar} />
                </div>

                {/* container for image upload functionality */}
                <div className={styles.charityInputAvatarContainer}>
                    <input className={styles.charityInputButton} type="file" onChange={() => setImageFile(event.target.files[0])} />
                    <button className={styles.charityInputSubmitButton} onClick={() => uploadImage(imageFile)} />
                </div>
                {/* avatar name section */}
                <div className={styles.nameWrapper}>
                    <h2 className={styles.avatarName}>Charity/User name</h2>
                </div>

            </div>
        </>
    )
}

export default LogoAvatar;

