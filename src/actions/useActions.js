import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

const saveToLocalStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    const localUsers = localStorage.getItem('users');
    if (localUsers) {
      dispatch({ type: FETCH_USERS_SUCCESS, payload: JSON.parse(localUsers) });
    } else {
      axios.get(apiUrl)
        .then(response => {
          dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
        })
        .catch(error => {
          dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
        });
    }
  };
};

export const addUser = (user) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_USER, payload: user });
    const { users } = getState().users;
    saveToLocalStorage(users);
  };
};

export const editUser = (user) => {
  return (dispatch, getState) => {
    dispatch({ type: EDIT_USER, payload: user });
    const { users } = getState().users;
    saveToLocalStorage(users);
  };
};

export const deleteUser = (userId) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_USER, payload: userId });
    const { users } = getState().users;
    saveToLocalStorage(users);
  };
};
