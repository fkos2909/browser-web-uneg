import { useState } from "react";

import "./App.css";
import WebPage from "./WebPage";
import ResultsPage from "./ResultsPage";
import { AppRouter } from "./AppRouter";
import { SearchProvider } from "./context/SearchProvider";

function App() {
  return (
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
  )
  // const [line, setLine] = useState(undefined);

  // if (!line) {
  //   return <WebPage onSearch={(line) => setLine(line)} />;
  // } else {
  //   return <ResultsPage line={line} />;
  // }
}

export default App;