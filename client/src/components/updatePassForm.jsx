import React, { useState, useEffect } from 'react';
import styles from '../styles/AddItemForm.css';
import Axios from 'axios';
// import { addAchievement } from './addAchievement';

const userData = JSON.parse(localStorage.getItem('user'));
const email = userData.email;

const NewItem = (props) => {

    const [newPassword, setNewPassword] = useState('');

    const updatePassword = () => {

        Axios.post('./user/updatePassword', {

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
        <div className={styles.addItemFormWrapper}>

            <div className={styles.inputFieldWrapper}>

                <input
                    className={styles.addNameInputField}
                    value={itemName}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="item name"
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
                        Donate
                    </button>
                </div>

            </div>
        </div>

    )
}

export default NewItem;
