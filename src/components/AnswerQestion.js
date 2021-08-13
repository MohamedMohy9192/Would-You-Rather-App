import React, { Component } from 'react';
import { connect } from 'react-redux';

class AnswerQestion extends Component {
  state = {
    answer: '',
  };

  handleSumbit = (event) => {
    event.preventDefault();
   
  };

  handleChange = (event) => {
    console.log('sumbit value', event.target.value);

    const { value } = event.target;

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
              value={optionOne.text}
              onChange={this.handleChange}
            />
            <label>{optionOne.text}</label>
            <input
              type='radio'
              id='option-two'
              name='would-you-rather'
              value={optionTwo.text}
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
