import { Link } from "react-router-dom";
import "/public/css/components/header.css";

export default function () {
    return (
        <header className="rflex jcsb aic">
            <h6>header</h6>
            <nav className="rflex">
                <Link to="/" className="mu-link">
                    Home
                </Link>
                <Link to="about" className="mu-link">
                    About Us
                </Link>
            </nav>
        </header>
    );
}
