// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Simple toggle for mobile menu
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--surface-color)';
                navLinks.style.padding = '1rem';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
                navLinks.style.boxShadow = 'var(--shadow-md)';
            }
        });
    }

    // Handle Form submission simply for demo
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Optional: add visual feedback
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Success';
                    setTimeout(() => btn.innerHTML = originalText, 2000);
                }, 1000);
            }
        });
    });

    // Theme Switcher Logic
    const themes = ['light', 'dark', 'sunset', 'emerald'];
    let currentThemeIndex = 0;
    const themeBtn = document.getElementById('themeToggleBtn');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];

            // If light, remove data-theme to fallback to root variables
            if (newTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', newTheme);
            }

            // Add a little pop effect to the button
            themeBtn.style.transform = 'scale(0.8)';
            setTimeout(() => themeBtn.style.transform = '', 150);
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const revealConfig = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Once revealed, stop observing to keep it visible
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, revealConfig);
        reveals.forEach(reveal => revealObserver.observe(reveal));
    }

    // Hero Image Slider Logic
    const slides = document.querySelectorAll('.hero-image-slider .slide');
    const bgSlides = document.querySelectorAll('.hero-bg-slider .bg-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let slideIndex = 0;
    let slideInterval;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            if (bgSlides.length > 0) bgSlides.forEach(b => b.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            slideIndex = index;
            if (slideIndex >= slides.length) slideIndex = 0;
            if (slideIndex < 0) slideIndex = slides.length - 1;

            slides[slideIndex].classList.add('active');
            if (bgSlides.length > 0) bgSlides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
        };

        const nextSlide = () => {
            showSlide(slideIndex + 1);
        };

        // Attach to window so onclick="currentSlide(n)" works
        window.currentSlide = (index) => {
            showSlide(index);
            resetInterval();
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4000); // Change image every 4 seconds
        };

        // Start slider
        resetInterval();
    }
});

// Search Tabs Switcher
let activeSearchTab = 'jobs';

const searchCategories = {
    'jobs': [
        { value: '', text: 'All Job Categories' },
        { value: 'electrician', text: 'Electrician Jobs' },
        { value: 'driver', text: 'Driver Jobs' },
        { value: 'mason', text: 'Mason Jobs' },
        { value: 'data-entry', text: 'Data Entry Jobs' },
        { value: 'graphic-design', text: 'Graphic Design Jobs' },
        { value: 'video-editing', text: 'Video Editing Jobs' },
        { value: 'typing', text: 'Typing Jobs' },
        { value: 'helper', text: 'Helper Jobs' }
    ],
    'services': [
        { value: '', text: 'All Services' },
        { value: 'electrician', text: 'Electrical Services' },
        { value: 'driver', text: 'Driving Services' },
        { value: 'mason', text: 'Masonry Services' },
        { value: 'data-entry', text: 'Data Entry Services' },
        { value: 'graphic-design', text: 'Design Services' },
        { value: 'video-editing', text: 'Video Services' },
        { value: 'typing', text: 'Typing Services' },
        { value: 'helper', text: 'Helper / Labor' }
    ]
};

function switchWizardTab(tab) {
    activeSearchTab = tab;
    const tabs = document.querySelectorAll('.wizard-tabs .tab-btn');
    const input = document.getElementById('home-search-input');

    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'jobs') {
        tabs[0].classList.add('active');
        if (input) input.placeholder = 'e.g. Electrician, Data Entry...';
    } else {
        tabs[1].classList.add('active');
        if (input) input.placeholder = 'e.g. Graphic Design, Plumbing...';
    }

    updateSearchCategories(tab);

    // Jump back to step 1 when tab is changed
    nextWizardStep(1);
}

function updateSearchCategories(tab) {
    const categorySelect = document.getElementById('home-search-category');
    if (!categorySelect) return;

    categorySelect.innerHTML = '';
    const categories = searchCategories[tab] || [];

    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.value;
        option.textContent = cat.text;
        categorySelect.appendChild(option);
    });
}

function nextWizardStep(step) {
    const steps = [1, 2, 3];
    steps.forEach(s => {
        const el = document.getElementById(`wizard-step-${s}`);
        const dot = document.getElementById(`dot-${s}`);
        if (el) el.style.display = 'none';
        if (dot) dot.classList.remove('active');
    });

    const activeEl = document.getElementById(`wizard-step-${step}`);
    const activeDot = document.getElementById(`dot-${step}`);
    if (activeEl) {
        activeEl.style.display = 'block';
        activeEl.style.animation = 'fadeInUp 0.4s ease forwards';
    }
    if (activeDot) activeDot.classList.add('active');
}

