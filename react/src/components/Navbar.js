import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../store/userSlice";
import { SearchInput } from "./SearchInput";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  console.log(token);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  const LoginElement = () => {
    return (
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    );
  };

  const LogoutElement = () => {
    return (
      <li className='nav-item'>
        <Link to='/login' className='nav-link' onClick={handleLogout}>
          Log out
        </Link>
      </li>
    );
  };

  const DashBoardElement = () => {
    return (
      <li className='nav-item'>
        <Link className='nav-link' to='/dashboard/item/list'>
          Dashboard
        </Link>
      </li>
    );
  };

  // console.log(user);
  return (
    <div className='pb-5'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Navbar
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' to='/'>
                  Home
                </Link>
              </li>
              {/* <li className='nav-item'>
                <a className='nav-link' href='/item/list'>
                  List Items
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/item/add'>
                  Add Item
                </a>
              </li> */}
              {token ? <LogoutElement /> : <LoginElement />}
              {/* <li className='nav-item'>
                <a className='nav-link' href='/login'>
                  Login
                </a>
              </li>
              <li className='nav-item'>
                <Link to='#' className='nav-link' onClick={handleLogout}>
                  Logout
                </Link>
              </li> */}
              {/* <li className='nav-item'>
                <a className='nav-link' href='/dashboard/item/list'>
                  Dashboard
                </a>
              </li> */}
              {token ? <DashBoardElement /> : null}
            </ul>
            <SearchInput />
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
