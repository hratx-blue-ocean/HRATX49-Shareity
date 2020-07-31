import React, { useState, useEffect } from 'react';
import styles from '../../styles/Charity.css';
import LogoAvatar from './LogoAvatar.jsx';
import CharityHeader from './CharityHeader.jsx';
import { CSVLink, CSVDownload } from "react-csv";
//import Axios from 'axios';
import PickupList from '../HomePage/PickupList.jsx';
import DonatedList from '../HomePage/DonatedList.jsx';
import UpForDonateList from '../HomePage/UpForDonateList.jsx';
import NewItem from '../Modals/AddItem.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

const Charity = (props) => { 
    //sets the state of tax data on donation list to be used with csv export
    const [taxData, changeTaxData] = useState([]);
    //we need to set the type of user/charity
    const [userType, getType] = useState('user');

    // comment this section in when we are ready to retreive data from the db
    // still needs an endpoint to send request to
    //const [listData, addListData] = useState([]);

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
    // calls the function to get list data on page load
    // useEffect(() => {
    //     getListData();
    // }, []);

    var leftList = '';
    var addItemButton = '';
        if( userData.userType !== 'donor') {
            addItemButton =
                <div className={styles.buttonWrapper}>
                    <NewItem className={styles.charityButton} buttonText={'ADD ITEM'}/>
                </div>
            // leftList = <UpForDonateList rawData={listData} taxData={changeTaxData}/>
        } else {
            // leftList = <DonatedList rawData={listData} taxData={changeTaxData}/>
        }

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
                        <div className={styles.outHeaderWrapper}>
                            <CharityHeader />
                        </div>
                    </div>
                        {/* side nav */}
                        <div className={styles.charitySideNav}>
                            {/* this is where the side nav buttons start */}
                            <div className={styles.charityButtonWrapper}>
                                <div className={styles.buttonWrapper}>
                                    <Link to='/' className={styles.charityButtonHomeLink}>
                                        <button className={styles.charityButton}>HOME</button>
                                    </Link>
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <button className={styles.charityButton}>
                                        <CSVLink
                                            data={taxData}>STATEMENT
                                        </CSVLink>
                                    </button>
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <button className={styles.charityButton}>UPDATE PASSWORD</button>
                                </div>
                                {addItemButton}
                            </div>
                        </div>

                        {/* list donated */}
                        <div className={styles.charityListDonated}>
                            <div className={styles.charityDonorListWrapper}>
                                {/* {leftList} */}
                            </div>
                        </div>

                        {/* items to be picked up */}
                        <div className={styles.charityListItemsToBePickedUp}>
                            <div className={styles.charityUserListWrapper}>
                                {/* <PickupList rawData={listData}/> */}

                            </div>
                        </div>

                </div>
            </div>

        </>
    )
}

export default Charity;
