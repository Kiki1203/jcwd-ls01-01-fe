import Axios from 'axios';
import API_URL from '../../Helpers/API_URL';

export const onCheckUserVerify = (token) => {
    return(dispatch) => {
        Axios.post(`${API_URL}/user/checkuserverify`, {}, {headers: {
            'Authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            dispatch(
                {
                    type: 'IS_CONFIRMED',
                    payload: res.data.is_confirmed
                }
            )
        })
        .catch((err) => {
            console.log(err)
        })
    }
}