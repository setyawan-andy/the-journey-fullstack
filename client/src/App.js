import React, { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/userContext";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DetailPage from "./pages/DetailPage";
import Bookmark from "./pages/Bookmark";
import NewJourney from "./pages/NewJourney";

import { API, setAuthToken } from "./config/api";

//init token
if (localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {

  let history = useHistory();
  
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log(state);

  useEffect(() => {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }

    //redirect auth
    if (!state.isLogin){
      history.push("/auth");
    } else {
      history.push("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      //if token incorrect
      if (response.status === 404){
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      //get user data
      let payload = response.data.data.user;

      //get token from local storage
      payload.token = localStorage.token;

      //send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
  
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/add-article" component={NewJourney}/>
        <Route path="/article/:id" component={DetailPage} />
        <Route path="/bookmark" component={Bookmark}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
    
  );
}

export default App;
