import "./App.css";
import { AppRouter } from "./AppRouter";
import { SearchProvider } from "./context/SearchProvider";

function App() {
  return (
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
  )
}

export default App;