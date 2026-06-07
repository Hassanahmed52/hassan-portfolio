// Initialize AOS Animation
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Mobile Sidebar Toggle
const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link');

openBtn.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    openBtn.classList.add('hidden');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    openBtn.classList.remove('hidden');
});

// Close sidebar when nav link is clicked on mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
            openBtn.classList.remove('hidden');
        }
    });
});

// Project filtering
const filterButtons = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Reset all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-gradient-to-r', 'from-cyan-400', 'to-blue-500');
            btn.classList.add('bg-slate-700');
        });

        // Activate current button
        button.classList.remove('bg-slate-700');
        button.classList.add('bg-gradient-to-r', 'from-cyan-400', 'to-blue-500');

        const filter = button.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Reinitialize swiper to update layout
        projectSwiper.update();
    });
});

// Initialize Project Swiper
const projectSwiper = new Swiper('.project-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        640: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

// Typing animation
document.addEventListener('DOMContentLoaded', function () {
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        element.style.width = '0';
        setTimeout(() => {
            element.style.width = '100%';
        }, 500);
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 opacity-0 invisible';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('opacity-100', 'visible');
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
    } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible');
        scrollTopBtn.classList.remove('opacity-100', 'visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add active class to current section in navbar
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-cyan-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-cyan-400');
        }
    });
});

// Add this to your existing script section
document.getElementById('contactForm').addEventListener('submit', function (event) {
    const form = this;
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Show loading state
    submitText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');

    // Form submission is handled by Formspree
    // This will add a success and error message after submission
    form.addEventListener('formspree:submit', function () {
        submitText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');

        // Clear the form
        form.reset();

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400';
        successMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Message sent successfully!';
        form.appendChild(successMessage);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
});

// Scroll Down Arrow functionality
const scrollDownArrow = document.getElementById('scrollDown');
if (scrollDownArrow) {
    scrollDownArrow.addEventListener('click', () => {
        // Get the next section after home
        const homeSection = document.getElementById('home');
        const nextSection = homeSection.nextElementSibling;

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Update the copyright year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
      copyrightYearElement.textContent = new Date().getFullYear();
    }
  });