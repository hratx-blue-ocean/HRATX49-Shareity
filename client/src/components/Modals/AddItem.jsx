import React, { useState } from 'react';
import styles from '../../styles/AddItem.css'
import Form from '../AdditemForm.jsx';

const AddItem = ({ buttonText }) => {

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
                        htmlFor="modalButton"
                    > 
                        {buttonText || 'PUSH'}  
                    </label>
                    <div id="modalButton" className={styles.innerButtonWrapper} style={{diplay: 'none'}}>
                        <button className={styles.addItemButton} style={{display: 'none'}}>

                        </button>
                    </div>
                </div>


                <div className={styles.innerModalWrapper} style={{display: modalView}}>
                    <div className={styles.modalInnerContainer}>
                        <div className={styles.modalContentContainer}>
                            <Form closeModal={switchViews}/>

                        </div>
                        {/* uncomment this button if you want to use this component without another way to close the modal */}
                        {/* <button className={styles.modalCloseButton} onClick={() => switchViews()}>
                            Close
                        </button> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddItem;