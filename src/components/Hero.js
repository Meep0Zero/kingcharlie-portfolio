import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaDownload,
  FaLaravel, FaPhp, FaDatabase, FaReact,
  FaMobileAlt, FaShoppingCart, FaTicketAlt, FaUsers,
  FaCode, FaServer, FaTools, FaBox,
  FaCalendarAlt, FaMapMarkerAlt,
  FaTimes, FaChevronLeft, FaChevronRight, FaImages,
  FaArrowRight, FaArrowUp, FaHeart,
  FaFileAlt, FaCheckCircle, FaMobile
} from 'react-icons/fa';
import { SiInertia } from 'react-icons/si';
import './Hero.css';

import profilePhoto    from '../assets/charles.jpg';
import ticketingImage1 from '../assets/projects/ticketing-1.png';
import ticketingImage2 from '../assets/projects/ticketing-2.png';
import ticketingImage3 from '../assets/projects/ticketing-3.png';
import ticketingImage4 from '../assets/projects/ticketing-4.png';
import ticketingImage5 from '../assets/projects/ticketing-5.png';
import ticketingImage6 from '../assets/projects/ticketing-6.png';
import ticketingImage7 from '../assets/projects/ticketing-7.png';
import ticketingImage8 from '../assets/projects/ticketing-8.png';
import hrisImage1      from '../assets/projects/hris-1.png';
import hrisImage2      from '../assets/projects/hris-2.png';
import hrisImage3      from '../assets/projects/hris-3.png';
import inventoryImage1 from '../assets/projects/inventory-1.png';
import inventoryImage2 from '../assets/projects/inventory-2.png';
import inventoryImage3 from '../assets/projects/inventory-3.png';
import ecommerceImage1 from '../assets/projects/ecommerce-1.png';
import ecommerceImage2 from '../assets/projects/ecommerce-2.png';
import ecommerceImage3 from '../assets/projects/ecommerce-3.png';
import ecommerceImage4 from '../assets/projects/ecommerce-4.png';
import ecommerceImage5 from '../assets/projects/ecommerce-5.png';
import ecommerceImage6 from '../assets/projects/ecommerce-6.png';
import ecommerceImage7 from '../assets/projects/ecommerce-7.png';
import ecommerceImage8 from '../assets/projects/ecommerce-8.png';
import ecommerceImage9 from '../assets/projects/ecommerce-9.png';
import ecommerceImage10 from '../assets/projects/ecommerce-10.png';
import ecommerceImage11 from '../assets/projects/ecommerce-11.png';
import ecommerceImage12 from '../assets/projects/ecommerce-12.png';
import ecommerceImage13 from '../assets/projects/ecommerce-13.png';
import ecommerceImage14 from '../assets/projects/ecommerce-14.png';
import ecommerceImage15 from '../assets/projects/ecommerce-15.png';
import ecommerceImage16 from '../assets/projects/ecommerce-16.png';
import ecommerceImage17 from '../assets/projects/ecommerce-17.png';
import ecommerceImage18 from '../assets/projects/ecommerce-18.png';
// Uncomment and add your resume file:
import resumePDF from '../assets/resume.pdf';

/* ── Toast ─────────────────────────────────────────────── */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

