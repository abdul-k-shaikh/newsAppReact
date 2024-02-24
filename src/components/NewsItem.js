import React, { Component } from "react";

export class NewsItem extends Component {

    constructor(){
        super();
        console.log("Hello I am a constructor")
    }
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://static.toiimg.com/thumb/msid-107827681,width-1070,height-580,imgsize-514350,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg": imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read more...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
