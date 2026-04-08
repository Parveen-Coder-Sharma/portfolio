// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(33, 37, 41, 0.98)";
    navbar.style.padding = "15px 60px";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(33, 37, 41, 0.95)";
    navbar.style.padding = "20px 60px";
    navbar.style.boxShadow = "none";
  }
});

// Scroll Reveal Animation Functionality
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100; // Trigger point

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

// Check reveal on scroll
window.addEventListener("scroll", reveal);

// Trigger once on load in case elements are already in view
reveal();

// Contact Form Submission logic
const contactForm = document.getElementById('contact-form');
const resultMessage = document.getElementById('result-message');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Page ko reload hone se rokta hai
    
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    // Sending state dikhana
    resultMessage.style.display = "block";
    resultMessage.innerHTML = "Sending message...";
    resultMessage.style.color = "#666";

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        // Success message
        resultMessage.innerHTML = "🎉 Message sent successfully!";
        resultMessage.style.color = "#00adb5"; // Theme color se match karta hua
      } else {
        // Error handling
        console.log(response);
        resultMessage.innerHTML = json.message;
        resultMessage.style.color = "red";
      }
    })
    .catch(error => {
      console.log(error);
      resultMessage.innerHTML = "Something went wrong!";
      resultMessage.style.color = "red";
    })
    .then(function() {
      contactForm.reset(); // Form ke inputs ko clear kar dega
      
      // 5 seconds baad message ko wapas hide kar dega
      setTimeout(() => {
        resultMessage.style.display = "none";
      }, 5000); 
    });
  });
}