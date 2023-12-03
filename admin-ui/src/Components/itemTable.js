import { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import "./itemTable.css";

import Button from "@mui/material/Button";
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

export default function Itemtable() {
  const {
    data,
    setData,
    searchItem,
    setSearchTerm,
    filteredData,
    setFilteredData,
    currentPage,
    setCurrentPage,
    checkedRows,
    setCheckedRows,
    isSelectedAll,
    setIsSelectedAll,
    ITEMS_PER_PAGE
  } = useContext(Context);

  const [isEditing, setIsEditing] = useState({});
  const [editedValName, setEditedValName] = useState("");
  const [editedValEmail, setEditedValEmail] = useState("");
  const [editedValRole, setEditedValRole] = useState("");

  function handleCheckChange(event, id) {
    setIsSelectedAll(false);
    if (event.target.checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows.filter((i) => i !== id));
    }
  }
  function handleCheckAll(event, name) {
    setIsSelectedAll(!isSelectedAll);
    if (event.target.checked) {
      const dataView = filteredData.slice(
        currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );
      const checkVisibleData = dataView.map((item) => item.id);
      setCheckedRows(checkVisibleData);
    } else {
      setCheckedRows([]);
    }
  }

  function deleteMultiple() {
    const newFilteredData = filteredData.filter(
      (e) => !checkedRows.includes(e.id)
    );
    setFilteredData(newFilteredData);
    const newData = data.filter((e) => !checkedRows.includes(e.id));
    setData(newData);
    setIsSelectedAll(false);
  }

  const handleDelete = (id) => {
    const newFilteredData = filteredData.filter((e) => e.id !== id);
    setFilteredData(newFilteredData);
    const newData = data.filter((e) => e.id !== id);
    setData(newData);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchItem]);

  async function fetchData() {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data1 = await response.json();
    setFilteredData(data1);
    setData(data1);

    console.log(data1);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handleEdit(id) {
    setIsEditing({ [id]: true });

    const index = data.findIndex((e) => e.id === id);

    setEditedValName(data[index].name);
    setEditedValEmail(data[index].email);
    setEditedValRole(data[index].role);

    console.log(isEditing);
  }

  function Edit(id) {
    setIsEditing({ [id]: !isEditing[id] });
  }

  function Save(id) {
    const newData = [...data];
    const index = data.findIndex((e) => e.id === id);

    newData[index].name = editedValName;
    newData[index].email = editedValEmail;
    newData[index].role = editedValRole;

    setData(newData);
    setFilteredData(newData);
    setIsEditing({ [id]: false });
    setEditedValEmail("");
    setEditedValName("");
    setEditedValRole("");
    FilterData();
  }

  const FilterData = () => {
    const dataFilter = data.filter(
      (item) =>
        item.name.includes(searchItem.toLowerCase()) ||
        item.email.includes(searchItem.toLowerCase()) ||
        item.role.includes(searchItem.toLowerCase())
    );
    setFilteredData(dataFilter);
  };

  useEffect(() => {
    FilterData();
  }, [searchItem]);

  return (
    <div className="MyList">
      <>
        <table>
          <thead>
            <tr>
              <th>
                {" "}
                <Checkbox
                  className="checkbox"
                  name="selectAll"
                  checked={isSelectedAll}
                  onChange={(event) => handleCheckAll(event)}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="actionColumnHead">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .slice(
                currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
                currentPage * ITEMS_PER_PAGE
              )
              .map((item, index) => (
                <>
                  <tr
                    key={item.id}
                    className={
                      checkedRows.includes(item.id) ? "checked" : "unchecked"
                    }
                  >
                    <td>
                      <Checkbox
                        className="checkbox"
                        name={item.name}
                        checked={checkedRows.includes(item.id)}
                        onChange={(event) => handleCheckChange(event, item.id)}
                      />
                    </td>
                    <td>
                      {isEditing[item.id] ? (
                        <>
                          <TextField
                            id="outlined-helperText"
                            label="Name"
                            value={editedValName}
                            onChange={(e) => setEditedValName(e.target.value)}
                            defaultValue="UserName"
                            helperText="User FullName"
                          />
                          <CancelPresentationSharpIcon
                            className="close pointer"
                            onClick={() => Edit(item.id)}
                          ></CancelPresentationSharpIcon>
                        </>
                      ) : (
                        <>
                          <span>{item.name}</span>
                        </>
                      )}
                    </td>
                    <td>
                      {isEditing[item.id] ? (
                        <>
                          <TextField
                            id="outlined-helperText"
                            label="E-Mail"
                            value={editedValEmail}
                            onChange={(e) => setEditedValEmail(e.target.value)}
                            defaultValue="E-mail ID"
                            helperText="User Official Mail ID"
                          />
                          <CancelPresentationSharpIcon
                            className="close pointer"
                            onClick={() => Edit(item.id)}
                          ></CancelPresentationSharpIcon>
                        </>
                      ) : (
                        <>
                          <span>{item.email}</span>
                        </>
                      )}
                    </td>
                    <td>
                      {isEditing[item.id] ? (
                        <>
                          <TextField
                            id="outlined-helperText"
                            label="Role"
                            value={editedValRole}
                            onChange={(e) => setEditedValRole(e.target.value)}
                            defaultValue="UserName"
                            helperText="User Role in Organisation"
                          />
                          <CancelPresentationSharpIcon
                            className="close pointer"
                            onClick={() => Edit(item.id)}
                          ></CancelPresentationSharpIcon>
                        </>
                      ) : (
                        <>
                          <span>{item.role}</span>
                        </>
                      )}
                    </td>
                    <td className="actionButtonsColumn">
                      {isEditing[item.id] ? (
                        <span className="save">
                          <Fab
                            aria-label="save"
                            className="save"
                            onClick={() => Save(item.id)}
                          >
                            <SaveIcon />
                          </Fab>
                        </span>
                      ) : (
                        <span className="edit">
                          <Fab
                            aria-label="edit"
                            className="edit"
                            onClick={() => handleEdit(item.id)}
                          >
                            <EditIcon />
                          </Fab>
                        </span>
                      )}
                      <div className="trash">
                        <Fab
                          aria-label="delete"
                          className="trash"
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        <div className="footer">
          <span>
            <button className="deleteSelected" onClick={deleteMultiple}>
              Delete Selected
            </button>
          </span>
        </div>
      </>
    </div>
  );
}
