// Use a self-invoking function to avoid global variables
(function() {

    // Sample data for certifications
    const certifications = [
        {
            id: 1,
            title: "Junior Penetration Tester (PT1)",
            image: "/assets/img/PT1.png",
            skills: [
                "Web Application Penetration Testing",
                "System & Network Penetration Testing",
                "Active Directory Penetration Testing"
            ]
        },
        {
            id: 2,
            title: "Red Team Operator",
            image: "/assets/img/RTO.png",
            skills: [
                "Law & Compliance",
                "Reconnaissance",
                "Initial Access",
                "Privilege Escalation",
                "User Impersonation",
                "Persistence",
                "Lateral Movement",
                "Credential Access",
                "Pivoting",
                "Active Directory",
                "Post-Exploitation",
                "Defense Avasion",
                "Attacking Forest & Domain Trust",
                "Reporting"
            ]
        },
        {
            id: 3,
            title: "Certified Red Team Analyst",
            image: "/assets/img/CRTA.png",
            skills: [
                "Penetration Testing",
                "Understanding of MITRE ATT&CK Framework",
                "Understanding of Web & Network Level Attacks",
                "Internal & External Red Teaming Methodology",
                "Understanding of technologies used in Enterprise Environment",
                "Windows Security",
                "Adversary Simulation",
                "Active Directory Attacks",
                "Pivoting Multi-OS environment"
            ]
        },
        {
            id: 4,
            title: "Certified Red Team Professional",
            image: "/assets/img/CRTP.png",
            skills: [
                "Enterprise Security",
                "Active Directory Penetration Testing",
                "Active Directory",
                "Red Team Attack Simulation",
                "Windows Security",
                "Infosec",
                "Network Security",
                "Information Security",
                "Powershell",
                "Blue Team",
                "Active Directory Security"
            ]
        },
        {
            id: 5,
            title: "Practical Network Penetration Tester",
            image: "/assets/img/PNPT.png",
            skills: [
                "OSINT",
                "Enumeration",
                "Network Information Gathering",
                "Ethical Hacking",
                "Penetration Testing",
                "Active Directory Exploitation"
            ]
        },
        {
            id: 6,
            title: "eLearnSecurity Junior Penetration Tester v2",
            image: "/assets/img/EJPTv2.png",
            skills: [
                "Assessment Methodologies",
                "System and Network Auditing",
                "System and Network Penetration Testing",
                "Web Application Penetration Testing"
            ]
        },
        {
            id: 7,
            title: "Active Directory RedTeam Specialist",
            image: "/assets/img/AD-RTS_Cert.jpeg",
            skills: [
                "Active Directory Fundamentals",
                "AD Exploitation",
                "Attacking AD Certificate Service",
                "Lateral movement",
                "ESXi Red Ops",
                "Data Exfiltration"
            ]
        },
        {
            id: 8,
            title: "Cisco Certified Network Associate",
            image: "/assets/img/ccna_jarge.jpg",
            skills: [
                "ANetwork Fundamentals",
                "Network Access & Connectivity",
                "Architecture and Services",
                "Assurance and Automation",
                "Core Routing and Connectivity",
                "Security"
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
