import axios from "axios";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [naam, setName] = useState(""); // take names of indiviual person
  const [data, setData] = useState([]);
  const [valueSubmit, setValueSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditID] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const handleInput = (event) => {
    setName(event.target.value);
  };
  const saveData = async () => {
    try {
      if (naam !== "") {
        setLoader(true);
        setData([]);
        const res = await axios.post("/api/users", {
          user: { id: v4(), name: naam }
        });
        setValueSubmit(!valueSubmit);
      }
    } catch (error) {
      console.log("Error :( -> ", error);
    }
  };

  const delName = async (uid) => {
    try {
      const res = await axios.delete(`/api/users/${uid}`);
      // console.log(res);
      setLoader(true);
      setData([]);
      setValueSubmit(!valueSubmit);
    } catch (error) {
      console.log("Error at Delete: ", error);
    }
  };

  // changeing input
  const changeEditStatus = (id) => {
    setEditStatus(true);
    setEditID(id);
    console.log(id);
  };

  const closeEditWindow = () => {
    setEditStatus(false);
    setEditID("");
  };

  const handleEditInput = (event) => {
    setEditName(event.target.value);
  };

  const changeInput = async () => {
    try {
      const response = await axios.put(`/api/users/${editId}`, {
        user: { name: editName }
      });
      console.log(response);
      setEditStatus(false);
      setEditID("");
      setEditName("");
      setValueSubmit(!valueSubmit);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await axios.get("/api/users");
      setName("");
      console.log(response.data.users);
      setData(response.data.users);
      setLoader(false);
    })();
  }, [valueSubmit]);

  return (
    <div className="App">
      <h1>Guest Invite List</h1>

      <div className="inputs">
        <label>Enter Name to add in list: </label>

        <input
          onChange={handleInput}
          type="text"
          value={naam}
          placeholder="Type name here"
        ></input>

        <button onClick={saveData}>Submit</button>
      </div>

      {loader && <p>Fetching...</p>}

      <div className="namesList">
        {data.map((item, index) => {
          return (
            <div className="resultNames">
              <li className="items">
                {item.name}
                <button
                  className="editBtn"
                  onClick={() => changeEditStatus(item.id)}
                >
                  Edit
                </button>
                <button className="delBtn" onClick={() => delName(item.id)}>
                  Delete
                </button>
              </li>
            </div>
          );
        })}
      </div>

      {editStatus && (
        <div className="editName">
          <div className="editInputs">
            <input
              onChange={handleEditInput}
              type="text"
              value={editName}
              placeholder="enter name you wanna edit here "
            ></input>
            <div className="editCloseButton">
              <button onClick={closeEditWindow}>X</button>
            </div>
            <button onClick={changeInput}>Change</button>
          </div>
        </div>
      )}
    </div>
  );
}
