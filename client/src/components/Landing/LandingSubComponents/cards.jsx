import React, { useState } from 'react';
import IndivCards from './cardsSubComponents/indivCards.jsx';
import styles from '../LandingSubComponents/Cards.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const Cards = ({ items, loading, displayCard, sortBy }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <div>
      <div className={styles.sortTitleContainer}>
        <div className={styles.linkContainer}>
          <Link to={{ pathname: "/aboutUs" }}>
            <button className={styles.aboutBtn} onClick={() => { event.preventDefault() }}>About Us</button>
          </Link>
        </div>
        <div className={styles.btnContainer}>
          {/* Sorting Buttons */}
          <button className={styles.sortBtn} onClick={(e) => sortBy(e, e.target.name)} name="name">Name</button>
          <button className={styles.sortBtn} onClick={(e) => sortBy(e, e.target.name)} name="date">Date</button>
          <button className={styles.sortBtn} onClick={(e) => sortBy(e, e.target.name)} name="location">Location</button>
          <button className={styles.sortBtn} onClick={(e) => sortBy(e, e.target.name)} name="category">Category</button>
        </div>
      </div>
      <div className={styles.cardsParent}>
        {/* Mapping Component for the cards */}

        {items.map((item) => (
          <IndivCards key={item._id} item={item} displayCard={displayCard} className="list-group-item" />
        ))}
      </div>
    </div>
  )
}

export default Cards;