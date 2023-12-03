import Itemtable from "./Components/itemTable";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Context } from "./Components/Context";
import SearchBar from "./Components/SearchBar";
import Pagination from "./Components/Pagination";

export default function App() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedRows, setCheckedRows] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const ITEMS_PER_PAGE = 10;

  return (
    <Context.Provider
      value={{
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
        ITEMS_PER_PAGE,
      }}
    >
      <div className="itemApp">
        <Router>
          ADMIN UI
          <SearchBar />
          <Routes>
            <Route exact path="/" element={<Itemtable />} />
          </Routes>
          <Pagination />
        </Router>
      </div>
    </Context.Provider>
  );
}
