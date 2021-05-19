import React from "react";

function AppBodyCategoryList({
  categories,
  selectedCategoryIndex,
  changeSelectedCategory,
}) {
  return (
    <div className="container">
      <ul className="list-group list-group-horizontal">
        {categories.map((category, index) => {
          return (
            <li
              className={
                "list-group-item " +
                (selectedCategoryIndex === index ? "active" : "")
              }
              key={index}
              onClick={() => {
                changeSelectedCategory(index);
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

export default AppBodyCategoryList;
