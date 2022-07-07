import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import { BASE_URL } from "../../config/constant";
export const ListItem = () => {
  const [loading, setLoading] = useState(true);
  // const [items, setItems] = useState([]);

  const [items, setItems] = useState({
    value: "",
    items: "",
    activePage: 1,
    itemsCountPerPage: 0,
    totalItemsCount: 0,
    pageRangeDisplayed: 5,
  });
  useEffect(() => {
    axios.get(`/api/item/list?page=${items.activePage}`).then((res) => {
      if (res.status === 200) {
        setItems({
          value: "",
          items: res.data.items.data,
          activePage: res.data.items.current_page,
          itemsCountPerPage: res.data.items.per_page,
          totalItemsCount: res.data.items.total,
          pageRangeDisplayed: 5,
        });
        setLoading(false);
      }
      // console.log(res.data.items.data);
    });
  }, [items.activePage]);
  console.log(items);

  const handlePageChange = (pageNumber) => {
    axios.get(`${BASE_URL}/item/list?page=${pageNumber}`).then((res) => {
      setItems({
        items: res.data.items.data,
        activePage: res.data.items.current_page,
      });
    });
  };

  const deleteStudent = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    axios.delete(`/api/item/delete/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Deleted!", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        thisClicked.innerText = "Delete";
      }
    });
  };

  if (loading) {
    return <h4>Loading Item Data...</h4>;
  } else {
    var student_HTMLTABLE = "";
    var id = 1;
    student_HTMLTABLE = items.items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{id++}</td>
          <td>{item.name}</td>
          <td>{item.course}</td>
          <td>
            <Link
              replace
              to={`../item/edit/${item.id}`}
              className='btn btn-success btn-sm'
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type='button'
              onClick={(e) => deleteStudent(e, item.id)}
              className='btn btn-danger btn-sm'
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <h4>
                  Items Data
                  <Link
                    to={"../item/add"}
                    className='btn btn-primary btn-sm float-end'
                  >
                    {" "}
                    Add Item
                  </Link>
                </h4>
              </div>
              <div className='card-body'>
                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>{student_HTMLTABLE}</tbody>
                </table>
                <Pagination
                  activePage={items.activePage}
                  itemsCountPerPage={items.itemsCountPerPage}
                  totalItemsCount={items.totalItemsCount}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  itemClass='page-item'
                  linkClass='page-link'
                  // activePage={this.state.activePage}
                  // itemsCountPerPage={this.state.itemsCountPerPage}
                  // totalItemsCount={this.state.totalItemsCount}
                  // pageRangeDisplayed={5}
                  // onChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
