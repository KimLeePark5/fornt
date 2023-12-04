import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";


import Customers from "./pages/Customers";
import MyAttend from "./pages/MyAttend";
import AttendAdmin from "./pages/admin/AttendAdmin";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/Error";
import Vacation from "./pages/vacation/Vacation";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<ProtectedRoute onlyUnLogin={true} > <Login/> </ProtectedRoute>}/>
                <Route path="/" element={<ProtectedRoute onlyLogin={true}><Layout/></ProtectedRoute>}>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="myAttend" element={<MyAttend/>}></Route>
                    <Route path="attend-management" element={<AttendAdmin/>}></Route>
                    <Route path="/employees" element={<Employees/>}></Route>
                    <Route path="/vacation" element={<Vacation/>}></Route>

                </Route>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
