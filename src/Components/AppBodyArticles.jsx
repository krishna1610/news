import React from "react";

class AppBodyArticles extends React.Component {
  render() {
    let articleResult;
    if (this.props.articleError) {
      articleResult = <p>{this.props.articleError}</p>;
    } else {
      articleResult = (
        <div className="container">
          {this.props.articles.map((article, index) => {
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
                        <a href={article.url} target="_blank">
                          {article.title}
                        </a>
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

    return <div className="col-8">{articleResult}</div>;
  }
}

export default AppBodyArticles;
