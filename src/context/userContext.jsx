import axios from "axios";
import { createContext, useState } from "react";
import Joi from 'joi'

export const UserContext = createContext({
  loggedIn: false,
  user: null,
  token: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  refresh: () => {},
});

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const signup = async (username, email, password) => {
    const { data } = await axios.post(
      import.meta.env.VITE_URL + "/public/user/signup",
      { email, username, password },
      { withCredentials: true }
    );
    if (data) {
      setLoggedIn(true);
      setUser(data);
      history.pushState({}, "", "/")
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_URL + "/public/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (data.user) {
        setLoggedIn(true);
        const { user } = data
        setUser(user);
        history.pushState({}, "", "/")
      }
    } catch (error) {
      console.log(error)
      alert(error.message);
    }
  };

  const refresh = async (cb) => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_URL + "/protected/user/refresh",
        {},
        { withCredentials: true }
      );
      console.log(data);

      if (data) {
        setLoggedIn(true);
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
    if (cb) cb(true)
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('xz')
    history.pushState({}, {}, '/')
  };

  return (
    <UserContext.Provider
      value={{ loggedIn, user, setUser, login, signup, logout, refresh }}
    >
      {children}
    </UserContext.Provider>
  );
};
