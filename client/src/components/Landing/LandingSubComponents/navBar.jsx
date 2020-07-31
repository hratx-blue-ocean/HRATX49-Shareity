import React, { useState } from 'react';
import styles from '../LandingSubComponents/navBar.css';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Greeting from '../Greeting.jsx';


//If theres an Image in local storage
if (localStorage.length === 0 || JSON.parse(localStorage.user).profilePic === null || JSON.parse(localStorage.user).profilePic === undefined || JSON.parse(localStorage.user).profilePic === "") {
  var profilePic = './userIcon.png';
} else { //Make one
  var profilePic = JSON.parse(localStorage.user).profilePic;
}

const NavBar = ({ login, isLoggedIn }) => {
  //Alert 
  const alertToLogIn = (event) => {
    event.preventDefault();
    alert('Please Log in to visit Profiles')
  }



  return (
    <div>
      <div className={styles.navBarMainContainer}>
        <div className={styles.navBarLogin}>
          {/* Log in || Log out btn */}
          <button className={styles.logBtn} onClick={(event) => login(event)}>{localStorage.getItem("token") ? 'Log out' : "Login"}</button>
        </div>
        <i className="fas fa-sign-in-alt"></i>
        <div className={styles.navBarLogo}>
          {/* Logo Area */}
          <Greeting />
        </div>
        {/* If Someone IS Logged In */}
        {isLoggedIn ?
          <Link to={{ pathname: "/Charity" }}>
            <div className={styles.navBarUserProfileArea}>
              {/* User Profile Area */}
              <img className={styles.navBarUserImage} src={profilePic} alt="PLaceholder" />
            </div>
          </Link>
          : //If Someone is Not Logged in
          <div className={styles.navBarUserProfileArea}>
            {/* User Profile Area */}
            <img className={styles.navBarUserImage} onClick={(e) => alertToLogIn(e)} src="./userIcon.png" alt="PLaceholder" />
          </div>
        }
      </div>
    </div>
  )
};

export default NavBar;