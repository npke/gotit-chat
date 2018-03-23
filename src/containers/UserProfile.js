import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Form, Checkbox, Image, Icon, Message } from "semantic-ui-react";
import Moment from "moment";
import AuthActions from '../actions/auth';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: this.props.gender || 'male',
      error: null
    };
  }

  saveProfile = () => {
    const name = this.nameInput.value;
    const birthday = this.birthdayInput.value;
    const gender = this.state.gender;

    if (!name) {
      return this.setState({
        error: new Error('Please fill out your name.')
      });
    }

    if (!birthday) {
      return this.setState({
        error: new Error('Please fill out your birthday.')
      });
    }
    
    const birthdayObj = Moment(birthday, 'DD/MM/YYYY');
    if (!birthdayObj.isValid()) {
      return this.setState({
        error:  new Error('Please enter your birthday in DD/MM/YYYY format.')
      });
    }

    this.setState({
      error: null
    });

    const { docRef, onSaveProfile } = this.props;
    return onSaveProfile(docRef, { name, birthday, gender, updatedInfo: true });
  }

  render() {
    const { isUpdatingProfile } = this.props;
    return (
      <Modal size="tiny" open={true}>
      <Modal.Header>Confirm your profile</Modal.Header>
      <Modal.Content>
        <Image style={{ margin: "auto", marginBottom: "15px" }} src={this.props.profilePhotoUrl} size="small" circular />
        <Form>
          <Form.Field>
            <label>Email</label>
            <input disabled value={this.props.email} placeholder="kenguyen@gmail.vn" />
          </Form.Field>
          <Form.Field>
            <label>Name</label>
            <input disabled={isUpdatingProfile} ref={input => { this.nameInput = input }} defaultValue={this.props.name} placeholder="Nguyễn Phú Kế" />
          </Form.Field>
          <Form.Field>
            <label>Birthday</label>
            <input disabled={isUpdatingProfile} ref={input => { this.birthdayInput = input}} defaultValue={this.props.birthday} placeholder="13/11/1995 - DD/MM/YYYY format" />
          </Form.Field>
  
          <Form.Field>
            <label>Gender</label>
            <Checkbox disabled={isUpdatingProfile} style={{ width: "33%"}}
              radio
              value="male"
              checked={this.state.gender === "male"}
              label="Male"
              onClick={() => { this.setState({ gender: 'male' })}}
              />
            <Checkbox disabled={isUpdatingProfile} style={{ width: "33%"}}
              radio
              value="female"
              checked={this.state.gender === "female"}
              label="Female"
              onClick={() => { this.setState({ gender: 'female' })}}
              />
  
            <Checkbox disabled={isUpdatingProfile} style={{ width: "33%"}}
              radio
              value="other"
              checked={this.state.gender === "other"}
              label="Other"
              onClick={() => { this.setState({ gender: 'other' })}}
              />
          </Form.Field>
        </Form>

        { this.state.error && <Message color='red'>{this.state.error.message}</Message>}
      </Modal.Content>
  
      <Modal.Actions>
        <Button loading={isUpdatingProfile} onClick={this.saveProfile} primary>
          Start <Icon name="right chevron" />
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = ({ auth }) => Object.assign({ isUpdatingProfile: auth.isUpdatingProfile }, auth.user);
const mapDispatchToProps = (dispatch) => ({
  onSaveProfile: (userRef, profile) => dispatch(AuthActions.updateProfile(userRef, profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
