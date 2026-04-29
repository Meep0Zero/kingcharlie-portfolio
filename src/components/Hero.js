import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaDownload,
  FaLaravel, FaPhp, FaDatabase, FaReact,
  FaShoppingCart, FaTicketAlt, FaUsers,
  FaCode, FaServer, FaBox,
  FaCalendarAlt, FaMapMarkerAlt,
  FaTimes, FaChevronLeft, FaChevronRight, FaImages,
  FaArrowRight, FaFileAlt,
  FaSun, FaMoon, FaJs, FaExternalLinkAlt,
  FaCheckCircle, FaBrain, FaBug, FaCoffee, FaWallet
} from 'react-icons/fa';
import { FaVuejs } from 'react-icons/fa';
import { SiTailwindcss, SiInertia, SiSharp, SiSqlite } from 'react-icons/si';
import { SiBootstrap } from 'react-icons/si';
import { FaGitAlt } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import './Hero.css';

import profilePhoto     from '../assets/charles.jpg';
import resumePDF        from '../assets/KingCharlie_Dacillo_Portfolio.pdf';
import logo             from '../assets/kayecee.png';

/* ── HESK (Ticketing System) images ──── */
import heskImage1 from '../assets/projects/hesk-1.png';
import heskImage2 from '../assets/projects/hesk-2.png';
import heskImage3 from '../assets/projects/hesk-3.png';
import heskImage4 from '../assets/projects/hesk-4.jpg';
import heskImage5 from '../assets/projects/hesk-5.png';
import heskImage6 from '../assets/projects/hesk-6.png';
import heskImage7 from '../assets/projects/hesk-7.png';
import heskImage8 from '../assets/projects/hesk-8.png';
import heskImage9 from '../assets/projects/hesk-9.png';

/* ── Railway QA images ──────────────── */
import rqaImg1   from '../assets/projects/railwayqa-1.png';
import rqaImg1a  from '../assets/projects/railwayqa-1a.png';
import rqaImg1b  from '../assets/projects/railwayqa-1b.png';
import rqaImg2   from '../assets/projects/railwayqa-2.png';
import rqaImg2a  from '../assets/projects/railwayqa-2a.png';
import rqaImg3   from '../assets/projects/railwayqa-3.png';
import rqaImg3a  from '../assets/projects/railwayqa-3a.png';
import rqaImg4   from '../assets/projects/railwayqa-4.png';
import rqaImg4a  from '../assets/projects/railwayqa-4a.png';
import rqaImg5   from '../assets/projects/railwayqa-5.png';
import rqaImg5a  from '../assets/projects/railwayqa-5a.png';
import rqaImg6   from '../assets/projects/railwayqa-6.png';
import rqaImg6a  from '../assets/projects/railwayqa-6a.png';
import rqaImg7   from '../assets/projects/railwayqa-7.png';
import rqaImg7a  from '../assets/projects/railwayqa-7a.png';
import rqaImg8   from '../assets/projects/railwayqa-8.png';
import rqaImg9   from '../assets/projects/railwayqa-9.png';
import rqaImg9a  from '../assets/projects/railwayqa-9a.png';
import rqaImg10  from '../assets/projects/railwayqa-10.png';
import rqaImg10a from '../assets/projects/railwayqa-10a.png';

/* ── Existing project images ─────────── */
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

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
const TOAST_ICONS = {
  success: <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  error:   <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  info:    <svg viewBox="0 0 16 16" fill="none" width="13" height="13"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};
const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`toast toast-${type}`} role="alert">
      <span className={`t-icon ti-${type}`}>{TOAST_ICONS[type] ?? TOAST_ICONS.info}</span>
      <span className="t-msg">{message}</span>
      <button className="t-close" onClick={onClose}><FaTimes /></button>
      <div className="t-drain" />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const TECH_STACK = [
  { icon: <FaLaravel />,    label: 'Laravel',        color: '#FF2D20' },
  { icon: <FaPhp />,        label: 'PHP',            color: '#777BB4' },
  { icon: <FaDatabase />,   label: 'MySQL',          color: '#00758F' },
  { icon: <FaReact />,      label: 'React',          color: '#61DAFB' },
  { icon: <FaJs />,         label: 'JavaScript',     color: '#F7DF1E' },
  { icon: <SiInertia />,    label: 'Inertia',        color: '#9553E9' },
  { icon: <FaVuejs />,      label: 'Vue.js',         color: '#42B883' },
  { icon: <SiTailwindcss />,label: 'Tailwind',       color: '#38BDF8' },
  { icon: <SiBootstrap />,  label: 'Bootstrap',      color: '#7952B3' },
  { icon: <FaServer />,     label: 'Node.js',        color: '#539E43' },
  { icon: <SiSharp />,      label: 'C#',             color: '#239120' },
  { icon: <FaReact />,      label: 'React Native',   color: '#61DAFB' },
  { icon: <SiSqlite />,     label: 'SQLite',         color: '#0F80CC' },
  { icon: <FaGitAlt />,     label: 'Git',            color: '#F05032' },
  { icon: <FaGithub />,     label: 'GitHub',         color: '#6e5494' },
  { icon: <VscCode />,      label: 'VS Code',        color: '#007ACC' },
];

const PROJECTS = [
  {
    title: 'Enterprise Ticketing System',
    subtitle: 'IT Support Platform · Role-Based Workflow',
    description: 'A full-featured IT support platform built for Mabuhay Group. Replaced chaotic email-based support with structured role-based workflows — support staff, approvers, and admins each see exactly what they need.',
    impact: 'Ticket routing instant and auditable. Email back-and-forth eliminated entirely.',
    technologies: ['Laravel', 'Inertia.js', 'React', 'MySQL', 'Bootstrap'],
    icon: <FaTicketAlt />,
    iconColor: '#F59E0B',
    button: { label: 'View Live', url: 'https://tlhesk.mabuhaygroup.com/' },
    status: 'Live',
    year: '2025',
    gallery: [
      { id: 1,  url: heskImage1, caption: 'System overview' },
      { id: 2,  url: heskImage2, caption: 'Login — role-aware authentication' },
      { id: 3,  url: heskImage3, caption: 'Dashboard — ticket overview' },
      { id: 4,  url: heskImage4, caption: 'Statistics — volume and trend analysis' },
      { id: 5,  url: heskImage5, caption: 'Ticket creation form' },
      { id: 6,  url: heskImage6, caption: 'CCTV Requisition — structured request' },
      { id: 7,  url: heskImage7, caption: 'Approval interface — one-click flow' },
      { id: 8,  url: heskImage8, caption: 'Report generator' },
      { id: 9,  url: heskImage9, caption: 'Admin control panel' },
    ],
  },
  {
    title: 'HRIS — Human Resource System',
    subtitle: 'Payroll · Attendance · Employee Lifecycle',
    description: 'End-to-end HR management — onboarding records, daily time records, payroll with tax deductions, and leave management. Built so non-technical HR staff can operate it without a manual.',
    impact: 'Replaced manual payroll spreadsheets. Computation errors dropped to near-zero.',
    technologies: ['Laravel', 'MySQL', 'Blade', 'JavaScript', 'Bootstrap'],
    icon: <FaUsers />,
    iconColor: '#10B981',
    button: { label: 'Under NDA', url: null },
    status: 'Deployed',
    year: '2025',
    gallery: [
      { id: 1, url: hrisImage1, caption: 'Employee directory — searchable records' },
      { id: 2, url: hrisImage2, caption: 'Attendance tracker with daily time records' },
      { id: 3, url: hrisImage3, caption: 'Payroll with automatic tax deductions' },
    ],
  },
  {
    title: 'Inventory Management System',
    subtitle: 'Stock Control · Multi-Category · Analytics',
    description: 'Comprehensive inventory — product management, stock movement, supplier records, and reorder alerts. DataTables for fast client-side filtering and Chart.js analytics dashboard.',
    impact: 'Real-time stock visibility across the org. Manual counting reduced significantly.',
    technologies: ['Laravel', 'MySQL', 'jQuery', 'DataTables', 'Chart.js'],
    icon: <FaBox />,
    iconColor: '#3B82F6',
    button: { label: 'Under NDA', url: null },
    status: 'Deployed',
    year: '2024',
    gallery: [
      { id: 1, url: inventoryImage1, caption: 'Dashboard — stock health and alerts' },
      { id: 2, url: inventoryImage2, caption: 'Product catalog — category management' },
      { id: 3, url: inventoryImage3, caption: 'Sales analytics — movement trends' },
    ],
  },
  {
    title: 'Railway QA',
    subtitle: 'QA Platform · AI-Powered · Data Analytics',
    description: 'Internal QA management platform for the quality assurance team. Integrates an AI assistant for intelligent defect analysis, test case suggestions, and automated report generation.',
    impact: 'QA workflows accelerated with AI. Manual defect reporting replaced with intelligent analysis.',
    technologies: ['Laravel', 'React', 'AI Integration', 'MySQL', 'Data Analytics'],
    icon: <FaBug />,
    iconColor: '#8B5CF6',
    button: { label: 'Internal Tool', url: null },
    status: 'Deployed',
    year: '2025',
    gallery: [
      { id: 1,  url: rqaImg1,   caption: 'Main dashboard' },
      { id: 2,  url: rqaImg1a,  caption: 'AI assistant view' },
      { id: 3,  url: rqaImg1b,  caption: 'Dashboard variant' },
      { id: 4,  url: rqaImg2,   caption: 'QA pipeline overview' },
      { id: 5,  url: rqaImg2a,  caption: 'Pipeline detail' },
      { id: 6,  url: rqaImg3,   caption: 'Defect tracker' },
      { id: 7,  url: rqaImg3a,  caption: 'Defect detail view' },
      { id: 8,  url: rqaImg4,   caption: 'Test case management' },
      { id: 9,  url: rqaImg4a,  caption: 'Test case builder' },
      { id: 10, url: rqaImg5,   caption: 'Analytics dashboard' },
      { id: 11, url: rqaImg5a,  caption: 'Analytics detail' },
      { id: 12, url: rqaImg6,   caption: 'Report generation' },
      { id: 13, url: rqaImg6a,  caption: 'Report export' },
      { id: 14, url: rqaImg7,   caption: 'AI data analysis' },
      { id: 15, url: rqaImg7a,  caption: 'AI insights panel' },
      { id: 16, url: rqaImg8,   caption: 'Settings & config' },
      { id: 17, url: rqaImg9,   caption: 'User management' },
      { id: 18, url: rqaImg9a,  caption: 'Role management' },
      { id: 19, url: rqaImg10,  caption: 'Notification center' },
      { id: 20, url: rqaImg10a, caption: 'Audit log' },
    ],
  },
  {
    title: 'Central Coffee',
    subtitle: 'Desktop App · Internet Cafe Management · Credit System',
    description: 'Modern internet cafe management replacing coin-slot time tracking. Users create an account at the counter and purchase credits. Every credit purchase earns Coffee Coins — 1,000 coins = 1 hour of time. Credits persist between visits.',
    impact: 'Customers return whenever credits remain. Loyalty coins drive repeat visits without needing cash on hand.',
    technologies: ['C#', 'Laravel', 'MySQL', 'REST API'],
    icon: <FaCoffee />,
    iconColor: '#C8813A',
    button: { label: 'Coming Soon', url: null },
    status: 'In Development',
    year: '2025',
    gallery: [],
  },
  {
    title: 'SmartBudget',
    subtitle: 'Mobile App · Finance Tracker · Debt & Savings',
    description: 'Personal finance app tracking income, debts, and savings in one place. Automatically marks upcoming payment dates on a built-in calendar and sends notifications when due dates approach — so you always know where your money goes.',
    impact: 'Financial clarity at a glance. No more missed payments, no more guessing your balance.',
    technologies: ['React Native', 'SQLite', 'iOS', 'Android'],
    icon: <FaWallet />,
    iconColor: '#22C55E',
    button: { label: 'Coming Soon', url: null },
    status: 'In Development',
    year: '2025',
    gallery: [],
  },
  {
    title: 'E-commerce + Point of Sale',
    subtitle: 'Unified Retail · Online + Physical · Payment Processing',
    description: 'Unifying an online storefront with a physical POS terminal. Customers shop online while staff process walk-in sales on the same shared inventory — real-time stock sync across both channels.',
    impact: 'One inventory, one source of truth — fragmentation between online and physical retail solved.',
    technologies: ['Laravel', 'React', 'Inertia.js', 'MySQL', 'Payment APIs'],
    icon: <FaShoppingCart />,
    iconColor: '#EF4444',
    button: { label: 'In Progress', url: null },
    status: 'Deployed',
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
    ],
  },
];

const EXPERIENCES = [
  {
    id: 1,
    company: 'Full Stack Developer',
    role: 'Self-Directed · Independent',
    period: 'Sep 2025 — Present',
    location: 'Tagum City, Philippines',
    type: 'Current',
    color: '#61DAFB',
    summary: 'After over a year in infrastructure, I transitioned to independent development — owning the full product lifecycle on every project I take.',
    achievements: [
      'Shipped the HESK Ticketing System — live in production, actively used — AI-powered HESK platform.',
      'Built a full HRIS replacing manual payroll spreadsheets across the organisation',
      'Developed an Inventory Management System with real-time analytics',
      'Building Railway QA — AI-powered QA platform for quality assurance teams',
      'Building Central Coffee — modern internet cafe management with loyalty system',
      'Developing SmartBudget — personal finance tracker for Android and iOS',
    ],
    technologies: ['Laravel', 'React', 'Inertia.js', 'MySQL', 'Vue.js', 'C#', 'React Native'],
  },
  {
    id: 2,
    company: 'DecoArts Marketing Inc. — Citihardware',
    role: 'IT Infrastructure & Operations Specialist',
    period: 'Apr 2024 — Sep 2025',
    location: 'Davao City, Philippines',
    type: 'Previous',
    color: '#539E43',
    summary: 'Managed the entire IT infrastructure backbone for one of the Philippines\' largest hardware retail chains — 120+ branches, hundreds of endpoints, mission-critical uptime requirements.',
    achievements: [
      'Maintained POS systems and Oracle databases across 120+ Citihardware branches nationwide',
      'Managed MERAKI SD-WAN — switches, access points, and VPN configurations',
      'Created "Knowledge is Power" — an internal IT knowledge base adopted by the whole team',
      'Built a custom internal ticketing tool from scratch, which evolved into my first major project',
    ],
    technologies: ['Network Infrastructure', 'MERAKI SD-WAN', 'Oracle DB', 'POS Systems', 'Windows Server', 'Active Directory'],
  },
  {
    id: 3,
    company: 'iQor Philippines',
    role: 'Sales Representative & Customer Service',
    period: 'Oct 2023 — Feb 2024',
    location: 'Sta. Ana, Davao City, Philippines',
    type: 'Completed',
    color: '#888888',
    summary: 'Seasonal position across two client accounts, building communication and resolution skills that directly shaped how I approach client work today.',
    achievements: [
      'Handled inquiries and provided accurate product information across two accounts',
      'Resolved customer complaints with a high satisfaction rate',
      'Achieved consistent sales targets throughout the engagement period',
    ],
    technologies: ['Customer Service', 'Sales', 'CRM Tools'],
  },
  {
    id: 4,
    company: 'Capstone Leader - CLMIS (Central Laboratory Management Inventory System)',
    role: '4th Year College · Team Lead',
    period: 'Oct 2022 — Jan 2023',
    location: 'Southern Christian College, Midsayap Cotabato, Philippines',
    type: 'Completed',
    color: '#888888',
    summary: 'My First Ever CRUD Project',
    achievements: [
      'Capstone Leader for CLMIS — a laboratory inventory system built with Laravel and MySQL',
      'Help with Documentations and Presentation',
    ],
    technologies: ['MySQL', 'PHP', 'HTML/CSS', 'JavaScript', 'SPLADE'],
  },
  {
    id: 5,
    company: '3rd Year College',
    role: 'Student',
    location: 'Southern Christian College, Midsayap Cotabato, Philippines',
    type: 'Completed',
    color: '#888888',
    summary: 'My First ever using Laravel',
    achievements: [
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
  },
];

/* ══════════════════════════════════════════════════════════
   HERO COMPONENT
══════════════════════════════════════════════════════════ */
const W95_CODE_TEXT = `# kingcharlie.ps1
Import-Module SelfTaught -Force

$charlie = [Dev]::new("KingCharlie")
$charlie.Location = "Tagum, PH"

# self-taught since capstone panic 2022
# somehow still shipping to production
while ($true) {
  Invoke-Coffee
  Write-Host "No bugs. Probably."
}

# powered by: coffee & false confidence`;

const W95_CODE_HTML = `<span class="w95-cc"># kingcharlie.ps1</span>
<span class="w95-ck">Import-Module</span> <span class="w95-cv">SelfTaught</span> <span class="w95-cv">-Force</span>

<span class="w95-cv2">$charlie</span> = [<span class="w95-cf">Dev</span>]::<span class="w95-cf">new</span>(<span class="w95-cs">"KingCharlie"</span>)
<span class="w95-cv2">$charlie</span>.Location = <span class="w95-cs">"Tagum, PH"</span>

<span class="w95-cc"># self-taught since capstone panic 2022</span>
<span class="w95-cc"># somehow still shipping to production</span>
<span class="w95-ck">while</span> (<span class="w95-cv">$true</span>) {
  <span class="w95-cf">Invoke-Coffee</span>
  <span class="w95-cf">Write-Host</span> <span class="w95-cs">"No bugs. Probably."</span>
}

<span class="w95-cc"># powered by: coffee &amp; false confidence</span>`;

const Hero = () => {
  const location  = useLocation();
  const navigate  = useNavigate();

  const [toasts,            setToasts]           = useState([]);
  const [gallery,           setGallery]          = useState({ open: false, project: null, index: 0 });
  const [scrollY,           setScrollY]          = useState(0);
  const [resumeDownloading, setResumeDownloading] = useState(false);
  const [darkMode,          setDarkMode]          = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [cmdOpen,  setCmdOpen]  = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');
  const [cmdIdx,   setCmdIdx]   = useState(0);

  const cursorDotRef  = useRef(null);
  const cursorRingRef = useRef(null);
  const mouseRef      = useRef({ x: -100, y: -100 });
  const ringPosRef    = useRef({ x: -100, y: -100 });

  const vcardCardRef     = useRef(null);
  const vcardCordPathRef = useRef(null);
  const vcardPhysics     = useRef({ x: 0, vel: 0, dragging: false, startX: 0, startCardX: 0 });
  const vcardRafRef      = useRef(null);

  /* ── theme ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  /* ── scroll progress ── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrollY(window.scrollY); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── scroll-reveal ── */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05, rootMargin: '0px 0px -24px 0px' }
    );
    document.querySelectorAll('.reveal,.reveal-up,.reveal-scale').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);

  /* ── custom cursor ── */
  useEffect(() => {
    const dot  = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    document.body.classList.add('has-cursor');
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };
    let rafId;
    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      const { x: rx, y: ry } = ringPosRef.current;
      const ease = 0.13;
      ringPosRef.current = { x: rx + (mx - rx) * ease, y: ry + (my - ry) * ease };
      ring.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px)`;
      rafId = requestAnimationFrame(tick);
    };
    const onIn  = () => ring.classList.add('cursor-ring--hover');
    const onOut = () => ring.classList.remove('cursor-ring--hover');
    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);
    const addListeners = () => {
      document.querySelectorAll('a,button,[role="button"],.pcard').forEach(el => {
        el.addEventListener('mouseenter', onIn);
        el.addEventListener('mouseleave', onOut);
      });
    };
    addListeners();
    const mo = new MutationObserver(addListeners);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      document.body.classList.remove('has-cursor');
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);

  /* ── command palette keyboard ── */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(v => !v); setCmdQuery(''); setCmdIdx(0); }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── gallery keyboard ── */
  useEffect(() => {
    if (!gallery.open) return;
    const h = e => {
      if (e.key === 'ArrowRight') galleryNext();
      if (e.key === 'ArrowLeft')  galleryPrev();
      if (e.key === 'Escape')     closeGallery();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [gallery.open]);

  /* ── lanyard RAF cleanup ── */
  useEffect(() => () => cancelAnimationFrame(vcardRafRef.current), []);

  const scrollPercent = Math.min(100, (scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 100);

  /* ── callbacks ── */
  const toast      = useCallback((type, message) => {
    const id = Date.now();
    setToasts(p => [...p, { id, type, message }]);
  }, []);
  const removeToast = useCallback(id => setToasts(p => p.filter(t => t.id !== id)), []);

  const vcardSpringTick = useCallback(() => {
    const p = vcardPhysics.current;
    if (p.dragging) return;
    const stiffness = 0.14, damping = 0.70;
    p.vel = p.vel * damping + (0 - p.x) * stiffness;
    p.x += p.vel;
    const card = vcardCardRef.current;
    const path = vcardCordPathRef.current;
    if (card) card.style.transform = `translateX(${p.x}px) rotate(${p.x * 0.07}deg)`;
    if (path) path.setAttribute('d', `M 40 0 Q ${40 + p.x * 0.38} 20 ${40 + p.x * 0.78} 40`);
    if (Math.abs(p.x) < 0.15 && Math.abs(p.vel) < 0.08) {
      p.x = 0; p.vel = 0;
      if (card) card.style.transform = '';
      if (path) path.setAttribute('d', 'M 40 0 L 40 40');
      return;
    }
    vcardRafRef.current = requestAnimationFrame(vcardSpringTick);
  }, []);

  const onVcardMouseDown = useCallback((e) => {
    e.preventDefault();
    const p = vcardPhysics.current;
    cancelAnimationFrame(vcardRafRef.current);
    p.dragging = true;
    p.startX = e.clientX;
    p.startCardX = p.x;
    const card = vcardCardRef.current;
    if (card) { card.style.transition = 'none'; card.style.cursor = 'grabbing'; }
    const onMove = (me) => {
      const dx = me.clientX - p.startX;
      p.x = Math.max(-62, Math.min(62, p.startCardX + dx));
      const path = vcardCordPathRef.current;
      if (card) card.style.transform = `translateX(${p.x}px) rotate(${p.x * 0.07}deg)`;
      if (path) path.setAttribute('d', `M 40 0 Q ${40 + p.x * 0.38} 20 ${40 + p.x * 0.78} 40`);
    };
    const onUp = () => {
      p.dragging = false;
      if (card) card.style.cursor = 'grab';
      vcardRafRef.current = requestAnimationFrame(vcardSpringTick);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [vcardSpringTick]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('dev.kcee37340@gmail.com')
      .then(() => toast('success', 'Email copied to clipboard'))
      .catch(() => toast('info', 'Email: dev.kcee37340@gmail.com'));
  }, [toast]);

  const handleDownloadResume = async () => {
    if (resumeDownloading) return;
    setResumeDownloading(true);
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'KingCharlie_Resume.pdf';
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    await new Promise(r => setTimeout(r, 1200));
    toast('success', 'Resume downloaded');
    setResumeDownloading(false);
  };

  const openGallery  = (p, i = 0) => { setGallery({ open: true, project: p, index: i }); document.body.style.overflow = 'hidden'; };
  const closeGallery = ()         => { setGallery(g => ({ ...g, open: false })); document.body.style.overflow = ''; };
  const galleryNext  = () => setGallery(g => ({ ...g, index: (g.index + 1) % g.project.gallery.length }));
  const galleryPrev  = () => setGallery(g => ({ ...g, index: (g.index - 1 + g.project.gallery.length) % g.project.gallery.length }));

  /* ── command items ── */
  const CMD_ITEMS = [
    { icon: <FaArrowRight />, label: 'Home',              hint: 'Landing page',             action: () => { navigate('/'); setCmdOpen(false); } },
    { icon: <FaArrowRight />, label: 'Projects',          hint: '7 systems built',          action: () => { navigate('/projects'); setCmdOpen(false); } },
    { icon: <FaArrowRight />, label: 'Experience',        hint: 'Career timeline',          action: () => { navigate('/experience'); setCmdOpen(false); } },
    { icon: <FaDownload />,   label: 'Download CV',       hint: 'PDF Resume',               action: () => { handleDownloadResume(); setCmdOpen(false); } },
    { icon: <FaEnvelope />,   label: 'Copy Email',        hint: 'dev.kcee37340@gmail.com',  action: () => { copyEmail(); setCmdOpen(false); } },
    { icon: <FaGithub />,     label: 'GitHub',            hint: 'https://github.com/systemdevcharles-rgb',     action: () => { window.open('https://github.com/systemdevcharles-rgb', '_blank'); setCmdOpen(false); } },
    { icon: <FaBrain />,      label: 'Chat with KC',      hint: 'AI assistant',             action: () => { window.dispatchEvent(new CustomEvent('openChat')); setCmdOpen(false); } },
    { icon: <FaExternalLinkAlt />, label: 'Live Project', hint: 'Ticketing System',         action: () => { window.open('https://tlhesk.mabuhaygroup.com/', '_blank'); setCmdOpen(false); } },
  ];
  const filteredCmds = CMD_ITEMS.filter(item =>
    !cmdQuery || item.label.toLowerCase().includes(cmdQuery.toLowerCase()) || item.hint.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  const path = location.pathname;

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor-dot"  ref={cursorDotRef}  aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />

      {/* Command Palette */}
      {cmdOpen && (
        <div className="cmd-overlay" onClick={() => setCmdOpen(false)}>
          <div className="cmd-box" onClick={e => e.stopPropagation()}>
            <div className="cmd-search-row">
              <svg className="cmd-search-ico" viewBox="0 0 16 16" fill="none" width="13" height="13">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                className="cmd-input"
                placeholder="Search commands…"
                value={cmdQuery}
                onChange={e => { setCmdQuery(e.target.value); setCmdIdx(0); }}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setCmdIdx(i => Math.min(i + 1, filteredCmds.length - 1)); }
                  if (e.key === 'ArrowUp')   { e.preventDefault(); setCmdIdx(i => Math.max(i - 1, 0)); }
                  if (e.key === 'Enter' && filteredCmds[cmdIdx]) filteredCmds[cmdIdx].action();
                }}
                autoFocus
              />
              <kbd className="cmd-esc-badge">esc</kbd>
            </div>
            <div className="cmd-list">
              {filteredCmds.length === 0
                ? <div className="cmd-empty">No results for "{cmdQuery}"</div>
                : filteredCmds.map((item, i) => (
                  <div key={i} className={`cmd-item${i === cmdIdx ? ' cmd-item--active' : ''}`}
                    onClick={item.action} onMouseEnter={() => setCmdIdx(i)}>
                    <span className="cmd-item-icon">{item.icon}</span>
                    <span className="cmd-item-label">{item.label}</span>
                    {item.hint && <span className="cmd-item-hint">{item.hint}</span>}
                  </div>
                ))
              }
            </div>
            <div className="cmd-footer">
              <span className="cmd-hint"><kbd className="cmd-key">↑↓</kbd>navigate</span>
              <span className="cmd-hint"><kbd className="cmd-key">↵</kbd>select</span>
              <span className="cmd-hint"><kbd className="cmd-key">esc</kbd>close</span>
            </div>
          </div>
        </div>
      )}

      {/* Scroll progress */}
      <div className="scroll-bar" style={{ width: `${scrollPercent}%` }} />

      {/* NAV */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            <img src={logo} className="nav-logo" alt="KC" />
          </Link>
          <div className="nav-links">
            {[
              { label: 'Home',       to: '/'           },
              { label: 'Projects',   to: '/projects'   },
              { label: 'Experience', to: '/experience' },
            ].map(({ label, to }) => (
              <Link key={label} to={to} className={`nav-link${path === to ? ' active' : ''}`}>
                {label}
              </Link>
            ))}
          </div>
          <div className="nav-right">
            <span className="nav-avail">
              <span className="nav-avail-dot" />
              Available
            </span>
            <button className="nav-cmd-trigger" onClick={() => { setCmdOpen(true); setCmdQuery(''); setCmdIdx(0); }} title="Ctrl+K">
              <span>⌘ K</span>
            </button>
            <button className="theme-btn" onClick={() => setDarkMode(d => !d)} aria-label="Toggle theme">
              <span className="theme-track">
                <span className="theme-thumb">{darkMode ? <FaMoon /> : <FaSun />}</span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Toasts */}
      <div className="toast-stack" role="region" aria-label="Notifications">
        {toasts.map(t => <Toast key={t.id} type={t.type} message={t.message} onClose={() => removeToast(t.id)} />)}
      </div>

      {/* ══ ROUTE CONTENT ══ */}
      <div className="site-root">

        {/* ── HOME ── */}
        {(path === '/' || path === '') && (
          <>
            {/* Hero header */}
            <header className="hero-wrap">
              <div className="hero-container">
                <div className="hero-left">
                  <div className="hero-eyebrow reveal">
                    <span className="eyebrow-dot" />
                    Full Stack Developer · Davao City, Philippines
                  </div>
                  <h1 className="hero-name reveal delay-1">
                    King Charlie<br /><em>R. Dacillo</em>
                  </h1>
                  <p className="hero-tagline reveal delay-2">
                    I build production systems that work — from infrastructure to interfaces.
                  </p>
                  <div className="hero-actions reveal delay-3">
                    <button className="btn-primary" onClick={handleDownloadResume} disabled={resumeDownloading}>
                      {resumeDownloading ? <><FaFileAlt /> Downloading</> : <><FaDownload /> Download CV</>}
                    </button>
                    <Link to="/projects" className="btn-secondary">See My Work</Link>
                  </div>
                </div>
                <div className="hero-right reveal-scale">
                  <div className="photo-outer">
                    <div className="photo-frame">
                      <img src={profilePhoto} alt="King Charlie R. Dacillo" className="photo" />
                    </div>
                    <div className="photo-label">
                      <span className="photo-label-dot" />
                      Full Stack Developer
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* About */}
            <section className="section about-section reveal">
              <div className="page-container">
                <div className="sec-head">
                  <span className="sec-num">01</span>
                  <div>
                    <h2 className="sec-title">About Me</h2>
                    <p className="sec-sub">The person behind the code</p>
                  </div>
                </div>

                <div className="about-split">
                  <div className="about-content">
                    <div className="about-intro">
                      <p className="about-lead">I didn't start in a classroom. I started in a server room.</p>
                      <p className="about-p">Managing IT infrastructure for 120+ branches across the Philippines wired me differently. While most developers optimize for happy paths, I think about failure modes and production behaviour first. I've seen what happens when a POS database locks during peak hours — that operational instinct lives in every system I build.</p>
                      <p className="about-p">My stack is deliberate: <strong>Laravel</strong> for expressive backends. <strong>React + Inertia.js</strong> for reactive UIs without decoupled overhead. <strong>MySQL</strong> with careful schema design — because a poorly modelled table becomes a performance crisis at scale.</p>
                      <p className="about-p">Recently, I’ve been exploring artificial intelligence more deeply, with a strong focus on incorporating AI tools and techniques into modern applications. My current work involves building AI-driven solutions, developing intelligent systems, and utilizing generative AI to streamline development processes and deliver innovative, state-of-the-art technology.</p>
                      <p className="about-p about-closer">I build things that work. And I stay until they do.</p>
                    </div>

                    <div className="expertise-grid">
                      {[
                        { icon: <FaCode />,     title: 'Backend',        color: '#FF2D20', tags: ['Laravel', 'PHP', 'REST APIs', 'Auth & RBAC'] },
                        { icon: <FaReact />,    title: 'Frontend',       color: '#61DAFB', tags: ['React', 'Inertia.js', 'Vue.js', 'Tailwind CSS'] },
                        { icon: <FaDatabase />, title: 'Database',       color: '#00758F', tags: ['MySQL', 'Schema Design', 'Query Optimisation'] },
                        { icon: <FaServer />,   title: 'Infrastructure', color: '#539E43', tags: ['MERAKI SD-WAN', 'Windows Server', 'Active Directory'] },
                      ].map(({ icon, title, color, tags }) => (
                        <div key={title} className="ecard" style={{ '--accent': color }}>
                          <div className="ecard-head">
                            <span className="ecard-ico">{icon}</span>
                            <h3 className="ecard-title">{title}</h3>
                          </div>
                          <div className="ecard-tags">
                            {tags.map(t => <span key={t} className="etag">{t}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="about-card-col">
                    <div className="w95-card-container">
                      <div className="w95-card">
                        <div className="w95-card-header">
                          <div className="w95-card-tabs">
                            <div className="w95-card-tab active">kingcharlie.ps1</div>
                          </div>
                        </div>
                        <div className="w95-card-body">
                          <div className="w95-line-numbers">
                            {Array.from({ length: 14 }, (_, i) => <span key={i}>{i + 1}</span>)}
                          </div>
                          <pre className="w95-code-content">
                            <code dangerouslySetInnerHTML={{ __html: W95_CODE_HTML }} />
                          </pre>
                        </div>
                        <div className="w95-card-footer">
                          <span className="w95-lang">PowerShell</span>
                          <button className="w95-copy-btn"
                            onClick={() => navigator.clipboard.writeText(W95_CODE_TEXT).then(() => toast('success', 'Copied!')).catch(() => {})}>
                            <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                              <rect x="5" y="5" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="stack-section">
                  <p className="stack-label">Tech Stack</p>
                  <div className="stack-carousel-wrap">
                    <div className="stack-grid">
                      {[...TECH_STACK, ...TECH_STACK].map(({ icon, label, color }, i) => (
                        <div key={i} className="schip" style={{ '--chip': color }}>
                          <span className="schip-ico">{icon}</span>
                          <span className="schip-lbl">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── PROJECTS ── */}
        {path === '/projects' && (
          <section className="section route-section reveal">
            <div className="page-container">
              <div className="sec-head">
                <span className="sec-num">02</span>
                <div>
                  <h2 className="sec-title">Projects</h2>
                  <p className="sec-sub">Systems I designed, built, and shipped</p>
                </div>
              </div>
            </div>

            {/* Project list below carousel */}
            <div className="page-container">
              <div className="plist">
                {PROJECTS.map((p, i) => (
                  <div
                    key={i}
                    className="plist-item"
                    onClick={() => p.gallery?.length > 0 && openGallery(p, 0)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && p.gallery?.length > 0 && openGallery(p, 0)}
                  >
                    <div className="plist-icon" style={{ '--pc': p.iconColor }}>{p.icon}</div>
                    <div className="plist-body">
                      <div className="plist-row">
                        <h3 className="plist-title">{p.title}</h3>
                        <span className={`pbadge ${p.status === 'Live' ? 'pb-live' : p.status === 'Deployed' ? 'pb-done' : 'pb-wip'}`}>
                          {p.status === 'Live' && <span className="pbadge-dot" />}{p.status}
                        </span>
                      </div>
                      <p className="plist-sub">{p.subtitle}</p>
                      <div className="plist-pills">
                        {p.technologies.map((t, ti) => <span key={ti} className="ppill">{t}</span>)}
                      </div>
                    </div>
                    <div className="plist-meta">
                      <span className="plist-year">{p.year}</span>
                      {p.gallery?.length > 0
                        ? <span className="plist-shots"><FaImages /> {p.gallery.length}</span>
                        : <span className="plist-shots soon">Soon</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Infinite Carousel */}
            <div className="carousel-wrap">
              <div
                className="carousel-track"
                style={{ '--track-half': `${PROJECTS.length * 296}px` }}
              >
                {[...PROJECTS, ...PROJECTS].map((p, i) => (
                  <div
                    key={i}
                    className="pcard-slot"
                    onClick={() => p.gallery?.length > 0 && openGallery(p, 0)}
                  >
                    <div
                      className="pcard"
                      style={{
                        '--pc': p.iconColor,
                        ...(p.gallery?.length > 0 && { backgroundImage: `url(${p.gallery[0].url})` }),
                      }}
                      role="button"
                      tabIndex={i < PROJECTS.length ? 0 : -1}
                      onKeyDown={e => e.key === 'Enter' && p.gallery?.length > 0 && openGallery(p, 0)}
                    >
                      <div className="pcard-overlay" />
                      {!p.gallery?.length && (
                        <div className="pcard-no-img">
                          <span className="pcard-big-icon" style={{ color: p.iconColor }}>{p.icon}</span>
                        </div>
                      )}
                      <div className="pcard-content">
                        <div className="pcard-top">
                          <span className={`pbadge ${p.status === 'Live' ? 'pb-live' : p.status === 'Deployed' ? 'pb-done' : 'pb-wip'}`}>
                            {p.status === 'Live' && <span className="pbadge-dot" />}
                            {p.status}
                          </span>
                          <span className="pcard-year">{p.year}</span>
                        </div>
                        <div className="pcard-bottom">
                          <h3 className="pcard-title">{p.title}</h3>
                          <p className="pcard-sub">{p.subtitle}</p>
                          <div className="pcard-reveal">
                            <p className="pcard-impact">{p.impact}</p>
                            <div className="pcard-pills">
                              {p.technologies.slice(0, 4).map((t, ti) => (
                                <span key={ti} className="ppill-card">{t}</span>
                              ))}
                            </div>
                            <div className="pcard-actions">
                              <span className="pcard-view-btn">
                                <FaImages /> {p.gallery?.length > 0 ? `${p.gallery.length} Screenshots` : 'Coming Soon'}
                              </span>
                              {p.button?.url && (
                                <a href={p.button.url} target="_blank" rel="noopener noreferrer"
                                  className="pcard-live-btn" onClick={e => e.stopPropagation()}>
                                  <FaExternalLinkAlt /> Live
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── EXPERIENCE ── */}
        {path === '/experience' && (
          <section className="section route-section reveal">
            <div className="page-container">
              <div className="sec-head">
                <span className="sec-num">03</span>
                <div>
                  <h2 className="sec-title">Experience</h2>
                  <p className="sec-sub"><b>Where I've been and what I've built</b></p>
                </div>
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
            </div>
          </section>
        )}

      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-wrap">
          <div className="footer-grid">
            <div className="fc reveal">
              <p className="footer-name">King Charlie<em>.</em></p>
              <p className="footer-desc">Full Stack Developer building production-grade web systems with Laravel and React. Based in Tagum City, Philippines.</p>
              <div className="footer-socials">
                {[
                  { ico: <FaGithub />,   label: 'GitHub',   href: 'https://github.com/systemdevcharles-rgb', target: '_blank' },
                  { ico: <FaEnvelope />, label: 'Email',    onClick: e => { e.preventDefault(); copyEmail(); } },
                  { ico: <FaLinkedin />, label: 'LinkedIn', onClick: e => { e.preventDefault(); toast('info', 'LinkedIn coming soon'); } },
                ].map(({ ico, label, href, target, onClick }) => (
                  <a key={label} href={href || '#'} target={target} rel={target ? 'noopener noreferrer' : undefined}
                    className="fp" onClick={onClick}>{ico} {label}</a>
                ))}
              </div>
            </div>
            <div className="fc reveal delay-1">
              <p className="fc-label">Navigate</p>
              {[
                { label: 'Home',       to: '/'           },
                { label: 'Projects',   to: '/projects'   },
                { label: 'Experience', to: '/experience' },
              ].map(({ label, to }) => (
                <Link key={label} to={to} className="fnav">
                  <FaArrowRight className="fnav-ico" />{label}
                </Link>
              ))}
            </div>
            <div className="fc reveal delay-2">
              <p className="fc-label">Contact</p>
              <a href="mailto:dev.kcee37340@gmail.com" className="femail"><FaEnvelope /> dev.kcee37340@gmail.com</a>
              <button onClick={handleDownloadResume} disabled={resumeDownloading} className="fdl">
                {resumeDownloading ? <><FaFileAlt /> Downloading</> : <><FaDownload /> Download CV</>}
              </button>
              <p className="favail"><span className="pulse-dot sm" />Open to opportunities</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">&copy; {new Date().getFullYear()} King Charlie R. Dacillo</p>
            <button className="footer-cmd-btn" onClick={() => { setCmdOpen(true); setCmdQuery(''); setCmdIdx(0); }}>
              <span>⌘K</span> Quick Nav
            </button>
          </div>
        </div>
      </footer>

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
                  <div key={img.id} className={`g-thumb${idx === gallery.index ? ' active' : ''}`}
                    style={{ backgroundImage: `url(${img.url})` }}
                    onClick={() => setGallery(g => ({ ...g, index: idx }))}
                    role="button" aria-label={`Image ${idx + 1}`} />
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
