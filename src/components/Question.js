import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  handleViewQuesiton = () => {
    //use react router to navigate to askQuestionComponent or QuestonResultComponent
    const { question, authedUser } = this.props;
    const { optionOne, optionTwo } = question;

    if (
      optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser)
    ) {
      //redirect to QuestonResultComponent
      console.log('User Already Answered The Question')
    } else {
      //redirect to askQuestionComponent
      console.log('User Did Not Answer The Question Yet')
      
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

export default connect(mapStateToProps)(Question);
