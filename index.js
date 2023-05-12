// Variable to track if the modal is open or closed
let isModalOpen = false;

// Variable to track the state of the contrast toggle
let contrastToggle = false;

// Scale factor to adjust mouse coordinates for background movement
const scaleFactor = 1 / 20;

// Function to move the background shapes based on mouse movement
function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  // Loop through each shape and apply translation and rotation based on mouse position
  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    
    // Apply translation and rotation CSS to the shape
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`
  }
}

// Function to toggle contrast of the page
function toggleContrast() {
  // Toggle the contrast state
  contrastToggle = !contrastToggle;
  
  // Add or remove the "dark-theme" class to the body based on the contrast state
  if (contrastToggle) {
    document.body.classList += " dark-theme"
  } else {
    document.body.classList.remove("dark-theme")
  }
}

// Function to handle the contact form submission
function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  
  // Display the loading overlay
  loading.classList += " modal__overlay--visible";
  
  // Send the contact form data using emailjs
  emailjs
    .sendForm(
      "service_0q9iupr",
      "template_8njkpzj",
      event.target,
      "SoaI2DdzvQeJd32ho"
    )
    .then(() => {
      // On successful submission, remove the loading overlay and display success overlay
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      // On error, remove the loading overlay and show an alert with alternative contact information
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on email@email.com"
      );
    });
}

// Function to toggle the modal open or closed
function toggleModal() {
  if (isModalOpen) {
    // If modal is open, close it by removing the "modal--open" class from the body
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  } else {
    // If modal is closed, open it by adding the "modal--open" class to the body
    isModalOpen = true;
    document.body.classList += " modal--open";
  }
}