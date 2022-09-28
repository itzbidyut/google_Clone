import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ResultsContextProvider } from "./context/ResultContextProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import RoutesComponet from "./components/RoutesComponet";

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <ResultsContextProvider>
      <BrowserRouter>
        <Navbar />
        <RoutesComponet />
        <Footer />
      </BrowserRouter>
    </ResultsContextProvider>
  );
}

export default App;
