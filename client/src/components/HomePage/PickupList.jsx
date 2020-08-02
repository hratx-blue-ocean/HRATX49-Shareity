import React, { useState, useEffect } from 'react';
import styles from '../../styles/lists.css';
import Axios from 'axios';
import { Card } from 'react-bootstrap';

var _ = require('lodash');

const PickupList = () => {

    //set users pickup data, sorting options and boolean if charity
    const [sortType, setSortType] = useState('date');
    const [pickupData, addListData] = useState([]);
    var charity = false;

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
                charity = true;
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
                    //console.log(item)
            
                    if(item.pickedUp === false && item.claimedBy !== null && item.charityEmail !== null) {
                        
                        //makes the date look pretty
                        item.date =  `${item.dateCreated.slice(5,7)}/${item.dateCreated.slice(8,10)}/${item.dateCreated.slice(2,4)} @${item.dateCreated.slice(11,16)}`
                        if(charity) {
                            item.pickingUp = item.donor
                        } else {
                            item.pickingUp = item.charityEmail
                        }

                        arrayforPickupData.push(item);
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

    const handlePickupItem = async (event) => {

        //if no local storage exists, then do nothing
        if(!localStorage.getItem('user')) {
            return;
        }

        let charityInfo = JSON.parse(localStorage.getItem('user'));
        let charityEmail = charityInfo.email;
        
        var data = {
            user: charityEmail,
            userType: 'charity',
            _id: await event.target.value,
            item: {
                pickedUp: true,
            }
        }
        // event.preventDefault();
        if(charityInfo.type === "charity") {
            Axios.put('/items/', data)
            .then(res => {
                alert('❤❤❤❤❤❤❤Thank You for spreading the love! ❤❤❤❤❤❤❤❤ ')
                getUserItemsData()
            })

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
    var title = 'Waiting for Pickup';
    var sortOptions = ['date', 'name', 'Location']
    var pickupCol = <th><i class="fas fa-hands-helping"></i></th>

    //different selectors for a charity
    if(charity) {
    sortOptions = ['date', 'name', 'Location', 'estimatedValue'];
    pickupCol = <th><i class="fas fa-hands-helping"></i></th>
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
                <table>
                    <thead className={styles.listRowHeaders}>
                        <tr>
                        <th> <i class="far fa-clock"></i></th>
                        <th> <i class="fas fa-heart"></i></th>
                        <th> <i class="fas fa-location-arrow"></i></th>
                        {pickupCol}
                        <th><i class="fas fa-truck"></i></th>
                        </tr>
                    </thead>
                    <tbody className={styles.listRowWrap}>   
                        {pickupData.map((item, i) => 
                            <tr key={i} className={styles.listItemRow} >
                                <td> {item.date} </td>
                                <td> {item.name} </td>
                                <td> {item.Location = item.Location.toString().slice(0,5) || ''}</td>
                                <td> {item.pickingUp}</td>
                                <td className={styles.deleteButton}>
                                    <button className={styles.deleteButton} 
                                        value={item._id} 
                                        onClick={(event) => handlePickupItem(event)}
                                    >
                                        <i class="fa fa-check-circle-o fa-lg" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
                <div className={styles.totalPickupWrap}>
                    <span className={styles.totalPickup}>Total Items out for Pickup: {pickupData.length}
                    </span>
                </div>
        </div>
    )
}

export default PickupList;
