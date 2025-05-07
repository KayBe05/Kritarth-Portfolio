// Utility functions
const utils = {
  // Debounce function to limit frequent execution
  debounce: (func, delay) => {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  },
  
  // Animate elements when they come into view
  animateOnScroll: () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('fade-in');
      }
    });
  }
};

// DOM manipulation for UI components
const ui = {
  // Initialize and handle the preloader
  preloader: {
    init: () => {
      const preloader = document.createElement('div');
      preloader.className = 'preloader';
      preloader.innerHTML = '<div class="loader"></div>';
      document.body.appendChild(preloader);
      
      // Remove preloader when page is fully loaded
      window.addEventListener('load', () => {
        // Check if all images are loaded
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        
        const imageLoaded = () => {
          loadedImages++;
          if (loadedImages >= images.length) {
            setTimeout(() => {
              preloader.classList.add('hidden');
              setTimeout(() => preloader.remove(), 500);
            }, 500);
          }
        };
        
        if (images.length === 0) {
          preloader.classList.add('hidden');
          setTimeout(() => preloader.remove(), 500);
        } else {
          images.forEach(img => {
            if (img.complete) {
              imageLoaded();
            } else {
              img.addEventListener('load', imageLoaded);
              img.addEventListener('error', imageLoaded); // Handle error too
            }
          });
        }
      });
    }
  },
  
  // Create and manage back to top button
  backToTop: {
    init: () => {
      const backToTopButton = document.createElement('a');
      backToTopButton.className = 'back-to-top';
      backToTopButton.setAttribute('href', '#');
      backToTopButton.setAttribute('aria-label', 'Scroll to top');
      backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
      document.body.appendChild(backToTopButton);
      
      backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // Update visibility on scroll
      window.addEventListener('scroll', utils.debounce(() => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      }, 100));
    }
  },
  
  // Initialize hero section typing effect
  heroTypingEffect: {
    init: () => {
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        const titleText = heroTitle.innerHTML;
        const typingSpeed = 50; // milliseconds per character
        
        // Only do typing animation on homepage
        if (window.location.pathname === '/' || window.location.pathname.includes('index')) {
          // Clear the title and prepare for typing animation
          heroTitle.innerHTML = '';
          let charIndex = 0;
          
          // Function to type the title character by character
          function typeTitle() {
            if (charIndex < titleText.length) {
              heroTitle.innerHTML += titleText.charAt(charIndex);
              charIndex++;
              setTimeout(typeTitle, typingSpeed);
            }
          }
          
          // Start typing animation after a short delay
          setTimeout(typeTitle, 500);
        }
      }
    }
  },
  
  // Add hover effects to skill tags
  skillTagsEffect: {
    init: () => {
      const skillTags = document.querySelectorAll('.skill-tag');
      
      skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px)';
        });
        
        tag.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      });
    }
  }
};
// Add this to your main.js file

// Skills animation
function animateSkills() {
  const skillsSection = document.querySelector('#skills');
  const skillsContainer = document.querySelector('.skills-container');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
      );
  }
  
  // Function to animate when scrolling
  function checkScroll() {
      if (isInViewport(skillsSection)) {
          skillsContainer.classList.add('animate');
          // Remove scroll listener once animation is triggered
          window.removeEventListener('scroll', checkScroll);
      }
  }
  
  // Listen for scroll event
  window.addEventListener('scroll', checkScroll);
  
  // Check on initial load too
  checkScroll();
}

// Initialize skill bars with their data-value property
function initSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  skillLevels.forEach(skill => {
      skill.style.setProperty('--skill-width', skill.getAttribute('data-value'));
  });
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initSkillBars();
  animateSkills();
  
  // Add hover effect to skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
          const icon = this.querySelector('.skill-icon');
          icon.style.transform = 'rotate(10deg) scale(1.2)';
      });
      
      item.addEventListener('mouseleave', function() {
          const icon = this.querySelector('.skill-icon');
          icon.style.transform = '';
      });
  });
});

