import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import SpinnerC from "./SpinnerC";
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] =  useState(1);
  const [totalResult, settotalResult] = useState(0);
  
  // document.title=`${this.capitalizeFirstLetter(props.category)} - NewsMonkey`


  // constructor(){
  //   super();
  //   console.log("Hello I am a constructor from news componenet");
  //   this.state = {
  //    articles:[],
  //    loading: true,
  //    page:1,
  //    totalResults:0
  //   }
  //   // document.title=`${this.capitalizeFirstLetter(props.category)} - NewsMonkey`
  // }

  const updateNews = async ()=>{  
    props.setProgress(10);
    const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setState({loading:true});
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    settotalResult(parsedData.totalResults)
    setLoading(false);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles, 
      totalResults:parsedData.totalResults,
      loading: false
    });
    props.setProgress(100);
  }

  useEffect(() =>{
    updateNews();
  },[])
  
  const handlePrevClick = async ()=>{
    setPage(page-1);
    updateNews();
  }

  const handleNextClick = async () =>{
      setPage(page+1)
      updateNews()
    }

  const fetchMoreData=async()=>{
      setPage(page+1);
     
      const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=$(page)&pageSize=${props.pageSize}`;
    // setState({loading:true});
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    settotalResult(parsedData.totalResults)
    console.log(parsedData);
    // this.setState({
    //   articles: articles.concat(parsedData.articles), 
    //   totalResults:parsedData.totalResults,
      
    // });
    };


  
    return (
      <> 
        <h1 className="text-center" style={{margin:'30px 0px'}}>NewsMonkey - Top Headlines From {(props.category)}
        </h1>
        {loading && <SpinnerC/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<h4>Loading...</h4>}
          style={{ overflow: "hidden"  }}
        >
      <div className="container">

        <div className="row">
          {articles.map((element)=>{
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
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </>
    );
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category : 'general'
}
News.propTypes = {
  country:PropTypes.string,
  pageSize: PropTypes.number,
  category : PropTypes.string
}

export default News;
