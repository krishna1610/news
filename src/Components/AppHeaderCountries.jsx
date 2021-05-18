import React from "react";

function AppHeaderCountries({
  countries,
  selectedCountryIndex,
  changeSelectedCountry,
}) {
  return (
    <ul className="navbar-nav me-auto">
      {countries.map((country, index) => {
        return (
          <li className="nav-item" key={index}>
            <a
              className={
                "nav-link " + (selectedCountryIndex === index ? "active" : "")
              }
              href="#"
              onClick={() => {
                changeSelectedCountry(index);
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

export default AppHeaderCountries;
