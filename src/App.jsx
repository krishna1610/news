import React from "react";
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: ["us", "gb", "in"],
      articles: [],
      sources: [],
      sourceError: null,
      articleError: null,
      selectedSourceIndex: -1,
      selectedCountryIndex: 0,
      categories: [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ],
      slectedCategoryIndex: -1,
      searchValue: "",
    };
    this.searchParticularArticle = this.searchParticularArticle.bind(this);
    this.resetParticularArticle = this.resetParticularArticle.bind(this);
    this.changeSelectedCountry = this.changeSelectedCountry.bind(this);
    this.searchTextOnChanged = this.searchTextOnChanged.bind(this);
    this.changeSelectedCategory = this.changeSelectedCategory.bind(this);
    this.sourceDidChanged = this.sourceDidChanged.bind(this);
  }

  fetchSources() {
    let url = sourcesUrl;
    let selectedCountry = this.state.countries[this.state.selectedCountryIndex];
    url += "&country=" + selectedCountry;
    if (this.state.slectedCategoryIndex >= 0) {
      let selectedCategory = this.state.categories[
        this.state.slectedCategoryIndex
      ];
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
        this.setState({ sources: sources, sourceError: null });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ sources: [], sourceError: error });
      });
  }

  fetchArticles() {
    let url = articlesUrl;
    if (this.state.selectedSourceIndex < 0) {
      // Means we don't have any source selected
      let selectedCountry = this.state.countries[
        this.state.selectedCountryIndex
      ];
      url += `&country=${selectedCountry}`;
      if (this.state.slectedCategoryIndex >= 0) {
        let selectedCategory = this.state.categories[
          this.state.slectedCategoryIndex
        ];
        url += `&category=${selectedCategory}`;
      }
    } else {
      let selectedSource = this.state.sources[this.state.selectedSourceIndex];
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
        this.setState({ articles: articles, articleError: null });
      })
      .catch((error) => {
        this.setState({ articles: [], articleError: error });
      });
  }

  fetchEveryThing() {
    let url = everyThingUrl;
    let newStr;
    if (this.state.searchValue) {
      newStr = this.state.searchValue.replaceAll(" ", "+");
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
        this.setState({ articles: articles, articleError: null });
      })
      .catch((error) => {
        this.setState({ articles: [], articleError: error });
      });
  }

  componentDidMount() {
    this.fetchSources();
    this.fetchArticles();
  }

  sourceDidChanged(index) {
    this.setState({ articles: [], selectedSourceIndex: index }, () => {
      // after render method called
      this.fetchArticles();
    });
  }

  changeSelectedCountry(index) {
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
  }

  changeSelectedCategory(index) {
    this.setState(
      { slectedCategoryIndex: index, sources: [], selectedSourceIndex: -1 },
      () => {
        this.fetchSources();
        this.fetchArticles();
      }
    );
  }

  searchParticularArticle() {
    this.setState({}, () => {
      this.fetchEveryThing();
    });
  }

  resetParticularArticle() {
    this.setState({ searchValue: "" }, () => {
      this.fetchArticles();
    });
  }

  searchTextOnChanged(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    return (
      <div>
        <AppHeader
          countries={this.state.countries}
          selectedCountryIndex={this.state.selectedCountryIndex}
          changeSelectedCountry={this.changeSelectedCountry}
          searchValue={this.state.searchValue}
          searchTextOnChanged={this.searchTextOnChanged}
          searchParticularArticle={this.searchParticularArticle}
          resetParticularArticle={this.resetParticularArticle}
        />
        <AppBody
          categories={this.state.categories}
          slectedCategoryIndex={this.state.slectedCategoryIndex}
          changeSelectedCategory={this.changeSelectedCategory}
          sourceError={this.state.sourceError}
          sources={this.state.sources}
          selectedSourceIndex={this.state.selectedSourceIndex}
          sourceDidChanged={this.sourceDidChanged}
          articleError={this.state.articleError}
          articles={this.state.articles}
        />
      </div>
    );
  }
}

export default App;
