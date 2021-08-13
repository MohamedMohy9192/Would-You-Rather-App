import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveNewQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toDashboad: false,
  };

  handleChangeOptionOne = (event) => {
    this.setState(() => ({
      optionOne: event.target.value,
    }));
  };

  handleChangeOptionTwo = (event) => {
    this.setState(() => ({
      optionTwo: event.target.value,
    }));
  };
  handleSubmit = (event) => {
    event.preventDefault();

    console.log('authedUser', this.props.authedUser);

    const { optionOne, optionTwo } = this.state;
    const { dispatch, authedUser } = this.props;
    if (optionOne !== '' && optionTwo !== '') {
      dispatch(
        handleSaveNewQuestion({
          optionOneText: optionOne,
          optionTwoText: optionTwo,
          author: authedUser,
        })
      );

      this.setState(() => ({
        optionOne: '',
        optionTwo: '',
        toDashboad: true,
      }));

      //todo redirect to dashboard
    }
  };
  render() {
    const { optionOne, optionTwo, toDashboad } = this.state;
    if (toDashboad === true) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h1>Create New Question</h1>
        <h2>Complete The Question</h2>

        <p>Would You Rather..</p>
        <form onSubmit={this.handleSubmit}>
          <textarea
            style={{ width: '250px', height: '50px' }}
            placeholder='Enter Option One Text Here'
            onChange={this.handleChangeOptionOne}
            value={optionOne}
          />

          <p>OR</p>

          <textarea
            style={{ width: '250px', height: '50px' }}
            placeholder='Enter Option Two Text Here'
            onChange={this.handleChangeOptionTwo}
            value={optionTwo}
          />

          <button style={{ display: 'block' }} type='submit'>
            Submit New Question
          </button>
        </form>
      </div>
    );
  }
}

export default connect(({ authedUser }) => ({ authedUser }))(NewQuestion);
