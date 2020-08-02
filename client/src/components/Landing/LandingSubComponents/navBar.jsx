import React from 'react';
import styles from '../LandingSubComponents/navBar.css';
import Search from '../search.jsx';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Greeting from '../Greeting.jsx';

let profilePic;
//If theres an Image in local storage

const NavBar = ({ login, isLoggedIn, setSearchItems }) => {
  //Alert 
  const alertToLogIn = (event) => {
    event.preventDefault();
    alert('Please Log in to visit Profiles');
  }
  
  if (localStorage.length === 0 || JSON.parse(localStorage.user).profilePic === null || JSON.parse(localStorage.user).profilePic === undefined || JSON.parse(localStorage.user).profilePic === "" || !isLoggedIn) {
    profilePic = './userIcon.png';
  } else { //Make one
    profilePic = JSON.parse(localStorage.user).profilePic;
  }

  let log;
  if (isLoggedIn) {
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
        <div>
          {/* User's picture or default avatar */}
          {isLoggedIn ?
            <Link to={{ pathname: "/Charity" }} >
              <div className={styles.navBarUserProfileArea}>
                {/* User Profile Area */}
                <img className={styles.navBarUserImage} src={profilePic} alt="PLaceholder" />
              </div>
            </Link>
            : //If Someone is Not Logged in
            <div className={styles.navBarUserProfileArea} >
              {/* User Profile Area */}
              <img className={styles.navBarUserImage} onClick={(e) => alertToLogIn(e)} src="./userIcon.png" alt="Placeholder" />
            </div>
          }
          {/* Log in and Log out button */}
          <div className={styles.navBarLogin}>
            {log}
          </div>
        </div>
      </div>
    </div>
  )
};

export default NavBar;