import React from "react";
import api from '../api';
import { Redirect } from "react-router-dom";


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      description: "",
      fbProfile: "",
      linkedInProfile: "",
      email: "",
      avatar: "",
      originalPassword: "",
    };
  }

  updateFirstName(event) {
    const { value } = event.target;
    this.setState({ firstName: value });
  }

  updateLastName(event) {
    const { value } = event.target;
    this.setState({ lastName: value });
  }

  updatePassword(event){
    const { value } = event.target;
    this.setState({ originalPassword: value });
  }

  updateEmail(event){
    const { value } = event.target;
    this.setState({ email: value });
  }

  updateDescription(event){
    const { value } = event.target;
    this.setState({ description: value });
  }

  updateDateOfBirth(event){
    const { value } = event.target;
    this.setState({ dateOfBirth: value });
  }

  updateFbProfile(event){
    const { value } = event.target;
    this.setState({ fbProfile: value });
  }

  updateLinkedInProfile(event){
    const { value } = event.target;
    this.setState({ linkedInProfile: value });
  }

  updateAvatar(event){
    const { value } = event.target;
    this.setState({ avatar: value });
  }

  handleSubmit(event) {
    event.preventDefault();
 
    api.post("/signup", this.state)
      .then(response => {
        console.log("Sign UP 🤠", response.data);
        
        const { onSignUp } = this.props;
        onSignUp(response.data.userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry! There was a problem. 💩");
      });
  }


  render() {
    const { currentUser } = this.props;
    const { firstName, lastName, dateOfBirth, description, fbProfile, linkedInProfile, email, avatar, originalPassword } = this.state;
    if (currentUser) {
      return <Redirect to="/" />
    }

    return (
      <section>
        <h2>Sign Up</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            First Name:
            <input value={firstName} type="text" placeholder="Type your first name"
                onChange={event => this.updateFirstName(event)} />
          </label>
          <br></br>
          <label>
            Last Name:
            <input value={lastName} type="text" placeholder="Type your last name"
                onChange={event => this.updateLastName(event)} />
          </label>
          <br></br>
          <label>
            Password:
            <input value={originalPassword} type="password" placeholder=""
                onChange={event => this.updatePassword(event)}/>
          </label>
          <br></br>
          <label>
            Email:
            <input value={email} type="email" placeholder="Type your email"
                onChange={event => this.updateEmail(event)} />
          </label>
          <br></br>
          <label>
            Description:
            <input value={description} type="text" placeholder="Write some lines"
                onChange={event => this.updateDescription(event)} />
          </label>
          <br></br>
          <label>
            Date Of Birth:
            <input value={dateOfBirth} type="date" placeholder=""
                onChange={event => this.updateDateOfBirth(event)} />
          </label>
          <br></br>
          <label>
            Facebook Profile URL (optional):
            <input value={fbProfile} type="text" placeholder="This will give more power to your profile"
                onChange={event => this.updateFbProfile(event)} />
          </label>
          <br></br>
          <label>
            LinkedIn Profile URL (optional):
            <input value={linkedInProfile} type="text" placeholder="This will give even more power to your profile"
                onChange={event => this.updateLinkedInProfile(event)} />
          </label>
          <br></br>
          <label>
            Avatar:
            <input value={avatar} type="text" placeholder="URL of your profile picture"
                onChange={event => this.updateAvatar(event)} />
          </label>
          <br></br>

          <button>Sign Up</button>
        </form>
      </section>
    );
  }
}

export default SignUp;