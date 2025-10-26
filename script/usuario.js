// Usuário e senha falsas
const VALID_USER = "ash";
const VALID_PASS = "pikachu";

// Pega elementos
const form = document.getElementById("loginForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const user = document.getElementById("username").value.trim().toLowerCase();
  const pass = document.getElementById("password").value;

  if (user === VALID_USER && pass === VALID_PASS) {
    successMessage.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  } else {
    errorMessage.classList.remove("hidden");
    successMessage.classList.add("hidden");
  }
});
