import React, { useState } from 'react';
import styles from '../../styles/AddItem.css'
import Form from '../addItemForm.jsx';

const AddItem = ({ buttonText }) => {

    const [modalView, setModalView] = useState('none');
    const [buttonView, setButtonView] = useState('block');
    // this state may be needed when we get to styling
    // const [buttonVis, setButtonVis] = useState('hidden'); 

    // function that toggle whether the modal is visible or it's button is
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
                    {/* this label allows for custom styling of modal button */}
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
                            {/* passing in the visibilty toggle to the form */}
                            <Form closeModal={switchViews}/>

                        </div>
                        {/* uncomment this button if you want to use this component without another way to close the modal */}
                        {/* <button className={styles.modalCloseButton} onClick={() => switchViews()}>
                            Cancel
                        </button> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddItem;