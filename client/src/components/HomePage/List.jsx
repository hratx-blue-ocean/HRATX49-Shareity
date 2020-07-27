import React from 'react';
//if we are a charity or donor
    //list of charities or list of donor
const List = ({ itemsData, charity, pickup }) => {
itemsData = [{date: 'test', name: 'test', category: 'test category'},{date: 'test', name: 'test', category: 'test category'}]
var title= 'test';
var sortOptions = [];
var rowHeaders = [];
    function listMaker() {
        if(charity) {
            if(pickup) {
                title='Items for Pickup';
                //and sort options for zip, date and name of item
                sortOptions = [item.zip, item.date, item.name];
                //assign the row data to show zip code
                rowHeaders = [item.zip, item.name, item.date, item.value];
            } else {
                title='Items Donated'
                //otherwise, sort by date, name, est value
                sortOptions = [item.date, item.name, item.value];
                //assign row data for same as sort above
                rowHeaders = [item.date, item.name, item.value, null];
            }
        } else {
            if(pickup) {
                title='Items for Pickup'
                //sort by charity name, date, and est value, name
                sortOptions = [item.name, item.date, item.value, item.charity];
                //assign the row data to show ...
                rowHeaders = [item.name, item.charity, item.date, item.value];
            } else {
                title='Items Donated'
                //sort by charity name, date, value, name, maybe category
                sortOptions = [item.charity, item.date, item.value, item.name, item.category];
                //assign the row data to show ....
                rowHeaders = [item.date, item.name, item.charity, item.value];
            }
        }
    }
    return (
        <div className='listWrap'>
            <div className='listHeaderWrap'>
                <select>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                </select>
                <div className="listTitle">'test title'</div>

            </div>
                <div className='listRowWrap'>
                    {itemsData.map((item, i) => 
                        <div key={i} className='listItemRow'>
                            <span className='listItemDate'>{item.date}</span>
                            <span className='listItemName'>{item.name}</span>
                            <span className='listItemCategory'>{item.category}</span>
                            <span className='listItemCharity'>{item.charity}</span>
                        </div>
                        )}
                </div>
        </div>
    )
}

export default List;