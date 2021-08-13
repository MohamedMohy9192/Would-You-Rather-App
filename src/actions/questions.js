import { _saveQuestionAnswer, _saveQuestion, _getUsers } from '../utils/_DATA';
import { receiveUsers } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function saveQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(info) {
  return (dispatch) => {
    dispatch(saveQuestionAnswer(info));

    return _saveQuestionAnswer(info)
      .then(() => {
        //Get the updated user answers after the authed user has answered a question
        _getUsers().then((users) => {
          dispatch(receiveUsers(users));
        });
      })
      .catch((e) => {
        console.warn('Error in handleToggleTweet: ', e);
        // unsave the answer if the reqest to the backend is failed
        dispatch(saveQuestionAnswer(info));

        alert('The was an error answering the question. Try again.');
      });
  };
}
//{ optionOneText, optionTwoText, author }
function saveNewQuesiton(question) {
  return {
    type: ADD_NEW_QUESTION,
    question,
  };
}

export function handleSaveNewQuestion(question) {
  return (dispatch) => {
    return _saveQuestion(question).then((returnedQuestion) => {
      dispatch(saveNewQuesiton(returnedQuestion));
    });
  };
}
