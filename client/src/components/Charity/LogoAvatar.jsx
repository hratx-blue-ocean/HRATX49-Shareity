import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from '../../styles/Charity.css';

const LogoAvatar = () => {

  const [imageFile, setImageFile] = useState(null);
  const user = JSON.parse(localStorage.user)
  const [currentAvatar, setCurrentAvatar] = useState(user.profilePic);

  const uploadImage = (file) => {
    console.log(file);
    // format the image data before posting it
    let formData = new FormData();
    formData.append('charityCurrentAvatar', file, file.name)
    // sends the object containing the image object that is uploaded
    Axios.post('/api/profile/profile-img-upload', formData)
      .then(res => {
        console.log(res.data.location);
        let imageUrl = res.data.location
        setCurrentAvatar(imageUrl)
        user.profilePic = imageUrl
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage.user)
        // console.log(JSON.parse(localStorage.user.email))

        let email = user.email
        console.log(email)

        Axios.put('/users/updateProfilePic', {
          email: email,
          profilePic: imageUrl
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.error(err);
          })
          .catch(err => {
            console.error(err);
          })

      })
  }

    if (imageFile) {
      console.log("image file!", imageFile)
      uploadImage(imageFile)
      setImageFile(null)
    }

  return (

    <>
      <div className={styles.logoAvatarWrapper}>

        {/* image container */}
        <div className={styles.imageWrapper}>
          <img className={styles.charityCurrentAvatar} src={currentAvatar} alt='' />
        </div>
        {/* avatar name section */}
        <div className={styles.nameWrapper}>
          <h2 className={styles.avatarName}>{user.name}</h2>
        </div>
        {/* container for image upload functionality */}
        <div className={styles.charityInputAvatarContainer}>
          <div className={styles.fileUploadLabelWrapper}>
            {/* the label allows for the custom button styling of the standard input button */}
            <label className={styles.fileUploadButtonLabel} htmlFor="fileUploadButton">Change Avatar</label>
            <input
              id="fileUploadButton"
              className={styles.charityInputButton} type="file"
              style={{ display: 'none' }}
              onChange={() => setImageFile(event.target.files[0])}
            />
          </div>
          {/* button to upload the selected file to the s3 bucket */}
        </div>
      </div>
    </>
  )
}

export default LogoAvatar;
