import { useEffect, useRef, useState } from "react";
import CSS from "./comp.module.css";
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

function PageGroup({ pagegroup }) {
    const ref = useRef();
    const [height, setHeight] = useState();
    const [active, setActive] = useState(false);
    const [activeHeight, setActiveHeight] = useState(0);

    useEffect(() => {
        setActiveHeight(ref.current.clientHeight);
        setHeight(0);
    }, []);
    function toggleStatus() {
        if (active) {
            setHeight(0);
            setActive(false);
        } else {
            setActive(true);
            setHeight(activeHeight);
        }
    }
    return (
        <li className={CSS.group_head} onClick={toggleStatus}>
            <a className={`${CSS.group_title} ${CSS.link}`}>
                {pagegroup.pagegroup_title}
            </a>
            <ul
                className={`${CSS.innerlinks}`}
                ref={ref}
                style={{ height: height + "px" }}
                data-height={activeHeight}
            >
                {pagegroup.adminpages.map((page, index) => {
                    return <Page key={index} page={page} />;
                })}
            </ul>
        </li>
    );
}

export default function () {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = () => {
        fetch("http://localhost/react/template/api/adminpages/pages.php")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPages(data.adminpagegroups);
            });
    };
    return (
        <div className={CSS.sidebar}>
            <Link href="/" className={CSS.brand}>
                <img src="/images/logo192.png" alt="" />
            </Link>
            <ul className="main_nav">
                <li>
                    <Link
                        to="/admin"
                        className={`${CSS.group_title} ${CSS.group_head} ${CSS.link}`}
                    >
                        Dashboard
                    </Link>
                </li>
                {pages.map((group, index) => {
                    return <PageGroup pagegroup={group} key={index} />;
                })}
            </ul>
        </div>
    );
}
