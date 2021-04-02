import React from "react";
import AppBodyArticles from "./AppBodyArticles";
import AppBodyCategoryList from "./AppBodyCategoryList";
import AppBodySources from "./AppBodySources";

class AppBody extends React.Component {
  render() {
    return (
      <main>
        <AppBodyCategoryList
          categories={this.props.categories}
          slectedCategoryIndex={this.props.slectedCategoryIndex}
          changeSelectedCategory={this.props.changeSelectedCategory}
        />
        <div className="container">
          <div className="row">
            <AppBodySources
              sourceError={this.props.sourceError}
              selectedSourceIndex={this.props.selectedSourceIndex}
              sourceDidChanged={this.props.sourceDidChanged}
              sources={this.props.sources}
            />
            <AppBodyArticles
              articleError={this.props.articleError}
              articles={this.props.articles}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default AppBody;
