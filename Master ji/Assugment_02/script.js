let currentPage = 1;
let isLoading = false;
let books = [];

// All DOM Elements
const booksContainer = document.getElementById("booksContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const gridViewBtn = document.getElementById("gridView");
const listViewBtn = document.getElementById("listView");
const loader = document.getElementById("loader");

// Fetch books from API
async function fetchBooks(page) {
  try {
    loader.classList.remove("hidden");
    const response = await fetch(
      `https://api.freeapi.app/api/v1/public/books?page=${page}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  } finally {
    loader.classList.add("hidden");
  }
}

// Yaha ha html create kr rhe hai for book
const modal = document.getElementById("bookModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.querySelector(".close-modal");

// yaha ham book update kr rhe hai createBookCard ko function ke sath
function createBookCard(book) {
  return `
        <div class="book-card">
            <a href="${book.volumeInfo.infoLink}" target="_blank">
                <img src="${
                  book.volumeInfo.imageLinks?.thumbnail || "placeholder.jpg"
                }" alt="${book.volumeInfo.title}">
            </a>
            <div class="book-info">
                <h3>${book.volumeInfo.title}</h3>
                <p>Author: ${
                  book.volumeInfo.authors?.join(", ") || "Unknown"
                }</p>
                <p>Publisher: ${book.volumeInfo.publisher || "Unknown"}</p>
                <p>Published: ${book.volumeInfo.publishedDate || "Unknown"}</p>
                <button class="details-btn" onclick="showBookDetails(${JSON.stringify(
                  book
                ).replace(/"/g, "&quot;")})">
                    Show Details
                </button>
                <a href="${
                  book.volumeInfo.infoLink
                }" target="_blank" class="more-link">Buy Now</a>
            </div>
        </div>
    `;
}
// yaha sare function ko replace kr rhe hai new version ke sath mtln ham yaha book ko show kr rhe hai
function showBookDetails(book) {
  const description = book.volumeInfo.description || "No description available";
  const categories =
    book.volumeInfo.categories?.join(", ") || "Not categorized";
  const pageCount = book.volumeInfo.pageCount || "Unknown";
  const rating = book.volumeInfo.averageRating || "Not rated";

  modalContent.innerHTML = `
        <div class="modal-book-details">
            <div class="modal-header">
                <h2>${book.volumeInfo.title}</h2>
            </div>
            <div class="modal-body">
                <img src="${
                  book.volumeInfo.imageLinks?.thumbnail || "placeholder.jpg"
                }" alt="${book.volumeInfo.title}">
                <div class="modal-info">
                    <p><strong>Author:</strong> ${
                      book.volumeInfo.authors?.join(", ") || "Unknown"
                    }</p>
                    <p><strong>Publisher:</strong> ${
                      book.volumeInfo.publisher || "Unknown"
                    }</p>
                    <p><strong>Published Date:</strong> ${
                      book.volumeInfo.publishedDate || "Unknown"
                    }</p>
                    <p><strong>Categories:</strong> ${categories}</p>
                    <p><strong>Pages:</strong> ${pageCount}</p>
                    <p><strong>Rating:</strong> ${rating}/5</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <a href="${
                      book.volumeInfo.infoLink
                    }" target="_blank" class="buy-btn">Buy Now</a>
                </div>
            </div>
        </div>
    `;
  modal.classList.remove("hidden");
}

// adding model function
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// yaha book to display kr rhe hai function ko call kr ke
function displayBooks(booksToDisplay) {
  booksContainer.innerHTML = booksToDisplay
    .map((book) => createBookCard(book))
    .join("");
}

// Filtering books
function filterBooks(searchTerm) {
  return books.filter((book) => {
    const title = book.volumeInfo.title.toLowerCase();
    const authors = book.volumeInfo.authors?.join(" ").toLowerCase() || "";
    searchTerm = searchTerm.toLowerCase();
    return title.includes(searchTerm) || authors.includes(searchTerm);
  });
}

// Sorting books
function sortBooks(sortBy) {
  const sortedBooks = [...books];
  if (sortBy === "title") {
    sortedBooks.sort((a, b) =>
      a.volumeInfo.title.localeCompare(b.volumeInfo.title)
    );
  } else if (sortBy === "date") {
    sortedBooks.sort(
      (a, b) =>
        new Date(b.volumeInfo.publishedDate) -
        new Date(a.volumeInfo.publishedDate)
    );
  }
  return sortedBooks;
}

// Event Listeners
searchInput.addEventListener("input", () => {
  const filtered = filterBooks(searchInput.value);
  displayBooks(filtered);
});

sortSelect.addEventListener("change", () => {
  const sorted = sortBooks(sortSelect.value);
  displayBooks(sorted);
});

gridViewBtn.addEventListener("click", () => {
  booksContainer.className = "grid-view";
  gridViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");
});

listViewBtn.addEventListener("click", () => {
  booksContainer.className = "list-view";
  listViewBtn.classList.add("active");
  gridViewBtn.classList.remove("active");
});

// for scrolling
window.addEventListener("scroll", () => {
  if (isLoading) return;

  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 100
  ) {
    currentPage++;
    loadMoreBooks();
  }
});

// Load more books
async function loadMoreBooks() {
  isLoading = true;
  const newBooks = await fetchBooks(currentPage);
  if (newBooks) {
    books = [...books, ...newBooks.data];
    displayBooks(books);
  }
  isLoading = false;
}

// starting loading
async function init() {
  const initialBooks = await fetchBooks(1);
  if (initialBooks) {
    books = initialBooks.data;
    displayBooks(books);
  }
}

init();
