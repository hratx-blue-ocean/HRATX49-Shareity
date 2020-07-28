import React, { Component } from 'react';
import axios from 'axios';
import runtime from 'regenerator-runtime';

class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
        user: {
          email: '',
          password: ''
        },
        errMsg: ''
      } 
      this.handleChange = this.handleChange.bind(this);
      this.submitLogin = this.submitLogin.bind(this);
  }
    handleChange(e, field) {
      let user = this.state.user;
      user[field] = e.target.value;
      this.setState({ user });
    }

    async submitLogin(e) {
      try {
        e.preventDefault();
        if (!this.state.user.email || !this.state.user.password) {
          this.setState({ errMsg: 'missing fields' });
        } else {
          let login = await axios.post('/users/login', this.state.user)
          console.log('result:', login)
        }
      } catch (err) { console.log(err)};
    }
  render() {
    return (
      <>
        <div className="">
          <div className="">
            <form onSubmit={this.submitLogin}>
              <div className="">
                <label>Email</label>
                <input type="email" onChange={(e) => this.handleChange(e, 'email')} />
              </div>
              <div className="">
                <label>Password</label>
                <input type="password" onChange={(e) => this.handleChange(e, 'password')} />
              </div>
              <button type="submit">Login</button>
            </form>
            <span style={{color:"red"}}>{this.state.errMsg}</span>
            <p>
              Don't have an account? <a>Signup</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}
 
export default Login;