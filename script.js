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
        offset: 100,
        easing: 'ease-out'
    });
    
    // Initialize Typing Text
    initTypingText();
    
    // Initialize Particle Background
    initParticleBackground();
    
    // Initialize Lightbox
    initLightbox();
    
    // Initialize Captcha
    generateCaptcha();
});

// ========== TYPING TEXT EFFECT ==========
function initTypingText() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const words = ['That Last', 'Timeless Impact', 'Digital Excellence', 'Creative Solutions'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        setTimeout(typeEffect, isDeleting ? 100 : 150);
    }
    
    typeEffect();
}

// ========== PARTICLE BACKGROUND ==========
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(108, 99, 255, ${Math.random() * 0.3 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    function initParticles() {
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        initParticles();
    });
}

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

// ========== NAVBAR HIDE ON SCROLL ==========
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hide');
        navbar.classList.remove('show');
    } else {
        navbar.classList.remove('hide');
        navbar.classList.add('show');
    }
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

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

// Mobile dropdown
const navItem = document.querySelector('.nav-item');
if (window.innerWidth <= 768 && navItem) {
    const serviceLink = navItem.querySelector('.nav-link');
    if (serviceLink) {
        serviceLink.addEventListener('click', (e) => {
            e.preventDefault();
            navItem.classList.toggle('active');
        });
    }
}

// ========== LIVE CHAT WIDGET ==========
const chatButton = document.getElementById('chatButton');
const chatBox = document.getElementById('chatBox');
const chatClose = document.getElementById('chatClose');
const chatSend = document.getElementById('chatSend');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const questionBtns = document.querySelectorAll('.chat-question-btn');

if (chatButton) {
    chatButton.addEventListener('click', () => {
        chatBox.classList.toggle('active');
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });
}

// FAQ Answers Database (8 Pertanyaan)
const faqAnswers = {
    layanan: "Kala Creative menyediakan 9 layanan utama:\n\n📱 Social Media Management\n🎬 Creative Content Production\n📊 Iklan Meta\n🎨 Brand Identity Design\n💻 Web Development\n🎥 Live TikTok Handling\n✏️ Graphic Design\n📸 Foto Produk\n🤖 Bot Automation\n\nLayanan mana yang ingin Anda ketahui lebih detail?",
    
    harga: "Harga paket kami bervariasi tergantung kebutuhan Anda. Untuk informasi detail harga, silakan hubungi tim kami melalui WhatsApp di +62 855 1115 118 atau isi form kontak. Kami akan memberikan penawaran terbaik sesuai kebutuhan Anda! 💰",
    
    kontak: "Anda bisa menghubungi kami melalui:\n\n📞 WhatsApp: +62 855 1115 118\n📧 Email: hello@kalacreative.id\n🌐 Instagram: @kalacreative\n\nAtau langsung isi form kontak di website ini! Kami akan merespon dalam 1x24 jam. ✨",
    
    waktu: "Waktu pengerjaan tergantung jenis layanan:\n\n📱 Social Media Management: Mulai 1 bulan\n🎨 Brand Identity: 2-4 minggu\n💻 Web Development: 2-6 minggu\n🎬 Creative Content: 1-2 minggu\n\nTim kami akan memberikan timeline detail sesuai proyek Anda! ⏱️",
    
    portfolio: "Anda bisa melihat portfolio kami di halaman Portfolio. Beberapa project unggulan:\n\n✨ Heritage Coffee - Brand Identity\n✨ Fashion Week 2024 - Social Media Campaign\n✨ E-Commerce Store - Web Development\n✨ Product Photography untuk berbagai brand\n\nKlik menu 'Karya' di navbar untuk melihat selengkapnya! 🎨",
    
    custom: "Tentu! Kami menyediakan paket custom yang dapat disesuaikan dengan kebutuhan, budget, dan target bisnis Anda. Silakan konsultasikan dengan tim kami melalui WhatsApp +62 855 1115 118 untuk mendapatkan penawaran terbaik! 🤝",
    
    garansi: "Ya, kami memberikan garansi kepuasan untuk setiap project. Jika hasil belum sesuai ekspektasi, kami akan melakukan revisi hingga Anda puas. Untuk layanan berlangganan, kami juga memberikan garansi performa dengan laporan bulanan yang transparan! ✅",
    
    lokasi: "Kantor kami berlokasi di Jakarta Selatan, Indonesia. Untuk konsultasi, kami bisa dilakukan secara online via Zoom/Google Meet atau onsite dengan janji temu terlebih dahulu. 📍",
    
    default: "Terima kasih atas pertanyaannya! 🙏\n\nSaya akan bantu menjawab. Silakan pilih pertanyaan di bawah atau hubungi tim kami langsung di WhatsApp +62 855 1115 118 untuk konsultasi lebih lanjut.\n\n✨ Pertanyaan yang sering diajukan:\n- Apa saja layanan Kala Creative?\n- Berapa harga paket layanan?\n- Bagaimana cara menghubungi?\n- Berapa lama proses pengerjaan?\n- Bisa lihat portfolio?\n- Bisa custom paket?\n- Ada garansi?\n- Di mana lokasi kantor?"
};

