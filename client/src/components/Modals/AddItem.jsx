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

    return (

        <div className={styles.modalWrapper}>
            
            <div>
                <div className={styles.innerButtonWrapper}>
                    <button className={styles.addItemButton} style={{display: buttonView}} onClick={() => switchViews()}>
                    Press Me
                    </button>
                </div>

                <div className={styles.innerModalWrapper} style={{display: modalView}}>

                    <button className={styles.modalCloseButton} onClick={() => switchViews()}>
                    Close
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AddItem;