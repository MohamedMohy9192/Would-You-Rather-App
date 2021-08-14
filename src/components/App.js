import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import NotFound from './NotFound'
import Dashboard from './Dashboard';
import QuestionResult from './QuestionResult';
import AnswerQuestion from './AnswerQuestion';
import NewQuestion from './NewQuestion';
import Login from './Login'
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
  //<AnswerQuestion match={{params: {id: '6ni6ok3ym7mf1p33lnez'}}} />
  render() {
    const { loading, authedUser } = this.props;

    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          {loading === true ? null : (
            <div>
              <Nav />
              {authedUser === 'Logout' ? <Login/> : (
                <div>
                  <Route exact path='/' component={Dashboard} />
                  <Route
                    exact
                    path='/question/:id'
                    component={QuestionResult}
                  />
                  <Route
                    exact
                    path='/question/question/:id'
                    component={AnswerQuestion}
                  />
                  <Route path='/new' component={NewQuestion} />
                  <Route path='/NotFound' component={NotFound} />
                </div>
              )}
            </div>
          )}
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
