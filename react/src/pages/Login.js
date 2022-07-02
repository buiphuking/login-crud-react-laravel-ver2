import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  login,
  selectLoading,
  selectErrorMessage,
  selectUser,
} from "../store/userSlice";
export const Login = () => {
  const [mssv, setMssv] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const user = useSelector(selectUser);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ mssv, password }));
  };

  if (isLoading) {
    return <h4>Loading Login...</h4>;
  }

  if (user) {
    console.log(user);
    console.log("logged");
    return <Navigate to='/dashboard/item/list' />;
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h4>
                Login
                <a path='' className='btn btn-danger btn-sm float-end'>
                  Home
                </a>
              </h4>
            </div>
            <div className='card-body'>
              <form onSubmit={handleLogin}>
                <div className='form-group mb-3'>
                  <label className='col-sm-2 col-form-label'>Mssv</label>
                  <input
                    type='text'
                    placeholder='Mssv'
                    value={mssv}
                    onChange={(event) => setMssv(event.target.value)}
                    className='form-control'
                  />
                </div>
                <div className='form-group mb-3'>
                  <label className='col-sm-2 col-form-label'>Password</label>
                  <input
                    type='text'
                    placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className='form-control'
                  />
                </div>
                <button type='submit' className='btn btn-primary'>
                  Login
                </button>
              </form>
              <p>mssv: admin</p>
              <p>password: admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
