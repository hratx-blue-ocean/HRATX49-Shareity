import React, { Component } from 'react';
import '../styles/App.css';
import LandingPage from './Landing/landingPage.jsx'

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
<<<<<<< HEAD
        <div className={styles.charityMainAppContainer}>
          <Charity imageUploadHandler={this.imageUploadHandler}/>
        </div>
<<<<<<< HEAD
=======
=======
        {/* <div className={styles.charityMainAppContainer}> */}
          {/* <Charity /> */}
        {/* </div> */}
>>>>>>> V1.0.2
        
        <h1>Welcome to Blue Ocean!</h1>
        <LandingPage />
>>>>>>> V1.0.0
      </>
    );
  }
}
