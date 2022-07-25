let initialState = {
  loading: false,
  error: false,
  message: '',
  is_redirect: false,
  is_login: false,
  isConfirmed: 0,
  token: '',
  id: '',
  authChecked: false,
};

 const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: false, message: '' };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload.error, message: action.payload.message };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false,  authChecked: true, error: action.payload.error, 
        message: action.payload.message, 
        id: action.payload.id, is_redirect: true, is_login: true };
    case 'ISLOGIN_TRUE':
      return { ...state, is_login: true };
    case 'ISLOGIN_FALSE':
      return { ...state, is_login: false };
    case 'IS_CONFIRMED':
      return { ...state, isConfirmed: action.payload };
    case 'GET_USER_DATA':
      return { ...state, id: action.payload.id, isConfirmed: action.payload.isConfirmed };
    case 'USER_LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default userReducer
