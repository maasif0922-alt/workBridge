/**
 * WorkBridge Authentication System
 * Handles login, logout, and session simulation
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form-element');
    const signupForm = document.getElementById('signup-form-element');

    // Add Signup Handler
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const btn = signupForm.querySelector('button[type="submit"]');

            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
            btn.disabled = true;

            setTimeout(() => {
                if (email && password && name) {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Account Created!';
                    btn.style.background = '#10b981';

                    const selectedPlan = localStorage.getItem('selected_earning_plan');

                    localStorage.setItem('workbridge_user', JSON.stringify({
                        name: name,
                        email: email,
                        role: 'user',
                        earning_plan: selectedPlan || "Free Visitor Plan",
                        loginDate: new Date().toISOString()
                    }));

                    if (selectedPlan || !selectedPlan) {
                        // Always initialize earning profile for new users just in case
                        localStorage.setItem('earning_profile', JSON.stringify({
                            points: 0,
                            earnings: 0,
                            activeTime: 0,
                            isTimerRunning: false,
                            completedTasks: [],
                            joinDate: new Date().toISOString()
                        }));
                    }

                    setTimeout(() => {
                        window.location.href = './earning-dashboard.html';
                        localStorage.removeItem('selected_earning_plan');
                    }, 1000);
                } else {
                    btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Registration Failed';
                    btn.style.background = '#ef4444';
                    btn.disabled = false;
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 2000);
                }
            }, 1000);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const loginBtn = loginForm.querySelector('button[type="submit"]');

            // Show loading state
            const originalText = loginBtn.innerHTML;
            loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
            loginBtn.disabled = true;

            // Simulation of API delay
            setTimeout(() => {
                // Mock authentication check
                // In a real app, this would be a fetch call to the backend
                if (email && password) {
                    // Success!
                    loginBtn.innerHTML = '<i class="fa-solid fa-check"></i> Welcome Back!';
                    loginBtn.style.background = '#10b981';

                    const selectedPlan = localStorage.getItem('selected_earning_plan');

                    // Save mock session
                    localStorage.setItem('workbridge_user', JSON.stringify({
                        name: email.split('@')[0],
                        email: email,
                        role: 'user', // Set as user, normally admin is for dashboard
                        earning_plan: selectedPlan || null, // Store selected earning plan
                        loginDate: new Date().toISOString()
                    }));

                    // We will initialize the earning profile if they selected a plan
                    if (selectedPlan) {
                        const existingProfile = localStorage.getItem('earning_profile');
                        if (!existingProfile) {
                            localStorage.setItem('earning_profile', JSON.stringify({
                                points: 0,
                                earnings: 0,
                                activeTime: 0,
                                isTimerRunning: false, // Ensure timer only runs on the dashboard
                                completedTasks: 0,
                                joinDate: new Date().toISOString()
                            }));
                        }
                    }

                    // Redirect to appropriate dashboard
                    setTimeout(() => {
                        if (selectedPlan) {
                            window.location.href = './earning-dashboard.html';
                            // Clear it so normal logins don't loop here unnecessarily next time unless reregistering
                            localStorage.removeItem('selected_earning_plan');
                        } else {
                            if (email.includes('admin')) {
                                window.location.href = './dashboard.html';
                            } else {
                                window.location.href = './user-profile.html';
                            }
                        }
                    }, 1000);
                } else {
                    // Error
                    loginBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Invalid Credentials';
                    loginBtn.style.background = '#ef4444';
                    loginBtn.disabled = false;

                    setTimeout(() => {
                        loginBtn.innerHTML = originalText;
                        loginBtn.style.background = '';
                    }, 2000);
                }
            }, 1500);
        });
    }

    // Modal Global Handling
    window.openLoginModal = function () {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Stop scrolling
        }
    };

    window.registerForPlan = function (planName) {
        localStorage.setItem('selected_earning_plan', planName);
        window.openLoginModal();
        window.switchAuthTab('signup'); // Default to signup when registering for a plan
    };

    window.switchAuthTab = function (tab) {
        const loginForm = document.getElementById('login-form-element');
        const signupForm = document.getElementById('signup-form-element');
        const loginBtn = document.getElementById('tab-login-btn');
        const signupBtn = document.getElementById('tab-signup-btn');
        const modalTitle = document.getElementById('auth-modal-title');
        const modalSubtitle = document.getElementById('auth-modal-subtitle');

        if (!loginForm || !signupForm) return;

        if (tab === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            loginBtn.style.borderBottom = '2px solid var(--primary-color)';
            loginBtn.style.color = 'var(--primary-color)';
            signupBtn.style.borderBottom = '2px solid transparent';
            signupBtn.style.color = 'var(--text-secondary)';
            if (modalTitle) modalTitle.textContent = 'Welcome Back';
            if (modalSubtitle) modalSubtitle.textContent = 'Sign in to access your dashboard.';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            signupBtn.style.borderBottom = '2px solid var(--primary-color)';
            signupBtn.style.color = 'var(--primary-color)';
            loginBtn.style.borderBottom = '2px solid transparent';
            loginBtn.style.color = 'var(--text-secondary)';
            if (modalTitle) modalTitle.textContent = 'Join WorkBridge';
            if (modalSubtitle) modalSubtitle.textContent = 'Create a new account to start earning.';
        }
    };

    window.closeLoginModal = function () {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Resume scrolling
        }
    };

    // Logout logic
    window.handleLogout = function () {
        localStorage.removeItem('workbridge_user');
        window.location.href = './index.html';
    };

    // Close on overlay click
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) closeLoginModal();
        });
    }
});
