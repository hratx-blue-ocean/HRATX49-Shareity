import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Greeting from './Landing/Greeting.jsx';
import styles from '../styles/aboutUs.css'


const AboutUs = () =>{
  return (
    <div>
      <div className={styles.header}>
        <Greeting />
        <Link to={{pathname:"/"}}>
          <button className={styles.link}>Home</button>
        </Link>
      </div>
      <div className={styles.container}>
        <h3>Mission Statment</h3>
        <img className={styles.image} src="./badCo.jpg"/>
        <p>
          Here at BadCo, we are committed to serving our community. As such, Sharity was created to connect wonderful and caring individuals with charities around the world. Sharity simplifies the donation process for both parties. And in combination with our amazing user base, we plan on making the world a better place.
        </p>
      </div>
      <div className={styles.container}>
        <h3>Individual Donors</h3>
        <img className={styles.image} src="./happy.jpg"/>
        <p className={styles.marginTop}>
          Our Donors are the heart of our community. And without them (and BadCo), Sharity could never succeed. Individual Donors can use sharity to list items they no longer need or have picked up with the intent to give to charity. Instead of having to do everything yourself, BadCo does the heavy lifiting by listing your items for a charity to claim and pickup directly from you! Sign up today to join BadCo on our mission to save the world.
        </p>
      </div>
      <div className={styles.container}>
        <h3>Charitiy Support</h3>
        <img className={styles.image} src="./charity.jpg"/>
        <p className={styles.marginTop}>
          BadCo seeks to support all charities around the world. By creating a Sharity account for your charity, you will be able to browse countless amazing items being donated by individuals in your area. When you find items your charity can benefit from, BadCo makes it easy to claim the item, communicate with the Donor, and make the pickup! Sign up today to join BadCo on our mission to save the world.
        </p>
      </div>
    </div>
  )
}

export default AboutUs;