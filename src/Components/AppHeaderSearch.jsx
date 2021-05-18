import React from "react";

function AppHeaderSearch({
  searchValue,
  searchTextOnChanged,
  searchParticularArticle,
  resetParticularArticle,
}) {
  return (
    <>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchValue}
        onChange={(event) => {
          searchTextOnChanged(event);
        }}
      ></input>
      <button
        className="btn btn-outline-success"
        onClick={(event) => {
          searchParticularArticle(event);
        }}
      >
        Search
      </button>
      <button
        className="btn btn-outline-success"
        onClick={(event) => {
          resetParticularArticle(event);
        }}
      >
        Reset
      </button>
    </>
  );
}

export default AppHeaderSearch;
