import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor(){
    super();
    console.log("Hello I am a constructor from news componenet");
    this.state = {
     articles:[],
     loading: false,
     page:1
    }
  }

  async componentDidMount(){
    console.log("CDM");
    let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=dc0b7f4c367c4b679e8e1fe8b065a4de&page=1pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalArticles:parsedData.totalArticles});
  }
  handlePrevClick = async ()=>{
    console.log("Previous")
    let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=dc0b7f4c367c4b679e8e1fe8b065a4de&page=${this.state.page-1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles
    })
  }

  handleNextClick = async () =>{
    console.log("Next");
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
      let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=dc0b7f4c367c4b679e8e1fe8b065a4de&page=${this.state.page+1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
    }
}
  

  render() {
    return (
      <div className="container my-3">
        
        <h2 className="text-center">NewsMonkey - Top Headlines</h2>
        
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url} >
          <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88): ""} imageUrl={element.urlToImage } newsUrl={element.url}></NewsItem>
        </div>
        })} 
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