/* ── Data ──────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: 1,
    company: 'Full Stack Developer',
    role: 'Web Developer · Current Position',
    period: 'Sep 2025 — Present',
    location: 'Tagum City',
    icon: <FaCode />,
    description: 'Developing full-stack web applications using Laravel, React, and MySQL. Building systems that solve real operational problems.',
    achievements: [
      'Building responsive apps with modern frameworks',
      'Implementing RESTful APIs and microservices',
      'Database design and optimisation for scalability',
      'Frontend development with React and Inertia.js',
    ],
    technologies: ['Laravel', 'React', 'MySQL', 'Inertia.js', 'JavaScript'],
  },
  {
    id: 2,
    company: 'DecoArts Marketing Inc.',
    role: 'Infrastructure Specialist',
    period: 'Apr 2024 — Sep 2025',
    location: 'Davao City',
    icon: <FaServer />,
    description: 'Managed IT infrastructure for 120+ Citihardware branches nationwide. Built internal tools that reduced support overhead significantly.',
    achievements: [
      'Maintained POS systems and Oracle databases across 120+ branches',
      'Network troubleshooting — switches, MERAKI devices, configuration',
      'Created "Knowledge is Power" internal IT knowledge base',
      'Built ticketing and navigation tools from scratch',
    ],
    technologies: ['Network Infrastructure', 'POS Systems', 'Windows OS', 'Oracle DB'],
  },
];

const PROJECTS = [
  {
    title: 'Ticketing System',
    description: 'Complete ticket management with role-based access, real-time notifications, and a reporting dashboard.',
    technologies: ['Laravel', 'MySQL', 'Inertia.js', 'React', 'Bootstrap'],
    icon: <FaTicketAlt />,
    status: 'Completed',
    gallery: [
      { id: 2, url: ticketingImage2, caption: 'Login Modal' },
      { id: 3, url: ticketingImage3, caption: 'Dashboard Overview' },
      { id: 4, url: ticketingImage4, caption: 'Overview of ticket statistics' },
      { id: 5, url: ticketingImage5, caption: 'CCTV Requisition Interface' },
      { id: 6, url: ticketingImage6, caption: 'Approval Request Interface' },
      { id: 7, url: ticketingImage7, caption: 'Report Generator' },
      { id: 8, url: ticketingImage8, caption: 'Account Pending for approval' },
    ],
  },
  {
    title: 'HRIS System',
    description: 'Human Resource Information System with employee management, payroll processing, and attendance tracking.',
    technologies: ['Laravel', 'MySQL', 'Blade', 'JavaScript'],
    icon: <FaUsers />,
    status: 'Completed',
    gallery: [
      { id: 1, url: hrisImage1, caption: 'Employee management dashboard' },
      { id: 2, url: hrisImage2, caption: 'Attendance and time tracking' },
      { id: 3, url: hrisImage3, caption: 'Payroll processing interface' },
    ],
  },
  {
    title: 'Inventory System',
    description: 'Comprehensive inventory tracking with barcode scanning, stock alerts, and detailed analytics.',
    technologies: ['Laravel', 'MySQL', 'jQuery', 'DataTables'],
    icon: <FaBox />,
    status: 'Completed',
    gallery: [
      { id: 1, url: inventoryImage1, caption: 'Inventory dashboard with stock overview' },
      { id: 2, url: inventoryImage2, caption: 'Product management and categorisation' },
      { id: 3, url: inventoryImage3, caption: 'Sales reporting and analytics' },
    ],
  },
  {
    title: 'E-commerce + POS',
    description: 'Full-featured online shopping platform with an integrated Point of Sale system and payment processing.',
    technologies: ['Laravel', 'MySQL', 'React', 'Payment APIs'],
    icon: <FaShoppingCart />,
    status: 'In Development',
    gallery: [
      { id: 1, url: ecommerceImage1, caption: 'Coming soon — platform in development' },
      { id: 2, url: ecommerceImage2, caption: 'Coming soon — shopping cart' },
      { id: 3, url: ecommerceImage3, caption: 'Coming soon — admin dashboard' },
      { id: 4, url: ecommerceImage4, caption: 'Coming soon — product listing' },
      { id: 5, url: ecommerceImage5, caption: 'Coming soon — product listing' },
      { id: 6, url: ecommerceImage6, caption: 'Coming soon — product listing' },
      { id: 7, url: ecommerceImage7, caption: 'Coming soon — product listing' },
      { id: 8, url: ecommerceImage8, caption: 'Coming soon — product listing' },
      { id: 9, url: ecommerceImage9, caption: 'Coming soon — product listing' },
      { id: 10, url: ecommerceImage10, caption: 'Coming soon — product listing' },
      { id: 11, url: ecommerceImage11, caption: 'Coming soon — product listing' },
      { id: 12, url: ecommerceImage12, caption: 'Coming soon — product listing' },
      { id: 13, url: ecommerceImage13, caption: 'Coming soon — product listing' },
      { id: 14, url: ecommerceImage14, caption: 'Coming soon — product listing' },
      { id: 15, url: ecommerceImage15, caption: 'Coming soon — product listing' },
      { id: 16, url: ecommerceImage16, caption: 'Coming soon — product listing' },
      { id: 17, url: ecommerceImage17, caption: 'Coming soon — product listing' },
      { id: 18, url: ecommerceImage18, caption: 'Coming soon — product listing' },
    ],
  },
];

const TECH_STACK = [
  { icon: <FaLaravel />, label: 'Laravel'  },
  { icon: <FaPhp />,     label: 'PHP'      },
  { icon: <FaDatabase />,label: 'MySQL'    },
  { icon: <FaReact />,   label: 'React'    },
  { icon: <SiInertia />, label: 'Inertia'  },
  { icon: <FaMobileAlt />,label:'Flutter'  },
];

const EXPERTISE = [
  { icon: <FaCode />,    title: 'Backend Development',      sub: 'Laravel · PHP · RESTful APIs'             },
  { icon: <FaReact />,   title: 'Frontend Development',     sub: 'React · Inertia.js · Blade'               },
  { icon: <FaDatabase />,title: 'Database Design',          sub: 'MySQL · Query Optimisation'               },
  { icon: <FaTools />,   title: 'DevOps & Infrastructure',  sub: 'Server Management · Deployment'           },
];

const SERVICES = [
  { title: 'Backend Development', desc: 'Robust APIs and server-side applications'     },
  { title: 'Frontend Development',desc: 'Responsive UIs with modern frameworks'         },
  { title: 'Database Design',     desc: 'Optimised MySQL schemas for performance'       },
  { title: 'System Architecture', desc: 'Scalable, maintainable technical foundations'  },
];

const NAV_ITEMS = [
  { label: 'Home',       href: '#home'       },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const [toasts,            setToasts]           = useState([]);
  const [gallery,           setGallery]          = useState({ open: false, project: null, index: 0 });
  const [scrollY,           setScrollY]          = useState(0);
  const [showBackToTop,     setShowBackToTop]     = useState(false);
  const [activeNav,         setActiveNav]         = useState('home');
  const [resumeDownloading, setResumeDownloading] = useState(false);

  /* ── Scroll tracking ─────────────────────────────────── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrollY(sy);
          setShowBackToTop(sy > 400);

          // Active section detection
          const sections = ['home', 'projects', 'experience', 'contact'];
          for (const id of [...sections].reverse()) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= 120) {
              setActiveNav(id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scroll progress bar ─────────────────────────────── */
  const scrollPercent = Math.min(
    100,
    (scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)) * 100
  );

  /* ── Reveal animation ────────────────────────────────── */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── Toast helpers ───────────────────────────────────── */
  const toast = useCallback((type, message) => {
    const id = Date.now();
    setToasts(p => [...p, { id, type, message }]);
  }, []);

  const removeToast = useCallback(id => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  /* ── Resume download ─────────────────────────────────── */
  const handleDownloadResume = async () => {
    if (resumeDownloading) return;
    setResumeDownloading(true);

    // Option A: If you have a PDF asset, use this:
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Option B: Link to hosted resume (replace URL)
    // window.open('https://your-host.com/resume.pdf', '_blank');

    // Simulated download feedback:
    await new Promise(r => setTimeout(r, 1200));
    toast('success', 'Resume downloaded successfully');
    setResumeDownloading(false);
  };

  /* ── Gallery helpers ─────────────────────────────────── */
  const openGallery = (project, index = 0) => {
    setGallery({ open: true, project, index });
    document.body.style.overflow = 'hidden';
  };
  const closeGallery = () => {
    setGallery(g => ({ ...g, open: false }));
    document.body.style.overflow = '';
  };
  const galleryNext = () =>
    setGallery(g => ({ ...g, index: (g.index + 1) % g.project.gallery.length }));
  const galleryPrev = () =>
    setGallery(g => ({ ...g, index: (g.index - 1 + g.project.gallery.length) % g.project.gallery.length }));

  useEffect(() => {
    if (!gallery.open) return;
    const handler = e => {
      if (e.key === 'ArrowRight') galleryNext();
      if (e.key === 'ArrowLeft')  galleryPrev();
      if (e.key === 'Escape')     closeGallery();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [gallery.open]);

  /* ── Render ──────────────────────────────────────────── */
  return (
    <>
      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollPercent}%` }} />

      {/* Sticky Nav Stripe */}
      <nav className="site-nav-stripe">
        <div className="nav-stripe-inner">
          <span className="nav-wordmark">King Charlie</span>
          <div className="nav-links">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`nav-link${activeNav === href.slice(1) ? ' active' : ''}`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} type={t.type} message={t.message} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="hero-container">

          <header className="site-header">
            <div className="header-layout">

              {/* Left: Identity */}
              <div className="header-left">
                <div className="eyebrow reveal">
                  Full Stack Developer · Philippines
                </div>
                <h1 className="headline reveal delay-1">
                  King Charlie<br /><em>R. Dacillo</em>
                </h1>
                <h2 className="subheadline reveal delay-2">
                  Software Developer
                </h2>
                <p className="header-bio reveal delay-3">
                  Building reliable web applications with Laravel, React, and modern technologies.
                  Specialised in full-stack development with a background in IT infrastructure —
                  systems that work in production, not just on screen.
                </p>

                <div className="header-cta reveal delay-4">
                  <button
                    className="btn btn-primary"
                    onClick={handleDownloadResume}
                    disabled={resumeDownloading}
                  >
                    {resumeDownloading
                      ? <><FaFileAlt /> Downloading…</>
                      : <><FaDownload /> Download Resume</>}
                  </button>
                  <a href="#projects"   className="btn btn-outline">View Projects</a>
                  <a href="#contact"    className="btn btn-ghost">
                    Let's talk <FaArrowRight className="btn-arrow" />
                  </a>
                </div>
              </div>

              {/* Right: Profile */}
              <div className="header-right reveal-scale">
                <div className="profile-frame">
                  <img
                    src={profilePhoto}
                    alt="King Charlie R. Dacillo — Software Developer"
                    className="profile-image"
                  />
                </div>
                {/* <div className="profile-status">
                  <span className="status-dot" />
                  Online
                </div> */}
              </div>
            </div>
          </header>

          {/* ── MAIN 3-COLUMN ──────────────────────────── */}
          <main className="main-content">

            {/* LEFT: Expertise */}
            <aside className="left-column">
              <div className="reveal-left">
                <h3 className="panel-label">Core Expertise</h3>
                <ul className="expertise-list">
                  {EXPERTISE.map(({ icon, title, sub }) => (
                    <li key={title} className="expertise-item">
                      <span className="exp-icon">{icon}</span>
                      <div className="exp-body">
                        <h4>{title}</h4>
                        <p>{sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* MIDDLE */}
            <div className="middle-column">

              {/* About */}
              <section className="about-section reveal">
                <h3 className="section-heading">About</h3>
                <p className="about-text">
                  A full-stack developer with a strong foundation in infrastructure operations
                  and system development. I build reliable backend architectures with Laravel,
                  craft intuitive interfaces with React and Inertia, and optimise data flows
                  through thoughtful MySQL design. My infrastructure background means I think
                  about performance, reliability, and maintenance from day one — not as an
                  afterthought.
                </p>
              </section>

              {/* Projects */}
              <section id="projects" className="reveal">
                <div className="section-header">
                  <h3 className="section-heading">Projects</h3>
                  {/* <button
                    className="view-all-btn"
                    onClick={() => toast('info', 'Full project list coming soon')}
                  >
                    View all <FaArrowRight style={{ fontSize: '0.7em' }} />
                  </button> */}
                </div>

                <div className="projects-list">
                  {PROJECTS.map((project, i) => (
                    <div key={i} className="project-card">
                      <div className="project-card-header">
                        <div className="project-icon">{project.icon}</div>
                        <span className={`project-badge ${project.status === 'Completed' ? 'badge-done' : 'badge-wip'}`}>
                          {project.status}
                        </span>
                      </div>

                      <h4 className="project-name">{project.title}</h4>
                      <p className="project-desc">{project.description}</p>

                      {project.gallery && (
                        <div className="inline-thumbs">
                          {project.gallery.slice(0, 2).map((img, idx) => (
                            <div
                              key={img.id}
                              className="thumb"
                              style={{ backgroundImage: `url(${img.url})` }}
                              onClick={() => openGallery(project, idx)}
                              role="button"
                              aria-label={`View image ${idx + 1}`}
                            />
                          ))}
                          <button className="gallery-trigger" onClick={() => openGallery(project)}>
                            <FaImages /> Gallery
                          </button>
                        </div>
                      )}

                      <div className="tech-pills">
                        {project.technologies.slice(0, 4).map((t, ti) => (
                          <span key={ti} className="pill">{t}</span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="pill">+{project.technologies.length - 4}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section id="experience" className="reveal">
                <h3 className="section-heading">Experience</h3>
                <div className="experience-list">
                  {EXPERIENCES.map(exp => (
                    <div key={exp.id} className="exp-card">
                      <div className="exp-card-header">
                        <div className="exp-card-title">
                          <h4 className="exp-company">{exp.company}</h4>
                          <p className="exp-role">{exp.role}</p>
                        </div>
                        <div className="exp-meta">
                          <span className="exp-period">{exp.period}</span>
                          <span className="exp-location">
                            <FaMapMarkerAlt /> {exp.location}
                          </span>
                        </div>
                      </div>

                      <p className="exp-desc">{exp.description}</p>

                      <ul className="exp-achievements">
                        {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                      </ul>

                      <div className="tech-pills">
                        {exp.technologies.map((t, i) => <span key={i} className="pill">{t}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* RIGHT: Tech + Contact */}
            <aside className="right-column">

              <div className="reveal">
                <h3 className="panel-label">Tech Stack</h3>
                <div className="tech-grid">
                  {TECH_STACK.map(({ icon, label }) => (
                    <div key={label} className="tech-cell">
                      {icon}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal delay-1" id="contact">
                <h3 className="panel-label">Contact</h3>
                <div className="contact-list">
                  <a href="mailto:dev.kcee37340@gmail.com" className="contact-row">
                    <FaEnvelope /> dev.kcee37340@gmail.com
                  </a>
                  <a
                    href="https://github.com/Meep0Zero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-row"
                  >
                    <FaGithub /> github.com/Meep0Zero
                  </a>
                  <a
                    href="#"
                    className="contact-row"
                    onClick={e => { e.preventDefault(); toast('info', 'LinkedIn coming soon'); }}
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a
                    href="#"
                    className="contact-row"
                    onClick={e => { e.preventDefault(); toast('info', 'Contact copied to clipboard'); }}
                  >
                    <FaMobile /> +63 954 162 3514
                  </a>
                </div>
                <p className="avail-tag">
                  <span className="status-dot" /> Available for opportunities
                </p>
              </div>

              <div className="reveal delay-2">
                <h3 className="panel-label">What I Do</h3>
                <div className="services-list">
                  {SERVICES.map(({ title, desc }) => (
                    <div key={title} className="service-row">
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </aside>
          </main>
        </div>

        {/* ── FOOTER ────────────────────────────────────── */}
        <footer className="site-footer" id="footer">
          <div className="footer-container">

            <div className="footer-top">

              {/* Brand */}
              <div className="footer-brand reveal">
                <p className="footer-wordmark">King Charlie</p>
                <p className="footer-tagline">
                  Full Stack Laravel Developer specialising in building robust web applications,
                  backend systems, and the infrastructure that keeps them running.
                </p>
                <div className="footer-social">
                  <a
                    href="https://github.com/Meep0Zero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a href="mailto:dev.kcee37340@gmail.com" className="social-pill">
                    <FaEnvelope /> Email
                  </a>
                  <a
                    href="#"
                    className="social-pill"
                    onClick={e => { e.preventDefault(); toast('info', 'LinkedIn coming soon'); }}
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="reveal delay-1">
                <h4 className="footer-col-label">Navigation</h4>
                <div className="footer-links-list">
                  {[
                    { label: 'Home',       href: '#home'       },
                    { label: 'Projects',   href: '#projects'   },
                    { label: 'Experience', href: '#experience' },
                    { label: 'Contact',    href: '#contact'    },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} className="footer-nav-link">
                      {label}
                      <FaArrowRight />
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact column */}
              <div className="reveal delay-2">
                <h4 className="footer-col-label">Get In Touch</h4>
                <a href="mailto:dev.kcee37340@gmail.com" className="footer-contact-email">
                  <FaEnvelope /> dev.kcee37340@gmail.com
                </a>
                <button
                  onClick={handleDownloadResume}
                  disabled={resumeDownloading}
                  className="social-pill"
                  style={{ marginTop: 16, display: 'inline-flex', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', background: 'none' }}
                >
                  {resumeDownloading
                    ? <><FaFileAlt /> Downloading…</>
                    : <><FaDownload /> Download Resume</>}
                </button>
                <p className="footer-avail">
                  <span className="footer-avail-dot" /> Open to opportunities
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
              <p className="footer-copy">
                &copy; {new Date().getFullYear()} King Charlie R. Dacillo. All rights reserved.
              </p>
              <p className="footer-made">
                Made with <FaHeart className="heart" /> React.js
              </p>
            </div>

          </div>
        </footer>
      </section>

      {/* ── GALLERY MODAL ─────────────────────────────── */}
      {gallery.open && gallery.project && (
        <div className="gallery-modal" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={closeGallery} />
          <div className="modal-body">
            <div className="modal-header">
              <h3 className="modal-title">{gallery.project.title}</h3>
              <button className="modal-close" onClick={closeGallery} aria-label="Close">
                <FaTimes />
              </button>
            </div>

            <div className="modal-image-wrap">
              <img
                src={gallery.project.gallery[gallery.index].url}
                alt={gallery.project.gallery[gallery.index].caption}
              />
              <p className="modal-caption">{gallery.project.gallery[gallery.index].caption}</p>
            </div>

            <div className="modal-nav">
              <button className="modal-nav-btn" onClick={galleryPrev} aria-label="Previous">
                <FaChevronLeft />
              </button>
              <div className="modal-thumbs">
                {gallery.project.gallery.map((img, idx) => (
                  <div
                    key={img.id}
                    className={`modal-thumb${idx === gallery.index ? ' active' : ''}`}
                    style={{ backgroundImage: `url(${img.url})` }}
                    onClick={() => setGallery(g => ({ ...g, index: idx }))}
                    role="button"
                    aria-label={`Image ${idx + 1}`}
                  />
                ))}
              </div>
              <button className="modal-nav-btn" onClick={galleryNext} aria-label="Next">
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── BACK TO TOP ───────────────────────────────── */}
      {/* <button
        className={`back-to-top${showBackToTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button> */}
    </>
  );
};

export default Hero;