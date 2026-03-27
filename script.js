// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 800);
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});

// ========== NAVBAR HIDE ON SCROLL DOWN ==========
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
let scrollTimeout;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll Down - hide navbar
        navbar.classList.add('hide');
        navbar.classList.remove('show');
    } else {
        // Scroll Up - show navbar
        navbar.classList.remove('hide');
        navbar.classList.add('show');
    }
    
    // Add scrolled class for shadow
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    
    // Clear timeout
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Optional: auto hide after idle
    }, 3000);
});

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItem = document.querySelector('.nav-item');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
}

// Mobile dropdown handling
if (window.innerWidth <= 768 && navItem) {
    const serviceLink = navItem.querySelector('.nav-link');
    serviceLink.addEventListener('click', (e) => {
        e.preventDefault();
        navItem.classList.toggle('active');
    });
}

// ========== PORTFOLIO DATA ==========
const portfolioData = [
    { id: 1, title: "Brand X Campaign", category: "social", description: "Social Media Strategy", image: "https://picsum.photos/id/20/600/450" },
    { id: 2, title: "Fashion Week 2024", category: "social", description: "Instagram Campaign", image: "https://picsum.photos/id/26/600/450" },
    { id: 3, title: "Heritage Coffee", category: "branding", description: "Brand Identity", image: "https://picsum.photos/id/42/600/450" },
    { id: 4, title: "Urban Eats", category: "branding", description: "Logo Design", image: "https://picsum.photos/id/48/600/450" },
    { id: 5, title: "E-Commerce Store", category: "web", description: "Website Development", image: "https://picsum.photos/id/60/600/450" },
    { id: 6, title: "Product Photography", category: "content", description: "Foto Produk", image: "https://picsum.photos/id/82/600/450" }
];

function renderPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    let filtered = filter === 'all' ? portfolioData : portfolioData.filter(item => item.category === filter);
    filtered = filtered.slice(0, 3);
    
    grid.innerHTML = filtered.map(item => `
        <div class="portfolio-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}

const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.getAttribute('data-filter'));
        });
    });
    renderPortfolio();
}

// ========== CLIENTS LOGOS ==========
const clients = [
    { name: "Client 1", logo: "https://picsum.photos/id/1/140/80" },
    { name: "Client 2", logo: "https://picsum.photos/id/20/140/80" },
    { name: "Client 3", logo: "https://picsum.photos/id/26/140/80" },
    { name: "Client 4", logo: "https://picsum.photos/id/30/140/80" },
    { name: "Client 5", logo: "https://picsum.photos/id/42/140/80" },
    { name: "Client 6", logo: "https://picsum.photos/id/48/140/80" },
    { name: "Client 7", logo: "https://picsum.photos/id/55/140/80" },
    { name: "Client 8", logo: "https://picsum.photos/id/60/140/80" }
];

const clientsContainer = document.getElementById('clientsLogos');
if (clientsContainer) {
    clientsContainer.innerHTML = clients.map(client => `
        <div class="logo-item">
            <img src="${client.logo}" alt="${client.name}">
        </div>
    `).join('');
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            formMessage.textContent = 'Mohon lengkapi semua field yang diperlukan';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            formMessage.textContent = 'Email tidak valid';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
        }
        
        formMessage.textContent = 'Mengirim pesan...';
        formMessage.className = 'form-message';
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.textContent = 'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId === "") return;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// ========== SERVICE CARD REDIRECT ==========
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    const link = card.querySelector('.service-link');
    if (link) {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A' && !link.contains(e.target)) {
                window.location.href = link.href;
            }
        });
    }
});