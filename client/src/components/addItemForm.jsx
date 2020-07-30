import React, { useState } from 'react';
import styles from '../styles/AddItemForm.css';
import axios from 'axios';

const NewItem = (props) => {
    const [itemName, onItemNameChange] = useState('')
    const [category, onCatChange] = useState('')
    const [zipcode, onZipChange] = useState('')
    const [condition, onConditionChange] = useState('')
    const [description, onDescChange] = useState('')
    const [image, onImageChange] = useState('')
    const [estVal, onValChange] = useState('')
    const [userEmail, setUserEmail] = useState('test')
    const [userName, setUserName] = useState('test')
    const date = new Date();
    
    function onImageAdd() {
        //add image
    }

    console.log(props);
    function onDonateSubmit() {

        var data = {
            donor: {userName},
            name: {itemName},
            Description: {description},
            pictures: {image},
            estimatedValue: {estVal} || 0,
            itemCondition: {condition},
            Location: {zipcode},
            dateCreated: {date},
            category: {category},
            email: {userEmail}
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
        <div className={styles.addItemFormWrapper}>
            <div className={styles.addedItemImageWrapper}>
                <img className={styles.addedItemImage} src={image}></img>
            </div>

            <div className={styles.inputFieldWrapper}>

                <input
                    className={styles.addNameInputField}
                    value={itemName}
                    onChange={(event) => onItemNameChange(event.target.value)}
                    placeholder="item name"
                    type="text"
                    required
                ></input>
                <input
                    className={styles.addCategoryInputField}
                    value={category}
                    onChange={(event) => onCatChange(event.target.value)}
                    placeholder="item category"
                    type="text"
                    required
                ></input>
                <input
                    className={styles.addValueInputField}
                    value={estVal}
                    onChange={(event) => onValChange(event.target.value)}
                    placeholder="estimated Value"
                    type="number"
                    required
                ></input>
                <input
                    className={styles.addZipInputField}
                    value={zipcode}
                    onChange={(event) => onZipChange(event.target.value)}
                    placeholder="zipcode"
                    type="number"
                    required
                ></input>
                <select 
                    className={styles.addConditionInputField}
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
                    className={styles.addDescriptionInputField}
                    value={description}
                    type="text"
                    onChange={(event) => onDescChange(event.target.value)}
                    placeholder="brief description of your item"
                    required
                ></input>
                <div className={styles.addItemImageWrapper}>
                    <input
                        className={styles.addImageInputField}
                        value={image}
                        type="text"
                        onChange={(event) => onImageChange(event.target.value)}
                        placeholder="add Image URL"
                        required
                    ></input>
                    <button
                        className={styles.addImageFormButton}
                        onClick={() => onImageAdd()}
                        >add image </button>
                </div>
                <button
                    className={styles.addItemSubmitButton}
                    onClick={() => onDonateSubmit()}
                    onClick={() => props.closeModal()}
                >
                    Submit Donation Item
                </button>
            </div>
        </div>

    )
}

export default NewItem;