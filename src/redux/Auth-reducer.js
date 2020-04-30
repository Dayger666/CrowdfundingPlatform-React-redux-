import {
    authAPI,
    userAPI
} from "../api/api";

const SET_IS_REGISTER = 'SET-IS-REGISTER';
const SET_USER_DATA = 'SET-USER-DATA';
const SET_IS_AUTH = 'SET-IS-AUTH';

let initialState = {
    isRegister: false,
    isAuth: false,
    email: null,
    userName: null,
    _id: null,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_REGISTER:
            return {
                ...state,
                isRegister: action.data,
            };
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.data,
            };
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }

};
export let setUserData = (email, userName, id) => {
    return {
        type: SET_USER_DATA,
        data: {
            email,
            userName,
            id,
        }
    }
};
export let setIsRegister = (isRegister) => {
    return {
        type: SET_IS_REGISTER,
        data: {
            isRegister,
        }
    }
};
export let setIsAuth = (isAuth) => {
    return {
        type: SET_IS_AUTH,
        data: {
            isAuth,
        }
    }
};

export let setUserDataThunkCreator = () => {
    return (dispatch) => {
        return authAPI.authMe().then((res) => {
            if (res.resultCode === 0) {
                dispatch(setUserData(res.data.id, res.data.email, res.data.login, true));
            }
        })
    }
};
export let registerThunkCreator = (username, email, password) => {
    return (dispatch) => {
        authAPI.register(username, email, password).then((res) => {
            dispatch(setUserData(true));
        })
    }
};
export let loginThunkCreator = (email, password) => {
    return (dispatch) => {
        authAPI.login(email, password).then((res) => {
            dispatch(setIsAuth(true));
            dispatch(setUserData(res.data.email, res.data.userName, res.data.userId));
            localStorage.setItem("token", res.data.token);
        })
    }
};
export let logOutThunkCreator = () => {
    return (dispatch) => {
        localStorage.removeItem("token");
        dispatch(setUserData(null, null, null));
        dispatch(setIsAuth(false));

    }
};
const getUserPayload = () => {
    let token = localStorage.getItem('token');
    if (token) {
        let userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
    } else return null;
}
const isLoggedIn = () => {
    let userPayload = getUserPayload();
    if (userPayload)
        return userPayload.exp > Date.now() / 1000;
    else return false;
}
export let initializeApp = () => {
    return (dispatch) => {

        if (isLoggedIn) {
            authAPI.authMe().then((res) => {
                dispatch(setIsAuth(true));
                dispatch(setUserData(res.data.user.userEmail, res.data.user.userName, res.data.user.userId));
            })
        }
    }
};
export let oauthGoogleThunkCreator = (accessToken) => {
    return (dispatch) => {
        authAPI.googleOauth(accessToken).then((res) => {

            dispatch(setIsAuth(true));
            dispatch(setUserData(res.data.email, res.data.userName, res.data.userId));
            localStorage.setItem("token", res.data.token);
        })
    }
};
export let oauthFacebookThunkCreator = (accessToken) => {
    return (dispatch) => {
        authAPI.facebookOauth(accessToken).then((res) => {
            dispatch(setIsAuth(true));
            dispatch(setUserData(res.data.email, res.data.userName, res.data.userId));
            localStorage.setItem("token", res.data.token);
        })
    }
};

export default authReducer;