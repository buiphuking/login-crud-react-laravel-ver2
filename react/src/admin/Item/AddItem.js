import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const AddItem = () => {
  const navigate = useNavigate();
  const [itemInput, setItem] = useState({
    name: "",
    course: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setItem({ ...itemInput, [e.target.name]: e.target.value });
  };

  const saveItem = (e) => {
    e.preventDefault();

    const data = {
      name: itemInput.name,
      course: itemInput.course,
    };
    axios.post(`api/item/add`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success!", res.data.message, "success");
        setItem({
          name: "",
          course: "",
          error_list: [],
        });
        navigate("../item/list");
      } else if (res.data.status === 422) {
        setItem({ ...itemInput, error_list: res.data.validate_err });
      }
    });
  };
  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <h4>
                  Add Item
                  <Link to={"/"} className='btn btn-danger btn-sm float-end'>
                    {" "}
                    Home
                  </Link>
                </h4>
              </div>
              <div className='card-body'>
                <form onSubmit={saveItem}>
                  <div className='form-group mb-3'>
                    <label>Item Name</label>
                    <input
                      type='text'
                      name='name'
                      onChange={handleInput}
                      value={itemInput.name}
                      className='form-control'
                    />
                    <span className='text-danger'>
                      {/* {studentInput.error_list.name} */}
                    </span>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Item Course</label>
                    <input
                      type='text'
                      name='course'
                      onChange={handleInput}
                      value={itemInput.course}
                      className='form-control'
                    />
                    <span className='text-danger'>
                      {/* {studentInput.error_list.course} */}
                    </span>
                  </div>
                  <div className='form-group mb-3'>
                    <button type='submit' className='btn btn-primary'>
                      Save Item
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
