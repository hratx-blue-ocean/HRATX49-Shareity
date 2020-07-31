import React, { useState } from 'react';
import IndivCards from './cardsSubComponents/indivCards.jsx';
import styles from '../LandingSubComponents/Cards.css';

const Cards = ({ items, loading, displayCard, sortBy}) => {
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <div>
      <div className={styles.sortTitleContainer}>
      <span className={styles.sortTitle}> How would you like to sort your donations?</span>
      </div>
      <div>
        {/* Sorting Buttons */}
        <button className={styles.sortBtn} onClick={(e) => sortBy(e, e.target.name)} name="name">Name</button>
        <button className={styles.sortBtn} onClick={(e) => sortBy(e, e.target.name)} name="date">Date</button>
        <button className={styles.sortBtn} onClick={(e) => sortBy(e, e.target.name)} name="location">Location</button>
        <button className={styles.sortBtn} onClick={(e) => sortBy(e, e.target.name)} name="category">Category</button>
      </div>
      {/* {styles.cardsParent} */}
      <div className={styles.cardsParent}>
        {/* <IndivCards /> */}
        {/* Mapping Component for the cards */}
        
        {items.map((item) => (
          // console.log(item),
          <IndivCards key={item._id} item={item} displayCard={displayCard} className="list-group-item" />
          // {item.name}
        ))}
        {/* <Pagination total={50}/> */}
        
      </div>
    </div>
  )
}

export default Cards;