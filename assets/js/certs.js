/* ── RootedN00b Portfolio — Certifications Script ── */
(function () {

  const CERTS = [
    {
      id: 'CDSA',
      title: 'Certified Defensive Security Analyst',
      image: 'assets/img/CDSA.png',
      issuer: 'HackTheBox',
      color: '#125ef6',
      skills: [
        'SOC Processes & Methodologies',
        'SIEM Operations (ELK/Splunk)',
        'Tactical Analytics',
        'Log Analysis',
        'Threat Hunting',
        'Active Directory Attack Analysis',
        'Network Traffic Analysis (Incl. IDS/IPS)',
        'Malware Analysis',
        'DFIR Operations'
      ]
    },
    {
      id: 'FCA',
      title: 'Fortinet Certified Associate in Cybersecurity',
      image: 'assets/img/FCA.png',
      issuer: 'Fortinet',
      color: '#125ef6',
      skills: [
        'Fortigate Firewall Management',
        'Intrusion Prevention System (IPS)',
        'Antivirus & Web Filtering',
        'IPSec / SSL VPN',
        'Cybersecurity Fundamentals',
        'Network Access Control'
      ]
    },
    {
      id: 'CCNA',
      title: 'Cisco Certified Network Associate',
      image: 'assets/img/CCNA.png',
      issuer: 'Cisco',
      color: '#125ef6',
      skills: [
        'Network Fundamentals',
        'Network Access & Connectivity',
        'Routing & Switching',
        'Core Architecture & Services',
        'Network Automation',
        'Security & Virtualization',
        'Wireless Implementation',
        'Network Segmentation'
      ]
    },
    {
      id: 'AD_RTS',
      title: 'Active Directory Red Team Specialist',
      image: 'assets/img/AD-RTS_Cert.jpeg',
      issuer: 'Sektor7 / Custom',
      color: '#f70e48',
      skills: [
        'Active Directory Fundamentals',
        'AD Exploitation & Enumeration',
        'Attacking AD Certificate Services (ADCS)',
        'Lateral Movement Techniques',
        'ESXi Red Ops',
        'Data Exfiltration'
      ]
    },
    {
      id: 'PT1',
      title: 'Junior Penetration Tester (PT1)',
      image: 'assets/img/PT1.png',
      issuer: 'TCM Security',
      color: '#f70e48',
      skills: [
        'Web Application Penetration Testing',
        'System & Network Penetration Testing',
        'Active Directory Penetration Testing'
      ]
    },
    {
      id: 'RTO',
      title: 'Red Team Operator',
      image: 'assets/img/RTO.png',
      issuer: 'Zero-Point Security',
      color: '#f70e48',
      skills: [
        'Law & Compliance',
        'Reconnaissance & Initial Access',
        'Privilege Escalation',
        'User Impersonation & Persistence',
        'Lateral Movement',
        'Active Directory Attacks',
        'Credential Access',
        'Pivoting',
        'Defense Evasion',
        'Post-Exploitation',
        'Attacking Forest & Domain Trust',
        'Reporting'
      ]
    },
    {
      id: 'CRTA',
      title: 'Certified Red Team Analyst',
      image: 'assets/img/CRTA.png',
      issuer: 'AlteredSecurity',
      color: '#f70e48',
      skills: [
        'Penetration Testing Methodology',
        'MITRE ATT&CK Framework',
        'Web & Network Level Attacks',
        'Internal & External Red Teaming',
        'Enterprise Environment Technologies',
        'Active Directory Attacks',
        'Adversary Simulation',
        'Pivoting in Multi-OS Environments'
      ]
    },
    {
      id: 'CRTP',
      title: 'Certified Red Team Professional',
      image: 'assets/img/CRTP.png',
      issuer: 'AlteredSecurity',
      color: '#f70e48',
      skills: [
        'Enterprise Security',
        'Active Directory Penetration Testing',
        'Red Team Attack Simulation',
        'Windows Security',
        'Network Security',
        'PowerShell Tradecraft',
        'Blue Team Awareness',
        'Active Directory Security',
        'Infosec'
      ]
    },
    {
      id: 'PNPT',
      title: 'Practical Network Penetration Tester',
      image: 'assets/img/PNPT.png',
      issuer: 'TCM Security',
      color: '#f70e48',
      skills: [
        'OSINT & Reconnaissance',
        'Enumeration Techniques',
        'Network Information Gathering',
        'Ethical Hacking',
        'Active Directory Exploitation',
        'Report Writing'
      ]
    },
    {
      id: 'EJPTv2',
      title: 'eLearnSecurity Junior Penetration Tester v2',
      image: 'assets/img/EJPTv2.png',
      issuer: 'INE Security',
      color: '#f70e48',
      skills: [
        'Assessment Methodologies',
        'System & Network Auditing',
        'System & Network Penetration Testing',
        'Web Application Penetration Testing'
      ]
    }
  ];

  // ── Render grid ──
  const grid = document.getElementById('certifications-grid');
  if (!grid) return;

  CERTS.forEach((cert, idx) => {
    const tile = document.createElement('div');
    tile.className = 'cert-tile reveal';
    tile.style.animationDelay = (idx * 0.06) + 's';
    tile.setAttribute('data-id', cert.id);
    tile.innerHTML = `
      <div class="cert-img-wrap">
        <img src="${cert.image}" alt="${cert.title}" loading="lazy"/>
      </div>
      <div class="cert-meta">
        <div class="cert-issuer">${cert.issuer}</div>
        <div class="cert-title-text">${cert.title}</div>
        <div class="cert-hint">
          <span class="cert-hint-icon" style="color:${cert.color}">▸</span>
          Click for details
        </div>
      </div>
      <div class="cert-accent-bar" style="background:${cert.color}"></div>
    `;
    tile.addEventListener('click', () => openModal(cert));
    grid.appendChild(tile);
  });

  // ── Modal ──
  const overlay    = document.getElementById('modal-overlay');
  const modalImg   = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalIssuer= document.getElementById('modal-issuer');
  const modalSkills= document.getElementById('modal-skills');
  const modalClose = document.getElementById('modal-close');
  const modalAccent= document.getElementById('modal-accent');

  function openModal(cert) {
    modalImg.src         = cert.image;
    modalImg.alt         = cert.title;
    modalTitle.textContent  = cert.title;
    modalIssuer.textContent = '// Issued by: ' + cert.issuer;
    modalAccent.style.background = cert.color;
    modalAccent.style.boxShadow  = `0 0 20px ${cert.color}55`;

    modalSkills.innerHTML = cert.skills.map(s =>
      `<div class="modal-skill-item">
        <span class="skill-bullet" style="color:${cert.color}">▸</span>
        <span>${s}</span>
      </div>`
    ).join('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (overlay)   overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

})();
