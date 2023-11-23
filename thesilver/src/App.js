import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Temp from "./pages/Temp";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Temp/> }></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
