import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";


import Customers from "./pages/Customers";
import MyAttend from "./pages/MyAttend";
import AttendAdmin from "./pages/admin/AttendAdmin";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Vacation from "./pages/vacation/Vacation";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="myAttend" element={<MyAttend/>}></Route>
                    <Route path="attend-management" element={<AttendAdmin/>}></Route>
                    <Route path="/employees" element={<Employees/>}></Route>
                    <Route path="/vacation" element={<Vacation/>}></Route>

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
