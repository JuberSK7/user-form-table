import React, { useState } from "react";
import "./style.css";

const Personlist = ({ persons, setPersons }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredPersons = persons.filter((person) => {
    return (
      person.firstName.toLowerCase().includes(search.toLowerCase()) ||
      person.lastName.toLowerCase().includes(search.toLowerCase()) ||
      person.selectedCity.toLowerCase().includes(search.toLowerCase()) ||
      person.pincode.includes(search)
    );
  });

  const pageCount = Math.ceil(filteredPersons.length / pageSize);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const startIndex = (currentPage - 1) * pageSize;
  const pagedPersons = filteredPersons.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <div className="box2">
        <h1 className="list_heading">Person List</h1>
        <div>
          <input
            type="text"
            placeholder="Search Person..."
            value={search}
            onChange={handleSearchChange}
            className="search_input"
          />
        </div>
        {pagedPersons.length > 0 ? (
          <table className="person_data">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {pagedPersons.map((person, index) => {
                return (
                  <tr key={index}>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.dob}</td>
                    <td>{person.email}</td>
                    <td>{person.mobile}</td>
                    <td>{person.selectedCity}</td>
                    <td>{person.pincode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="warnig_box">
            <p>No Records Found !</p>
          </div>
        )}
        <div className="pagination">
          {pages.map((page) => (
            <button
              className="paging_btn"
              key={page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Personlist;
