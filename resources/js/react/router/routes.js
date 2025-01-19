import { BrowserRouter, Routes } from "react-router-dom";
import React from "react";

// Layouts To Use
import Userroutes from "../user/routes";
// import Adminroutes from "../admin/routes";

// Using all layouts as user and admin
function Approutes() {
    return (
        <BrowserRouter>
            <Routes>
                {Userroutes()}
                {/* {Adminroutes()} */}
            </Routes>
        </BrowserRouter>
    );
}

export default Approutes;
