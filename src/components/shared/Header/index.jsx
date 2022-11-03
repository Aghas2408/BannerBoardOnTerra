import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Button from "../Button";
import Container from "../Container";
import { walletIcon } from "../../../assets/icons";

import "./styles.scss";

export default function Header() {
  const {
    status,
    availableConnectTypes,
    connect,
    disconnect,
  } = useWallet();

  const isWalletConnected = status === WalletStatus.WALLET_NOT_CONNECTED;

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
          buttonLabel = {isWalletConnected ? "Connect" : "Disconnect"}
          buttonStyle="connect-btn"
          labelStyle="connect-labelStyle"
          onClickButton = {isWalletConnected ? () => connect(availableConnectTypes[3]) : () => disconnect()}
        />
      </Container>
    </header>
  );
}
