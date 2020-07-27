import React, { Component } from 'react';
import Charity from './Charity.jsx';
import '../styles/App.css';
import '../styles/Charity.css';

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
        <h1>Welcome to Blue Ocean!</h1>
        <Charity />
      </>
    );
  }
}
