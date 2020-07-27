import React from 'react';

const List = ({ itemsData, charity, pickup }) => {
    //test info
itemsData = [{date: 'test', name: 'table', category: 'test category', value: '$500'},{zip: '78666', value: '$600', date: 'test', name: 'chairs', category: 'test category'}];
charity = false;
pickup = false;
var title = 'test';
var sortOptions = [];
    //setting sorting options and titles for each list
    if(charity) {
        if(pickup) {
            title='Items for Pickup';
            sortOptions = ['zipcode', 'date','name'];
        } else {
            title='Items Donated'
            sortOptions = ['date', 'name', 'value'];
        }
        
    } else {
        if(pickup) {
            title='Items for Pickup'
            sortOptions = ['name', 'date', 'value', 'charity'];
        } else {
            title='Items Donated'
            sortOptions = ['charity', 'date', 'value', 'name', 'category'];
        }
    }

    return (
        <div className='listWrap'>
            <div className='listHeaderWrap'>
                <select>
                {sortOptions.map((item, i) => 
                    <option value={i}>{item}</option>
                    )
                }
                </select>
                <div className="listTitle">{title}</div>

            </div>
                <div className='listRowWrap'>
                    {itemsData.map((item, i) => 
                        <div key={i} className='listItemRow'>
                            <span className='listItemDate'> {item.date || ''} </span>
                            <span className='listItemName'> {item.name || ''} </span>
                            <span className='listItemCategory'> {item.category || ''} </span>
                            <span className='listItemCharity'> {item.charity || ''} </span>
                            <span className='listItemCharity'> {item.value || ''} </span>
                            <span className='listItemCategory'> {item.zip || ''}</span>
                        </div>
                    )}
                </div>
        </div>
    )
}

export default List;