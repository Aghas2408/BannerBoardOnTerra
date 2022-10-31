import Banner from "../../shared/Banner";
import Container from "../../shared/Container";

import "./styles.scss";

export default function Main() {
  return (
    <div className="main-container">
      <Container className="banners-box">
        <div className="first-banners-inner">
          <div className="inner-banner-box">
            <Banner className="top-banner" />
          </div>
          <div className="inner-banner-box">
            <Banner className="first-banner" />
            <Banner className="second-banner" />
          </div>
          <div className="inner-banner-box">
            <Banner className="middle-banner" />
            <Banner className="middle-banner" />
          </div>
          <div className="inner-banner-box">
            <Banner className="second-banner" />
            <Banner className="first-banner" />
          </div>
        </div>
        <div className="second-banners-inner">
          <Banner className="right-section-banner"/>
        </div>
      </Container>
    </div>
  );
}
