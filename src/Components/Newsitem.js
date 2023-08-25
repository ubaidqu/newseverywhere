import React from "react";

const Newsitem =(props)=>{
 
    let { title, description, imgeUrl, newsUrl, author, date, source } =
      props;
    return (
      <div>
        <div className="container my-3">
          <div className="card">
            <div>
              <span
                className=" badge rounded-pill bg-danger "
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  position: "absolute",
                  right: "0",
                }}
              >
                {source}
              </span>
            </div>
            <img src={imgeUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title} </h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  By {!author ? "Unknown" : author} at{" "}
                  {new Date(date).toLocaleDateString()}
                </small>
              </p>

              <a
                href={newsUrl}
                rel="noreferrer"
                target="_blank"
                className="btn btn-dark"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default Newsitem
