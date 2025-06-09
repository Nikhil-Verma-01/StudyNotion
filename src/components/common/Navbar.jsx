import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from "./../../data/navbar-links"
import {useSelector} from "react-redux"
import logo from "../../assets/Logo"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/api'
import { IoIosArrowDown } from 'react-icons/io';

const subLinks = [
  {
    title : "python",
    link : "catalog/python"
  },
  {
    title : "web dev",
    link : "catalog/web-development"
  }
]

const Navbar = () => {
  
  const {token} = useSelector((state) => state.path);
  const {user} = useSelector((state) => state.profile);
  const {totalItem} = useSelector((state) => state.cart);

  const {sublinks, setSublinks} = useState([]);

  const fetchSublinks = async() => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing the sublinks results", result);
      setSublinks(result.data.data);

    } catch (error) {
      console.log("Could not fetch the category list");
    }
  }

  useEffect(() => {
    fetchSublinks();
  }, []);
  
  const location = useLocation();
  
  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname);
  }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/">
          <img src={logo} alt='logo'
            width={160} height={60} loading='lazy'
          />
        </Link>

        <nav>
            <ul>
              {
                NavbarLinks.maps((link, index) => (
                  <li key={index}>
                    {
                      link.title === "Catalog" ? (
                          <div className='flex items-center gap-2 group'>
                            <p>{link.title}</p>
                            <IoIosArrowDown/>
                            <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%]
                            flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0
                            transition-all duration-200 group-hover:opacity-100 lg:w-[300px]'>
                              <div className='absolute left-[50%] top-0 translate-x-[80%]
                              translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                              </div>

                              {
                                subLinks.length ? (
                                  subLinks.maps((subLink, index) => (
                                    <Link to={`${subLink.link}`} key={index}>
                                      <p>{subLink.title}</p>
                                    </Link>
                                  ))
                                ) : (<div></div>)
                              }

                            </div>
                          </div>
                        ) : (
                        <Link to={link?.path}>
                          <p className={`${matchRoute(link?.path) ? "text-yellow-25": 
                          "text-richblack-25"}`}>
                            {link.title}
                          </p> 
                          
                        </Link>
                      )
                    }
                  </li>
                ))
              }
            </ul>
        </nav>

        {/* Login/Signup/Dashboard */}
        <div className='flex gap-x-4 items-center'>
              {
                user && user?.accountType !== 'Instructor' && (
                  <Link to="/dashboard/cart" className='relative'>
                    <AiOutlineShoppingCart/>
                    {
                      totalItem > 0 && (
                        <span>
                          {totalItem}
                        </span>
                      ) 
                    }
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to="/login">
                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                    text-richblack-100 rounded-md'>
                      Login
                    </button>
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to="/signup">
                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                    text-richblack-100 rounded-md'>
                      Sign Up
                    </button>
                  </Link>
                )
              }
              {
                token !== null && <ProfileDropdown/>
              }
            
        </div>

      </div>
    </div>
  )
}

export default Navbar