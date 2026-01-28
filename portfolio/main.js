
var typed = new Typed('.text', {
    strings: ["Frontend Developer","Backend Developer","Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });

// =============Navbar==============
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.querySelector('i').classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    menuIcon.querySelector('i').classList.remove('bx-x');
    navbar.classList.remove('active');
});





// =======================Contect=========================
  function sendToWhatsapp(event) {
    event.preventDefault(); // Form ko reload hone se rokne ke liye

    // Apna WhatsApp number yahan likhein (Country code ke saath, bina + ke)
    let phoneNumber = "918081575712"; 

    // Inputs se value nikalna
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    // WhatsApp ka message format taiyar karna
    let finalMessage = "Hello! My Name is: " + name + "%0a" + 
                       "Email: " + email + "%0a" + 
                       "Subject: " + subject + "%0a" + 
                       "Message: " + message;

    // WhatsApp API URL generate karna
    let whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + finalMessage;

    // Naye tab mein open karna
    window.open(whatsappUrl, '_blank').focus();
}