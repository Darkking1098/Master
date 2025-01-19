import { Route } from "react-router-dom";
import Userlayout from "./layout.js";

import Pages from "./pages/pages.js";

function Userroutes() {
    return (
        <Route path="" element={<Userlayout />}>
            <Route path="" element={<Pages.INDEX />}></Route>
            <Route path="about" element={<Pages.ABOUT />}></Route>
        </Route>
    );
}

export default Userroutes;
