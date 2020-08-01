import React, { useState } from 'react';
import styles from '../ShowDetails.css';
import Item from 'antd/lib/list/Item';
import { without } from 'lodash';
import moment from 'moment';

const ShowDetails = ({ card, closeCard, claimItem }) => {
  if (card.pictures == null){
    card.pictures = 'https://picsum.photos/200/300';
  }
  console.log(card.pictures)
  let arrOfPictures = card.pictures.split(',');
  let thumbnail = arrOfPictures[0];


  const handleClose = (e) => {
    event.stopPropagation();
    closeCard();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.cardDetail}>
        
        <div className={styles.leftSide}>
          {/* Left Side */}
          <div className={styles.userArea}>
            {/* User Area and Date Area */}
            <span className={styles.cardDonor}>{card.donor}</span>
            <span className={styles.cardCreated}>{moment().startOf("day").from(card.dateCreated)}</span>
          </div>
          <div className={styles.btnArea}>
            {/* BUTTONS */}
            <div className={styles.msgBtnContainer}>
              {/* Message */}
              <button className={styles.msgBtn} name="message">
                <a className={styles.msgBtnA} href={`mailto:${card.donorEmail}?subject=Interested In ${card.name}`}>
                  Message
                </a>
              </button>
            </div>
            <div className={styles.msgBtn}>
              {/* Claim */}
              <button className={styles.msgBtn} onClick={(event)=>claimItem(event,card)} name="claim">Claim</button>
            </div>
          </div>
        </div>
        <div className={styles.imgArea}>
          {/* Image */}
          {/* {thumbnail} */}

          <img src={card.pictures} alt={card.name} className={styles.cardImage}/>
        </div>
        <div className={styles.rightSide}>
          {/* Right Side Details */}
          <div className="">
            {/* X button Item Name and Category */}
            <div className={styles.closeBtn}>
            <i onClick={closeCard} className="fas fa-times-circle"></i>
            </div>
            <div className={styles.productNameContainer}>
              {/* Item Name */}
            <span className={styles.titleDescriptor}>Donation</span>
              <span className={styles.productName}>{card.name}</span>
            </div>
            <div className={styles.productCategoryContainer}>
            <span className={styles.titleDescriptor}>Category</span>
              {/* Item Category */}
              <span className={styles.productCategory}>{card.category}</span>
            </div>
          </div>
          <div className={styles.conditionAndZipContainer}>
            {/* Condition and ZipCode */}
            <span className={styles.titleDescriptor}>Condition And Location</span>
            <div className={styles.condition}> {/* Condtion */} {card.itemCondition} </div>
            <div className={styles.zip}> {/* Zip Code */} {card.Location} </div>
          </div>
          <div className={styles.description}>
          <span className={styles.titleDescriptor}>Description</span>
            {/* Description */}
            <span className={styles.cardDescription}>{card.Description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDetails;

/*
<div className="alert alert-primary" role="alert">
          Item successfully claimed!
        </div>
*/