import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';

import Dashboard from './Dashboard';
import QuestionResult from './QuestionResult';
import AnswerQuestion from './AnswerQuestion';
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
      <BrowserRouter>
        <Fragment>
          <div>
            {loading === true ? null : (
              <div>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/question/:id' component={QuestionResult} />
                <Route exact path='/question/question/:id' component={AnswerQuestion} />
              </div>
            )}
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
