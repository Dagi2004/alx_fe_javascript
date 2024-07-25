const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const formContainer = document.getElementById("formContainer");
const inputText = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");
const exportButton = document.getElementById("exportButton");
const importButton = document.getElementById("importFile");
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
if (storedQuote) {
  quotes = JSON.parse(storedQuote);
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
  }
  // console.log(quote);
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

showQuoteButton.addEventListener("click", showRandomQuote);
createAddQuoteForm();
exportButton.addEventListener("click", exportToJsonFile);
importButton.addEventListener("onchange", importFromJsonFile);
