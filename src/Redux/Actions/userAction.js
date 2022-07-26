import Axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from '../../Helpers/API_URL';


export const onCheckUserLogin = () => {
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

export const onCheckUserVerify = (token) => {
  return (dispatch) => {
    Axios.get(
      `${API_URL}/user/checkuserverify`,
      {
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        dispatch({
          type: 'IS_CONFIRMED',
          payload: res.data.verified
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUserData = (id, isConfirmed) => {
  return (dispatch) => {
  dispatch({
    type: 'GET_USER_DATA',
    payload: {
      id: id,
      isConfirmed: isConfirmed
    }
  })}
}

export const onUserLogout = () => {
  localStorage.removeItem('myTkn');
  return {
    type: 'USER_LOGOUT',
  };
};
