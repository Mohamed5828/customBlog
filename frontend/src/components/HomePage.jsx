import React, { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import Newsletter from "./Newsletter";
import "../Styling/css/components/home.css";
import "../Styling/css/components/card.css";
import "../Styling/css/components/btn.css";
import "../Styling/css/components/loader.css";
import { Link } from "react-router-dom";
import URL from "../tools/config";
import Loading from "./Loading";
import { useDataFetching } from "../tools/DataFetching";

const HomePage = () => {
  const [featuredTopics, setFeaturedTopics] = useState([]);
  const { data, loading, error } = useDataFetching(URL + `/posts/post`);
  useEffect(() => {
    if (!loading) {
      const slides = [];
      data.map((item) => {
        if (item.featured === true) {
          slides.push(item);
        }
      });
      setFeaturedTopics(slides);
      data.slice(0, 6);
    }
  }, [loading]);
  if (loading) {
    return (
      <div>
        <Loading show={loading} />
      </div>
    );
  } else {
    return (
      <div>
        <div className="home-container">
          <h1 className="header">Featured Topics</h1>
          <div className="img-slider">
            <ImageSlider slides={featuredTopics} />
          </div>
          <div className="ltst-top">
            <h1 className="header">Latest Topics</h1>
            <div className="row gap-2">
              {data.map((item) => {
                return (
                  <div className="col-11-xs col-5-sm col-4-xl" key={item._id}>
                    <Link to={`/post/${item._id}`}>
                      <div className="cards">
                        <div className="card-info">
                          <p className="card-desc">
                            {item.description.slice(0, 200)}
                          </p>
                        </div>
                        <div className="img-container">
                          <img
                            className="card-img"
                            src={
                              item.imgs != ""
                                ? item.imgs
                                : "https://firebasestorage.googleapis.com/v0/b/blogimgupload-3998a.appspot.com/o/nothumb.jpg?alt=media&token=39ca3696-b50c-444f-b3e1-786b4cb0533b"
                            }
                          />
                        </div>
                        <h1 className="card-title">
                          {item.title.slice(0, 25)}
                        </h1>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Newsletter />
        <div className="footer">
          <h3>Mohamed | </h3>
          <div className="socials">
            <Link to={"https://github.com/Mohamed5828/Reddit"}>GitHub</Link> -{" "}
            <Link to={"https://www.linkedin.com/in/mohamed-abdelreheem/"}>
              Linkedin
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
export default HomePage;
