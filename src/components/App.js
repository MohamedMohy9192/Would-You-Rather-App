import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import QuestionResult from './QuestionResult';
import AnswerQuestion from './AnswerQuestion'
import NewQuestion from './NewQuestion';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
//<AnswerQuestion match={{params: {id: '6ni6ok3ym7mf1p33lnez'}}} />
  render() {
    const { loading } = this.props;

    return (
      <div>{loading === true ? null : (<NewQuestion/>)}</div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
