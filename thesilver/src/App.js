import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";


import Customers from "./pages/Customers";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/customers" element={<Customers/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
