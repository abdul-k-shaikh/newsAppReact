import React, { Component } from "react";
import NewsItem from "./NewsItem";
import SpinnerC from "./SpinnerC";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
      country: 'in',
      pageSize: 8,
      category : 'general'
  }
    static propTypes = {
      country:PropTypes.string,
      pageSize: PropTypes.number,
      category : PropTypes.string
    }

  constructor(){
    super();
    console.log("Hello I am a constructor from news componenet");
    this.state = {
     articles:[],
     loading: false,
     page:1,
     totalResults:0
    }
  }

  async componentDidMount(){
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc0b7f4c367c4b679e8e1fe8b065a4de&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles, 
      totalResults:parsedData.totalResults,
      loading: false
    });
  }
  handlePrevClick = async ()=>{
    console.log("Previous")
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc0b7f4c367c4b679e8e1fe8b065a4de&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
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
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc0b7f4c367c4b679e8e1fe8b065a4de&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({loading: true})
      console.log(parsedData);
  
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false, 
      })
    }
    // else{
    
    // }
}
  

  render() {
    return (
      <div className="container my-3">
        
        <h1 className="text-center" style={{margin:'30px 0px'}}>NewsMonkey - Top Headlines From {(this.props.category)}
        </h1>
        {/* {this.state.loading && <SpinnerC/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.totalResults}
          loader={<h4>Loading...</h4>}

        >
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url} >
          <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88): ""} 
          imageUrl={element.urlToImage } newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}>
            
          </NewsItem>
        </div>
        })} 
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
