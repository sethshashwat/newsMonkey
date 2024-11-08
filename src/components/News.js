import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [spinner, setSpinner] = useState(false);

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    document.title = `${capitalize(props.category)} - NewsMonkey`;

    const updateNews = async () => {
        props.setProgress(30);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5295fdd7916c44718e7450faa35ec253&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(50);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        setPage(page + 1);
        setSpinner(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5295fdd7916c44718e7450faa35ec253&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setSpinner(false);
    }

    return (
        <>
            <h1 className="text-center" style={{ marginTop: "90px" }}>
                NewsMonkey - Top {capitalize(props.category)} Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={spinner && <Spinner />}
            >
                <div className="container">
                    <div className="row my-3">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4 my-3">
                                    <NewsItem
                                        title={element.title}
                                        description={element.description}
                                        imageUrl={element.urlToImage}
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
        </>
    );
}

export default News;
