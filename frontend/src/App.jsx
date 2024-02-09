import { useState } from "react";

import "./App.css";
import WebPage from "./WebPage";
import ResultsPage from "./ResultsPage";

function App() {
  const [line, setLine] = useState(undefined);

  if (!line) {
    return <WebPage onSearch={(line) => setLine(line)} />;
  } else {
    return <ResultsPage line={line} />;
  }
}

export default App;