import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "utils/APIRoutes";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

export default function AdminManage(userData) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(getUser);
      setUsers(response.data);
    }

    fetchUsers();
  }, []);

  const [message, setMessage] = useState("");
  const BASE_URL = "http://localhost:4000";

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${id}`);
      setMessage(response.data.message);
      window.location.reload(); // Reload the page after user is deleted
    } catch (error) {
      console.error(error);
      setMessage("Error deleting user");
    }
  };

  return (
    <div className="table" style={{ height: "auto" }}>
      <div className="table-inner" style={{ width: "auto" }}>
        {message && <div>{message}</div>}
        <table style={{ width: 500 }}>
          <thead>
            <tr>
              <th>UserName</th>
              <th>Country</th>
              <th>Gender</th>
              <th>UserType</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((i) => (
              <tr key={i._id}>
                <td>{i.username}</td>
                <td>{i.country}</td>
                <td>{i.gender}</td>
                <td>{i.userType}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(i._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
