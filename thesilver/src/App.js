import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";


import Customers from "./pages/Customers";
import MyAttend from "./pages/MyAttend";
import AttendAdmin from "./pages/admin/AttendAdmin";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import AttendAdminSearch from "./pages/admin/AttendAdminSearch";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="myAttend" element={<MyAttend/>}></Route>
                    <Route path="attend-management">
                        <Route index element={<AttendAdmin/> }/>
                        <Route path="search" element={<AttendAdminSearch/>}/>
                    </Route>
                    <Route path="/employees" element={<Employees/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
