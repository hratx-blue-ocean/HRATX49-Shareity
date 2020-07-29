import React, { useState, useEffect } from 'react';
import { fakeData } from './fakeData.jsx';

const PickupList = ({ charity }) => {
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
            function compare(a, b) {
                var picA = a[sortProperty];
                const picB = b[sortProperty];
                let comparison = 0;

                if (picA < picB) {
                    comparison = 1;
                } else if (picA > picB) {
                    comparison = -1;
                }
                return comparison;
            }
            //calls the sorting function and then sets the state to be re mapped
            const sorted = fakeData.sort(compare);
            setData(sorted)
        };
    
    var title = 'Items for Pickup';
    var sortOptions = ['dateCreated', 'name', 'estimatedValue'];

    return (
        <div className='listWrap'>
            <div className='listHeaderWrap'>
                  {/* //its working but for some reason shows red line under it */}
                <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                    {sortOptions.map((item, i) => 
                        <option key={i} value={item}>{item}</option>
                    )
                }
                </select>

                <span className="listTitle">   ________{title}________</span>

            </div>
            <div className='listRowHeaders'>
                <span id='colHeader' className='listItemDate'> date____ </span>
                <span id='colHeader' className='listItemName'> item name ____</span>
                <span id='colHeader' className='listItemLocation'> zip </span>
            </div>
            <div className='listRowWrap'>   
                {otherData.map((item, i) => 
                    <div key={i} className='listItemRow'>
                        <span id='rowItem' className='listItemDate'> {item.dateCreated || ''} </span>
                        <span id='rowItem' className='listItemName'> {item.name || ''} </span>
                        <span id='rowItem' className='listItemLocation'> {item.Location || ''}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PickupList;