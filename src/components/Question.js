import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class Question extends Component {
  handleViewQuesiton = () => {
    //use react router to navigate to askQuestionComponent or QuestonResultComponent
    const { question, authedUser, history, id } = this.props;
    const { optionOne, optionTwo } = question;

    if (
      optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser)
    ) {
      //redirect to QuestonResultComponent
      console.log('User Already Answered The Question')
      history.push(`/question/${id}`)

    } else {
      //redirect to askQuestionComponent
      console.log('User Did Not Answer The Question Yet', id)
      history.push(`/question/question/${id}`)
      
      
    }
  };

  render() {
    const { question, author } = this.props;
    const { optionOne } = question;
    const { name, avatarURL } = author;

    return (
      <div style={{ height: '200px', width: '600px', border: 'solid' }}>
        <p>{`${name} Asks`}</p>
        <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar' />
        <div style={{ display: 'inline-block' }}>
          <div>Would You Rather?</div>
          <div>{optionOne.text}</div>
          <button onClick={this.handleViewQuesiton}>View Question</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const question = questions[id];
  const author = users[question.author];

  return {
    question,
    author,
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
