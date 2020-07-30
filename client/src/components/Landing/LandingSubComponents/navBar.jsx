import React, { useState } from 'react';
import styles from '../LandingSubComponents/navBar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Greeting from '../Greeting.jsx';

function NavBar ({login, user}){
  return(
    <div>
      <div className={styles.navBarMainContainer}>
        <div className={styles.navBarLogin}>
          {/* Log in Log our btn area */}
        <button onClick={(event)=>login(event)}>{localStorage.getItem("token") ? 'Log out': "Login" }</button>
        </div>
        <div className={styles.navBarLogo}>
          {/* Logo Area */}
        <Greeting/>
        </div>

      <Link to={{pathname:"/Charity"}}>
        <div className={styles.navBarUserProfileArea}>
          {/* User Profile Area */}
          <img onClick={(event)=>user(event,"User")} src="#" alt="PLaceholder"/>
        </div>
      </Link>
      </div>
    </div>
  )
}

export default NavBar;