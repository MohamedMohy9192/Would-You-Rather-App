import { _saveQuestionAnswer } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

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

    return _saveQuestionAnswer(info).catch(() => {
      console.warn('Error in handleToggleTweet: ', e);
      // unsave the answer if the reqest to the backend is failed
      dispatch(saveQuestionAnswer(info));

      alert('The was an error answering the question. Try again.');
    });
  };
}
