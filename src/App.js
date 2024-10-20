import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import jsonp from 'jsonp';

function App() {
  const colors = ["#14cc8d", "#1481cc", "#cc3114", "#bb14cc", "#14ccbb", "#5f14cc", "#cc8d14"];
  const [colorsIndx, setColorIndx] = useState(1);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = () => {
    jsonp(
      'https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=callback',
      { name: 'callback' },
      (err, data) => {
        if (err) {
          console.error('Ошибка при получении цитаты', err);
        } else {
          console.log(data)

          let indx = colorsIndx;
          while(colorsIndx === indx) {
            indx = Math.random()*(6 - 0) + 0;
            indx = Math.floor(indx);
          }
          setColorIndx(indx);
          document.body.style.backgroundColor = colors[colorsIndx];
          const wellElement = document.querySelector('.well');
          if (wellElement) {
            wellElement.style.backgroundColor = colors[colorsIndx];
          }
          
          setQuote(data.quoteText);
          setAuthor(data.quoteAuthor || '');
        }
      }
    );
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const href = useMemo(() => {
    return `https://twitter.com/intent/tweet?text=' + ${quote} + ' Author ' + ${author}`
  }, [author, quote])

  return (
    <section class="container-fluid">
      <h1 class='text-primary'>Random Quotes!</h1>
      <div class="well">
        <p class="quote-text">{quote}</p>
        <p class="author-text">{author}</p>
      </div>
      <button type="button" class="btn btn-primary" id="quote" onClick={fetchQuote}>New Quote</button>
      <a class="twitter-share-button" href={href} data-size="large" target="_blank" rel="noreferrer">
  </a>
    </section>
  );
}

export default App;
