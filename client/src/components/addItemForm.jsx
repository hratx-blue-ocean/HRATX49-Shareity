import React, { useState } from 'react';
import axios from 'axios';

const NewItem = ({ userName }) => {
    const [itemName, onItemNameChange] = useState('')
    const [category, onCatChange] = useState('')
    const [zipcode, onZipChange] = useState('')
    const [condition, onConditionChange] = useState('')
    const [description, onDescChange] = useState('')
    const [image, onImageChange] = useState('')
    const [estVal, onValChange] = useState('')

    function onImageAdd() {
        //add image
    }
    function onDonateSubmit() {

        var data = {
            donor: {userName},
            name: itemName,
            claimedBy: null,
            pickedUp: false,
            Description: description,
            pictures: image,
            estimatedValue: estVal,
            itemCondition: condition,
            Location: zipcode,
            dateCreated: new Date(),
            category: category
        };

        axios.post('/items', data)
        .then(res=> {
            console.log('your item has been added')
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
                    onChange={() => {onImageChange(image)}}
                    placeholder="add Image URL"
                ></input>
                <button
                    onClick={() => {onImageAdd()}}
                    >add image </button>
            </div>
            <form>
                <input
                    value={itemName}
                    onChange={(event) => {onItemNameChange(event.target.value)}}
                    placeholder="item name"
                ></input>
                <input
                    value={category}
                    onChange={(event) => {onCatChange(event.target.value)}}
                    placeholder="item category"
                ></input>
                <input
                    value={estVal}
                    onChange={(event) => {onValChange(event.target.value)}}
                    placeholder="estimated Value"
                ></input>
                <input
                    value={zipcode}
                    onChange={(event) => {onZipChange(event.target.value)}}
                    placeholder="zipcode"
                ></input>
                <select 
                    name="condition"
                    value={condition}
                    defaultValue='default'
                    onBlur={(event) => onConditionChange(event.target.value)}
                >
                        <option value='default' disabled>condition</option>
                        <option value='test'> test</option>
                        <option value='test'> test</option>
                        <option value='test'> test</option>
                </select >
            
                <input
                    value={description}
                    onChange={(event) => {onDescChange(event.target.value)}}
                    placeholder="brief description of your item"
                ></input>
                <button
                    onClick={() => {onDonateSubmit()}}
                >
                    Submit Donation Item
                </button>
            </form>
        </div>

    )
}

export default NewItem;