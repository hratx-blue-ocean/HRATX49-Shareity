import React, { useState, useEffect } from 'react';
import { fakeData } from './fakeData.jsx';
var _ = require('lodash');

const PickupList = ({ styles, charity }) => {
    const [otherData, setData] = useState([])
    const [sortType, setSortType] = useState('dateCreated');

    useEffect(() => {
        sortArray(sortType);
    }, [sortType]);
    
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
            const sorted = _.orderBy(fakeData, [sortProperty, 'asc'])
            setData(sorted)
        };
    
    var title = 'Items for Pickup';
    var sortOptions = ['dateCreated', 'name', 'Location']
    if(charity) {
    sortOptions = ['dateCreated', 'name', 'estimatedValue'];
    }

    return (
        <div className='listWrap'>
            <div className='listHeaderWrap'>
                  {/* //its working but for some reason shows red line under it */}
                <select className={styles.listSelector} value={sortType} onChange={(e) => setSortType(e.target.value)}>
                    {sortOptions.map((item, i) => 
                        <option key={i} value={item}>{item}</option>
                    )
                }
                </select>

                <span className={styles.listTitle}>  {title}</span>

            </div>
            <table>
                <thead className={styles.listRowHeaders}>
                    <tr>
                    <th> date </th>
                    <th> name</th>
                    <th> zip </th>
                    </tr>
                </thead>
                <tbody className={styles.listRowWrap}>   
                    {otherData.map((item, i) => 
                        <tr key={i} className={styles.listItemRow}>
                            <td> ({item.dateCreated.slice(3,21) || ''}) </td>
                            <td> {item.name || ''} </td>
                            <td> {item.Location = item.Location.toString().slice(0,5) || ''}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PickupList;
