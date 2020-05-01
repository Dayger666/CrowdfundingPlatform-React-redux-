import authReducer from "./Auth-reducer";

const SET_IMAGES_URLS = 'SET-IMAGES-URLS';
const SET_USER_DATA = 'SET-USER-DATA';


let initialState = {
    imagesUrls:[],
    isAuth: false,
    email: null,
    userName: null,
    _id: null,
};
const CompanyInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGES_URLS:
            return {
                ...state,
                imagesUrls: [...state.imagesUrls,action.data],
            };

        default:
            return state;
    }

};
export let setImagesUrls = (url) => {
    debugger;
    return {
        type: SET_IMAGES_URLS,
        data: {
            url,
        }
    }
};
export default CompanyInfoReducer;