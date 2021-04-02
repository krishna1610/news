import React from "react";

class AppHeaderSearch extends React.Component {
  render() {
    return (
      <>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={this.props.searchValue}
          onChange={(event) => {
            this.props.searchTextOnChanged(event);
          }}
        ></input>
        <button
          className="btn btn-outline-success"
          onClick={(event) => {
            this.props.searchParticularArticle(event);
          }}
        >
          Search
        </button>
        <button
          className="btn btn-outline-success"
          onClick={(event) => {
            this.props.resetParticularArticle(event);
          }}
        >
          Reset
        </button>
      </>
    );
  }
}

export default AppHeaderSearch;
