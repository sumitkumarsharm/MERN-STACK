const userImg = document.getElementById("user-img");
const userTitle = document.getElementById("user-title");
const userValue = document.getElementById("user-value");
const icons = document.querySelectorAll(".icon");
// const refreshBtn = document.getElementById("refresh");

let currentUser = {};

// Fetch user from API
async function fetchUser() {
  const res = await fetch("https://randomuser.me/api/?results=0");
  const data = await res.json();
  const user = data.results[0];

  currentUser = {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    age: user.dob.age,
    location: `${user.location.city}, ${user.location.country}`,
    phone: user.phone,
    picture: user.picture.large,
  };

  updateUI("name"); // Default show name
}

// UI update kr rhhe hai
function updateUI(label) {
  userImg.src = currentUser.picture;

  const titles = {
    name: "My name is",
    email: "My email is",
    age: "My age is",
    location: "My location is",
    phone: "My phone is",
  };

  userTitle.textContent = titles[label];
  userValue.textContent = currentUser[label];
}

// Event listeners for icons
icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    const label = e.currentTarget.dataset.label;
    updateUI(label);
  });
});

// Refresh new user
// refreshBtn.addEventListener("click", fetchUser);

// Load first user on page load
fetchUser();
