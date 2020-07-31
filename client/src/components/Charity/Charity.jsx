import React, { useState, useEffect } from 'react';
import styles from '../../styles/Charity.css';
import LogoAvatar from './LogoAvatar.jsx';
import CharityHeader from './CharityHeader.jsx';
import { CSVLink, CSVDownload } from "react-csv";
import Axios from 'axios';
import PickupList from '../HomePage/PickupList.jsx';
import DonatedList from '../HomePage/DonatedList.jsx';
import UpForDonateList from '../HomePage/UpForDonateList.jsx';
import AddItem from '../Modals/AddItem.jsx';
import UpdatePassword from '../Modals/UpdatePassword.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
const Charity = (props) => { //

    const addAchievement = (userEmail, achievement) => {
        // compares the passed in value to the target achievements name
        let newAchievement = data.name === data.name[achievement];
        // post the new achievement to the users profile
        Axios.post('./newAchievement',{ 
            email: userEmail,
            achievement: newAchievement  
        })
            .then( res => {
                console.log(res.data);
            })
            .catch( err => {
                console.error(err);
            })
    }

    //sets the state of tax data on donation list to be used with csv export
    const [taxData, changeTaxData] = useState([]);
    const [charity, isCharity] = useState(false);
    var csvData = [['date', 'name', 'category', 'estimated value']]
    var totalVal = 0;
    var leftList = '';
    var donorButtons = '';

    useEffect(() => {
        getUserItemsData()
    }, []);
    //gathers user items data for tax info
    function getUserItemsData () {

        //if no local storage exists, then do nothing
        if(!localStorage.getItem('user')) {
            return;
        }
        var csvRow = [];

        //user info from local storage
        const userData = JSON.parse(localStorage.getItem('user'))
        var userType = userData.type;

        //if not user then change to donor for db query
        // and then make charity boolean true
        if(userType === "user") {
            userType = "donor"
        }
        if(userType === "charity") {
            isCharity(true)
        }
        //user info to use with get request
        var userDataObj = {
            userType: userType,
            email: userData.email
        }

        Axios.get('/items/items', {params: userDataObj})
        .then(res => {
            //pushed to data array if has been picked up and claimed
            res.data.items.map((item) => {
                console.log('items before if: 0', item)
                if(item.pickedUp === true ) {
                    //assigns tax date to be exported
                    csvRow.push(item.date, item.name, item.category, item.estimatedValue)
                    csvData.push(csvRow);
                    csvRow = [];
                    totalVal += item.estimatedValue;
                }
            })    
        }) //sets state of pickupdata
        .then(res => {
            console.log("data from axios req, ", csvData)
            if(csvData.length === 1) {
                csvData.push (["you haven't donated any items yet", 0, 0, 0])
            }
            changeTaxData(csvData)
            console.log("on Tax Data state: ", taxData)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    if(!charity) {
        donorButtons =
            <div>
                <div className={styles.buttonWrapper}>
                    <AddItem className={styles.charityButton} buttonText={'ADD ITEM'} addAchievement={addAchievement}/>
                </div>
            <div className={styles.buttonWrapper}>
                <div className={styles.buttonWrapper}>
                    <button className={styles.charityButton}>
                        <div> Items Donated: {csvData.length - 1}</div>
                    </button>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.charityButton}>
                        <div> $ amount: {totalVal}</div>
                    </button>
                </div>
            </div>
            </div>

        leftList = <UpForDonateList />
    } else {
        leftList = <DonatedList />
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
                                            data={taxData}>DOWNLOAD STATEMENT
                                        </CSVLink>
                                    </button>
                                </div>

                                <div className={styles.buttonWrapper}>
                                    {/* <button className={styles.charityButton}>UPDATE PASSWORD</button> */}
                                    <UpdatePassword />
                                </div>
                                {donorButtons}
                            </div>
                        </div>

                        {/* list donated */}
                        <div className={styles.charityListDonated}>
                            <div className={styles.charityDonorListWrapper}>
                                {leftList}
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