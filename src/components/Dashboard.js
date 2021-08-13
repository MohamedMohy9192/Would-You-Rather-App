import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
  render() {
    const { unAnsweredQuestionsIds, answeredQuestionsIds } = this.props;
    return (
      <div>
        <h1>Dashboard</h1>

        <h2>Unanswered Questions</h2>
        <ul>
          {unAnsweredQuestionsIds.map((questionId) => (
            <li key={questionId}> {<Question id={questionId}/>}</li>
          ))}
        </ul>
        <h2>Answered Questions</h2>
        <ul>
          {answeredQuestionsIds.map((questionId) => (
            <li key={questionId}>{<Question id={questionId}/>}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const currentUser = users[authedUser];
  const answeredQuestionsIds = Object.keys(currentUser.answers);
  const allQuestionsIds = Object.keys(questions);

  const unAnsweredQuestionsIds = allQuestionsIds.filter(
    (questionId) => !answeredQuestionsIds.includes(questionId)
  );

  return {
    unAnsweredQuestionsIds,
    answeredQuestionsIds,
  };
}

export default connect(mapStateToProps)(Dashboard);
