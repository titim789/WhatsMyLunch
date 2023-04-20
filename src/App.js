import "./App.css";
import Login from "./components/login/Login";
import CustomToast from "./components/custom/CustomToast";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { verifyToken } from "./api";
import { Context } from "./components/custom/Context";
import FrontPage from "./components/FrontPage";
import SuggestFood from "./components/SuggestFood";
import UserTastePalette from "./components/SelectTopFood";
import SelectTopFood from "./components/SelectTopFood";
import TastePalette from "./components/TastePalette";

const App = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [userChoice, setUserChoice] = useState("");
  const [cookies, setCookie] = useCookies();

  const checkAuth = () => {
    verifyToken(cookies.refresh_token)
      .then((res) => {
        console.log("Token Verfied");
        setHasAccess(true);
      })
      .catch((err) => {
        console.log("Unauthorised");
        setHasAccess(false);
      });
  };

  useEffect(checkAuth, []);

  return (
    <Context.Provider value={[userChoice, setUserChoice]}>
      <div class="App">
        <CustomToast />

        {!hasAccess ? (
          <Login setHasAccess={setHasAccess} />
        ) : (
          <div class="Routes">
            <Routes>
              <Route
                path="/"
                element={
                  <FrontPage
                    checkAuth={checkAuth}
                    setHasAccess={setHasAccess}
                  />
                }
              />
              <Route
                path="/SuggestFood"
                element={<SuggestFood checkAuth={checkAuth} />}
              />
              <Route
                path="/login"
                element={<Login setHasAccess={setHasAccess} />}
              />
              <Route
                path="/selecttopfood"
                element={<SelectTopFood checkAuth={checkAuth} />}
              />
              <Route
                path="/tastepalette"
                element={<TastePalette checkAuth={checkAuth} />}
              />
            </Routes>
          </div>
        )}
      </div>
    </Context.Provider>
  );
};

export default App;
