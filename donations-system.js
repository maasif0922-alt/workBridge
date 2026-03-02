document.addEventListener('DOMContentLoaded', () => {
    const charityGrid = document.querySelector('.charity-grid');
    if (!charityGrid) return;

    // Load Causes from LocalStorage (Preview) or Data File
    let currentCauses = [];
    const savedCauses = localStorage.getItem('workbridge_donation_causes');

    if (savedCauses) {
        currentCauses = JSON.parse(savedCauses);
    } else if (window.donationCausesData) {
        currentCauses = window.donationCausesData;
    }

    if (currentCauses.length > 0) {
        renderCauses(charityGrid, currentCauses);
    }

    function renderCauses(container, causes) {
        container.innerHTML = causes.map(item => {
            const fundedPercent = Math.min(Math.round((item.raised / item.goal) * 100), 100);
            const badgeStyle = getBadgeStyle(item.category);

            return `
                <article class="charity-card reveal">
                    <img src="${item.image}" alt="${item.title}" class="charity-image">
                    <div class="charity-body">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <span class="badge" style="background: ${badgeStyle.bg}; color: ${badgeStyle.color};">${item.category}</span>
                            <span style="font-size: 0.8rem; color: var(--text-secondary);">${fundedPercent}% Funded</span>
                        </div>
                        <h3 class="charity-title">${item.title}</h3>
                        <p class="charity-desc">${item.description}</p>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${fundedPercent}%;"></div>
                            </div>
                            <div class="progress-stats">
                                <span>Raised: Rs ${item.raised.toLocaleString()}</span>
                                <span>Goal: Rs ${item.goal.toLocaleString()}</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 0.8rem;">
                            <button class="btn-donate" onclick="openDonationModal('${item.title.replace(/'/g, "\\'")}')"
                                style="flex: 1;">Donate Now</button>
                            <button class="btn-share"
                                onclick="shareContent('Charity: ${item.title.replace(/'/g, "\\'")}', 'Help WorkBridge Foundation support this cause.', window.location.href)"
                                title="Share Cause">
                                <i class="fa-solid fa-share-nodes"></i>
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }

    function getBadgeStyle(category) {
        switch (category) {
            case 'Urgent': return { bg: '#fee2e2', color: '#ef4444' };
            case 'Ongoing': return { bg: '#dcfce7', color: '#166534' };
            case 'Critical': return { bg: '#fef3c7', color: '#92400e' };
            case 'Completed': return { bg: '#f1f5f9', color: '#64748b' };
            default: return { bg: '#eff6ff', color: '#3b82f6' };
        }
    }
});
