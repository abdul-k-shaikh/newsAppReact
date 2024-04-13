import React from "react";

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://static.toiimg.com/thumb/msid-107827681,width-1070,height-580,imgsize-514350,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {this.title}
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left:'90%', zIndex:'1'}}>
                {source}  
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more...
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
