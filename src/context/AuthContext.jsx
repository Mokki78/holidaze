import React, { createContext, useContext, useReducer, useEffect } from "react";

 export const AuthContext = createContext();

const INITIAL_STATE = {
  userDetails: JSON.parse(localStorage.getItem("userDetails")) || null,
  loading: false,
  error: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        userDetails: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        userDetails: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        userDetails: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        userDetails: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); 

 useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if(userDetails) {
      dispatch({ type: "LOGIN_SUCCESS",payload: userDetails })
    }

    console.log(userDetails)
 
},[])
  

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthContextProvider


