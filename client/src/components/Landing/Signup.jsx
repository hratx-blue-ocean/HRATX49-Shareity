import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
      this.state = {
        user: {
          name: '',
          email: '',
          password: '',
          type: ''
        },
        errMsg: '',
        emailError: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.submitSignup = this.submitSignup.bind(this);
  }

  handleChange(e, field) {
      let user = this.state.user;
      user[field] = e.target.value;
      this.setState({ user });
    }

  async submitSignup(e) {
    try {
      e.preventDefault();
      let fields = ['name', 'email', 'password', 'type'];
      let error = fields.forEach(f => {
        if (this.state.user[f] === '') {
            this.setState({ errMsg: `missing ${f}` });
            return true;
        }
        else { return false};
      })
      if (!error) {
        let fetcher = await axios.post('/users/signup', this.state.user)
        let result = await fetcher.data;
        if (result.user === null) {
          this.setState({ emailError: 'email is already in use'  });
        }
      }
    } catch (err) { console.log(err)};
  }

  render() { 
    return (
      <>
        <div className="">
          <div className="">
            <form onSubmit={this.submitSignup}>
            <div className="">
                <label>Name</label>
                <input type="text" value={this.state.user.name} onChange={(e) => this.handleChange(e, 'name')} />
              </div>
              <div className="">
                <label>Email</label>
                <input type="email" value={this.state.user.email} onChange={(e) => this.handleChange(e, 'email')} />
                <span style={{color:"red"}}>{this.state.emailError}</span>
              </div>
              <div className="">
                <label>Password</label>
                <input type="password" value={this.state.user.password} onChange={(e) => this.handleChange(e, 'password')} />
              </div>
              <div className="">
                <label>Type</label>
                <select type="password" value={this.state.user.type} onChange={(e) => this.handleChange(e, 'type')}>
                  <option value="charity">Charity</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button type="submit">Login</button>
            </form>
            <span style={{color:"red"}}>{this.state.errMsg}</span>
            <p>
              Already have an account? <a>Sign in</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}
 
export default Signup;