import Main from "./components/feature/main";
import Layout from "./components/shared/Layout";
import Header from "./components/shared/Header";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Main />
      </Layout>
    </div>
  );
}

export default App;
