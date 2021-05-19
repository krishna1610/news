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

function App() {
  const [articles, setArticles] = useState([]);
  const [articleError, setArticleError] = useState(null);
  const [sources, setSources] = useState([]);
  const [sourceError, setSourceError] = useState(null);
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(-1);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState("");

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
        setArticles(articles);
        setArticleError(null);
      })
      .catch((error) => {
        setArticleError(error);
        setArticles([]);
      });
  };

  useEffect(() => {
    const fetchSources = () => {
      let url = sourcesUrl;
      let selectedCountry = countries[selectedCountryIndex];
      url += "&country=" + selectedCountry;
      if (selectedCategoryIndex >= 0) {
        let selectedCategory = categories[selectedCategoryIndex];
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
          setSelectedSourceIndex(-1);
          setSources(sources);
          setSourceError(null);
        })
        .catch((error) => {
          console.log(error);
          setSelectedSourceIndex(-1);
          setSources([]);
          setSourceError(error);
        });
    };

    fetchSources();
  }, [selectedCountryIndex, selectedCategoryIndex]);

  useEffect(() => {
    const fetchArticles = () => {
      let url = articlesUrl;
      if (selectedSourceIndex < 0) {
        // Means we don't have any source selected
        let selectedCountry = countries[selectedCountryIndex];
        url += `&country=${selectedCountry}`;
        if (selectedCategoryIndex >= 0) {
          let selectedCategory = categories[selectedCategoryIndex];
          url += `&category=${selectedCategory}`;
        }
      } else {
        let selectedSource = sources[selectedSourceIndex];
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
          setArticles(articles);
          setArticleError(null);
        })
        .catch((error) => {
          setArticleError(error);
          setArticles([]);
        });
    };

    if (searchValue.length === 0) {
      fetchArticles();
    }
  }, [sources, selectedSourceIndex, searchValue]); // "a"

  const sourceDidChanged = (index) => {
    setSelectedSourceIndex(index);
  };

  const changeSelectedCountry = (index) => {
    setSelectedCountryIndex(index);
  };

  const changeSelectedCategory = (index) => {
    setSelectedCategoryIndex(index);
  };

  const searchParticularArticle = () => {
    fetchEveryThing();
  };

  const resetParticularArticle = () => {
    setSearchValue("");
  };

  const searchTextOnChanged = (event) => {
    setSearchValue(event.target.value);
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
        selectedCategoryIndex={selectedCategoryIndex}
        changeSelectedCategory={changeSelectedCategory}
        sourceError={sourceError}
        sources={sources}
        selectedSourceIndex={selectedSourceIndex}
        sourceDidChanged={sourceDidChanged}
        articleError={articleError}
        articles={articles}
      />
    </div>
  );
}

export default App;
