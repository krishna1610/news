import React, { useEffect, useState } from "react";
import AppHeader from "./Components/AppHeader";
import AppBody from "./Components/AppBody";

// https://<domain>/<path>?<param1>=<value1>&<param2>=<value2>
const sourcesUrl =
  "https://newsapi.org/v2/sources?apiKey=c4e8b307d60c46ffbe0f1e806e47d5f4&language=en";

const articlesUrl =
  "https://newsapi.org/v2/top-headlines?apiKey=c4e8b307d60c46ffbe0f1e806e47d5f4";

const everyThingUrl =
  "https://newsapi.org/v2/everything?apiKey=c4e8b307d60c46ffbe0f1e806e47d5f4";

// country selection change
// => fetch sources for selected country
// => fetch articles for selected country
// Initial - componentDidMount - fetch -> country=us --> articles
// Selection Change - fetch -> sources=<selectedSource.id> --> articles

function App() {
  const countries = ["us", "gb", "in"];
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const [articles, setArticles] = useState({
    articles: [],
    articleError: null,
  });
  const [sources, setSources] = useState({ sources: [], sourceError: null });
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(-1);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [slectedCategoryIndex, setSlectedCategoryIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState("");

  const fetchSources = () => {
    let url = sourcesUrl;
    let selectedCountry = countries[selectedCountryIndex];
    url += "&country=" + selectedCountry;
    if (slectedCategoryIndex >= 0) {
      let selectedCategory = categories[slectedCategoryIndex];
      url += "&category=" + selectedCategory;
    }
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw "data not found";
        }
      })
      .then((data) => {
        return data.sources;
      })
      .then((sources) => {
        setSources({ sources: sources, sourceError: null });
        //this.setState({ sources: sources, sourceError: null });
      })
      .catch((error) => {
        console.log(error);
        setSources({ sources: [], sourceError: error });
        //this.setState({ sources: [], sourceError: error });
      });
  };

  const fetchArticles = () => {
    let url = articlesUrl;
    if (selectedSourceIndex < 0) {
      // Means we don't have any source selected
      let selectedCountry = countries[selectedCountryIndex];
      url += `&country=${selectedCountry}`;
      if (slectedCategoryIndex >= 0) {
        let selectedCategory = categories[slectedCategoryIndex];
        url += `&category=${selectedCategory}`;
      }
    } else {
      let selectedSource = sources.sources[selectedSourceIndex];
      url += "&sources=" + selectedSource.id;
    }
    console.log(url);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw "Unknown error occured. Please try again later.";
        }
      })
      .then((data) => {
        return data.articles;
      })
      .then((articles) => {
        setArticles({ articles: articles, articleError: null });
      })
      .catch((error) => {
        setArticles({ articles: [], articleError: error });
      });
  };

  const fetchEveryThing = () => {
    let url = everyThingUrl;
    let newStr;
    if (searchValue) {
      newStr = searchValue.replaceAll(" ", "+");
    }
    url += "&q=" + newStr;
    console.log(url);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw "error";
        }
      })
      .then((data) => {
        return data.articles;
      })
      .then((articles) => {
        setArticles({ articles: articles, articleError: null });
      })
      .catch((error) => {
        setArticles({ articles: [], articleError: error });
      });
  };

  useEffect(() => {
    fetchSources();
  });
  useEffect(() => {
    fetchArticles();
  });

  const sourceDidChanged = (index) => {
    this.setState({ articles: [], selectedSourceIndex: index }, () => {
      // after render method called
      this.fetchArticles();
    });
  };

  const changeSelectedCountry = (index) => {
    this.setState(
      {
        sources: [],
        selectedCountryIndex: index,
        selectedSourceIndex: -1,
        slectedCategoryIndex: -1,
      },
      () => {
        this.fetchSources();
        this.fetchArticles();
      }
    );
  };

  const changeSelectedCategory = (index) => {
    this.setState(
      { slectedCategoryIndex: index, sources: [], selectedSourceIndex: -1 },
      () => {
        this.fetchSources();
        this.fetchArticles();
      }
    );
  };

  const searchParticularArticle = () => {
    this.setState({}, () => {
      this.fetchEveryThing();
    });
  };

  const resetParticularArticle = () => {
    this.setState({ searchValue: "" }, () => {
      this.fetchArticles();
    });
  };

  const searchTextOnChanged = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  return (
    <div>
      <AppHeader
        countries={countries}
        selectedCountryIndex={selectedCountryIndex}
        changeSelectedCountry={changeSelectedCountry}
        searchValue={searchValue}
        searchTextOnChanged={searchTextOnChanged}
        searchParticularArticle={searchParticularArticle}
        resetParticularArticle={resetParticularArticle}
      />
      <AppBody
        categories={categories}
        slectedCategoryIndex={slectedCategoryIndex}
        changeSelectedCategory={changeSelectedCategory}
        sourceError={sources.sourceError}
        sources={sources.sources}
        selectedSourceIndex={selectedSourceIndex}
        sourceDidChanged={sourceDidChanged}
        articleError={articles.articleError}
        articles={articles.articles}
      />
    </div>
  );
}

export default App;
