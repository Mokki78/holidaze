import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const INITIAL_STATE = {
  userDetails: JSON.parse(localStorage.getItem("userDetails")) || null,
  loading: false,
  error: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
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
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if(user) {
      dispatch({ type: "LOGIN_SUCCESS",payload: user })
    }
 
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


