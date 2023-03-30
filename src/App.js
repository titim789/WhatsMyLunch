import "./App.css";
import Login from "./components/login/Login";
import CustomToast from "./components/custom/CustomToast";
import { useLocation, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyToken } from "./api";
import FrontPage from "./components/FrontPage";

const App = () => {
  const [hasAccess, setHasAccess] = useState(false);

  const checkAuth = () => {
    verifyToken()
      .then((res) => {
        setHasAccess((hasAccess) => !hasAccess);
      })
      .catch((err) => {
        setHasAccess(false);
      });
  };

  useEffect(checkAuth, []);
  return (
    <div className="App">
      <CustomToast />

      {!hasAccess ? (
        <Login />
      ) : (
        <div>
          <Routes>
            <Route
              path="/front-page"
              element={<FrontPage checkAuth={checkAuth} />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
