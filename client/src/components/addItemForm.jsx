import React, { useState } from 'react';
import axios from 'axios';

const NewItem = () => {
    const [itemName, onItemNameChange] = useState('')
    const [category, onCatChange] = useState('')
    const [zipcode, onZipChange] = useState('')
    const [condition, onConditionChange] = useState('')
    const [description, onDescChange] = useState('')
    const [image, onImageChange] = useState('')
    const [estVal, onValChange] = useState('')
    const date = new Date();

    const userData = JSON.parse(localStorage.getItem('user'))
    const userName = userData.name
    const email = userData.email
    console.log(userName, email)
    
    function onImageAdd() {
        //add image
    }
    function onDonateSubmit() {

        var data = {
            donor: userName,
            name: itemName,
            Description: description,
            pictures: image,
            estimatedValue: estVal || 0,
            itemCondition: condition || 'test',
            Location: zipcode,
            dateCreated: date,
            category: category,
            email: email
        };

        axios.post('/items', data)
        .then(res=> {
            console.log('your item has been added', res.data)
        })
        .catch(err => {
            console.log('error posting on axios post request: ', err)
        })
    }

    return (
        <div>
            <div>
                <input
                    value={image}
                    type="text"
                    onChange={(event) => onImageChange(event.target.value)}
                    placeholder="add Image URL"
                    required
                ></input>
                <button
                    onClick={() => onImageAdd()}
                    >add image </button>
            </div>
                <input
                    value={itemName}
                    onChange={(event) => onItemNameChange(event.target.value)}
                    placeholder="item name"
                    type="text"
                    required
                ></input>
                <input
                    value={category}
                    onChange={(event) => onCatChange(event.target.value)}
                    placeholder="item category"
                    type="text"
                    required
                ></input>
                <input
                    value={estVal}
                    onChange={(event) => onValChange(event.target.value)}
                    placeholder="estimated Value"
                    type="number"
                    required
                ></input>
                <input
                    value={zipcode}
                    onChange={(event) => onZipChange(event.target.value)}
                    placeholder="zipcode"
                    type="number"
                    required
                ></input>
                <select 
                    name="condition"
                    value={condition}
                    type="text"
                    defaultValue='default'
                    required
                    onBlur={(event) => onConditionChange(event.target.value)}
                >
                        <option value='default' disabled>condition</option>
                        <option value='test'> test</option>
                        <option value='test'> test</option>
                        <option value='test'> test</option>
                </select >
            
                <input
                    value={description}
                    type="text"
                    onChange={(event) => onDescChange(event.target.value)}
                    placeholder="brief description of your item"
                    required
                ></input>
                <button
                    onClick={() => onDonateSubmit()}
                >
                    Submit Donation Item
                </button>
        </div>

    )
}

export default NewItem;