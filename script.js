const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sunIcon = document.querySelector(".fa-sun");
const moonIcon = document.querySelector(".fa-moon");

// Get quotes from the API
let apiQuote = [];
// Show loading
// show new quote
function newQuote() {
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  // check if author field is blank and replace it with "Unknown"
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine styling
  if (quote.text.length > 90) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
}

async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    newQuote();
  } catch (error) {
    // Handle error here
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.checked = true;
} else {
  body.classList.add("light-mode");
  themeToggle.checked = true;
}

// Toggle theme on click
themeToggle.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  // Save theme preference
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-mode") ? "dark" : "light"
  );
});
// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// on page load
getQuotes();
