const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const formContainer = document.getElementById("formContainer");
const inputText = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");
const quote = [
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

// console.log(randomQuote);

function showRandomQuote() {
  let randomQuote = Math.floor(Math.random() * quote.length);
  let quotefromArray = quote[randomQuote];
  quoteDisplay.innerHTML = `<p>Quote:${quotefromArray.quoteText}</p>
  <p>Category:${quotefromArray.category}</p>`;
}
function addQuote() {
  const newQuote = document.getElementById("newQuoteText").value;
  const newCategory = document.getElementById("newQuoteCategory").value;
  if (newQuote && newCategory) {
    quote.push({ quoteText: newQuote, category: newCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("new quote added");
  }
  console.log(quote);
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

showQuoteButton.addEventListener("click", showRandomQuote);
createAddQuoteForm();
