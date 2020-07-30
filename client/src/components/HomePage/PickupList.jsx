import React, { useState, useEffect } from 'react';
import styles from '../../styles/lists.css';
import { fakeData } from './fakeData.jsx';
var _ = require('lodash');
import Axios from 'axios'

const PickupList = ({ charity }) => {

    const [sortType, setSortType] = useState('dateCreated');
    const [pickupData, addListData] = useState([]);

        useEffect(() => {
            getUserItemsData ()
        }, [])
        function getUserItemsData () {
            var arrayforPickupData = []
            const userData = JSON.parse(localStorage.getItem('user'))
            var userDataObj = {
                userType: userData.userType,
                email: userData.email
            }
    
            Axios.get('/items/items', userDataObj)
            .then(res => {
                //pushed to data array if item hasnt been picked up, but HAS been claimed
                if(item.pickedUp === "false" && item.claimedBy !== "") {
                    res.data.map((item) => {
                        arrayforPickupData.push(item);
                    })
                }
            })
            .then(res => {
                //sets state of pickupdata
                addListData(arrayforPickupData)
            })
            .catch(err => {
                console.log(err)
            })
        }

    const handleSort = (event, name) => {
        event.preventDefault();
        setSortType(name);
        sortArray(sortType)
    }
    
    //object keys for sorting the data
    const sortArray = type => {
        const types = {
            claimedBy: 'claimedBy', 
            dateCreated:'dateCreated', 
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
    
    var title = 'Items for Pickup';
    var sortOptions = ['dateCreated', 'name', 'Location']
    if(charity) {
    sortOptions = ['dateCreated', 'name', 'estimatedValue'];
    }

    return (
        <div className={styles.listWrap}>
            <div className={styles.listWrapHeader}>
                  {/* //its working but for some reason shows red line under it */}
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
                                <td> {item.dateCreated.slice(5,16)} </td>
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
