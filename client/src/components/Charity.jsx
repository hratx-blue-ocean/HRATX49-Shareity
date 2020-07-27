import React, { useState } from 'react';
import styles from '../styles/Charity.css';
const Charity = () => {

    return (

        <>
            <div className={styles.charityWrapper}>
                <div className={styles.charityLogo}>
                    logo
                </div>

                <div className={styles.charityHeader}>
                    header
                </div>

                <div className={styles.charityListDonated}>
                    items donated
                </div>

                <div className={styles.charityListItemsToBePickedUp}>
                    items to be picked up
                </div>

                <div className={styles.charitySideNav}>
                    {/* this is where the side nav buttons start */}
                    <div className={styles.charityButtonWrapper}>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.charityButton}>HOME</button>
                        </div>

                        <div className={styles.buttonWrapper}>
                            <button className={styles.charityButton}>STATEMENT</button>
                        </div>

                        <div className={styles.buttonWrapper}>
                            <button className={styles.charityButton}>UPDATE PASSWORD</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Charity;
