import "./App.css";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { AddItem } from "./admin/Item/AddItem";
import { ListItem } from "./admin/Item/ListItem";
import { EditItem } from "./admin/Item/EditItem";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { SearchItem } from "./admin/Item/SearchItem";
axios.defaults.baseURL = "http://localhost:8000/";
function App() {
  function PrivateOutlet() {
    return localStorage.getItem("token") ? (
      <Dashboard />
    ) : (
      <Navigate to='/login' />
    );
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Navbar />}>
            <Route path='login' element={<Login />} />
            <Route path='/dashboard' element={<PrivateOutlet />}>
              <Route path='item/add' element={<AddItem />} />
              <Route path='item/list' element={<ListItem />} />
              <Route path='item/edit/:id' element={<EditItem />} />
              <Route path='search' element={<SearchItem />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
