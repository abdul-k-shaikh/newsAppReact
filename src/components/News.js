import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [
    {
      "source": { "id": "news-com-au", "name": "News.com.au" },
      "author": "Andrew McMurtry",
      "title": "Star caught out as rare penalty rocks cricket",
      "description": "India have gifted England five runs to start their innings after Ravichandran Ashwin was penalised after running down the middle of the pitch.",
      "url": "https://www.news.com.au/sport/cricket/england-handed-fiverun-penalty-as-ravi-ashwin-caught-bang-to-rights/news-story/288925258407f0479444c2bb9c6f4272",
      "urlToImage": "https://content.api.news/v3/images/bin/5e7d278bd206c1cc0f7e22ecbdd93ef7",
      "publishedAt": "2024-02-16T08:38:00Z",
      "content": "India have gifted England five runs to start their innings after Ravichandran Ashwin was penalised after running down the middle of the pitch.\r\nThe rare penalty was handed out as India moved past 350… [+3431 chars]"
    },
    {
      "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]
  constructor(){
    super();
    console.log("Hello I am a constructor from news componenet");
    this.state = {
     articles:this.articles,
     loading: false
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4">
          <NewsItem key={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl="TODO"></NewsItem>
        </div>
        })}
          
        </div>
      </div>
    );
  }
}

export default News;
