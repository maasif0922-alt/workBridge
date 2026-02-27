document.addEventListener('DOMContentLoaded', () => {
    // Load Global Settings
    const savedSettings = localStorage.getItem('workbridge_settings');
    if (!savedSettings) return;

    const settings = JSON.parse(savedSettings);

    // Apply WhatsApp Number to all WhatsApp buttons
    if (settings.whatsapp) {
        const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-link');
        whatsappButtons.forEach(btn => {
            // Check if it's a button or an anchor
            if (btn.tagName === 'A') {
                btn.href = `https://wa.me/${settings.whatsapp}`;
            } else {
                btn.onclick = () => window.open(`https://wa.me/${settings.whatsapp}`, '_blank');
            }
        });
    }

    // Apply Site Name
    if (settings.siteName) {
        const siteNames = document.querySelectorAll('.site-name-dynamic');
        siteNames.forEach(el => {
            el.textContent = settings.siteName;
        });
    }

    // Apply Social Media Links
    const socialPlatforms = [
        { key: 'socialFb', id: 'social-fb' },
        { key: 'socialIg', id: 'social-ig' },
        { key: 'socialTw', id: 'social-tw' },
        { key: 'socialLi', id: 'social-li' },
        { key: 'socialTk', id: 'social-tk' },
        { key: 'socialYt', id: 'social-yt' }
    ];

    socialPlatforms.forEach(platform => {
        if (settings[platform.key]) {
            const elements = document.querySelectorAll(`.${platform.id}, #${platform.id}`);
            elements.forEach(el => {
                el.href = settings[platform.key];
                // Show the element if it was hidden (optional)
                el.style.display = 'inline-flex';
            });
        } else {
            // Hide elements if no link is provided (optional)
            const elements = document.querySelectorAll(`.${platform.id}, #${platform.id}`);
            elements.forEach(el => {
                el.style.display = 'none';
            });
        }
    });
});
