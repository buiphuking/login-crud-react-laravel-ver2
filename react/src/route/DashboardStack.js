import React from "react";
import { Route } from "react-router-dom";
import { AddItem } from "../admin/Item/AddItem";
import { EditItem } from "../admin/Item/EditItem";
import { ListItem } from "../admin/Item/ListItem";
import { Dashboard } from "../pages/Dashboard";
export const DashboardStack = () => {
  return (
    <Route path='dashboard' element={<Dashboard />}>
      <Route path='item/add' element={<AddItem />} />
      <Route path='item/list' element={<ListItem />} />
      <Route path='item/edit/:id' element={<EditItem />} />
    </Route>
  );
};
