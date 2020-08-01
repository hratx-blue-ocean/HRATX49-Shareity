import React, { useState } from 'react';
import styles from '../LandingSubComponents/navBar.css';
import Search from '../search.jsx';
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

const NavBar = ({ login, isLoggedIn, setSearchItems }) => {
  //Alert 
  const alertToLogIn = (event) => {
    event.preventDefault();
    alert('Please Log in to visit Profiles')
  }

let log;
  if (isLoggedIn){
    log = <i className="fas fa-sign-out-alt" onClick={(event) => login(event)}></i>
  } else {
    log = <i className="fas fa-sign-in-alt" onClick={(event) => login(event)}></i>
  }

  return (
    <div>
      <div className={styles.navBarMainContainer}>
        <div className={styles.navBarLogin}>
          {/* Log in || Log out btn */}
        {log}
        </div>
        <div className={styles.navBarLogo}>
          {/* Logo Area */}
          <Greeting />
        </div>
        <div>
          <Search setSearchItems={setSearchItems}/>
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