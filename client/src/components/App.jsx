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
        <div className={styles.charityMainAppContainer}>
          <Charity />
        </div>
        
        <h1>Welcome to Blue Ocean!</h1>
        <LandingPage />
      </>
    );
  }
}
