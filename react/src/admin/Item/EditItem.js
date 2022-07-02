import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export const EditItem = () => {
  let { id } = useParams();
  const student_id = id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentInput, setStudent] = useState([]);
  const [errorInput, setError] = useState([]);
  useEffect(() => {
    axios.get(`/api/item/edit/${student_id}`).then((res) => {
      if (res.data.status === 200) {
        setStudent(res.data.student);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/item/list");
      }
    });
  }, [navigate, student_id]);

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...studentInput, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();
    const student_id = id;
    const data = {
      name: studentInput.name,
      course: studentInput.course,
    };

    axios.put(`/api/item/update/${student_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
        navigate("../item/list");
      } else if (res.data.status === 422) {
        swal("All fields are mandetory", "", "error");
        setError(res.data.validationErrors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("../item/list");
      }
    });
  };

  if (loading) {
    return <h4>Loading Edit Student Data...</h4>;
  }

  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <h4>
                  Edit Item
                  <Link
                    to={"../item/list"}
                    className='btn btn-danger btn-sm float-end'
                  >
                    {" "}
                    BACK
                  </Link>
                </h4>
              </div>
              <div className='card-body'>
                <form onSubmit={updateStudent}>
                  <div className='form-group mb-3'>
                    <label>Item Name</label>
                    <input
                      type='text'
                      name='name'
                      onChange={handleInput}
                      value={studentInput.name}
                      className='form-control'
                    />
                    {/* <span className='text-danger'>{errorInput.name}</span> */}
                  </div>
                  <div className='form-group mb-3'>
                    <label>Item Course</label>
                    <input
                      type='text'
                      name='course'
                      onChange={handleInput}
                      value={studentInput.course}
                      className='form-control'
                    />
                    {/* <span className='text-danger'>{errorInput.course}</span> */}
                  </div>
                  <div className='form-group mb-3'>
                    <button
                      type='submit'
                      id='updatebtn'
                      className='btn btn-primary'
                    >
                      Update Item
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
