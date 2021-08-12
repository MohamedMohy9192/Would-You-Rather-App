import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import QuestionResult from './QuestionResult';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;

    return (
      <div>{loading === true ? null : (<QuestionResult match={{params: {id: 'xj352vofupe1dqz9emx13r'}}} />)}</div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
