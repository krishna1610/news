import React from "react";

function AppBodySources({
  sourceError,
  selectedSourceIndex,
  sourceDidChanged,
  sources,
}) {
  let sourceResult;
  if (sourceError) {
    sourceResult = <p>{sourceError}</p>;
  } else {
    sourceResult = (
      <ul className="list-group">
        {sources.map((source, index) => {
          return (
            <li
              className={
                "list-group-item " +
                (selectedSourceIndex === index ? "active" : "")
              }
              key={index}
              onClick={() => {
                sourceDidChanged(index);
              }}
            >
              {source.name}
            </li>
          );
        })}
      </ul>
    );
  }
  return <div className="col-4">{sourceResult}</div>;
}

export default AppBodySources;
