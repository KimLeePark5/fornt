import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";


import Customers from "./pages/Customers";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/Error";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<ProtectedRoute loginCheck={false}> <Login/> </ProtectedRoute>}/>
                <Route path="/" element={<Layout/>}>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="/employees" element={<Employees/>}></Route>
                </Route>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
