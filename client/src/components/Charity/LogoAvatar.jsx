import React, { useState } from 'react';
import Axios from 'axios';
import styles from '../../styles/Charity.css';

const LogoAvatar = () => {

    const [imageFile, setImageFile] = useState('');
    const [currentAvatar, setCurrentAvatar] = useState('some Image');

    const uploadImage = (file) => {
        console.log(file);
        // format the image data before posting it
        let formData = new FormData();

        formData.append('charityCurrentAvatar', file, file.name)
        // sends the object containing the image object that is uploaded
        Axios.post('http://cmurray-blue-ocean.s3-website-us-2.amazonaws.com/', formData)
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
                        <img className={styles.charityCurrentAvatar} src={currentAvatar}/>
                </div>

                {/* container for image upload functionality */}
                <div className={styles.charityInputAvatarContainer}>
                    <div className={styles.fileUploadLabelWrapper}>
                        <label className={styles.fileUploadButtonLabel} htmlFor="fileUploadButton">Change Avatar</label>
                        <input 

                            id="fileUploadButton"
                            className={styles.charityInputButton} type="file" 
                            style={{display: 'none'}}
                            onChange={() => setImageFile(event.target.files[0])}
                        />
                    </div>

                    {/* button to upload the selected file to the s3 bucket */}
                    <button className={styles.charityInputSubmitButton} onClick={() =>
                        uploadImage(imageFile)}>
                        Upload
                    </button>

                </div>

                {/* avatar name section */}
                <div className={styles.nameWrapper}>
                    <h2 className={styles.avatarName}>Sir Stickenbottoms</h2>
                </div>

            </div>
        </>
    )
}

export default LogoAvatar;
