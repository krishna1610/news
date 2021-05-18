import React from "react";
import AppHeaderBrand from "./AppHeaderBrand";
import AppHeaderCountries from "./AppHeaderCountries";
import AppHeaderSearch from "./AppHeaderSearch";

function AppHeader({
  countries,
  selectedCountryIndex,
  changeSelectedCountry,
  searchValue,
  searchTextOnChanged,
  searchParticularArticle,
  resetParticularArticle,
}) {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <AppHeaderBrand />
          <AppHeaderCountries
            countries={countries}
            selectedCountryIndex={selectedCountryIndex}
            changeSelectedCountry={changeSelectedCountry}
          />
          <AppHeaderSearch
            searchValue={searchValue}
            searchTextOnChanged={searchTextOnChanged}
            searchParticularArticle={searchParticularArticle}
            resetParticularArticle={resetParticularArticle}
          />
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
