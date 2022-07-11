import Axios from 'axios';
import API_URL from '../../Helpers/API_URL';

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

