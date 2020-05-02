import * as axios from "axios";

let instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Authorization': "Bearer " + localStorage.getItem('token')
  },
});

export let authAPI = {
  authMe: () => {
    return instance.get(`auth/me`)
  },
  login: (email, password) => {
    return instance.post(`auth/authenticate`, {
      email,
      password
    })
  },
  register: (username, email, password) => {
    return instance.post(`auth/register`, {
      username,
      email,
      password
    })
  },
  googleOauth: (accessToken) => {
    return instance.post(`oauth/google`, {
      access_token: accessToken,
    })
  },
  facebookOauth: (accessToken) => {
    return instance.post(`oauth/facebook`, {
      access_token: accessToken,
    })
  },
  // logOut:()=>{
  //     return instance.delete(`auth/login`);
  // }
};

export let companyAPI={
  addCompany: (userID, name, description, category, location, images, youTubeLink, donateGoal, duration) => {
    return instance.post(`saveCompany`, {
      userID,
      name,
      description,
      category,
      location,
      images,
      youTubeLink,
      donateGoal,
      duration,
    })
  },
  getCompanies:()=>{
    return instance.get(`getCompanies`)
  },
};