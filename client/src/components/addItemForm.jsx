import React, { useState, useEffect } from 'react';
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
    // const [userEmail, setUserEmail] = useState('')
    // const [userName, setUserName] = useState('')
    const date = new Date();

    // setUserEmail('test')
    // setUserName('test')


    function onImageAdd() {
        //add image
    }

    function onDonateSubmit() {
        if(!localStorage.getItem('user')) {
            return;
        }
        const userData = JSON.parse(localStorage.getItem('user'))
        const userName = userData.name
        const email = userData.email
        console.log(userName, email)
        var data = {
            donor: userName,
            name: itemName,
            Description: description,
            pictures: image,
            estimatedValue: estVal || 0,
            itemCondition: condition,
            Location: zipcode,
            dateCreated: date,
            category: category,
            email: email
        };

        axios.post('/items', data)
        .then(res=> {
            getUserItemData(res.data.items)
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

                <div>

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
                </div>

                <input
                    className={styles.addDescriptionInputField}
                    value={description}
                    type="text"
                    onChange={(event) => onDescChange(event.target.value)}
                    placeholder="brief description of your item"
                    required
                ></input>
                <select
                    className={styles.addConditionInputField}
                    name="condition"
                    // this line was breaking the condition dropdown
                    // value={condition}
                    type="text"
                    defaultValue='default'
                    required
                    // grabs condition from the dropdown box
                    onBlur={(event) => {
                        onConditionChange(event.target.value);
                        console.log(event.target.value);
                    }}
                >
                    <option className={styles.conditionOptions} value='default' disabled>condition</option>
                    <option className={styles.conditionOptions} value='New'>New</option>
                    <option className={styles.conditionOptions} value='Excellent'>Excellent</option>
                    <option className={styles.conditionOptions} value='Good'>Good</option>
                    <option className={styles.conditionOptions} value='Rough'>Rough</option>
                    <option className={styles.conditionOptions} value='Trash'>Trash</option>
                </select >

                <div>
                    <button 
                        className={styles.addItemCancelButton} 
                        onClick={() => props.closeModal()}>
                        Cancel
                    </button>
                    <button
                        className={styles.addItemSubmitButton}
                        onClick={() => onDonateSubmit()}
                        onClick={() => props.closeModal()}
                    >
                        Donate
                    </button>
                </div>
                
            </div>
        </div>

    )
}

export default NewItem;