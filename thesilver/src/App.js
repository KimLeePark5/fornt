import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";


import Customers from "./pages/Customers";
import Employees from "./pages/Employees";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="/employees" element={<Employees/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
