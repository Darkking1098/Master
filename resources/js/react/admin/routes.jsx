import { Route } from "react-router-dom";
import Adminlayout from "./layout";
import Adminlogin from "./pages/login/page";

import Index from "./pages/index/page";

function Adminroutes() {
    return (
        <Route path="admin">
            <Route path="login" element={<Adminlogin />}></Route>
            <Route element={<Adminlayout />}>
                <Route path="" element={<Index />}></Route>
            </Route>
        </Route>
    );
}

export default Adminroutes;
