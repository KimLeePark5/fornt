import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Temp from "./pages/Temp";
import MyAttend from "./pages/MyAttend";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Temp/> }></Route>
            <Route path="/myAttend" element={<MyAttend/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
