import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Button from "../Button";
import Container from "../Container";
import { walletIcon } from "../../../assets/icons";

import "./styles.scss";
import { useEffect, useState } from "react";

export default function Header() {
  const [visitsWebsite, setVisitsWebsite] = useState(0);

  const { status, availableConnectTypes, connect, disconnect } = useWallet();

  const isWalletConnected = status === WalletStatus.WALLET_NOT_CONNECTED;

  const getWebsiteVisits = async () => {
    const NAMESPACE = "benner-board";
    const KEY = "455e53b5-0eea-41c6-a738-2452c954fca5";

    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
      .then((response) => {
        if (response && response.status !== 200) return;
        return response.json();
      })
      .then((data) => {
        const { value } = data;
        setVisitsWebsite(value);
      });
  };

  useEffect(() => {
    getWebsiteVisits();
  }, []);

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
              <p className="views-title">Live Views</p>
              <p className="views-subtitle">{visitsWebsite}</p>
            </div>
          </div>
        </div>
        <Button
          iconSrc={walletIcon}
          buttonLabel={isWalletConnected ? "Connect" : "Disconnect"}
          buttonStyle="connect-btn"
          labelStyle="connect-labelStyle"
          onClickButton={
            isWalletConnected
              ? () => connect(availableConnectTypes[3])
              : () => disconnect()
          }
        />
      </Container>
    </header>
  );
}
