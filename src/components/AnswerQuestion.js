import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestionAnswer } from '../actions/questions';
import { withRouter, Redirect } from 'react-router-dom';

class AnswerQestion extends Component {
  state = {
    answer: '',
  };

  handleSumbit = (event) => {
    event.preventDefault();

   
    const { dispatch, authedUser, question ,history, id } = this.props;

    const { answer } = this.state;

    if (answer !== '') {
      //{ authedUser, qid, answer }
      dispatch(
        handleSaveQuestionAnswer({ authedUser, qid: question.id, answer })
      );

      console.log('AnswerQestion', id);
      this.setState(()=>({
        answer: ''
      }))
      //redirect to QuestionResultComponent Passing the qid to display
      history.push(`/question/${id}`);
    }
  };

  handleChange = (event) => {
    console.log('sumbit value', event.target.value);

    const { value } = event.target;

    //fight out a way to update user answer's object inside users state slince in store
    // to update the answered quesitons list
    this.setState(() => ({
      answer: value,
    }));
  };
  render() {
    const { question, author, authedUser } = this.props;

    if (question === null) {
      return <Redirect to='/NotFound'></Redirect>;
    }
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

  const question = questions[id] ? questions[id] : null;
  console.log('question', question);
  const author = question ? users[question.author] : null;

  return {
    question,
    author,
    authedUser,
    id,
  };
}

export default withRouter(connect(mapStateToProps)(AnswerQestion));
