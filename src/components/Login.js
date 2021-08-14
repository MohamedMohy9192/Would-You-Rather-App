import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {


  handleSubmit = (event) => {
    event.preventDefault();

    const {dispatch} = this.props
    const  authedUser = event.target.users.value


    dispatch(setAuthedUser(authedUser))

    console.log('Sign in User', authedUser);

  };

  // get the users map over them  after select on of them
  // Dispatch SetAuthuser action with the selected user in onsumbit

  render() {
    const { usersData } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign In</h1>
          <label>Select User</label>
          <select name='users'>
            {usersData.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type='submit'>Sign In</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const usersData = Object.values(users);

  return {
    usersData,
  };
}

export default connect(mapStateToProps)(Login);
