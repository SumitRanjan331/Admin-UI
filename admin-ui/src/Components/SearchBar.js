import React, { useEffect, useContext } from "react";
import { Context } from "./Context";
import "./searchBar.css";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  const {
    data,
    searchItem,
    setSearchTerm,
    filteredData,
    setFilteredData
  } = useContext(Context);

  function handleChangeSearch(e) {
    setSearchTerm(e.target.value);
  }

  const FilterData = () => {
    const dataFilter = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.email.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.role.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredData(dataFilter);
  };

  useEffect(() => {
    FilterData();
  }, [searchItem]);

  return (
    <div className="searchBar">
      <TextField
        fullWidth
        size="small"
        id="filled-basic"
        label="Search by name, e-mail or role"
        variant="filled"
        value={searchItem}
        onChange={(e) => handleChangeSearch(e)}
        className="searchTextBox"
      />
    </div>
  );
}
