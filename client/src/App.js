import { EthProvider } from "./contexts/EthContext";
import StarNotaryApp from "./components/StarNotaryApp";
import ThemeProviderWrapper from "./theme/ThemeProvider";
import Header from "./components/Header";

function App() {
  return (
    <EthProvider>
      <ThemeProviderWrapper>
        <div id="App">
          <Header />
          <StarNotaryApp />
        </div>
      </ThemeProviderWrapper>
    </EthProvider>
  );
}

export default App;
