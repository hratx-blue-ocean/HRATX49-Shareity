import React, { Component } from 'react';
<<<<<<< HEAD
import Charity from './Charity.jsx';
import styles from '../styles/App.css';

=======
import styles from '../styles/App.css';
>>>>>>> Implementing login fucnctionality, break to help

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
=======
        <h1 className={styles.AppHeader}>Welcome to Blue Ocean!</h1>
>>>>>>> Implementing login fucnctionality, break to help
      </>
    );
  }
}
