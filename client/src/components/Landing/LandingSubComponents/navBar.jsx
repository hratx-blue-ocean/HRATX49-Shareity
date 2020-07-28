import React, { useState } from 'react';
import styles from '../LandingSubComponents/navBar.css'

function NavBar ({login, user}){
  return(
    <div>
      <div className={styles.navBarMainContainer}>
        <div className={styles.navBarLogin}>
          {/* Log in Log our btn area */}
          <button onClick={(event)=>login(event,"landingPageLoginBtn")} >Login</button>
        </div>
        <div className={styles.navBarLogo}>
          {/* Logo Area */}
          Logo
        </div>
        <div className={styles.navBarUserProfileArea}>
          {/* User Profile Area */}
          <img onClick={(event)=>user(event,"User")} src="#" alt="PLaceholder"/>
        </div>
      </div>
    </div>
  )
}

export default NavBar;