import React, { useEffect } from "react";
import  axios from "axios";

function App() {
  useEffect(() => {
    axios.get("/api").then((data) => {
      console.log(data);
    });
  });
  return (
    <div>
      <button>dsd</button>
    </div>
  );
}

export default App;
