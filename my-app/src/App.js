import "./App.css";
import { axios } from "axios";
function App() {
  return (
    <div className="App">
      <button onclick={() => {
      axios.get("/api").then((res)=>{
      console.log(res.data)
      })
      }}>버튼 누르기</button>
    </div>
  );
}

export default App;
