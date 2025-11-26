const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [quote, setQuote] = React.useState({ quote: "", author: "" });
  const [color, setColor] = React.useState("#16a085");

  React.useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes);
        randomQuote(data.quotes);
      });
  }, []);

  function randomQuote(quotesArray = quotes) {
    const index = Math.floor(Math.random() * quotesArray.length);
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    setColor(newColor);
    setQuote(quotesArray[index]);
    document.documentElement.style.setProperty("--main-color", newColor);
  }

  return (
    <div className="quote">
      <div className="quote__box">
        <i className="fa fa-quote-left quote__box__vignette"> </i>
        <p className="quote__box__text">{quote.quote}</p>
        <p className="quote__box__author">- {quote.author}</p>

        <div className="quote__box__buttons">
          <div className="quote__box__buttons__left">
            <a
              className="quote__box__button quote__box__buttons__left__tweet"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fa fa-twitter"></i>
            </a>

            <a
              className="quote__box__button quote__box__buttons__left__tumblr"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fa fa-tumblr"></i>
            </a>
          </div>

          <button className="quote__box__button" onClick={() => randomQuote()}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("Random-Quote")).render(<App />);
