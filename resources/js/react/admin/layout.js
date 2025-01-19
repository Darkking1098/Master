import { Outlet } from "react-router-dom";

// importing default components
import Sidebar from "./components/sidebar/comp";
import Header from "./components/header/comp";
import Footer from "./components/footer/comp";
// import Auth from "../assets/auth";

// import CSS
import CSS from "./layout.module.css";

export default function Layout() {
    return (
        <>
            <main className={CSS.admin_layout}>
                <Sidebar />
                <div className={CSS.main_container}>
                    <Header />
                    <main className={CSS.main_content}>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </main>
        </>
    );
}
