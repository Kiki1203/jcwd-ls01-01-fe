import Axios from 'axios';
import API_URL from '../../Helpers/API_URL';


export const onAdminLogin = (data) => {
  
  return(dispatch) => {
      dispatch({
          type: 'LOADING'
      })
      Axios.post(API_URL + '/admin/loginadmin', {usernameOrEmail: data.usernameOrEmail, password: data.password})
      .then((res) => {
        console.log(res.data.token)
          if(res.data.error === true){
              dispatch(
                  {
                      type: 'LOGIN_ERROR',
                      payload: res.data
                  }
              )
          }else if(res.data.error === false){
            
            console.log(res.data.token)
              localStorage.setItem('myTkn', res.data.token)
              dispatch(
                  {
                      type: 'LOGIN_SUCCESS',
                      payload: { error: res.data.error, message: res.data.message }
                  }
              )
          }
      })
      .catch((err) => {
          dispatch(
              {
                  type: 'LOGIN_ERROR',
                  payload: err.response.data.message
              }
          )
      })
  }
}

export const onCheckAdminLogin = () => {
  return (dispatch) => {
    let token = localStorage.getItem('myTkn');

    if (token) {
      dispatch({
        type: 'ISLOGIN_TRUE',
        payload: true,
      });
    } else {
      dispatch({
        type: 'ISLOGIN_FALSE',
        payload: false,
      });
    }
  };
};

