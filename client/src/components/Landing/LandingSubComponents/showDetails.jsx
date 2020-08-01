import React, { useState } from 'react';
import styles from '../ShowDetails.css';
import moment from 'moment';

const ShowDetails = ({ card, closeCard, claimItem }) => {
  if (card.pictures == null) {
    card.pictures = 'https://picsum.photos/200/300';
  }
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
            <div className={styles.userAreaInner}>
              <span className={styles.cardDonor}>{card.donor}</span>
              <span className={styles.cardCreated}>{moment().startOf("day").from(card.dateCreated)}</span>
            </div>
          </div>
          <div className={styles.btnArea}>
            {/* BUTTONS */}
            <div className={styles.msgBtnContainer}>
              {/* Message */}
              <a className={styles.msgBtn} href={`mailto:${card.donorEmail}?subject=Interested In ${card.name}`}>
                Message
                </a>
            </div>
            <div className={styles.claimSpacing}>
              {/* Claim */}
              <button className={styles.msgBtn} onClick={(event) => claimItem(event, card)} name="claim">Claim</button>
            </div>
          </div>
        </div>
        <div className={styles.imgArea}>
          {/* Image */}
          {/* {thumbnail} */}
          <img src={card.pictures} alt={card.name} className={styles.cardImage} />
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
              <span className={styles.productName}>{card.category}</span>
            </div>
          </div>
          <div className={styles.conditionAndZipContainer}>
            {/* Condition and ZipCode */}
            <span className={styles.titleDescriptor}>Condition</span>
            <div className={styles.productName}> {/* Condtion */} {card.itemCondition} </div>
            <span className={styles.titleDescriptor}>Location</span>
            <div className={styles.productName}> {/* Zip Code */} {card.Location} </div>
          </div>
          <div className={styles.description}>
            <span className={styles.titleDescriptor}>Description</span>
            {/* Description */}
            <span className={styles.productName}>{card.Description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDetails;
