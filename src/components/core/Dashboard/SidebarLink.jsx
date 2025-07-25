import React from 'react'
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import * as Icons from "react-icons/vsc"

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const loaction = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, loaction.pathname);
    }
  return (
    <NavLink
    to={link.path}
    className={`relative px-8 py-2 text-sm font-medium
    ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}
    >
        <span className={`absolute left-0 top-0 h-full w-[0.2rme] bg-yellow-50
        ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>

        </span>

        <div className='flex items-center gap-x-2'>
            <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink