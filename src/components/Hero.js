import React, { useState, useEffect, useCallback } from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaDownload,
  FaLaravel, FaPhp, FaDatabase, FaReact,
  FaShoppingCart, FaTicketAlt, FaUsers,
  FaCode, FaServer, FaTools, FaBox,
  FaCalendarAlt, FaMapMarkerAlt,
  FaTimes, FaChevronLeft, FaChevronRight, FaImages,
  FaArrowRight, FaArrowUp, FaFileAlt, FaMobile,
  FaSun, FaMoon, FaJs, FaExternalLinkAlt,
  FaCheckCircle, FaRocket, FaBrain
} from 'react-icons/fa';
import { FaVuejs } from 'react-icons/fa';
import { SiTailwindcss, SiInertia } from 'react-icons/si';
import './Hero.css';

import profilePhoto     from '../assets/charles.jpg';
import ticketingImage2  from '../assets/projects/ticketing-2.png';
import ticketingImage3  from '../assets/projects/ticketing-3.png';
import ticketingImage4  from '../assets/projects/ticketing-4.png';
import ticketingImage5  from '../assets/projects/ticketing-5.png';
import ticketingImage6  from '../assets/projects/ticketing-6.png';
import ticketingImage7  from '../assets/projects/ticketing-7.png';
import hrisImage1       from '../assets/projects/hris-1.png';
import hrisImage2       from '../assets/projects/hris-2.png';
import hrisImage3       from '../assets/projects/hris-3.png';
import inventoryImage1  from '../assets/projects/inventory-1.png';
import inventoryImage2  from '../assets/projects/inventory-2.png';
import inventoryImage3  from '../assets/projects/inventory-3.png';
import ecommerceImage1  from '../assets/projects/ecommerce-1.png';
import ecommerceImage2  from '../assets/projects/ecommerce-2.png';
import ecommerceImage3  from '../assets/projects/ecommerce-3.png';
import ecommerceImage4  from '../assets/projects/ecommerce-4.png';
import ecommerceImage5  from '../assets/projects/ecommerce-5.png';
import ecommerceImage6  from '../assets/projects/ecommerce-6.png';
import ecommerceImage7  from '../assets/projects/ecommerce-7.png';
import ecommerceImage8  from '../assets/projects/ecommerce-8.png';
import ecommerceImage9  from '../assets/projects/ecommerce-9.png';
import ecommerceImage10 from '../assets/projects/ecommerce-10.png';
import ecommerceImage11 from '../assets/projects/ecommerce-11.png';
import ecommerceImage12 from '../assets/projects/ecommerce-12.png';
import ecommerceImage13 from '../assets/projects/ecommerce-13.png';
import ecommerceImage14 from '../assets/projects/ecommerce-14.png';
import ecommerceImage15 from '../assets/projects/ecommerce-15.png';
import ecommerceImage16 from '../assets/projects/ecommerce-16.png';
import ecommerceImage17 from '../assets/projects/ecommerce-17.png';
import ecommerceImage18 from '../assets/projects/ecommerce-18.png';
import resumePDF from '../assets/KingCharlie_Dacillo_Portfolio.pdf';
import logo from '../assets/kayecee.png';

/* ── Toast ──────────────────────────────────────────────── */
const TOAST_ICONS = {
  success: <svg viewBox="0 0 16 16" fill="none" width="15" height="15"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  error:   <svg viewBox="0 0 16 16" fill="none" width="15" height="15"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  warning: <svg viewBox="0 0 16 16" fill="none" width="15" height="15"><path d="M8 2.5L13.5 13H2.5L8 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6.5v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  info:    <svg viewBox="0 0 16 16" fill="none" width="15" height="15"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`toast toast-${type}`} role="alert">
      <span className={`t-icon ti-${type}`}>{TOAST_ICONS[type]}</span>
      <span className="t-msg">{message}</span>
      <button className="t-close" onClick={onClose} aria-label="Dismiss"><FaTimes /></button>
      <div className="t-drain" />
    </div>
  );
};

