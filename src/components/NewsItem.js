import React from "react";

function NewsItem(props) {
    return (
        <div>
            <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "1", left: "90%" }}>
                    {props.source}
                </span>
                <img src={!props.imageUrl ? "https://img.etimg.com/thumb/msid-110054067,width-1200,height-630,imgsize-110642,overlay-etmarkets/photo.jpg" : props.imageUrl}
                    className="card-img-top"
                    alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {!props.author ? "Unknown" : props.author} on {new Date(props.date).toGMTString()}</small></p>
                    <a href={props.newsUrl} className="btn btn-dark" target="_blank" rel="noreferrer">
                        Read More
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem

