import { useEffect, useRef, useState } from "react";
import "./comp.css";
import { Link } from "react-router-dom";

function Page({ page }) {
    return (
        <li>
            <Link to={page.admin_page_url} className={CSS.link}>
                {page.admin_page_title}
            </Link>
        </li>
    );
}

function Pagegroup({ group, activeIndex, isActive, setActive }) {
    const ref = useRef();
    const [height, setHeight] = useState();
    const [activeHeight, setActiveHeight] = useState();

    useEffect(() => {
        setActiveHeight(ref.current.clientHeight);
        setHeight(0);
    }, []);
    useEffect(() => {
        setHeight(isActive ? activeHeight : 0);
    }, [isActive]);
    function toggleStatus() {
        if (isActive) {
            setHeight(0);
            setActive(null);
        } else {
            setActive(activeIndex);
            setHeight(activeHeight);
        }
    }
    return (
        <li
            className={`group_head ${isActive ? "active" : ""}`}
            onClick={toggleStatus}
        >
            <a className="group_title">
                {group.pagegroup_title}
                <i className="fa-solid fa-angle-down"></i>
            </a>
            <ul
                className={`${CSS.innerlinks}`}
                ref={ref}
                style={{ height: height + "px" }}
                data-height={activeHeight}
            >
                {group.adminpages.map((page, index) => {
                    return <Page key={index} page={page} />;
                })}
            </ul>
        </li>
    );
}
function Sidebar() {
    const [pages, setPages] = useState([]);
    const [active, setActive] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = () => {
        fetch("http://localhost/react/template/api/adminpages/pages.php")
            .then((response) => response.json())
            .then((data) => setPages(data.adminpagegroups));
    };
    return (
        <div className="sidebar">
            <Link to="/" className="brand">
                <img src="/images/logo192.png" alt="" />
            </Link>
            <ul>
                <li>
                    <Link to="/admin" className="">
                        Dashboard
                    </Link>
                </li>
                {pages.map((group, index) => {
                    return (
                        <Pagegroup
                            group={group}
                            key={index}
                            activeIndex={index}
                            isActive={index == active}
                            setActive={setActive}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
