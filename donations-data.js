const defaultDonationCauses = [
    {
        id: "cause-1",
        title: "Support a Daily Worker's Family",
        category: "Urgent",
        description: "Provision of monthly food packages (Rashan) for 50 families of daily based construction workers who are currently out of work due to health issues.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
        goal: 100000,
        raised: 65000,
        status: "Active"
    },
    {
        id: "cause-2",
        title: "Education for Workers' Children",
        category: "Ongoing",
        description: "Covering the annual school fees, uniforms, and books for 20 children to ensure their future is bright and full of opportunities.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
        goal: 100000,
        raised: 40000,
        status: "Active"
    },
    {
        id: "cause-3",
        title: "Worker's Medical Emergency Fund",
        category: "Critical",
        description: "Emergency surgeries and medical bills for workers injured on sites. Your contribution ensures no one is left untreated because of money.",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600",
        goal: 100000,
        raised: 85000,
        status: "Active"
    }
];

// Exporting for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = defaultDonationCauses;
} else {
    window.donationCausesData = defaultDonationCauses;
}
