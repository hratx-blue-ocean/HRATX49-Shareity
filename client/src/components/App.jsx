import React, { Component } from 'react';
// import '../styles/App.css';
import LandingPage from './Landing/landingPage.jsx'
import Charity from './Charity.jsx';
// import styles from '../styles/App.css';
import styles from '../styles/App.css';
import Login from './Landing/Login.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
      <Router>
        <Switch>
          <Route path="/Charity">
        <div className={styles.charityMainAppContainer}>
          <Charity imageUploadHandler={this.imageUploadHandler}/>
        </div>
        </Route>
        <Route path="/">
        <LandingPage />
        </Route>
        </Switch>
        </Router>
      </>
    );
  }
}
