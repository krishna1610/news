import React from "react";

class AppBodyCategoryList extends React.Component {
  render() {
    return (
      <div className="container">
        <ul className="list-group list-group-horizontal">
          {this.props.categories.map((category, index) => {
            return (
              <li
                className={
                  "list-group-item " +
                  (this.props.slectedCategoryIndex === index ? "active" : "")
                }
                key={index}
                onClick={() => {
                  this.props.changeSelectedCategory(index);
                }}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AppBodyCategoryList;
