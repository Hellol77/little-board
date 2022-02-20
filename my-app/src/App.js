import React, { useEffect } from "react";
import axios from "axios";
import NavMain from "./components/nav";
import { Link, Route, Routes } from "react-router-dom";


function App() {
  useEffect(() => {
    axios.get("/api").then((data) => {
      console.log(data);
    });
  },[]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavMain />
            </div>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
