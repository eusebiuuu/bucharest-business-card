const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const BASE_URL = 'http://localhost:5000';

const rating = document.getElementById("rating");
const ratingValue = document.querySelector(".rating-value");
ratingValue.textContent = 5;

rating.addEventListener("change", () => {
  ratingValue.textContent = rating.value;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const rating = document.getElementById("rating").value.trim();

  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "All fields are required.";
    return;
  }

  if (!validateEmail(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    return;
  }

  formMessage.textContent = "Form submitted successfully!";
  formMessage.style.color = "green";


  // Reset the form
  const response = await fetch(`${BASE_URL}/form`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      message,
      rating
    })
  });

  const res = await response.json();

  console.log(res);

  form.reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}