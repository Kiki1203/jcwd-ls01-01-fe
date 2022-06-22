let initialState = {
    loading: false, 
    error: false, 
    message: '',
    is_redirect: false,
    is_login: false,
    is_confirmed: 0
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOADING':
            return { ...state, loading: true, error: false, message: '' }
        case 'IS_CONFIRMED':
            return { ...state, is_confirmed: action.payload }
        default : return state
    }
}

export default userReducer