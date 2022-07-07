import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { searchItem } from "../store/itemSlice";

export const SearchInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    axios.get("api/item/search").then((res) => {
      if (res.data.status === 200) {
        dispatch(searchItem({ keyword }));
        navigate("/dashboard/search");
      }
    });

    // console.log({ keyword: keyword });
  };
  return (
    <div>
      <form className='d-flex' onSubmit={handleSearch}>
        <input
          className='form-control me-2'
          type='search'
          placeholder='Search'
          aria-label='Search'
          name='search'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className='btn btn-outline-success' type='submit'>
          Search
        </button>
      </form>
    </div>
  );
};