// Home Page Wizard Search Handling
function submitWizardSearch() {
    const searchInput = document.getElementById('home-search-input');
    const categoryInput = document.getElementById('home-search-category');
    const countryInput = document.getElementById('home-search-country');
    const locationInput = document.getElementById('home-search-location');

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const searchCategory = categoryInput ? categoryInput.value : '';
    const searchCountry = countryInput ? countryInput.value : '';
    const searchLocation = locationInput ? locationInput.value : '';

    // If a specific category was selected from dropdown, prioritize it
    const activeSearchKey = searchCategory !== '' ? searchCategory : searchTerm;

    if (activeSearchKey.includes('electric') || activeSearchKey.includes('wiring') || activeSearchKey.includes('bijli')) {
        window.location.href = 'category-electrician.html';
        return;
    }
    if (searchTerm.includes('drive') || searchTerm.includes('car') || searchTerm.includes('transport')) {
        window.location.href = 'category-driver.html';
        return;
    }
    if (activeSearchKey.includes('mason') || activeSearchKey.includes('build') || activeSearchKey.includes('mistry')) {
        window.location.href = 'category-mason.html';
        return;
    }
    if (activeSearchKey.includes('data') || activeSearchKey.includes('excel') || activeSearchKey.includes('entry')) {
        window.location.href = 'category-data-entry.html';
        return;
    }
    if (activeSearchKey.includes('graphic') || activeSearchKey.includes('design') || activeSearchKey.includes('logo')) {
        window.location.href = 'category-graphic-design.html';
        return;
    }
    if (activeSearchKey.includes('video') || activeSearchKey.includes('edit')) {
        window.location.href = 'category-video-editing.html';
        return;
    }
    if (activeSearchKey.includes('typ') || activeSearchKey.includes('word')) {
        window.location.href = 'category-typing.html';
        return;
    }
    if (activeSearchKey.includes('help') || activeSearchKey.includes('labor') || activeSearchKey.includes('mazdoor')) {
        window.location.href = 'category-helper.html';
        return;
    }

    if (activeSearchTab === 'jobs') {
        window.location.href = 'jobs.html';
    } else {
        window.location.href = 'services.html';
    }
}


// Job Filtering & Search Logic
let currentJobFilter = 'all';

function filterJobs(filter, btn) {
    currentJobFilter = filter;

    // Handle tab active state
    const tabs = document.querySelectorAll('#job-filters .tab-btn');
    if (tabs.length > 0) {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
    }

    applyJobFilters();
}

function searchJobs() {
    applyJobFilters();
}

function applyJobFilters() {
    const titleInput = document.getElementById('job-search-title');
    const locationInput = document.getElementById('job-search-location');

    const searchTitle = titleInput ? titleInput.value.toLowerCase() : '';
    const searchLocation = locationInput ? locationInput.value.toLowerCase() : '';

    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const location = card.querySelector('.card-subtitle').textContent.toLowerCase();
        const jobType = card.dataset.jobType;

        const matchesTitle = title.includes(searchTitle);
        const matchesLocation = searchLocation === '' || location.includes(searchLocation);
        const matchesTab = (currentJobFilter === 'all') || (jobType === currentJobFilter);

        if (matchesTitle && matchesLocation && matchesTab) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Service Filtering & Search Logic
let currentServiceFilter = 'all';

function filterServices(filter, btn) {
    currentServiceFilter = filter;

    // Handle tab active state
    const tabs = document.querySelectorAll('#service-filters .tab-btn');
    if (tabs.length > 0) {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
    }

    applyServiceFilters();
}

function searchServices() {
    applyServiceFilters();
}

function applyServiceFilters() {
    const titleInput = document.getElementById('service-search-title');

    const searchTitle = titleInput ? titleInput.value.toLowerCase() : '';

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();

        const serviceType = card.dataset.serviceType;

        const matchesTitle = title.includes(searchTitle);
        const matchesTab = (currentServiceFilter === 'all') || (serviceType === currentServiceFilter);

        if (matchesTitle && matchesTab) {
            card.style.display = 'block'; // Service cards are blocks
        } else {
            card.style.display = 'none';
        }
    });
}

// Dynamic City Population Logic
const countryCities = {
    'pakistan': ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad'],
    'india': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'],
    'uae': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah'],
    'saudi': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
    'uk': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh'],
    'usa': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    'australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    'canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa']
};

