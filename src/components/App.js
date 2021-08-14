import 'semantic-ui-css/semantic.min.css'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route} from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import NotFound from './NotFound'
import Dashboard from './Dashboard';
import QuestionResult from './QuestionResult';
import AnswerQuestion from './AnswerQuestion';
import NewQuestion from './NewQuestion';
import Login from './Login'
import Nav from './Nav';
import { DEFAULT_USER } from '../actions/authedUser';
import Leaderboard from './Leaderboard';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
 
  render() {
    const { loading, authedUser } = this.props;

    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          {loading === true ? null : (
            <div>
              <Nav />
              {authedUser === DEFAULT_USER ? <Login/> : (
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
                  <Route path='/Leaderboard' component={Leaderboard} />
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
