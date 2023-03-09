import React, { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { BiDna } from "react-icons/bi";
import { SidebarData } from './SidebarData'
import { Link, NavLink } from 'react-router-dom'

function SideNavbar()
{
    const mappedSidebarData = SidebarData.map(function (val, key)
    {
        return <li
            key={key}
            className="row"
            id={window.location.pathname == val.link ? "active" : ""}
        // onClick={() => window.location.pathname = val.link}
        >
            <div id="icon">{val.icon}</div>
            <NavLink to={val.link} id="title">
                <div id="title">{val.title}</div>
            </NavLink>
        </li>
    })
    return (
        <div className="sidebar">
            <ul className="sidebarlist">
                {mappedSidebarData}
                <li className="logout"><button>Logout</button></li>
            </ul>
        </div>
    )
};

export default SideNavbar;
