import React, { useState } from 'react';
import styles from '../../styles/AddItem.css'

const AddItem = () => {

    const [modalView, setModalView] = useState({display: 'block'});
    const [buttonView, setButtonView] = useState({display: 'none'})

    const switchViews = () => {

        if(modalView === {display: 'none'}) {

            setModalView({display: 'block'});
            setButtonView({display: 'none'});
        } else {

            setModalView({display: 'none'});
            setButtonView({display: 'block'});
        }
    }

    const renderModal = () => {

        return (

            <div className={styles.innerModalWrapper}>
            Modal
            <button onClick={() => setButtonView()} />
            </div>
        )
    }

    const renderButton = () => {

        return (

            <button className={styles.addItemButton} onClick={() => setModalView({display: })}>
            Press Me
            </button>
        )
    }

    return (

        <div className={styles.modalWrapper}>
            {modalView === 'block' ? renderButton() : renderModal()}
            <div style={modalView}>

            </div>

        </div>
    )
}

export default AddItem;