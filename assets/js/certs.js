// Use a self-invoking function to avoid global variables
(function() {

    // Sample data for certifications
    const certifications = [
        {
            id: 1,
            title: "Junior Penetration Tester (PT1)",
            image: "/assets/img/PT1.png",
            skills: [
                "Cloud Computing Fundamentals",
                "Google Cloud Core Products",
                "Data & AI Technologies",
                "Security and Operations"
            ]
        },
        {
            id: 2,
            title: "Red Team Operator",
            image: "/assets/img/RTO.png",
            skills: [
                "AWS Cloud Concepts",
                "Security & Compliance",
                "Technology",
                "Billing and Pricing"
            ]
        },
        {
            id: 3,
            title: "Certified Red Team Analyst",
            image: "/assets/img/CRTA.png",
            skills: [
                "Core Azure Services",
                "Cloud Models",
                "Security & Networking",
                "Identity & Access Management"
            ]
        },
        {
            id: 4,
            title: "Certified Red Team Professional",
            image: "/assets/img/CRTP.png",
            skills: [
                "Project Lifecycle Management",
                "Agile & Hybrid Methodologies",
                "Stakeholder Management",
                "Risk & Resource Planning"
            ]
        },
        {
            id: 5,
            title: "Practical Network Penetration Tester",
            image: "/assets/img/PNPT.png",
            skills: [
                "Hardware",
                "Networking",
                "Mobile Devices",
                "Troubleshooting"
            ]
        },
        {
            id: 6,
            title: "eLearnSecurity Junior Penetration Tester v2",
            image: "/assets/img/EJPTv2.png",
            skills: [
                "Security and Risk Management",
                "Asset Security",
                "Security Architecture and Engineering",
                "Communication and Network Security"
            ]
        }
    ];

    const grid = document.getElementById('certifications-grid');
    const modal = document.getElementById('cert-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const skillsList = document.getElementById('skills-list');
    const closeModalBtn = document.getElementById('close-modal');

    // Function to render certification cards
    function renderCertifications() {
        grid.innerHTML = ''; // Clear existing content
        certifications.forEach(cert => {
            const card = document.createElement('div');
            card.classList.add('bg-white', 'rounded-xl', 'shadow-md', 'overflow-hidden', 'cert-card', 'p-4');
            
            card.innerHTML = `
                <img src="${cert.image}" alt="${cert.title} Certification" class="rounded-lg mb-4 w-full h-auto object-cover">
                <div class="text-center">
                    <h2 class="text-lg font-semibold text-gray-800">${cert.title}</h2>
                </div>
            `;
            
            // Add click event listener to open the modal
            card.addEventListener('click', () => openModal(cert));
            grid.appendChild(card);
        });
    }

    // Function to open the modal and populate with data
    function openModal(cert) {
        modalImage.src = cert.image;
        modalTitle.textContent = cert.title;
        skillsList.innerHTML = '';
        cert.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });
        modal.classList.remove('hidden');
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.add('hidden');
    }

    // Event listeners
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close modal when clicking outside the content area
        if (e.target === modal) {
            closeModal();
        }
    });

    // Initial render
    window.onload = renderCertifications;

})();
