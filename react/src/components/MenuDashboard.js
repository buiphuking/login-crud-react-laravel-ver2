import React from "react";
import { Link } from "react-router-dom";

export const MenuDashboard = () => {
  return (
    <div>
      <Link className='btn btn-primary' to={"item/list"}>
        Item List
      </Link>
    </div>
  );
};
