import React, { Component } from 'react';
<<<<<<< HEAD
import '../styles/App.css';
import LandingPage from './Landing/landingPage.jsx'
=======
// import Charity from './Charity.jsx';
// import styles from '../styles/App.css';
import Login from './Landing/Login.jsx';

>>>>>>> modified login

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }
  render() {
    return (
      <>
        <div className={styles.charityMainAppContainer}>
          <Charity imageUploadHandler={this.imageUploadHandler}/>
        </div>
<<<<<<< HEAD
        
        <h1>Welcome to Blue Ocean!</h1>
        <LandingPage />
=======
        <h1>Welcome to Blue Ocean!</h1>
        <Login />
>>>>>>> modified login
      </>
    );
  }
}
