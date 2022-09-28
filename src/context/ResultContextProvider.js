import React, { createContext, useContext, useState } from "react";

const ResultsContext = createContext();

const url = `https://google-search3.p.rapidapi.com/api/v1`;
const api = process.env.REACT_APP_GOOGLE_API_KEY;
export const ResultsContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("india");

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${url}${type}`, {
      method: "GET",
      headers: {
        "X-User-Agent": "desktop",
        "X-Proxy-Location": "EU",
        "X-RapidAPI-Key": api,
        "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
      },
    });

    const data = await response.json();

    console.log({ type, data });

    if (type.includes("/news")) {
      setResults(data.entries);
    } else if (type.includes("/image")) {
      setResults(data.image_results);
    } else {
      setResults(data.results);
    }

    setIsLoading(false);
  };

  return (
    <ResultsContext.Provider
      value={{ results, isLoading, searchTerm, setSearchTerm, getResults }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultsContext);
