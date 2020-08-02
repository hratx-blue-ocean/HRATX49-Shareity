import React, { useState } from 'react';
import styles from '../styles/Charity.css';
import listStyles from '../styles/lists.css';
import LogoAvatar from './LogoAvatar.jsx';
import PickupList from './HomePage/PickupList.jsx';
import DonatedList from './HomePage/DonatedList.jsx';
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

                {/* list donated */}
                <div className={styles.charityListDonated}>
                    <div className={styles.charityDonorListWrapper}>
                        <DonatedList styles={listStyles}/>

                    </div>
                </div>

                {/* items to be picked up */}
                <div className={styles.charityListItemsToBePickedUp}>
                    <div className={styles.charityUserListWrapper}>
                        <PickupList styles={listStyles}/>

                    </div>
                </div>
        </div>
        </div>

    </>
    )
}

export default Charity;
