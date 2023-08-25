import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize:'15',
    category:'general'
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1); 
    }
  constructor(props) {
    super(props);
    this.state = { articles: [], loading: false, page: 1,
    totalResults:0 };
    document.title= `${this.capitalize(this.props.category)}-NewsEverywhere`;
  }
  async componentDidMount() {
    this.props.setprogress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33de9cd9e1a0400c80e2a1d59deca626&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({loading:true})
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    });
    this.props.setprogress(100);
    
  }
  // handlePrev = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33de9cd9e1a0400c80e2a1d59deca626&page=${
  //     this.state.page - 1
  //   }&pagesize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   this.setState({loading:true})
  //   let parsedData = await data.json();

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading:false
  //   });

  // handleNext = async () => {
  //   if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

  //   } else {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33de9cd9e1a0400c80e2a1d59deca626&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
  //     let data = await fetch(url);
  //     this.setState({loading:true})
  //     let parsedData = await data.json();

  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading:false
  //     });
  //   }
  // };
  fetchMoreData = async() => {
    this.props.setprogress(10);
   this.setState({page:this.state.page+1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33de9cd9e1a0400c80e2a1d59deca626&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
  //  this.setState({loading:true});
   let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
     
     articles: this.state.articles.concat(parsedData.articles),
     totalResults:parsedData.totalResults,
     loading:false
   });
   
   this.props.setprogress(100);
  };

  render() {
    return (
     <>
      <h1 className="text-center" style={{margin: '15px 0px',
    marginTop: '50px'}}>News-Everywhere top headlines</h1>
      {this.state.loading&&<Loading/>}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Loading/>}
        >
         <div className="container ">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={
                    element.title ? element.title.slice(0, 40) + "..." : " "
                  }
                  description={
                    element.description
                      ? element.description.slice(0, 70) + "..."
                      : " "
                  }
                  imgeUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div> 
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between ">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            &larr; Previous
          </button>
          <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNext}>
            Next &rarr;
          </button>
        </div> */}
        </>
      
    );
  }
};