import React, { Component } from 'react';
import axios from 'axios';
import styles from './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      user: {
        name: '',
        email: '',
        password: '',
        type: 'donor',
        location: ''
      },
      errMsg: '',
      emailError: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.switchToSignUpLogin = this.switchToSignUpLogin.bind(this);
  }

  handleChange(e, field) {
    let user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }
  //Handling Login
  async submitLogin(e) {
    try {
      e.preventDefault();
      if (!this.state.user.email || !this.state.user.password) {
        this.setState({ errMsg: 'missing fields' });
      } else {
        let login = await axios.post('/users/login', this.state.user);
        localStorage.setItem('token', login.data.token);
        localStorage.setItem('user', JSON.stringify(login.data.user));
        this.props.setTypeOfUser(login.data.user.type)
      }
      this.props.isLoggedIn(true),this.props.closeLogin()
    } catch (err) { console.log(err) };
  }

  //Handling Sign-Up
  async submitSignup(e) {
    try {
      e.preventDefault();
      let fields = ['name', 'email', 'password', 'type', 'location'];
      let error = fields.forEach(f => {
        if (this.state.user[f] === '') {
          this.setState({ errMsg: `missing ${f}` });
          return true;
        }
        else { return false };
      })
      if (!error) {
        let fetcher = await axios.post('/users/signup', this.state.user)
        let result = await fetcher.data;
        if (result.user === null) {
          this.setState({ emailError: 'email is already in use' });
        }
        else { 
          localStorage.setItem('token', result.token)
          localStorage.setItem('user', JSON.stringify(result.user));
          this.props.isLoggedIn(true), this.props.closeLogin(), this.props.setTypeOfUser(result.user.type)
        }
      }
    } catch (err) { console.log(err) };
  }
  //Toggling Signup and Login
  switchToSignUpLogin() {
    this.setState({
      login: !this.state.login
    })
  }

  render() {
    if (this.state.login) { 
      return (
        <div className={styles.overlay}>
          <div className={styles.cardDetail}>
            <p onClick={()=>this.props.closeLogin()} className={styles.closeBtn}>+</p>
            <div className="">
              <form onSubmit={this.submitLogin}>
                <div className="">
                  <label>Email</label>
                  <input type="email" onChange={(e) => this.handleChange(e, 'email')} required />
                </div>
                <div className="">
                  <label>Password</label>
                  <input type="password" onChange={(e) => this.handleChange(e, 'password')} required />
                </div>
                <button type="submit">Login</button>
              </form>
              <span style={{ color: "red" }}>{this.state.errMsg}</span>
              <span onClick={() => this.switchToSignUpLogin()}>
                Don't have an account? <span>Signup</span>
              </span>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.login) {
      return (
        <>
          <div className={styles.overlay}>
            <div className={styles.cardDetail}>
              <p onClick={()=>this.props.closeLogin()} className={styles.closeBtn}>+</p>
              <form onSubmit={this.submitSignup}>
                <div className="">
                  <label>Name</label>
                  <input type="text" value={this.state.user.name} onChange={(e) => this.handleChange(e, 'name')} required />
                </div>
                <div className="">
                  <label>Email</label>
                  <input type="email" value={this.state.user.email} onChange={(e) => this.handleChange(e, 'email')} required />
                  <span style={{ color: "red" }}>{this.state.emailError}</span>
                </div>
                <div className="">
                  <label>Password</label>
                  <input type="password" value={this.state.user.password} onChange={(e) => this.handleChange(e, 'password')} required />
                </div>
                <div className="">
                  <label>Type</label>
                  <select value={this.state.user.type} onChange={(e) => this.handleChange(e, 'type')} required>
                    <option value="charity">Charity</option>
                    <option value="donor">Donor</option>
                  </select>
                </div>
                <div className="">
                  <label>Location</label>
                  <input type="text" pattern="[0-9]" value={this.state.user.location} onChange={(e) => this.handleChange(e, 'location')} required />
                </div>
                <button type="submit">Sign up</button>
              </form>
              <span style={{ color: "red" }}>{this.state.errMsg}</span>
              <span onClick={() => this.switchToSignUpLogin()}>
                Already have an account? <span>Sign in</span>
              </span>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Login;