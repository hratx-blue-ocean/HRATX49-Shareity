import React, { useState } from 'react';
import Axios from 'axios';
import styles from '../styles/Charity.css';

const LogoAvatar = () => {

    const [imageFile, setImageFile] = useState('');
    const [currentAvatar, setCurrentAvatar] = useState('some Image');

    const uploadImage = (file) => {
        console.log(file);
        // format the image data before posting it
        let formData = new FormData();

        formData.append('image', file, file.name)
        // sends the object containing the image object that is uploaded
        Axios.post('./', formData)
            .then( res => {
                console.log(res.data);
            })
            .catch( err => {
                console.error(err);
            })
    }

    return (
        
        <>
            <div className={styles.logoAvatarWrapper}>
                
                {/* image container */}
                <div className={styles.imageWrapper}>
                        <img className={styles.charityCurrentAvatar} src={currentAvatar} />
                </div>

                {/* container for image upload functionality */}
                <div className={styles.charityInputAvatarContainer}>
                    <input 
                        // style={{display: 'none'}}
                        className={styles.charityInputButton} type="file" 
                        onChange={() => setImageFile(event.target.files[0])}
                    />
                    {/* <button className={styles.charityInputImageButton} onClick={() => {
                        fileInput.click();
                    }}>Set Avatar</button> */}
                    <button className={styles.charityInputSubmitButton} onClick={() => uploadImage(imageFile)}>Upload</button>
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

