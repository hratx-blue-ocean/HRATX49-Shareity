import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


const AboutUs = () =>{
  return (
    <div>
      <div>
        <Link to={{pathname:"/"}}>
        <button>Home</button>
        </Link>
      </div>
      About Us
    </div>
  )
}

export default AboutUs;