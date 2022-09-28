import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../context/ResultContextProvider";
import Loading from "./Loading";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import ReactPlayer from "react-player";

export default function Results() {
  const { results, isLoading, searchTerm, setSearchTerm, getResults } =
    useResultContext();

  const location = useLocation();
  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm}videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  console.log(location.pathname);
  console.log(results);
  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="resultPage">
          <div className="container">
            {results?.map(({ link, title, description }, index) => (
              <a target="_black" href={link}>
                <div className="resultItem">
                  <p className="link">
                    {link.length > 30 ? title.substring(0, 40) : link}
                  </p>
                  <p className="title"> {title}</p>
                  <p className="description"> {description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      );
    case "/image":
      return (
        <div className="resultPage">
          <div className="container">
            <div className="row">
              {results?.map((item, index) => (
                <div className="col-12 col-md-3" key={index}>
                  <div className="image-result-item">
                    <a target="_black" href={item.link.href}>
                      <div className="">
                        <img
                          src={item.image.src}
                          alt={item.image.alt}
                          className="img-fluid mb-3"
                        />
                        <p className="title mb-3"> {item.link.title}</p>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "/news":
      return (
        <div className="resultPage">
          <div className="container">
            <div className="row">
              {results?.map((item) => (
                <div className="col-6" key={item.id}>
                  <div className="news-item">
                    <a href={item.link} rel="noreferrer" target="_blank">
                      <a
                        href={item?.source?.href}
                        rel="noreferrer"
                        target="_blank"
                        className="title"
                      >
                        {item.source.title}{" "}
                        <span>
                          {moment(item.published).startOf("ss").fromNow()}
                        </span>
                      </a>
                      <p className="news-title">{item.title}</p>
                      {/* <p className="news-summary">
                        {HTMLReactParser(item.summary)}
                      </p> */}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "/video":
      return (
        <div className="video-result">
          <div className="container">
            {results.map((video, title, index) => {
              <div>
                {title}
                {/* <ReactPlayer url={video.additi} */}
              </div>;
            })}
          </div>
        </div>
      );
    default:
      return "ERROR";
  }
}
