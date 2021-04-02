import React from "react";
import AppHeaderBrand from "./AppHeaderBrand";
import AppHeaderCountries from "./AppHeaderCountries";
import AppHeaderSearch from "./AppHeaderSearch";

class AppHeader extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <AppHeaderBrand />
            <AppHeaderCountries
              countries={this.props.countries}
              selectedCountryIndex={this.props.selectedCountryIndex}
              changeSelectedCountry={this.props.changeSelectedCountry}
            />
            <AppHeaderSearch
              searchValue={this.props.searchValue}
              searchTextOnChanged={this.props.searchTextOnChanged}
              searchParticularArticle={this.props.searchParticularArticle}
              resetParticularArticle={this.props.resetParticularArticle}
            />
          </div>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
