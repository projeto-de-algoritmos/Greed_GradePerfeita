import { useState } from "react";
import Sidebar from "./Sidebar";
import Grid from "./Grid";
import "./app.css";

function App() {
  const [subjects, setSubjects] = useState([[], [], [], [], []]);

  return (
    <div className="App">
      <Sidebar subjects={subjects} setSubjects={setSubjects} />
      <Grid subjects={subjects} />
    </div>
  );
}

export default App;
