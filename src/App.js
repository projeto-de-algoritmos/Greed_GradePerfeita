import Sidebar from "./Sidebar";
import Grid from "./Grid";
import Infobar from "./Infobar";
import SubjectsProvider from "./context/subjects";
import "./app.css";

function App() {
  return (
    <SubjectsProvider>
      <div className="App">
        <Sidebar />
        <Grid />
        <Infobar />
      </div>
    </SubjectsProvider>
  );
}

export default App;
