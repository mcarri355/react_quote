// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          setIsError(true);
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        setQuoteData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setIsError(false);
    fetch('https://api.quotable.io/random')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          setIsError(true);
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        setQuoteData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  if (isLoading) {
    return <div className="container"><h1>Loading....</h1></div>;
  }

  if (isError) {
    return <div className="container"><h1>Error....</h1></div>;
  }

  return (
    <div className="container">
      <h1>Random Quote</h1>
      <br/>
        <h2>" {quoteData.content} "</h2>
        <h3>- {quoteData.author}</h3>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default App;
