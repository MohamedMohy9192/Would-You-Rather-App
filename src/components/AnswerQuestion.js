import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestionAnswer } from '../actions/questions';
import { withRouter } from 'react-router-dom';

class AnswerQestion extends Component {
  state = {
    answer: '',
  };

  handleSumbit = (event) => {
    event.preventDefault();

    const {history, id } = this.props;

    console.log('AnswerQestion', id)
    //redirect to QuestionResultComponent Passing the qid to display
    history.push(`/question/${id}`);
  };

  handleChange = (event) => {
    console.log('sumbit value', event.target.value);

    const { value } = event.target;

    const { dispatch, authedUser, question } = this.props;
    //{ authedUser, qid, answer }
    dispatch(
      handleSaveQuestionAnswer({ authedUser, qid: question.id, answer: value })
    );

    //fight out a way to update user answer's object inside users state slince in store
    // to update the answered quesitons list
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

  console.log('id', id)
  const question = questions[id];
  const author = users[question.author];

  return {
    question,
    author,
    authedUser,
    id
  };
}

export default withRouter(connect(mapStateToProps)(AnswerQestion));
