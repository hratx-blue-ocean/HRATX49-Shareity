import React, { useState, useEffect } from 'react';
import styles from '../../styles/lists.css';
import Axios from 'axios';

var _ = require('lodash');

const PickupList = ({ displayCard }) => {

    //set users pickup data, sorting options and boolean if charity
    const [sortType, setSortType] = useState('date');
    const [pickupData, addListData] = useState([]);
    var charity = false;

        //assigns title and sort options for list
        var title = 'Waiting for Pickup';
        var sortOptions = ['date', 'name', 'Location', 'contact']
  

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
            if(userType === 'charity') {
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
                        //console.log(item)
                        
                        //makes the date look pretty
                        item.date =  `${item.dateCreated.slice(5,7)}/${item.dateCreated.slice(8,10)}/${item.dateCreated.slice(2,4)} @${item.dateCreated.slice(11,16)}`

                        //if statements fixes bug incase location is set to null
                        if(item.Location !== null) {
                            //slices zip code for sorting
                            item.Location = item.Location.toString().slice(0,5) 
                        }
                        if(item.name !== null){
                            //assign new keys for sorting rows more easily
                            item.lowerCaseName = item.name.toLowerCase();
                        }
                        if(item.category !== null) {
                            //assign new keys for sorting rows more easily
                            item.lowerCaseCategory = item.category.toLowerCase();
                        }
                        //value string to number for sorting
                        item.value = parseInt(item.estimatedValue)

                        if(charity) {
                            //assigns contact as email of donor
                            item.contact = item.email
                        } else {
                            //contact as email of charity
                            item.contact = item.charityEmail
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

    const handlePickupItem = async (event, item) => {

        //if no local storage exists, then do nothing
        if(!localStorage.getItem('user')) {
            return;
        }

        let charityInfo = JSON.parse(localStorage.getItem('user'));
        let charityEmail = charityInfo.email;
        
        var data = {
            user: charityEmail,
            userType: 'charity',
            _id: item._id,
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
            estimatedValue: 'value', 
            name: 'lowerCaseName', 
            category: 'lowerCaseCategory',
            Location: 'Location',
            contact: 'contact'
        };
        //defines the option that was selected in the dropdown by user
        const sortProperty = types[type]; 
        //sorting function compares data from the fakeData file           
        const sorted = _.orderBy(pickupData, [sortProperty, 'asc'])
        addListData(sorted)
        
    };
    
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
                        <th> <i className="far fa-clock"></i></th>
                        <th> <i className="fas fa-heart"></i></th>
                        <th> <i className="fas fa-location-arrow"></i></th>
                        <th><i className="fas fa-hands-helping"></i></th>
                        <th><i className="fas fa-truck"></i></th>
                        </tr>
                    </thead>
                    <tbody className={styles.listRowWrap}>   
                        {pickupData.map((item, i) => 
                            <tr key={i} className={styles.listItemRow}>
                                <td onClick={ (e) => displayCard(e, item)}> {item.date} </td>
                                <td onClick={ (e) => displayCard(e, item)}> {item.name} </td>
                                <td onClick={ (e) => displayCard(e, item)}> {item.Location}</td>
                                <td className={styles.contact} onClick={ (e) => displayCard(e, item)}> {item.contact}</td>
                                <td className={styles.deleteButton} >
                                    <button className={styles.deleteButton} 
                                        value={item._id} 
                                        onClick={(event) => handlePickupItem(event, item)}
                                    >
                                        <i className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i>
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