/* ── Data ───────────────────────────────────────────────── */
const TECH_STACK = {
  backend: [
    { icon: <FaLaravel />,  label: 'Laravel',  color: '#FF2D20' },
    { icon: <FaPhp />,      label: 'PHP',       color: '#777BB4' },
    { icon: <FaDatabase />, label: 'MySQL',     color: '#00758F' },
    { icon: <FaServer />,   label: 'Node.js',  color: '#539E43' },
  ],
  frontend: [
    { icon: <FaReact />,       label: 'React',      color: '#61DAFB' },
    { icon: <SiInertia />,     label: 'Inertia',    color: '#9553E9' },
    { icon: <FaJs />,          label: 'JavaScript', color: '#F7DF1E' },
    { icon: <FaVuejs />,       label: 'Vue.js',     color: '#42B883' },
    { icon: <SiTailwindcss />, label: 'Tailwind',   color: '#38BDF8' },
  ],
};

const NAV_ITEMS = [
  { label: 'Home',       href: '#home'       },
  { label: 'About',      href: '#about'      },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  // { label: 'Contact',    href: '#contact'    },
];

const STATS = [

];

const EXPERTISE_DEEP = [
  {
    icon: <FaCode />,
    title: 'Backend Architecture',
    color: '#FF2D20',
    desc: 'I design server-side systems using Laravel and PHP — RESTful APIs, complex business logic, auth systems, and queue-driven jobs. I write code that is readable, testable, and built to scale beyond the first release.',
    tags: ['Laravel', 'PHP', 'REST APIs', 'MVC Pattern', 'Auth & RBAC'],
  },
  {
    icon: <FaReact />,
    title: 'Frontend Engineering',
    color: '#33cffa',
    desc: 'I build interfaces people enjoy using. React with Inertia.js gives me SPA-like reactivity on Laravel backends without the complexity of a decoupled architecture — fast to build, easy to maintain.',
    tags: ['React', 'Inertia.js', 'Vue.js', 'Tailwind CSS', 'Blade Templates'],
  },
  {
    icon: <FaDatabase />,
    title: 'Database & Performance',
    color: '#00758F',
    desc: 'The database is the heart of every system I build. I model data carefully, write optimised queries, understand indexing strategies, and know when to denormalise for read performance at scale.',
    tags: ['MySQL', 'Schema Design', 'Query Optimisation', 'Indexing', 'Oracle DB'],
  },
  {
    icon: <FaServer />,
    title: 'Infrastructure & Ops',
    color: '#539E43',
    desc: 'Having managed 120+ branch networks, I understand infrastructure from the ground up. Switches, VPNs, POS systems, server deployments — I bring that operational mindset to every application I build.',
    tags: ['Network Infra', 'MERAKI SD-WAN', 'Windows Server', 'POS Systems', 'Active Directory'],
  },
  {
    icon: <FaBrain />,
    title: 'AI Integration',
    color: '#9553E9',
    desc: 'I am actively building AI-powered features — integrating OpenAI APIs for smart automation, generative content, and intelligent workflows. The goal: applications that feel like they think alongside the user.',
    tags: ['OpenAI API', 'LLM Integration', 'Prompt Engineering', 'AI Workflows'],
  },
];

const PROJECTS = [
  {
    title: 'Enterprise Ticketing System',
    subtitle: 'IT Support Platform · Role-Based Workflow · Live',
    description: 'A full-featured IT support platform I built from scratch for Mabuhay Group. It replaced a chaotic email-based support flow with structured, role-based workflows — support staff, approvers, and admins each see exactly what they need. Includes CCTV requisitions, approval chains, and an exportable report generator.',
    impact: 'Eliminated back-and-forth email chains. Ticket routing is now instant and auditable.',
    technologies: ['Laravel', 'Inertia.js', 'React', 'MySQL', 'Bootstrap'],
    icon: <FaTicketAlt />,
    iconColor: '#F59E0B',
    button: { label: 'View Live', url: 'https://tlhesk.mabuhaygroup.com/', icon: <FaExternalLinkAlt /> },
    status: 'Live',
    year: '2025',
    gallery: [
      { id: 2, url: ticketingImage2, caption: 'Login — secure, role-aware authentication' },
      { id: 3, url: ticketingImage3, caption: 'Dashboard — unified ticket overview' },
      { id: 4, url: ticketingImage4, caption: 'Statistics — volume and trend analysis' },
      { id: 5, url: ticketingImage5, caption: 'CCTV Requisition — structured request form' },
      { id: 6, url: ticketingImage6, caption: 'Approval Interface — one-click decision flow' },
      { id: 7, url: ticketingImage7, caption: 'Report Generator — exportable summaries' },
    ],
  },
  {
    title: 'HRIS — Human Resource System',
    subtitle: 'Payroll · Attendance Tracking · Employee Lifecycle',
    description: 'End-to-end HR management covering the full employee lifecycle — onboarding records, daily time records (DTR), payroll computation with tax deductions, and leave management. Designed so non-technical HR staff could operate it confidently without a manual.',
    impact: 'Replaced manual payroll spreadsheets entirely. Payroll computation errors dropped to near-zero.',
    technologies: ['Laravel', 'MySQL', 'Blade', 'JavaScript', 'Bootstrap'],
    icon: <FaUsers />,
    iconColor: '#10B981',
    button: { label: 'Under NDA', url: '#', icon: <FaExternalLinkAlt /> },
    status: 'Deployed',
    year: '2025',
    gallery: [
      { id: 1, url: hrisImage1, caption: 'Employee directory — searchable, filterable records' },
      { id: 2, url: hrisImage2, caption: 'Attendance tracker with daily time records' },
      { id: 3, url: hrisImage3, caption: 'Payroll computation with automatic tax deductions' },
    ],
  },
  {
    title: 'Inventory Management System',
    subtitle: 'Stock Control · Multi-Category · Real-time Analytics',
    description: 'Comprehensive inventory handling — product management, stock movement tracking, supplier records, and reorder alerts. Built with DataTables for fast client-side filtering across thousands of SKUs without server round-trips. Includes a Chart.js analytics dashboard for management visibility.',
    impact: 'Gave management real-time stock visibility. Manual stock counting reduced significantly.',
    technologies: ['Laravel', 'MySQL', 'jQuery', 'DataTables', 'Chart.js'],
    icon: <FaBox />,
    iconColor: '#3B82F6',
    status: 'Deployed',
    year: '2024',
    gallery: [
      { id: 1, url: inventoryImage1, caption: 'Dashboard — stock health and low-stock alerts' },
      { id: 2, url: inventoryImage2, caption: 'Product catalog — category and supplier management' },
      { id: 3, url: inventoryImage3, caption: 'Sales analytics — movement trends and reports' },
    ],
  },
  {
    title: 'E-commerce + Point of Sale',
    subtitle: 'Unified Retail · Online + Physical · Payment Processing',
    description: 'My most ambitious project — unifying an online storefront with a physical POS terminal into one system. Customers shop online while staff process walk-in sales on the same shared inventory pool. Includes real-time stock sync across both channels, payment gateway integration, and a unified admin console.',
    impact: 'Solving the fragmentation problem between online and physical retail — one inventory, one truth.',
    technologies: ['Laravel', 'React', 'Inertia.js', 'MySQL', 'Payment APIs'],
    icon: <FaShoppingCart />,
    iconColor: '#EF4444',
    status: 'In Development',
    year: '2025',
    gallery: [
      { id: 1,  url: ecommerceImage1,  caption: 'Platform overview' },
      { id: 2,  url: ecommerceImage2,  caption: 'Shopping cart flow' },
      { id: 3,  url: ecommerceImage3,  caption: 'Admin dashboard' },
      { id: 4,  url: ecommerceImage4,  caption: 'Product listing' },
      { id: 5,  url: ecommerceImage5,  caption: 'Product detail view' },
      { id: 6,  url: ecommerceImage6,  caption: 'Category browsing' },
      { id: 7,  url: ecommerceImage7,  caption: 'Checkout flow' },
      { id: 8,  url: ecommerceImage8,  caption: 'POS terminal interface' },
      { id: 9,  url: ecommerceImage9,  caption: 'Order management' },
      { id: 10, url: ecommerceImage10, caption: 'Payment processing' },
      { id: 11, url: ecommerceImage11, caption: 'Inventory sync view' },
      { id: 12, url: ecommerceImage12, caption: 'Reports panel' },
      { id: 13, url: ecommerceImage13, caption: 'Customer portal' },
      { id: 14, url: ecommerceImage14, caption: 'Mobile responsive view' },
      { id: 15, url: ecommerceImage15, caption: 'Analytics dashboard' },
      { id: 16, url: ecommerceImage16, caption: 'Settings panel' },
      { id: 17, url: ecommerceImage17, caption: 'User management' },
      { id: 18, url: ecommerceImage18, caption: 'Notification center' },
    ],
  },
];

