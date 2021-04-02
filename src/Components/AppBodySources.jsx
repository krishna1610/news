import React from "react";

class AppBodySources extends React.Component {
  render() {
    let sourceResult;
    if (this.props.sourceError) {
      sourceResult = <p>{this.props.sourceError}</p>;
    } else {
      sourceResult = (
        <ul className="list-group">
          {this.props.sources.map((source, index) => {
            return (
              <li
                className={
                  "list-group-item " +
                  (this.props.selectedSourceIndex === index ? "active" : "")
                }
                key={index}
                onClick={() => {
                  this.props.sourceDidChanged(index);
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
}

export default AppBodySources;
