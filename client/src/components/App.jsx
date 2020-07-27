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
        <div className={styles.charityMainAppContainer}>
          <Charity />
        </div>
      </>
    );
  }
}
