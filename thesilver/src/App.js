import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";


import Customers from "./pages/Customers";
import MyAttend from "./pages/MyAttend";
import AttendAdmin from "./pages/admin/AttendAdmin";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import AttendAdminSearch from "./pages/admin/AttendAdminSearch";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Error from "./pages/Error";
import Vacation from "./pages/vacation/Vacation";
import CustomerRegist from "./pages/CustomerRegist";

import Programs from "./pages/board/program/Programs";
import Journals from "./pages/board/journal/Journals";

import Employee from "./pages/Employee";


import Main from "./pages/Main";
import SearchProgram from "./pages/board/program/SearchProgram";
import ProgramDetail from "./pages/board/program/ProgramDetail";
import JournalDetail from "./pages/board/journal/JournalDetail";
import SearchJournal from "./pages/board/journal/SearchJournal";
import ProgramRegist from "./pages/admin/ProgramRegist";
import VacationManagement from "./pages/vacation/VacationManagement";

import ProgramModify from "./pages/admin/ProgramModify";
import JournalModify from "./pages/board/journal/JournalModify";
import JournalRegist from "./pages/board/journal/JournalRegist";

import AttendAdminByType from "./pages/admin/AttendAdminByType";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<ProtectedRoute onlyUnLogin={true}> <Login/> </ProtectedRoute>}/>
                <Route path="/" element={<ProtectedRoute onlyLogin={true}><Layout/></ProtectedRoute>}>
                    <Route path="/regist-customers" element={<CustomerRegist/>}></Route>
                    <Route index element={<Main/>}/>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="myAttend" element={<MyAttend/>}></Route>
                    <Route path="attend-management">
                        <Route index element={<AttendAdmin/>}/>
                        <Route path="search" element={<AttendAdminSearch/>}/>
                        <Route path="sort" element={<AttendAdminByType/>}/>
                    </Route>
                    <Route path="/employees" element={<Employees/>}></Route>
                    <Route path="/employee" element={<Employee/>}></Route>
                    <Route path="/vacation" element={<Vacation/>}></Route>
                    <Route path="/vacation-management" element={<VacationManagement/>}></Route>

                    <Route path="journals" element={<Journals/>}></Route>
                    <Route path="journals">
                        <Route path="search" element={<SearchJournal/>}/>
                        <Route path=":journalCode" element={<JournalDetail/>}/>
                    </Route>
                    <Route path="journal-regist" element={<ProtectedRoute authCheck={true}><JournalRegist/></ProtectedRoute>}/>
                    <Route
                        path="journal-modify/:journalCode"
                        element={
                            <ProtectedRoute authCheck={true}>
                                <JournalModify/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="programs" element={<Programs/>}></Route>
                    <Route path="programs">
                        <Route path="search" element={<SearchProgram/>}/>
                        <Route path=":code" element={<ProgramDetail/>}/>
                    </Route>
                    <Route path="program-regist" element={<ProtectedRoute authCheck={true}><ProgramRegist/></ProtectedRoute>}/>
                    <Route
                        path="program-modify/:code"
                        element={
                            <ProtectedRoute authCheck={true}>
                                <ProgramModify/>
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
