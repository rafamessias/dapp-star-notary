import { EthProvider } from "./contexts/EthContext";
import StarNotaryApp from "./components/StarNotaryApp";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <StarNotaryApp />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
