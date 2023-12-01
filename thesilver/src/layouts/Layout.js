import Navbar from "../components/common/Navbar";
import {Outlet} from "react-router-dom";


function Layout() {

    return (
        <div className="layout">
            <Navbar/>
            <div className="layout-main">
                <Outlet/>
            </div>
        </div>
    )
}
export default Layout;