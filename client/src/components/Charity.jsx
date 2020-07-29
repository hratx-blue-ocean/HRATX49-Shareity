import React, { useState } from 'react';
import styles from '../styles/Charity.css';
import LogoAvatar from './LogoAvatar.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";

const Charity = (props) => {

    return (

        <>
            <div className={styles.charityContainer}>
            <div className={styles.charityWrapper}>
                <div className={styles.charityLogo}>
                    <LogoAvatar />
                </div>

                <div className={styles.charityHeader}>

                </div>

                <div className={styles.charityListDonated}>
                    <div className={styles.charityDonorListWrapper}>

                    </div>
                </div>

                <div className={styles.charityListItemsToBePickedUp}>
                    <div className={styles.charityUserListWrapper}>

                    </div>
                </div>

                <div className={styles.charitySideNav}>
                    {/* this is where the side nav buttons start */}
                    <div className={styles.charityButtonWrapper}>
                    <Link to={{pathname:"/"}}>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.charityButton}>HOME</button>
                        </div>
                    </Link>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.charityButton}>STATEMENT</button>
                        </div>

                        <div className={styles.buttonWrapper}>
                            <button className={styles.charityButton}>UPDATE PASSWORD</button>
                        </div>

                    </div>
                </div>
            </div>
            </div>

        </>
    )
}

export default Charity;
