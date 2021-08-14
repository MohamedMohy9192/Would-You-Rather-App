import { _getUsers, _getQuestions } from '../utils/_DATA';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { DEFAULT_USER, setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

//Set a default user Id

const AUTHED_ID = DEFAULT_USER

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => {
        
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(setAuthedUser(AUTHED_ID));
        dispatch(hideLoading())
        
      }
    );
  };
}
