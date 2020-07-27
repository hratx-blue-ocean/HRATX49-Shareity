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
                    <div className={styles.charityButtonWrapper}>
                        <div className={styles.homeButtonWrapper}>
                            <button className={styles.homeButton}>HOME</button>
                        </div>
                        <div className={styles.statementButtonWrapper}>
                            <button className={styles.statementButton}>STATEMENT</button>
                        </div>
                        <div className={styles.updatePasswordButtonWrapper}>
                            <button className={styles.updataPasswordButton}>UPDATE PASSWORD</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Charity;