const EXPERIENCES = [
  {
    id: 1,
    company: 'Full Stack Developer',
    role: 'Software Engineer · Self-Directed',
    period: 'Sep 2025 — Present',
    location: 'Tagum City, Philippines',
    type: 'Current',
    color: '#61DAFB',
    summary: 'After spending over a year in infrastructure, I transitioned to independent development — owning the full product lifecycle from requirements to deployment on every project I take.',
    description: 'I work directly with clients and stakeholders to understand operational pain points, then design and build systems that address them. No hand-holding required. I take a brief, ask the right questions, and deliver.',
    achievements: [
      'Architected and shipped the Mabuhay Group Ticketing System — live in production, actively used',
      'Built a full HRIS system replacing manual payroll spreadsheets across the organisation',
      'Developed an Inventory Management System with real-time analytics and multi-category tracking',
      'Currently building a unified E-commerce + POS platform solving dual-channel retail inventory',
      'Maintained clean, documented, Git-versioned codebases across all projects',
    ],
    technologies: ['Laravel', 'React', 'Inertia.js', 'MySQL', 'Vue.js', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: 2,
    company: 'DecoArts Marketing Inc. — Citihardware',
    role: 'IT Infrastructure Specialist',
    period: 'Apr 2024 — Sep 2025',
    location: 'Davao City, Philippines',
    type: 'Previous',
    color: '#539E43',
    summary: 'Managed the entire IT infrastructure backbone for one of the Philippines\' largest hardware retail chains — 120+ branches, hundreds of endpoints, mission-critical uptime requirements.',
    description: 'This role fundamentally shaped how I build software. Understanding why systems fail at scale — network partitions, database locks, POS timeouts during peak hours — gave me an operational instinct that most developers never develop sitting behind a desk.',
    achievements: [
      'Maintained POS systems and Oracle databases across 120+ Citihardware branches nationwide',
      'Managed MERAKI SD-WAN infrastructure — switches, access points, and VPN configurations',
      'Created "Knowledge is Power" — an internal IT knowledge base adopted by the entire support team',
      'Built a custom internal ticketing tool from scratch, which later evolved into my first major project',
      'Reduced network incident resolution time through systematic documentation and runbook creation',
    ],
    technologies: ['Network Infrastructure', 'MERAKI SD-WAN', 'Oracle DB', 'POS Systems', 'Windows Server', 'Active Directory'],
  },
    {
    id: 3,
    company: 'iQor',
    role: 'Sales Representative & Customer Service',
    period: 'October 2023 - February 2024',
    location: 'Sta. Ana, Davao City, Philippines',
    type: 'Completed',
    color: '#539E43',
    summary: 'Seasonal position handling two different client accounts.',
    
    achievements: [
      'Handled customer inquiries and provided product information',
      'Managed sales transactions and order processing',
      'Resolved customer complaints and issues',
      'Achieved sales targets for both accounts',
    ],
    technologies: ['Customer Service', 'Sales','Communication'],
  },
];

/* ═══════════════════════════════════════════════════════════
   HERO COMPONENT
═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const [toasts,            setToasts]           = useState([]);
  const [gallery,           setGallery]          = useState({ open: false, project: null, index: 0 });
  const [scrollY,           setScrollY]          = useState(0);
  const [showBackToTop,     setShowBackToTop]     = useState(false);
  const [activeNav,         setActiveNav]         = useState('home');
  const [resumeDownloading, setResumeDownloading] = useState(false);
  const [darkMode,          setDarkMode]          = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrollY(sy);
          setShowBackToTop(sy > 500);
          const ids = ['home','about','projects','experience','contact'];
          for (const id of [...ids].reverse()) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= 110) { setActiveNav(id); break; }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollPercent = Math.min(100, (scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 100);

  const toast = useCallback((type, message) => {
    const id = Date.now();
    setToasts(p => [...p, { id, type, message }]);
  }, []);
  const removeToast = useCallback(id => setToasts(p => p.filter(t => t.id !== id)), []);

  const handleDownloadResume = async () => {
    if (resumeDownloading) return;
    setResumeDownloading(true);
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'KingCharlie_Resume.pdf';
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    await new Promise(r => setTimeout(r, 1200));
    toast('success', 'Resume downloaded successfully');
    setResumeDownloading(false);
  };

  const openGallery  = (p, i = 0) => { setGallery({ open: true, project: p, index: i }); document.body.style.overflow = 'hidden'; };
  const closeGallery = ()         => { setGallery(g => ({ ...g, open: false })); document.body.style.overflow = ''; };
  const galleryNext  = () => setGallery(g => ({ ...g, index: (g.index + 1) % g.project.gallery.length }));
  const galleryPrev  = () => setGallery(g => ({ ...g, index: (g.index - 1 + g.project.gallery.length) % g.project.gallery.length }));

  useEffect(() => {
    if (!gallery.open) return;
    const h = e => { if (e.key==='ArrowRight') galleryNext(); if (e.key==='ArrowLeft') galleryPrev(); if (e.key==='Escape') closeGallery(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [gallery.open]);

  return (
    <>
      <div className="scroll-bar" style={{ width: `${scrollPercent}%` }} />

      {/* NAV */}
      <nav className="site-nav">
        <div className="nav-inner">
          <a href="#home" className="nav-brand">
            <img src={logo} alt="KC Logo" className="nav-logo" />
          </a>
          <div className="nav-links">
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={label} href={href} className={`nav-link${activeNav === href.slice(1) ? ' active' : ''}`}>{label}</a>
            ))}
          </div>
          <button className="theme-btn" onClick={() => setDarkMode(d => !d)} aria-label="Toggle theme">
            <span className="theme-track"><span className="theme-thumb">{darkMode ? <FaMoon /> : <FaSun />}</span></span>
          </button>
        </div>
      </nav>

      {/* TOASTS */}
      <div className="toast-stack" role="region" aria-label="Notifications">
        {toasts.map(t => <Toast key={t.id} type={t.type} message={t.message} onClose={() => removeToast(t.id)} />)}
      </div>

      <div className="site-root" id="home">

        {/* ══ HERO ══ */}
        <header className="hero-wrap">
          <div className="hero-container">
            <div className="hero-left">
              <div className="hero-eyebrow reveal">
                <span className="eyebrow-dot" />
                Full Stack Developer · Philippines
              </div>
              <h1 className="hero-name reveal delay-1">
                King Charlie<br /><em>R. Dacillo</em>
              </h1>
              <br></br>
              <br></br>
              <div className="hero-stats reveal delay-4">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="stat-item">
                    <span className="stat-val">{value}</span>
                    <span className="stat-lbl">{label}</span>
                  </div>
                ))}
              </div>
              <div className="hero-actions reveal delay-4">
                <button className="btn-primary" onClick={handleDownloadResume} disabled={resumeDownloading}>
                  {resumeDownloading ? <><FaFileAlt /> Downloading…</> : <><FaDownload /> Download CV</>}
                </button>
                <a href="#projects" className="btn-secondary">See My Work</a>
                {/* <a href="#contact" className="btn-ghost">Contact <FaArrowRight className="btn-arrow" /></a> */}
              </div>
            </div>

            <div className="hero-right reveal-scale">
              <div className="photo-wrap">
                <div className="photo-border">
                  <img src={profilePhoto} alt="King Charlie R. Dacillo" className="photo" />
                </div>
                {/* <div className="photo-badge">
                  <span className="pulse-dot" /><span>Available for hire</span>
                </div> */}
              </div>
            </div>
          </div>
        </header>

        {/* ══ LAYOUT ══ */}
        <div className="page-body">

          {/* SIDEBAR */}
          <aside className="sidebar" id="contact">
            <div className="sidebar-inner reveal-left">

              <div className="sb-block">
                <p className="sb-label">Tech Stack</p>
                <div className="sbs-section">
                  <p className="sbs-cat">Backend</p>
                  <div className="sbs-chips">
                    {TECH_STACK.backend.map(({ icon, label, color }) => (
                      <div key={label} className="sbchip" style={{ '--chip': color }}>
                        <span className="sbchip-ico">{icon}</span>
                        <span className="sbchip-lbl">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sbs-section">
                  <p className="sbs-cat">Frontend</p>
                  <div className="sbs-chips">
                    {TECH_STACK.frontend.map(({ icon, label, color }) => (
                      <div key={label} className="sbchip" style={{ '--chip': color }}>
                        <span className="sbchip-ico">{icon}</span>
                        <span className="sbchip-lbl">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sb-block">
                <p className="sb-label">Quick Facts</p>
                <ul className="sb-facts">
                  {[
                    ['Location',   'Tagum City, PH'],
                    ['Timezone',   'PHT (UTC+8)'],
                    ['Experience', 'Current Year Full Stack Dev'],
                    ['Experience', '1yr and 6months InfraOps'],
                    ['Experience', '4months Call Center Agent'],
                    ['Learning',   'AI · LLM APIs'],
                    ['Status',     'Open to Work'],
                  ].map(([k, v], i) => (
                    <li key={i} className="sb-fact-row">
                      <span className="fact-k">{k}</span>
                      <span className={`fact-v${k === 'Status' ? ' fact-avail' : ''}`}>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sb-block">
                <p className="sb-label">Contact</p>
                <div className="sb-contacts">
                  {[
                    { ico: <FaEnvelope />, label: 'dev.kcee37340@gmail.com', href: 'mailto:dev.kcee37340@gmail.com' },
                    { ico: <FaGithub />,   label: 'github.com/Meep0Zero',    href: 'https://github.com/Meep0Zero', target: '_blank' },
                    { ico: <FaLinkedin />, label: 'LinkedIn',                onClick: e => { e.preventDefault(); toast('info','LinkedIn coming soon'); } },
                    { ico: <FaMobile />,   label: '+63 954 162 3514',         onClick: e => { e.preventDefault(); toast('success','Number: +63 954 162 3514'); } },
                  ].map(({ ico, label, href, target, onClick }) => (
                    <a key={label} href={href || '#'} target={target} rel={target ? 'noopener noreferrer' : undefined} className="sb-contact" onClick={onClick}>
                      <span className="sc-ico">{ico}</span><span>{label}</span>
                    </a>
                  ))}
                </div>
                <div className="sb-avail">
                  <span className="pulse-dot sm" />Available for opportunities
                </div>
              </div>

              <div className="sb-block">
                <p className="sb-label">Services</p>
                <div className="sb-svcs">
                  {[
                    ['Full Stack Web Apps',    'End-to-end Laravel + React systems'],
                    ['API Development',         'REST APIs, auth, third-party integrations'],
                    ['Database Architecture',  'Schema design, query optimisation'],
                    ['System Architecture',    'Scalable, maintainable codebases'],
                    ['AI Feature Integration', 'OpenAI APIs, smart automation'],
                  ].map(([t, d]) => (
                    <div key={t} className="sb-svc"><p className="svc-t">{t}</p><p className="svc-d">{d}</p></div>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* MAIN */}
          <main className="main-feed">

            {/* ABOUT */}
            <section id="about" className="section reveal">
              <div className="sec-head">
                <h2 className="sec-title">About Me</h2>
                <p className="sec-sub">The person behind the code</p>
              </div>
              <div className="about-intro">
                <p className="about-lead">I'm a self-driven developer who came up through IT infrastructure — and that background shaped everything about how I write software.</p>
                <p className="about-p">Most developers never think about why a branch's network goes down at 9am or why a POS system hangs during peak hours. I've been on the other end of those calls. That gave me an instinct for <strong>resilience</strong> — I think about failure modes, edge cases, and production behaviour before I write a single line.</p>
                <p className="about-p">My stack is deliberate: <strong>Laravel</strong> for its expressive, convention-driven backend. <strong>React + Inertia.js</strong> for reactive UIs without SPA overhead. <strong>MySQL</strong> with careful schema design, because the database is the heart of every system I build.</p>
                <p className="about-p">I'm expanding into <strong>AI integration</strong> — not because it's trendy, but because I've seen firsthand how much repetitive cognitive work exists in the systems I build, and I want to eliminate it.</p>
              </div>
              <div className="expertise-grid">
                {EXPERTISE_DEEP.map(({ icon, title, color, desc, tags }) => (
                  <div key={title} className="ecard" style={{ '--accent': color }}>
                    <div className="ecard-head">
                      <span className="ecard-ico">{icon}</span>
                      <h3 className="ecard-title">{title}</h3>
                    </div>
                    <p className="ecard-desc">{desc}</p>
                    <div className="ecard-tags">
                      {tags.map(t => <span key={t} className="etag">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="section reveal">
              <div className="sec-head">
                <h2 className="sec-title">Projects</h2>
                <p className="sec-sub">Systems I designed, built, and shipped</p>
              </div>
              <div className="projects-list">
                {PROJECTS.map((p, i) => (
                  <div key={i} className="pcard" style={{ '--pc': p.iconColor }}>
                    <div className="pcard-stripe" />
                    <div className="pcard-inner">
                      <div className="pcard-header">
                        <div className="pcard-icon-wrap">
                          <span className="pcard-icon">{p.icon}</span>
                        </div>
                        <div className="pcard-title-wrap">
                          <h3 className="pcard-title">{p.title}</h3>
                          <p className="pcard-sub">{p.subtitle}</p>
                        </div>
                        <div className="pcard-badges">
                          <span className={`pbadge ${p.status === 'Live' ? 'pb-live' : p.status === 'Deployed' ? 'pb-done' : 'pb-wip'}`}>{p.status}</span>
                          <span className="pyear">{p.year}</span>
                        </div>
                      </div>

                      <p className="pcard-desc">{p.description}</p>

                      <div className="pcard-impact">
                        <FaRocket className="impact-ico" />
                        <span>{p.impact}</span>
                      </div>

                      {p.gallery && (
                        <div className="pcard-gallery">
                          {p.gallery.slice(0, 3).map((img, idx) => (
                            <div key={img.id} className="gthumb" style={{ backgroundImage: `url(${img.url})` }}
                              onClick={() => openGallery(p, idx)} role="button" aria-label={img.caption} />
                          ))}
                          <button className="gmore-btn" onClick={() => openGallery(p)}>
                            <FaImages /><span>+{p.gallery.length - 3} more</span>
                          </button>
                        </div>
                      )}

                      <div className="pcard-footer">
                        <div className="ppills">
                          {p.technologies.map((t, ti) => <span key={ti} className="ppill">{t}</span>)}
                        </div>
                        {p.button && (
                          <a href={p.button.url} target="_blank" rel="noopener noreferrer" className="pcard-link">
                            {p.button.icon}{p.button.label}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="section reveal">
              <div className="sec-head">
                <h2 className="sec-title">Experience</h2>
                <p className="sec-sub">Where I've been and what I've learned</p>
              </div>
              <div className="timeline">
                {EXPERIENCES.map((exp, i) => (
                  <div key={exp.id} className="tl-item">
                    <div className="tl-track">
                      <div className="tl-dot" style={{ background: exp.color }} />
                      {i < EXPERIENCES.length - 1 && <div className="tl-line" />}
                    </div>
                    <div className="xcard" style={{ '--xc': exp.color }}>
                      <div className="xcard-head">
                        <div>
                          <span className={`xtype ${exp.type === 'Current' ? 'xtype-now' : 'xtype-prev'}`}>{exp.type}</span>
                          <h3 className="xcard-company">{exp.company}</h3>
                          <p className="xcard-role">{exp.role}</p>
                        </div>
                        <div className="xcard-meta">
                          <span className="xmeta-item"><FaCalendarAlt />{exp.period}</span>
                          <span className="xmeta-item"><FaMapMarkerAlt />{exp.location}</span>
                        </div>
                      </div>
                      <p className="xcard-summary">{exp.summary}</p>
                      <p className="xcard-desc">{exp.description}</p>
                      <div className="xcard-achievements">
                        <p className="xa-head">Key Contributions</p>
                        <ul className="xa-list">
                          {exp.achievements.map((a, ai) => (
                            <li key={ai}><FaCheckCircle className="xa-ico" /><span>{a}</span></li>
                          ))}
                        </ul>
                      </div>
                      <div className="ppills">
                        {exp.technologies.map((t, ti) => <span key={ti} className="ppill">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>
        </div>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="footer-wrap">
            <div className="footer-grid">
              <div className="fc reveal">
                <p className="footer-name">King Charlie<em>.</em></p>
                <p className="footer-desc">Full Stack Developer building production-grade web systems with Laravel and React. Based in Tagum City, Philippines. Open to local and remote opportunities.</p>
                <div className="footer-socials">
                  {[
                    { ico: <FaGithub />,   label: 'GitHub',   href: 'https://github.com/Meep0Zero', target: '_blank' },
                    { ico: <FaEnvelope />, label: 'Email',    href: 'mailto:dev.kcee37340@gmail.com' },
                    { ico: <FaLinkedin />, label: 'LinkedIn', onClick: e => { e.preventDefault(); toast('info','LinkedIn coming soon'); } },
                  ].map(({ ico, label, href, target, onClick }) => (
                    <a key={label} href={href || '#'} target={target} rel={target ? 'noopener noreferrer' : undefined} className="fp" onClick={onClick}>
                      {ico} {label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="fc reveal delay-1">
                <p className="fc-label">Navigation</p>
                {NAV_ITEMS.map(({ label, href }) => (
                  <a key={label} href={href} className="fnav"><FaArrowRight className="fnav-ico" />{label}</a>
                ))}
              </div>
              <div className="fc reveal delay-2">
                <p className="fc-label">Contact</p>
                <a href="mailto:dev.kcee37340@gmail.com" className="femail"><FaEnvelope /> dev.kcee37340@gmail.com</a>
                <button onClick={handleDownloadResume} disabled={resumeDownloading} className="fdl">
                  {resumeDownloading ? <><FaFileAlt /> Downloading…</> : <><FaDownload /> Download CV</>}
                </button>
                <p className="favail"><span className="pulse-dot sm" />Open to new opportunities</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-copy">&copy; {new Date().getFullYear()} King Charlie R. Dacillo · All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* {showBackToTop && ( */}
        {/* <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <FaArrowUp />
        </button> */}
      {/* )} */}

      {/* GALLERY MODAL */}
      {gallery.open && gallery.project && (
        <div className="g-modal" role="dialog" aria-modal="true">
          <div className="g-bg" onClick={closeGallery} />
          <div className="g-box">
            <div className="g-head">
              <div>
                <h3 className="g-title">{gallery.project.title}</h3>
                <p className="g-count">{gallery.index + 1} / {gallery.project.gallery.length}</p>
              </div>
              <button className="g-close" onClick={closeGallery} aria-label="Close"><FaTimes /></button>
            </div>
            <div className="g-img-wrap">
              <img src={gallery.project.gallery[gallery.index].url} alt={gallery.project.gallery[gallery.index].caption} />
              <p className="g-caption">{gallery.project.gallery[gallery.index].caption}</p>
            </div>
            <div className="g-nav">
              <button className="g-nav-btn" onClick={galleryPrev}><FaChevronLeft /></button>
              <div className="g-thumbs">
                {gallery.project.gallery.map((img, idx) => (
                  <div key={img.id}
                    className={`g-thumb${idx === gallery.index ? ' active' : ''}`}
                    style={{ backgroundImage: `url(${img.url})` }}
                    onClick={() => setGallery(g => ({ ...g, index: idx }))}
                    role="button" aria-label={`Image ${idx + 1}`}
                  />
                ))}
              </div>
              <button className="g-nav-btn" onClick={galleryNext}><FaChevronRight /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;