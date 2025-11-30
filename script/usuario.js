const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Esconde mensagens
  successMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  // Mostra loading
  loading.classList.remove("hidden");

  // Simula processamento (1.2s)
  setTimeout(() => {

    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    // Oculta loading
    loading.classList.add("hidden");

    if (user === "ash" && pass === "pikachu") {
      successMessage.classList.remove("hidden");
    } else {
      errorMessage.classList.remove("hidden");
    }

  }, 1200);
});