function updateCities() {
    const countrySelect = document.getElementById('home-search-country');
    const citySelect = document.getElementById('home-search-location');

    if (!countrySelect || !citySelect) return;

    const selectedCountry = countrySelect.value;
    const cities = countryCities[selectedCountry] || [];

    // Clear current options
    citySelect.innerHTML = '<option value="">All Cities</option>';

    // Add new options
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.toLowerCase().replace(/\s+/g, '-');
        option.textContent = city;
        citySelect.appendChild(option);
    });

    // Add remote option at the end
    const remoteOption = document.createElement('option');
    remoteOption.value = 'remote';
    remoteOption.textContent = 'Remote';
    citySelect.appendChild(remoteOption);
}

// Freelancer Filtering & Search Logic
let currentFreelancerFilter = 'all';

function filterFreelancers(filter, btn) {
    currentFreelancerFilter = filter;

    // Handle tab active state
    const tabs = document.querySelectorAll('#freelancer-filters .tab-btn');
    if (tabs.length > 0) {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
    }

    applyFreelancerFilters();
}

function searchFreelancers() {
    applyFreelancerFilters();
}

function applyFreelancerFilters() {
    const titleInput = document.getElementById('freelancer-search-title');

    const searchString = titleInput ? titleInput.value.toLowerCase() : '';

    const freelancerCards = document.querySelectorAll('.freelancer-card');
    freelancerCards.forEach(card => {
        const name = card.querySelector('.card-title').textContent.toLowerCase();
        const skill = card.querySelector('.card-subtitle').textContent.toLowerCase();

        // Let's also search location that might be in body
        const bodies = card.querySelectorAll('.card-subtitle');
        let loc = '';
        bodies.forEach(b => {
            if (b.innerHTML.includes('fa-location-dot')) {
                loc = b.textContent.toLowerCase();
            }
        });

        const freelancerType = card.dataset.freelancerType;

        const matchesSearch = name.includes(searchString) || skill.includes(searchString) || loc.includes(searchString);
        const matchesTab = (currentFreelancerFilter === 'all') || (freelancerType === currentFreelancerFilter);

        if (matchesSearch && matchesTab) {
            card.style.display = 'block'; // Freelancer cards are blocks
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize cities on load if elements exist
document.addEventListener('DOMContentLoaded', () => {
    updateCities();

    // Initialize search categories based on default active tab
    if (document.getElementById('home-search-category')) {
        updateSearchCategories('jobs');
    }

    const buttonHtml = `
        <button id="global-create-post-btn" class="floating-btn">
            <i class="fa-solid fa-plus"></i> Create Post
        </button>
    `;

    const modalHtml = `
        <div id="post-modal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2 style="margin-bottom: 1.5rem; font-size: 1.5rem;">What would you like to post?</h2>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <a href="post-job.html" class="btn btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; text-decoration: none;">
                        <i class="fa-solid fa-briefcase"></i> Post a Job (Hire)
                    </a>
                    <a href="post-service.html" class="btn" style="border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; gap: 0.8rem; text-decoration: none; color: var(--text-color);">
                        <i class="fa-solid fa-hand-holding-hand"></i> Offer a Service (Freelance)
                    </a>
                </div>
                <p style="margin-top: 1.5rem; font-size: 0.85rem; color: var(--text-secondary);">Choose an option to reach thousands of users.</p>
            </div>
        </div>
    `;

    // Inject Modal into body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Inject Button into navbar after logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.insertAdjacentHTML('afterend', buttonHtml);
    } else {
        document.body.insertAdjacentHTML('beforeend', buttonHtml);
    }

    // Modal Logic
    const modal = document.getElementById("post-modal");
    const btn = document.getElementById("global-create-post-btn");

    if (btn && modal) {
        btn.onclick = function () {
            modal.style.display = "flex";
        }

        const span = modal.querySelector(".close-modal");
        if (span) {
            span.onclick = function () {
                modal.style.display = "none";
            }
        }
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
// Global Share Functionality
function shareContent(title, text, url) {
    const fullUrl = url || window.location.href;
    const shareData = {
        title: title || 'WorkBridge',
        text: text || 'Check this out on WorkBridge!',
        url: fullUrl
    };

    if (navigator.share) {
        navigator.share(shareData)
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(fullUrl).then(() => {
            // Create a temporary toast if possible, or just alert
            alert('Link copied to clipboard! Share it with your friends.');
        }).catch(err => {
            console.error('Could not copy link:', err);
        });
    }
}
