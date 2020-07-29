import React, { useState } from 'react';
import styles from '../styles/Charity.css';
import LogoAvatar from './LogoAvatar.jsx';
<<<<<<< HEAD
import PickupList from './HomePage/PickupList.jsx';
import DonatedList from './HomePage/DonatedList.jsx';
=======
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";

>>>>>>> V2.0.0
const Charity = (props) => {

    return (

        <>
        <div className={styles.charityContainer}>
        <div className={styles.charityWrapper}>

            {/* logo avatar */}
            <div className={styles.charityLogo}>
                <LogoAvatar />
            </div>

            {/* header */}
            <div className={styles.charityHeader}>

            </div>
                {/* side nav */}
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

                {/* list donated */}
                <div className={styles.charityListDonated}>
                    <div className={styles.charityDonorListWrapper}>
                        <DonatedList />

                    </div>
                </div>

                {/* items to be picked up */}
                <div className={styles.charityListItemsToBePickedUp}>
                    <div className={styles.charityUserListWrapper}>
                        <PickupList />

                    </div>
                </div>
        </div>
        </div>

    </>
    )
}

export default Charity;
