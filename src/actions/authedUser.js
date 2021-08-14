export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const DEFAULT_USER = 'LOG_OUT'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}
