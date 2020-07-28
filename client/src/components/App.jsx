import React, { Component } from 'react';
import Charity from './Charity.jsx';
import styles from '../styles/App.css';


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
      </>
    );
  }
}
