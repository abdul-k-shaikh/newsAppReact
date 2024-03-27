import React, { Component } from "react";
import NewsItem from "./NewsItem";
import SpinnerC from "./SpinnerC";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

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
     loading: true,
     page:1,
     totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async updateNews(){
    const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc0b7f4c367c4b679e8e1fe8b065a4de&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults:parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount(){
    this.updateNews();
  }
  handlePrevClick = async ()=>{
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () =>{
      this.setState({ page: this.state.page + 1});
      this.updateNews()
    }

  fetchMoreData=async()=>{
      this.setState({page: this.state.page+1});
      const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc0b7f4c367c4b679e8e1fe8b065a4de&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults:parsedData.totalResults,
      
    });
    };


  render() {
    return (
      <>
        
        <h1 className="text-center" style={{margin:'30px 0px'}}>NewsMonkey - Top Headlines From {(this.props.category)}
        </h1>
        {this.state.loading && <SpinnerC/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<h4>Loading...</h4>}
          style={{ overflow: "hidden"  }}
        >
          <div className="container">

        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url} >
          <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88): ""} 
          imageUrl={element.urlToImage } newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}>
            
          </NewsItem>
        </div>
        })} 
        </div>
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </>
    );
  }
}

export default News;
