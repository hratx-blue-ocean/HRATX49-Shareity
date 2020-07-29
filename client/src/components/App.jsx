import React, { Component } from 'react';
import LandingPage from './Landing/landingPage.jsx'
import Charity from '../components/Charity/Charity.jsx';
import AddItem from './Modals/AddItem.jsx'
import styles from '../styles/App.css';
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
          <Charity />
        </div>
        </Route>
        <Route path="/">

        <h1>Welcome to Blue Ocean!</h1>
        <LandingPage />
        </Route>
        <AddItem />
        <h1>Welcome to Blue Ocean!</h1>
        </Switch>
        </Router>
      </>
    );
  }
}