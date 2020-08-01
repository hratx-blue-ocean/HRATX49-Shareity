import React, { useState } from 'react';
import styles from '../LandingSubComponents/navBar.css';
import Search from '../search.jsx';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Greeting from '../Greeting.jsx';


//If theres an Image in local storage
let profilePic;
let user = JSON.parse(localStorage.user);
if (!user) {
  profilePic = './userIcon.png';
} else { //Make one
  profilePic = JSON.parse(localStorage.user).profilePic;
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
        {/* Logo Area */}
        <div className={styles.navBarLogo}>
          <Greeting />
        </div>
        <Search setSearchItems={setSearchItems}/>
        <div className={styles.navBarLogin}>
          {/* Log in || Log out btn */}
        {log}
        </div>
        
        <div>
          
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