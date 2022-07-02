import React from "react";
import { Login } from "../pages/Login";
import { Route, Routes } from "react-router-dom";
export const LoginStack = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
    </Routes>
  );
};
