import React, { useEffect } from "react";
import axios from "axios";
import NavMain from "./components/nav";
import LoginForm from "./components/views/Loginpage/Loginpage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    axios.get("/api").then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavMain />
              <LoginForm />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div>
              <NavMain />
              <RegisterPage />
            </div>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
