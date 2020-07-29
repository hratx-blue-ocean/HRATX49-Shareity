import React, { useState } from 'react';
import styles from '../../styles/AddItem.css'

const AddItem = () => {

    const [modalView, setModalView] = useState('none');
    const [buttonView, setButtonView] = useState('block')

    const switchViews = () => {

        if(modalView === 'none') {

            setModalView('block');
            setButtonView('none');
            console.log(modalView);
            console.log(buttonView);
        } else {

            setModalView('none');
            setButtonView('block');
        }
    }

    const renderModal = () => {

        return (

            <div className={styles.innerModalWrapper} style={{display: modalView}}>
            Modal
            <button onClick={() => switchViews()} />
            </div>
        )
    }

    const renderButton = () => {

        return (

            <div className={styles.innerModalWrapper} style={{display: modalView}}>
            Modal
            <button onClick={() => switchViews()} />
            </div>
        )
    }

    return (

        <div className={styles.modalWrapper}>
            
            <div>
                <button className={styles.addItemButton} style={{display: buttonView}} onClick={() => switchViews()}>
                Press Me
                </button>
                <div className={styles.innerModalWrapper} style={{display: modalView}}>
                Modal
                <button onClick={() => switchViews()} />
                </div>
            </div>

        </div>
    )
}

export default AddItem;