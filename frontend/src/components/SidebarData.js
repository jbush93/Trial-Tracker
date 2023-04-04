import React from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { BiDna } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { BsFileEarmarkPersonFill, BsJournalText } from "react-icons/bs";

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
