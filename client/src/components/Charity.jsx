import React, { useState } from 'react';
import styles from '../styles/Charity.css';
const Charity = () => {

    return (

        <>
            <div className={styles.charityWrapper}>
                <div className="charityLogo">
                    logo
                </div>
                <div className={styles.charitHeader}>
                    header
                </div>

                <div className={styles.charityListDonated}>
                    items donated
                </div>

                <div className={styles.charityItemsToBePickedUp}>
                    items to be picked up
                </div>

                <div className={styles.charitySideNav}>
                    side nav
                </div>
            </div>
        </>
    )
}

export default Charity;