function sendMessage(message, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = message;
    
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('layanan') || lowerQuestion.includes('service') || lowerQuestion.includes('apa saja')) {
        return faqAnswers.layanan;
    } else if (lowerQuestion.includes('harga') || lowerQuestion.includes('biaya') || lowerQuestion.includes('paket') || lowerQuestion.includes('price')) {
        return faqAnswers.harga;
    } else if (lowerQuestion.includes('kontak') || lowerQuestion.includes('hubungi') || lowerQuestion.includes('wa') || lowerQuestion.includes('whatsapp')) {
        return faqAnswers.kontak;
    } else if (lowerQuestion.includes('waktu') || lowerQuestion.includes('lama') || lowerQuestion.includes('proses') || lowerQuestion.includes('berapa hari')) {
        return faqAnswers.waktu;
    } else if (lowerQuestion.includes('portfolio') || lowerQuestion.includes('portofolio') || lowerQuestion.includes('karya')) {
        return faqAnswers.portfolio;
    } else if (lowerQuestion.includes('custom') || lowerQuestion.includes('kustom') || lowerQuestion.includes('sesuai')) {
        return faqAnswers.custom;
    } else if (lowerQuestion.includes('garansi') || lowerQuestion.includes('jaminan')) {
        return faqAnswers.garansi;
    } else if (lowerQuestion.includes('lokasi') || lowerQuestion.includes('alamat') || lowerQuestion.includes('dimana')) {
        return faqAnswers.lokasi;
    } else {
        return faqAnswers.default;
    }
}

if (chatSend) {
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        sendMessage(message, true);
        chatInput.value = '';
        
        setTimeout(() => {
            const response = getBotResponse(message);
            sendMessage(response, false);
        }, 500);
    });
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });
}

if (questionBtns.length) {
    questionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            const questionText = btn.textContent;
            
            sendMessage(questionText, true);
            
            setTimeout(() => {
                const response = faqAnswers[question] || faqAnswers.default;
                sendMessage(response, false);
            }, 500);
        });
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
        <div class="portfolio-item" data-image="${item.image}" data-title="${item.title}" data-desc="${item.description}">
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
    
    initLightbox();
}

// ========== LIGHTBOX ==========
function initLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (!lightbox) return;
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-image') || item.querySelector('img').src;
            const title = item.getAttribute('data-title') || item.querySelector('.portfolio-overlay h4').textContent;
            const desc = item.getAttribute('data-desc') || item.querySelector('.portfolio-overlay p').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = `${title} - ${desc}`;
            lightbox.style.display = 'flex';
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Filter Portfolio dengan Animasi Smooth
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const grid = document.getElementById('portfolioGrid');
            if (grid) {
                grid.style.opacity = '0';
                grid.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    renderPortfolio(btn.getAttribute('data-filter'));
                    grid.style.opacity = '1';
                    grid.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
    renderPortfolio();
}

