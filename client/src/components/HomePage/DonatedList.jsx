import React, { useState, useEffect } from 'react';
import styles from '../../styles/lists.css';
import { fakeData } from './fakeData.jsx';
var _ = require('lodash');


const DonatedList = ({ charity, rawData, taxData }) => {
    rawData = rawData || fakeData
    var data = [];
    var totalVal = 0;
    var csvData = [['date', 'name', 'category', 'estimated value']]

    const [filteredData, setData] = useState(data)
    const [sortType, setSortType] = useState('dateCreated');
    
    useEffect(() => {
        sortArray(sortType);
    }, [sortType]);

    if(rawData.length >= 1) {
        var csvRow = [];
        rawData.map((item) => {
            if(item.pickedUp === "true") {
                data.push(item);
                totalVal += item.estimatedValue;
                csvRow.push(item.dateCreated.slice(3,21), item.name, item.category, item.estimatedValue);
                csvData.push(csvRow);
                csvRow = [];
            }
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

    var title = 'test';
    var sortOptions = [];
    //if the user is a charity or donor, this sets sorting options and titles for each list
    if(charity) {
        title='Items Donated'
        sortOptions = ['dateCreated', 'name', 'estimatedValue'];
    } else {
        title='Items Donated'
        sortOptions = ['claimedBy', 'dateCreated', 'estimatedValue', 'name', 'category'];
    }

    return (
        <div className={styles.listWrap}>
            <div className={styles.listWrapHeader}>
                  {/* //its working but for some reason shows red line under it */}
                <select className={styles.listSelector}  value={sortType} onChange={(e) => setSortType(e.target.value)}>
                    {sortOptions.map((item, i) => 
                        <option key={i} value={item}>{item}</option>
                        )
                    }
                </select>

                <span className={styles.listTitle}>   {title}</span>

            </div>
            <div className={styles.tableWrap}>
                <table>
                    <thead className={styles.listRowHeaders}>
                        <tr>
                            <th> date </th>
                            <th> name</th>
                            <th> cat </th>
                            <th> est. val</th>
                        </tr>
                    </thead>
                    <tbody className={styles.listRowWrap}>  
                        {filteredData.map((item, i) =>  

                            <tr key={i} className={styles.listItemRow} onClick={() => alert('im clicked!')}>
                                <td>({item.dateCreated.slice(3,21) || ''})</td>
                                <td> {item.name || ''} </td>
                                <td> {item.category || ''} </td>
                                <td> ${item.estimatedValue || ''} </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr><th>Total Value Donated: ${totalVal}</th>
                        <th>Total # of Items Donated: {filteredData.length}</th></tr>
                    </tfoot>
                </table>
            </div>
        </div>

    )
}

export default DonatedList;
