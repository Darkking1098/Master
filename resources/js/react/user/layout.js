import { Outlet } from "react-router-dom";

// importing default components
import Header from "./components/header/comp";
import Footer from "./components/footer/comp";

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
