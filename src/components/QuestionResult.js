import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionResult extends Component {
  render() {
    const { question, author, authedUser } = this.props;
    const { optionOne, optionTwo } = question;
    const { name, avatarURL } = author;

    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    return (
      <div style={{ height: '200px', width: '600px', border: 'solid' }}>
        <p>{`Asked by ${name} `}</p>
        <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar' />
        <div style={{ display: 'inline-block' }}>
          <div>Result</div>
          <div>
            <div>
              {optionOne.votes.includes(authedUser)
                ? `${optionOne.text} ***`
                : optionOne.text}
            </div>
            <span>{`${optionOne.votes.length} out of ${totalVotes}`}</span>
            <span style={{ marginLeft: '10px' }}>{`${
              (optionOne.votes.length / totalVotes) * 100
            } %`}</span>
          </div>
          <div>
            <div>
              {optionTwo.votes.includes(authedUser)
                ? `${optionTwo.text} ***`
                : optionTwo.text}
            </div>
            <span>{`${optionTwo.votes.length} out of ${totalVotes}`}</span>
            <span style={{ marginLeft: '10px' }}>{`${
              (optionTwo.votes.length / totalVotes) * 100
            } %`}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const author = users[question.author];

  return {
    question,
    author,
    authedUser,
  };
}

export default connect(mapStateToProps)(QuestionResult);
