import React, { useState } from 'react';
import styles from '../../styles/updatePass.css'
import UpdatePassForm from '../updatePassForm.jsx'

const UpdatePassword = ({ buttonText, addAchievement }) => {

    const [modalView, setModalView] = useState('none');
    const [buttonView, setButtonView] = useState('block');

    const switchViews = () => {

        if (modalView === 'none') {

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

        <div className={styles.passModalWrapper}>

            <div>

                <div className={styles.outerPassButtonWrapper} style={{display: buttonView}} >
                    {/* this label allows for custom styling of modal button */}
                    <label
                        className={styles.passModelButtonLabel}
                        style={{display: buttonView}}
                        onClick={() => switchViews()}
                        htmlFor="modalButton"
                    >
                        {buttonText || 'PUSH'}
                    </label>
                    <div id="modalButton" className={styles.innerPassButtonWrapper} style={{ diplay: 'none' }}>
                        <button className={styles.updatePassButton} style={{ display: 'none' }}>

                        </button>
                    </div>
                </div>


                <div className={styles.innerPassModalWrapper} style={{ display: modalView }}>
                    <div className={styles.passModalInnerContainer}>
                        <div className={styles.passModalContentContainer}>
                            {/* passing in the visibilty toggle to the form */}
                            <UpdatePassForm closeModal={switchViews}/>

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

export default UpdatePassword;