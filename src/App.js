import "./App.css";
import Login from "./components/login/Login";
import CustomToast from "./components/custom/CustomToast";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyToken } from "./api";
import FrontPage from "./components/FrontPage";

const App = () => {
  const [hasAccess, setHasAccess] = useState(false);

  const checkAuth = () => {
    verifyToken()
      .then((res) => {
        console.log("Token Verfied");
        setHasAccess((hasAccess) => !hasAccess);
      })
      .catch((err) => {
        console.log("Unauthorised");
        setHasAccess(false);
      });
  };

  useEffect(checkAuth, []);
  return (
    <div class="App">
      <CustomToast />

      {!hasAccess ? (
        <Login setHasAccess={setHasAccess} />
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<FrontPage checkAuth={checkAuth} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
