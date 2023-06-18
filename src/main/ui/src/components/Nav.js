import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
    return (
        <nav>
            <ul className="nav-menu">
                <li>
                    <NavLink to="/dogs" activeClassName="active">
                        Dogs
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" activeClassName="active">
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/requests" activeClassName="active">
                        Requests
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
export default Nav;
