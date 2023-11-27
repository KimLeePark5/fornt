import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Temp from "./pages/Temp";
import Customers from "./pages/Customers";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Temp/> }></Route>
            <Route path="/customers" element={ <Customers/> }></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
