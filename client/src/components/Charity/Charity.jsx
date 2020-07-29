import React, { useState, useEffect } from 'react';
import styles from '../../styles/Charity.css';
import listStyles from '../../styles/lists.css';
import LogoAvatar from './LogoAvatar.jsx';
import { CSVLink, CSVDownload } from "react-csv";
// import Axios from 'axios';
import PickupList from '../HomePage/PickupList.jsx';
import DonatedList from '../HomePage/DonatedList.jsx';
const Charity = (props) => {
    const [taxData, changeTaxData] = useState([])
    
    // const [listData, setListData] = useState([]);

    // const getListData = () => {

    //     Axios.get('./')
    //         .then( res => {

    //             let newListData = res.data;
    //             setListData(newListData);
    //         })
    //         .catch( err => {

    //             console.error(err);
    //         })
    // }

    // useEffect(() => {
    //     getListData();
    // }, []);

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
                                    <button className={styles.charityButton}>
                                        <CSVLink 
                                            data={taxData}>STATEMENT</CSVLink>
                                    </button>
                                    
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <button className={styles.charityButton}>UPDATE PASSWORD</button>
                                </div>

                            </div>
                        </div>

                        {/* list donated */}
                        <div className={styles.charityListDonated}>
                            <div className={styles.charityDonorListWrapper}>
                                <DonatedList taxData={changeTaxData} styles={listStyles}/>

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
