import React, { useState, useEffect } from 'react';
import styles from '../styles/updatePassForm.css';
import Axios from 'axios';
// import { addAchievement } from './addAchievement';



const UpdatePassForm = (props) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const email = userData.email || '';
    const [newPassword, setNewPassword] = useState('');

    const updatePassword = () => {

        Axios.put('/users/updatePassword', {

            password: newPassword,
            userEmail: email
        })
            .then( res => {
                console.log('Password  updated');
            })
            .catch( err => {
                console.error(err);
            })
    }

    return (
        <div className={styles.updatePassFormWrapper}>

            <div className={styles.updatePassFieldWrapper}>

                <input
                    className={styles.updatePassInputField}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="new password"
                    type="text"
                    required
                ></input>

                <div>
                    <button
                        className={styles.passUpdateCancelButton}
                        onClick={() => props.closeModal()}>
                        Cancel
                    </button>
                    <button
                        className={styles.passUpdateSubmitButton}
                        onClick={() => {
                            updatePassword();
                            props.closeModal();
                            setNewPassword('');
                        }}
                    >
                        Update
                    </button>
                </div>

            </div>
        </div>

    )
}

export default UpdatePassForm;