// Navigation functionality
const navigation = {
  init: () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('#header');

    // Toggle mobile menu
    if (hamburger) {
      hamburger.setAttribute('aria-label', 'Toggle navigation menu');
      hamburger.setAttribute('aria-expanded', 'false');
      
      hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger) {
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        navMenu.classList.remove('active');
      });
    });

    // Header scroll effect
    window.addEventListener('scroll', utils.debounce(() => {
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, 100));

    // Active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', utils.debounce(() => {
      let scrollPosition = window.scrollY + 150; // Adding offset for header
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          if (navLink) {
            navLink.classList.add('active');
          }
        }
      });
    }, 100));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip empty anchors
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Get header height dynamically for accurate scrolling
          const headerHeight = header ? header.offsetHeight : 70;
          
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

// Portfolio functionality
const portfolio = {
  init: () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Initialize AOS (Animate on Scroll) if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    
    // Portfolio filtering
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        this.classList.toggle('active'); // Toggle active state for multi-select
    
        // Get all active filters
        const activeFilters = [...document.querySelectorAll('.filter-btn.active')]
          .map(btn => btn.getAttribute('data-filter'));
    
        portfolioItems.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          // Show if any active filter matches, or show all if none selected
          const show = activeFilters.length === 0 ||
                       activeFilters.includes('all') ||
                       activeFilters.some(f => categories.includes(f));
          if (show) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });    
  }
};

// Contact form handling
const contactForm = {
  init: () => {
    const contactForms = document.querySelectorAll('form[id^="contact"]');
    
    contactForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous validation styling
        const inputs = this.querySelectorAll('input, textarea');
        inputs.forEach(input => {
          input.style.borderColor = '#ddd';
        });
        
        // Get form values
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Validate form
        let isValid = true;
        let firstInvalidField = null;
        
        inputs.forEach(input => {
          // Check required fields
          if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            if (!firstInvalidField) firstInvalidField = input;
          }
          
          // Validate email format
          if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
              isValid = false;
              input.style.borderColor = 'red';
              if (!firstInvalidField) firstInvalidField = input;
            }
          }
        });
        
        if (!isValid) {
          // Focus the first invalid field
          if (firstInvalidField) {
            firstInvalidField.focus();
          }
          return;
        }
        
        // In a real scenario, you would send this data to a server
        console.log('Form submitted with values:', formValues);
        
        // Create and show success message
        const existingMessage = form.querySelector('.success-message');
        
        // Remove existing message if present
        if (existingMessage) {
          existingMessage.remove();
        }
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        successMessage.style.cssText = `
          background-color: var(--accent-color);
          color: white;
          padding: 12px;
          border-radius: 4px;
          margin-top: 10px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        
        form.appendChild(successMessage);
        
        // Trigger reflow to enable transition
        setTimeout(() => {
          successMessage.style.opacity = '1';
        }, 10);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => {
            form.removeChild(successMessage);
          }, 500);
        }, 5000);
        
        // Reset form
        this.reset();
      });
      
      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', function() {
          if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = 'red';
          } else if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
              input.style.borderColor = 'red';
            } else {
              input.style.borderColor = '#16c79a'; // valid color
            }
          } else {
            input.style.borderColor = '#16c79a'; // valid color
          }
        });
        
        // Reset validation on input
        input.addEventListener('input', function() {
          input.style.borderColor = '#ddd';
        });
      });
    });
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI components
  ui.preloader.init();
  ui.backToTop.init();
  ui.heroTypingEffect.init();
  ui.skillTagsEffect.init();
  
  // Initialize functionality
  navigation.init();
  portfolio.init();
  contactForm.init();
  testimonials.init();
  
  // Run animations on scroll
  utils.animateOnScroll();
  window.addEventListener('scroll', utils.debounce(utils.animateOnScroll, 100));
  
  // Add animate-on-scroll class to elements
  document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .about-content')
    .forEach(el => el.classList.add('animate-on-scroll'));
});
