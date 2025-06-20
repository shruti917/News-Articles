import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const API_KEY = "6bc1d4fff96345eb99469322109b17b2";
  const BASE_URL = "https://newsapi.org/v2";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const [category, setCategory] = useState(""); // optional: default to 'general'

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          apiKey: API_KEY,
          country: "us",
          page: currentPage,
          pageSize: 6,
          category: category || undefined 
        }
      });

      console.log(response.data.articles);
      setArticles(response.data.articles);
      settotalResults(response.data.totalResults);
    } catch (err) {
      setError("Couldn't fetch the news, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage, category]);

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        loading,
        error,
        fetchNews,
        currentPage,
        setCurrentPage,
        totalResults,
        category,
        changeCategory
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
