import { csrfFetch } from "./csrf";

//type session
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

//action creator
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};


const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//thunk action creator
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;

  // if(response.ok) {
  //   const logIn = await response.json();
  //   dispatch(setUser(logIn));
  //   return logIn;
  // } else {
  //   const errors = await response.json();
  //   console.log("errors in session login thunk: ", errors)
  //   return errors
  // }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


//REDUCER
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;