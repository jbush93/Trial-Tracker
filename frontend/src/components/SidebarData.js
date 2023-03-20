import React from 'react'
import { AiFillDashboard, AiFillHome } from "react-icons/ai";
import { BiDna } from "react-icons/bi";
import { FaUserCircle, FaDna } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { BsFileEarmarkPersonFill, BsJournalText } from "react-icons/bs";
import { HiBanknotes } from "react-icons/hi2";

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <AiFillDashboard />,
        link: "/"
    },
    {
        title: "Trials",
        icon: <BiDna />,
        link: "/trials"
    },
    {
        title: "Patients",
        icon: <BsFileEarmarkPersonFill />,
        link: "/patients"
    },
    {
        title: "Notes",
        icon: <BsJournalText />,
        link: "/notes"
    },
    {
        title: "My Account",
        icon: <FaUserCircle />,
        link: "/myaccount"
    },
]
