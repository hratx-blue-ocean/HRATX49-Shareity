import React, { useState, useEffect } from 'react';
import styles from '../../styles/lists.css';
import Axios from 'axios';

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
                    if(item.pickedUp === false && item.claimedBy !== "") {
                        //makes the date look pretty
                        item.date =  `${item.dateCreated.slice(5,7)}/${item.dateCreated.slice(8,9)}/${item.dateCreated.slice(0,4)} at ${item.dateCreated.slice(11,16)}`
                    
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

    //different selectors for a charity
    if(charity) {
    sortOptions = ['date', 'name', 'estimatedValue'];
    }

    return (
        <div className={styles.listWrap}>
            <div className={styles.listWrapHeader}>
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

                <span className={styles.listTitle}>  {title}</span>

            </div>
            <div className={styles.tableWrap}>
                <table className={styles.pickupTable}>
                    <thead className={styles.listRowHeaders}>
                        <tr>
                        <th> date </th>
                        <th> name</th>
                        <th> zip </th>
                        </tr>
                    </thead>
                    <tbody className={styles.listRowWrap}>   
                        {pickupData.map((item, i) => 
                            <tr key={i} className={styles.listItemRow} onClick={() => alert('im clicked!')}>
                                <td> {item.date} </td>
                                <td> {item.name} </td>
                                <td> {item.Location = item.Location.toString().slice(0,5) || ''}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr><th># of Items for Pickup: {pickupData.length}</th></tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default PickupList;
