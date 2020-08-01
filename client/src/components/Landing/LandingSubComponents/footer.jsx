import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import styles from './footer.css';

let comp;



const Footer = ({ typeOfUser }) => {
  if (typeOfUser === null) {
    comp = <span className={styles.linkTags}>Sign in to go to Profile Page</span>
  } else if (typeOfUser === "donor") {
    comp = <Link to={{ pathname: "/Charity" }}>
      <span className={styles.linkTags}>Donor Profile page</span>
    </Link>
  } else if (typeOfUser === "charity") {
    comp = <Link to={{ pathname: "/Charity" }}>
      <span className={styles.linkTags}>Charity Profile page</span>
    </Link>
  }

  const handleExternalLink = (event,name)=>{
    event.preventDefault();
  }


  return (
    <div className={styles.footerContainer}>
      <div className={styles.leftSide}>
        {/* Info Area */}
        <a className={styles.aTags} href="https://www.hackreactor.com/campuses">Designed By HRATX49</a>
        <a className={styles.aTags} href="https://github.com/hratx-blue-ocean/HRATX49-Sharity">GitHub</a>
        <a className={styles.aTags} href="https://www.hackreactor.com/">HackReactor</a>
      </div>
      <div className={styles.center}>
        {/* Empty */}
        <div className={styles.imgArea}>
          <img className={styles.img} src="./sharity.png"></img>
        </div>
      </div>
      <div className={styles.rightSide}>
        {/* Links Area */}
        <Link to={{ pathname: "/" }}>
          <span className={styles.linkTags}>Home</span>
        </Link>
        {comp}
        <Link to={{ pathname: "/aboutUs" }}>
          <span className={styles.linkTags}>About Us</span>
        </Link>
      </div>
    </div>
  )
}


export default Footer;