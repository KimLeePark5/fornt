import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";


import Customers from "./pages/Customers";
import MyAttend from "./pages/MyAttend";
import AttendAdmin from "./pages/admin/AttendAdmin";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="myAttend" element={<MyAttend/>}></Route>
                    <Route path="attend-management" element={<AttendAdmin/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
