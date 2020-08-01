import React, { Fragment, Component } from 'react';
import Talk from 'talkjs';
import Nav from '../Landing/LandingSubComponents/navBar';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.inbox = undefined;
        this.state = {
          currentUser: {}
        }
    }

  async componentDidMount() {
    try {
      let info = localStorage.getItem('user');
      let user = JSON.parse(info);
      let currentUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.type,
        photoUrl: user.profilePic
      }
      this.setState({ currentUser });
      Talk.ready
        const me = new Talk.User(this.state.currentUser);

      if (!window.talkSession) {
        window.talkSession = new Talk.Session({
          appId: "tk7DG9uO",
          me: me
        })
      }

        this.inbox = window.talkSession.createInbox();
        this.inbox.mount(this.container);
    } catch(e) { console.error(e) };
  };

    render() {
      return (
      <>
        <Nav />
        <Fragment>
            <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>Loading...</div>
        </Fragment>
      </>
      )
    }
};
 
export default Chat;