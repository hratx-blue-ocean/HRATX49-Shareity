import React, { useState, useEffect } from 'react';
import styles from '../../styles/lists.css';
import Axios from 'axios';
import { Card } from 'react-bootstrap';

var _ = require('lodash');

const PickupList = () => {

    //set users pickup data, sorting options and boolean if charity
    const [sortType, setSortType] = useState('date');
    const [pickupData, addListData] = useState([]);
    const [charity, isCharity] = useState(false)

        useEffect(() => {
            getUserItemsData()
        }, [])
        //gets the user data for the items available for pickup
        function getUserItemsData () {

            //if no local storage exists, then do nothing
            if(!localStorage.getItem('user')) {
                return;
            }
            //to push data from get request
            var arrayforPickupData = []

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
                //pushed to data array if item hasnt been picked up, but HAS been claimed
                res.data.items.map((item) => {
                    if(item.pickedUp === false && item.claimedBy !== null && item.charityEmail !== null) {
                    
                        //makes the date look pretty
                        item.date =  `${item.dateCreated.slice(5,7)}/${item.dateCreated.slice(8,10)}/${item.dateCreated.slice(2,4)} @${item.dateCreated.slice(11,16)}`
                    
                        arrayforPickupData.push(item);
                    }
                    if(charity) {
                        item.pickingUp = item.donor
                    } else {
                        item.pickingUp = item.charityEmail
                    }
                })    
            }) //sets state of pickupdata
            .then(res => {
                addListData(arrayforPickupData)
            })
            .catch(err => {
                console.log(err)
            })
        }
    //handles the sorting of the selector
    const handleSort = (event, name) => {
        event.preventDefault();
        setSortType(name);
        sortArray(name)
    }

    function handlePickupItem (event) {
        //if no local storage exists, then do nothing
        if(!localStorage.getItem('user')) {
            return;
        }
        //event.preventDefault();
        if(charity) {
            let charityInfo = JSON.parse(localStorage.getItem('user'));
            let charityEmail = charityInfo.email;

            Axios.put('/items/', {
                user: charityEmail,
                userType: 'charity',
                _id: event,
                item: {
                    pickedUp: true,
                }
            }), getUserItemsData()
        } else {

            alert('only Charities can complete items as picked up')
        }
    }
    
    //object keys for sorting the data
    const sortArray = type => {
        const types = {
            claimedBy: 'claimedBy', 
            date:'dateCreated', 
            estimatedValue: 'estimatedValue', 
            name: 'name', 
            category: 'category',
            Location: 'Location'
        };
        //defines the option that was selected in the dropdown by user
        const sortProperty = types[type]; 
        //sorting function compares data from the fakeData file           
        const sorted = _.orderBy(pickupData, [sortProperty, 'asc'])
        addListData(sorted)
        
    };
    
    //assigns title and sortoptions for list
    var title = 'Items for Pickup';
    var sortOptions = ['date', 'name', 'Location']
    var pickupCol = <th>Claimed By</th>

    //different selectors for a charity
    if(charity) {
    sortOptions = ['date', 'name', 'Location', 'estimatedValue'];
    pickupCol = <th>Donor</th>
    }

    return (
        <div className={styles.listWrap}>
            <div className={styles.listWrapHeader}>
                <span className={styles.listTitle}>  {title}</span>
                <select 
                    className={styles.listSelector} 
                    value={sortType} 
                    onChange={(e) => handleSort(e, e.target.value)}
                >
                    {sortOptions.map((item, i) => 
                        <option key={i} value={item}>{item}</option>
                    )
                }
                </select>


            </div>
            <div className={styles.tableWrap}>
                <table className={styles.pickupTable}>
                    <thead className={styles.listRowHeaders}>
                        <tr>
                        <th> Date </th>
                        <th> Name</th>
                        <th> Zip </th>
                        {pickupCol}
                        <th>Pickedup?</th>
                        </tr>
                    </thead>
                    <tbody className={styles.listRowWrap}>   
                        {pickupData.map((item, i) => 
                            <tr key={i} className={styles.listItemRow} >
                                <td> {item.date} </td>
                                <td> {item.name} </td>
                                <td> {item.Location = item.Location.toString().slice(0,5) || ''}</td>
                                <td> {item.pickingUp}</td>
                                <td className={styles.deleteButton}> <button className={styles.deleteButton} value={item._id} onClick={(event) => handlePickupItem(event.target.value)}>complete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
                <div className={styles.totalPickupWrap}>
                    <div className={styles.totalPickup}>Total Items out for Pickup: {pickupData.length}
                    </div>
                </div>
        </div>
    )
}

export default PickupList;
