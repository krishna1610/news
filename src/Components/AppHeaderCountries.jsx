import React from "react";

class AppHeaderCountries extends React.Component {
  render() {
    return (
      <ul className="navbar-nav me-auto">
        {this.props.countries.map((country, index) => {
          return (
            <li className="nav-item" key={index}>
              <a
                className={
                  "nav-link " +
                  (this.props.selectedCountryIndex === index ? "active" : "")
                }
                href="#"
                onClick={() => {
                  this.props.changeSelectedCountry(index);
                }}
              >
                {country}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default AppHeaderCountries;
