import React from "react";
import AppBodyArticles from "./AppBodyArticles";
import AppBodyCategoryList from "./AppBodyCategoryList";
import AppBodySources from "./AppBodySources";

function AppBody({
  categories,
  selectedCategoryIndex,
  changeSelectedCategory,
  sourceError,
  sources,
  selectedSourceIndex,
  sourceDidChanged,
  articleError,
  articles,
}) {
  return (
    <main>
      <AppBodyCategoryList
        categories={categories}
        selectedCategoryIndex={selectedCategoryIndex}
        changeSelectedCategory={changeSelectedCategory}
      />
      <div className="container">
        <div className="row">
          <AppBodySources
            sourceError={sourceError}
            selectedSourceIndex={selectedSourceIndex}
            sourceDidChanged={sourceDidChanged}
            sources={sources}
          />
          <AppBodyArticles articleError={articleError} articles={articles} />
        </div>
      </div>
    </main>
  );
}

export default AppBody;