// ========== SERVICES DATA (Font Awesome Icons) ==========
const servicesData = [
    { icon: "fab fa-instagram", title: "Social Media Management", desc: "Pengelolaan akun media sosial dengan konten strategis & engagement organik.", link: "social-media-management.html" },
    { icon: "fas fa-camera-retro", title: "Creative Content Production", desc: "Produksi konten kreatif berupa foto, video, dan motion graphics yang engaging.", link: "creative-content.html" },
    { icon: "fas fa-chart-line", title: "Iklan Meta", desc: "Strategi iklan di Facebook & Instagram dengan targeting tepat dan ROI terukur.", link: "meta-ads.html" },
    { icon: "fas fa-palette", title: "Brand Identity Design", desc: "Logo, visual identity, brand guidelines — menciptakan karakter brand yang autentik.", link: "brand-identity.html" },
    { icon: "fas fa-code", title: "Web Development", desc: "Pengembangan website modern, responsif, dan optimal untuk kebutuhan bisnis Anda.", link: "web-development.html" },
    { icon: "fab fa-tiktok", title: "Live TikTok Handling", desc: "Pengelolaan live streaming TikTok untuk meningkatkan interaksi dan penjualan.", link: "live-tiktok.html" },
    { icon: "fas fa-pen-fancy", title: "Design Graphic", desc: "Desain grafis untuk berbagai kebutuhan visual brand Anda.", link: "graphic-design.html" },
    { icon: "fas fa-camera", title: "Foto Produk", desc: "Fotografi produk profesional untuk meningkatkan daya tarik visual.", link: "product-photo.html" },
    { icon: "fas fa-robot", title: "Bot Automation", desc: "Otomatisasi chat, customer service, dan sistem auto-reply untuk efisiensi bisnis.", link: "bot-automation.html" }
];

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    grid.innerHTML = servicesData.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
            <a href="${service.link}" class="service-link">Pelajari <i class="fas fa-arrow-right"></i></a>
        </div>
    `).join('');
}

renderServices();

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

// ========== CONTACT FORM dengan CAPTCHA & AUTO-REPLY ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
let captchaAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    
    document.getElementById('captchaNum1').textContent = num1;
    document.getElementById('captchaNum2').textContent = num2;
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const captchaInput = document.getElementById('captchaInput').value;
        
        if (!name || !email || !message) {
            showFormMessage('Mohon lengkapi semua field yang diperlukan', 'error');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showFormMessage('Email tidak valid', 'error');
            return;
        }
        
        if (parseInt(captchaInput) !== captchaAnswer) {
            showFormMessage('Jawaban captcha salah', 'error');
            generateCaptcha();
            document.getElementById('captchaInput').value = '';
            return;
        }
        
        showFormMessage('Mengirim pesan...', 'info');
        
        setTimeout(() => {
            showFormMessage('Pesan berhasil dikirim! Kami akan menghubungi Anda segera. Terima kasih 🙏', 'success');
            contactForm.reset();
            generateCaptcha();
            
            // Auto-reply simulation
            setTimeout(() => {
                alert('📧 Auto-reply: Terima kasih telah menghubungi Kala Creative! Tim kami akan merespon dalam 1x24 jam.');
            }, 500);
        }, 1500);
    });
}

function showFormMessage(msg, type) {
    if (!formMessage) return;
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ========== NEWSLETTER SUBSCRIPTION ==========
const newsletterBtn = document.getElementById('newsletterBtn');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');

if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
        const email = newsletterEmail.value.trim();
        
        if (!email) {
            newsletterMessage.textContent = 'Masukkan email Anda';
            newsletterMessage.style.color = '#F56565';
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            newsletterMessage.textContent = 'Email tidak valid';
            newsletterMessage.style.color = '#F56565';
            return;
        }
        
        newsletterMessage.textContent = 'Berlangganan berhasil! 🎉';
        newsletterMessage.style.color = '#48BB78';
        newsletterEmail.value = '';
        
        setTimeout(() => {
            newsletterMessage.textContent = '';
        }, 3000);
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
document.querySelectorAll('.service-card').forEach(card => {
    const link = card.querySelector('.service-link');
    if (link) {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A' && !link.contains(e.target)) {
                window.location.href = link.href;
            }
        });
    }
});