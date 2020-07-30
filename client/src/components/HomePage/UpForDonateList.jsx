import React, { useState, useEffect } from 'react';
import { fakeData } from './fakeData.jsx';
import styles from '../../styles/lists.css';
import ItemPopUp from '../Landing/LandingSubComponents/showDetails.jsx'
import Axios from 'axios';

var _ = require('lodash');

const DonatedList = ({ rawData, taxData }) => {
    rawData = rawData || fakeData;
    var data = [];
    var totalVal = 0;
    var title='Items Available for Donation'
    var sortOptions = ['dateCreated', 'estimatedValue', 'name', 'category'];
    var csvData = [['date', 'name', 'category', 'estimated value']]

    const [filteredData, setData] = useState(data)
    const [sortType, setSortType] = useState('dateCreated');
    
    useEffect(() => {
        sortArray(sortType);
    }, [sortType]);
    
    //filters incoming data
    if(rawData.length >= 1) {
        var csvRow = [];
        rawData.map((item) => {
            //pushes rawdata into state if unclaimed and not picked p
            if(item.claimedBy === "" && item.pickedUp === 'false') {
                data.push(item);
            }
            //adds rawdata to tax csv data array if they have been claimed and picked up
            if(item.claimedBy !== "" && item.pickedUp === 'true') {
                csvRow.push(item.dateCreated.slice(3,21), item.name, item.category, item.estimatedValue);
                csvData.push(csvRow);
                csvRow = [];
                totalVal += item.estimatedValue;
            }
        })
    }
    var popup = '';
    //item popup
    function onItemClick (val) {
        popup = <itemPopUp cart={val}/>
    }
    function onDeleteItem (item) {
        var data = {
            _id: item._id,
            email: item.email
        }
        Axios.delete('/items', data)
        .then(res => {
            setData(data)
        })
        .catch(err => {
            console.log('axios error deleting item from the DB: ', err)
        })
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
        const sorted = _.orderBy(data, [sortProperty, 'asc'])
        setData(sorted)
        taxData(csvData)
    };

    return (
        <div className='listWrap'>
            {popup}
            <div className='listHeaderWrap'>
                  {/* //its working but for some reason shows red line under it */}
                <select 
                    className={styles.listSelector}  
                    value={sortType} 
                    onChange={(e) => setSortType(e.target.value)}
                >
                    {sortOptions.map((item, i) => 
                        <option key={i} value={item}>{item}</option>
                    )}
                </select>

                <span className={styles.listTitle}>   {title}</span>

            </div>
            <table>
                <thead className={styles.listRowHeaders}>
                    <tr>
                        <th>date</th>
                        <th> name</th>
                        <th>category</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody className={styles.listRowWrap}>  
                    {filteredData.map((item, i) => 
                        <tr key={i} value={item} className={styles.listItemRow} onClick={ e => onItemClick(e.target.value)}>
                            <td>{item.dateCreated.slice(3,21)}</td>
                            <td>{item.name} </td>
                            <td> {item.category} </td>
                            <td> ${item.estimatedValue} </td>
                            <td><button value={item} onClick={e => onDeleteItem(e.target.value)}>X</button></td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr><th>Items up for Donation: {filteredData.length}</th></tr>
                </tfoot>
            </table>
            <div>                
                <span>Total # Donated: {csvData.length}</span>
                <span> Total $ Donated: {totalVal}</span>
            </div>
        </div>

    )
}

export default DonatedList;