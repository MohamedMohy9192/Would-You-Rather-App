import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { DEFAULT_USER, setAuthedUser } from '../actions/authedUser';

class Nav extends Component {
  handleLogout = () => {
    this.props.dispatch(setAuthedUser(DEFAULT_USER));
  };

  render() {
    const { loggedUser } = this.props;

    return (
      <div>
        <nav style={{ display: 'inline-block' }}>
          <ul>
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to='/new' activeClassName='active'>
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/Leaderboard' activeClassName='active'>
                Leaderboard
              </NavLink>
            </li>
          </ul>
        </nav>

        {loggedUser === null ? null : (
          <div style={{ float: 'right', display: 'inline-block' }}>
            <img
              src={loggedUser.avatarURL}
              alt={`Avatar of ${loggedUser.name}`}
              className='avatar'
            />
            <p>Hello {loggedUser.name}</p>
            <button type='button' onClick={this.handleLogout}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const loggedUser = authedUser === DEFAULT_USER ? null : users[authedUser];

  return {
    loggedUser,
    
  };
}
export default connect(mapStateToProps)(Nav);
