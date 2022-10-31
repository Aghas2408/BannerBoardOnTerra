import Button from "../Button";
import Container from "../Container";
import { walletIcon } from "../../../assets/icons";

import "./styles.scss";

export default function Header() {
  return (
    <header className="header-container">
      <Container>
        <div className="information-box">
          <h2 className="logo">A2B</h2>
          <div className="views-container">
            <div className="views-box">
              <p className="views-title">Burned $LUNC</p>
              <p className="views-subtitle">888,901,625,173</p>
            </div>
            <div className="views-box">
              <p className="views-title">Burned $LUNC</p>
              <p className="views-subtitle">888,901,625,173</p>
            </div>
          </div>
        </div>
        <Button
          iconSrc={walletIcon}
          buttonLabel="Connect"
          buttonStyle="connect-btn"
          labelStyle="connect-labelStyle"
        />
      </Container>
    </header>
  );
}
