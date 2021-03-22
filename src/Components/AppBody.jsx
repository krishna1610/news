import React from "react";

// https://<domain>/<path>?<param1>=<value1>&<param2>=<value2>
const sourcesUrl =
  "https://newsapi.org/v2/sources?apiKey=77a634d78fbe42eaa0059e2eed7868f2&language=en";

const articlesUrl =
  "https://newsapi.org/v2/top-headlines?apiKey=77a634d78fbe42eaa0059e2eed7868f2";

// country selection change
// => fetch sources for selected country
// => fetch articles for selected country
// Initial - componentDidMount - fetch -> country=us --> articles
// Selection Change - fetch -> sources=<selectedSource.id> --> articles

class AppBody extends React.Component {
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
    };
  }

  sources(country) {
    let url = sourcesUrl;
    if (country) {
      url += "&country=" + country;
    }
    console.log(url);
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

  articles(id, countryName) {
    let url = articlesUrl;

    if (id === undefined || id === null) {
      url += "&country=" + countryName; // selected country
    } else {
      url += "&sources=" + id;
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
        console.log(error);
        this.setState({ articles: [], articleError: error });
      });
  }

  componentDidMount() {
    this.sources();
    this.articles(undefined, "us"); // id = undefined
  }

  selectedSource(index) {
    let selectedSourceObj = this.state.sources[index];
    this.setState({ articles: [], selectedSourceIndex: index }, () => {
      // after render method called
      this.articles(selectedSourceObj.id);
    });
  }

  selectedCountry(index) {
    let countryName = this.state.countries[index];
    this.setState({ sources: [], selectedCountryIndex: index }, () => {
      this.sources(countryName);
      this.articles(undefined, countryName);
    });
  }
  render() {
    let sourceResult;
    if (this.state.sourceError) {
      sourceResult = <p>{this.state.sourceError}</p>;
    } else {
      sourceResult = (
        <ul className="list-group">
          {this.state.sources.map((source, index) => {
            return (
              <li
                className={
                  "list-group-item " +
                  (this.state.selectedSourceIndex === index ? "active" : "")
                }
                key={index}
                onClick={() => {
                  this.selectedSource(index);
                }}
              >
                {source.name}
              </li>
            );
          })}
        </ul>
      );
    }

    let articleResult;
    if (this.state.articleError) {
      articleResult = <p>{this.state.articleError}</p>;
    } else {
      articleResult = (
        <div className="container">
          {this.state.articles.map((article, index) => {
            return (
              <div className="card my-2" key={index}>
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      className="img img-fluid"
                      src={article.urlToImage}
                      alt={article.source.name}
                    ></img>
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href={article.url}>{article.title}</a>
                      </h5>
                      <p className="card-text">{article.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {article.source.name}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <>
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand" href="#">
                News
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarsExample02"
                aria-controls="navbarsExample02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarsExample02">
                <ul className="navbar-nav me-auto">
                  {this.state.countries.map((country, index) => {
                    return (
                      <li className="nav-item" key={index}>
                        <a
                          className={
                            "nav-link " +
                            (this.state.selectedCountryIndex === index
                              ? "active"
                              : "")
                          }
                          href="#"
                          onClick={() => {
                            this.selectedCountry(index);
                          }}
                        >
                          {country}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <div className="container">
            <div className="row">
              <div className="col-4">{sourceResult}</div>
              <div className="col-8">{articleResult}</div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
export default AppBody;
