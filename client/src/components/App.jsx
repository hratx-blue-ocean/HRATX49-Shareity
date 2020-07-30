import React, { Component } from 'react';
import LandingPage from './Landing/landingPage.jsx'
import Charity from '../components/Charity/Charity.jsx';
import AddItem from './Modals/AddItem.jsx'
import styles from '../styles/App.css';
<<<<<<< HEAD
import Login from './Landing/Login.jsx';
=======
>>>>>>> 1f447370cdcc7f36633c9533e95ad629ec4382e1
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
<<<<<<< HEAD
        <Router>
          <Switch>
            <Route path="/Charity">
          <div className={styles.charityMainAppContainer}>
            <Charity />
          </div>
          </Route>
          <Route path="/">
          <LandingPage />
          <AddItem />
          <h1>Welcome to Blue Ocean!</h1>
          {/* <Login /> */}
          </Route>
          </Switch>
=======
      <Router>
        <Switch>
          <Route path="/Charity">
        <div className={styles.charityMainAppContainer}>
          <Charity />
        </div>
        </Route>
        <Route path="/">
        <LandingPage />
        </Route>
        <AddItem />
        <h1>Welcome to Blue Ocean!</h1>
        </Switch>
>>>>>>> 1f447370cdcc7f36633c9533e95ad629ec4382e1
        </Router>
      </>
    );
  }
}

