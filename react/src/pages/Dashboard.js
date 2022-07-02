import React from "react";
import { Outlet } from "react-router-dom";
import { MenuDashboard } from "../components/MenuDashboard";
export const Dashboard = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-header'>
              <h4>Dashboard</h4>
            </div>
            <div className='card-body'>
              <MenuDashboard />
            </div>
          </div>
        </div>
        <div className='col-md-9'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
