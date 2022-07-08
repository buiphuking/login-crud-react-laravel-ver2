import React from "react";
import { useSelector } from "react-redux";

import { selectSearchData } from "../../store/itemSlice";

export const SearchItem = () => {
  const searchData = useSelector(selectSearchData);

  const NoResultSearchFound = () => {
    return (
      <div>
        <h1>No Result Search Found</h1>
      </div>
    );
  };

  const TableData = () => {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Items Search</h4>
                </div>
                <div className='card-body'>
                  <table className='table table-bordered table-striped'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Course</th>
                      </tr>
                    </thead>
                    <tbody>{student_HTMLTABLE}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (searchData) {
    var student_HTMLTABLE = "";
    var id = 1;
    student_HTMLTABLE = searchData.map((item, index) => {
      return (
        <tr key={index}>
          <td>{id++}</td>
          <td>{item.name}</td>
          <td>{item.course}</td>
        </tr>
      );
    });
  }
  if (!searchData || searchData.length === 0) {
    return (
      <div>
        <NoResultSearchFound />
      </div>
    );
  } else {
    return (
      <div>
        <TableData />
      </div>
    );
  }
};
