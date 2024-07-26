const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const formContainer = document.getElementById("formContainer");
const inputText = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");
const exportButton = document.getElementById("exportButton");
const importButton = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");

let quotes = [
  {
    quoteText:
      "You know the old saying: you win some, you lose some... and then there's that little-known third category.",
    category: "LifeGame",
  },
  {
    quoteText:
      "When you have the facts on your side, argue the facts. When you have the law on your side, argue the law. When you have neither, holler.",
    category: "Law",
  },
];

// load to local storage
const storedQuote = localStorage.getItem("quotes");
const storedCategory = localStorage.getItem("selectedCategory");
if (storedQuote) {
  quotes = JSON.parse(storedQuote);
}
if (storedCategory) {
  categoryFilter.value;
}
function populateCategories() {
  const categories = [...new Set(quotes.map((quote) => quote.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}
// console.log(randomQuote);

function showRandomQuote() {
  let randomQuote = Math.floor(Math.random() * quotes.length);
  let quotefromArray = quotes[randomQuote];
  quoteDisplay.innerHTML = `<p>Quote:${quotefromArray.quoteText}</p>
  <p>Category:${quotefromArray.category}</p>`;
}
function addQuote() {
  const newQuote = document.getElementById("newQuoteText").value;
  const newCategory = document.getElementById("newQuoteCategory").value;
  if (newQuote && newCategory) {
    quotes.push({ quoteText: newQuote, category: newCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("new quote added");
    //CHANGE IT TO ARRAY AND THEN APPLY SOME() METHOD
    if (
      !Array.from(categoryFilter.option).some(
        (option) => (option.value = newCategory)
      )
    ) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    }
    // console.log(quote);
  }
}
function createAddQuoteForm() {
  const form = document.createElement("div");

  const inputQuote = document.createElement("input");
  inputQuote.id = "newQuoteText";
  inputQuote.type = "text";
  inputQuote.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  form.appendChild(inputQuote);
  form.appendChild(categoryInput);
  form.appendChild(addButton);

  formContainer.appendChild(form);
}
//filter Quote based on the selected Category

function exportToJsonFile() {
  const jsonData = JSON.stringify(quotes);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  const filteredQuotes = filterQuotes();
  quoteDisplay.innerHTML = filteredQuotes.map(
    (quote) =>
      `<p>Quote:${quote.quoteText}</p><p>Category:${quote.category}</p>`
  );
}
function filterQuotesArray() {
  const selectedCategory = categoryFilter.value;
  return selectedCategory === "all"
    ? quotes
    : quotes.filter((quote) => quote.category === selectedCategory);
}
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverQuotes = await response.json();
    const serverQuotesFormatted = serverQuotes.slice(0, 5).map((post) => ({
      quoteText: post.body,
      category: "Server",
    }));
    return serverQuotesFormatted;
  } catch (error) {
    console.log("Failed to fetch server Quotes:", error);
    return [];
  }
}
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  if (serverQuotes.length > 0) {
    const newQuotes = [...serverQuotes, ...quotes];
    const uniqueQuotes = Array.from(
      new Set(newQuotes.map((q) => q.quoteText))
    ).map((quoteText) => newQuotes.find((q) => q.quoteText === quoteText));
    quotes = uniqueQuotes;
    localStorage.setItem("quotes", JSON.stringify(quotes));
    showNotification("Quotes synchronized with server");
    populateCategories();
    filterQuotes();
  }
}
showQuoteButton.addEventListener("click", showRandomQuote);
createAddQuoteForm();
populateCategories();
filterQuotes();
setInterval(syncQuotes, 10000); // Sync with server every 10 seconds
exportButton.addEventListener("click", exportToJsonFile);
importButton.addEventListener("onchange", importFromJsonFile);
