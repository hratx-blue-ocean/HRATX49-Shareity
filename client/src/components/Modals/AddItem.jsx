import React, { useState } from 'react';
import styles from '../../styles/AddItem.css'

const AddItem = () => {

    const [modalView, setModalView] = useState('none');
    const [buttonView, setButtonView] = useState('block');
    // const [buttonVis, setButtonVis] = useState('hidden');

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
                
                <div className={styles.outerButtonWrapper} style={{display: buttonView}} >
                    <label 

                        className={styles.modelButtonLabel} 
                        style={{display: buttonView}} 
                        onClick={() => switchViews()}
                        htmlFor="modalButton"> 
                        PUSH  
                    </label>
                    <div id="modalButton" className={styles.innerButtonWrapper} style={{diplay: 'none'}}>
                        <button className={styles.addItemButton} style={{display: 'none'}}>

                        </button>
                    </div>
                </div>


                <div className={styles.innerModalWrapper} style={{display: modalView}}>
                    <div className={styles.modalInnerContainer}>
                        <div className={styles.modalContentContainer}>

                        <button className={styles.modalCloseButton} onClick={() => switchViews()}>
                        Close
                        </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddItem;