// AuthReducer.js
const initialState = {
  data: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        data: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        data: null,

      };
    default:
      return state;
  }
};

export default AuthReducer;