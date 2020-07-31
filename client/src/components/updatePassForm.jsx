import React, { useState, useEffect } from 'react';
import styles from '../styles/AddItemForm.css';
import Axios from 'axios';
// import { addAchievement } from './addAchievement';

const userData = JSON.parse(localStorage.getItem('user'));
const email = userData.email;

const UpdatePassForm = (props) => {

    const [newPassword, setNewPassword] = useState('');

    const updatePassword = () => {

        Axios.put('./user/updatePassword', {

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
                        className={styles.addItemCancelButton}
                        onClick={() => props.closeModal()}>
                        Cancel
                    </button>
                    <button
                        className={styles.addItemSubmitButton}
                        onClick={() => {
                            updatePassword();
                            props.closeModal();
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
