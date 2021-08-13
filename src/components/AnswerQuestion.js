import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestionAnswer } from '../actions/questions';

class AnswerQestion extends Component {
  state = {
    answer: '',
  };

  handleSumbit = (event) => {
    event.preventDefault();

    //redirect to QuestionResultComponent Passing the qid to display
  };

  handleChange = (event) => {
    console.log('sumbit value', event.target.value);

    const { value } = event.target;

    const { dispatch, authedUser, question } = this.props;
    //{ authedUser, qid, answer }
    dispatch(handleSaveQuestionAnswer({ authedUser, qid: question.id, answer:value }));

    this.setState(() => ({
      value,
    }));
  };
  render() {
    const { question, author, authedUser } = this.props;
    const { optionOne, optionTwo } = question;
    const { name, avatarURL } = author;

    return (
      <div style={{ height: '200px', width: '600px', border: 'solid' }}>
        <p>{`${name} Asks`}</p>
        <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar' />
        <div style={{ display: 'inline-block' }}>
          <form onSubmit={this.handleSumbit}>
            <div>Would You Rather?</div>
            <input
              type='radio'
              id='option-one'
              name='would-you-rather'
              value='optionOne'
              onChange={this.handleChange}
            />
            <label>{optionOne.text}</label>
            <input
              type='radio'
              id='option-two'
              name='would-you-rather'
              value='optionTwo'
              onChange={this.handleChange}
            />
            <label>{optionTwo.text}</label>
            <button type='submit'>Submit</button>
          </form>
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

export default connect(mapStateToProps)(AnswerQestion);
