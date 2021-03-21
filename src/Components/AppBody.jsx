import React from "react";

const sourcesUrl =
  "https://newsapi.org/v2/sources?apiKey=b5e4aade57854b568497b5284c3d2c3e";

const articlesUrl =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=b5e4aade57854b568497b5284c3d2c3e";

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      sources: [],
      sourceError: null,
      articleError: null,
      selectionSouces: null,
    };
  }

  sources() {
    fetch(sourcesUrl)
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

  articles() {
    fetch(articlesUrl)
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
    this.articles();
  }

  selectedSource(index) {
    this.setState({ selectionSouces: index });
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
                  (this.state.selectionSouces === index ? "active" : "")
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
        <div>
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
                      <h5 className="card-title">{article.title}</h5>
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
      <div className="container">
        <div className="row">
          <div className="col-4">{sourceResult}</div>
          <div className="col-8">{articleResult}</div>
        </div>
      </div>
    );
  }
}
export default AppBody;
