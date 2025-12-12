import React from 'react';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaDownload,
  FaLaravel, FaPhp, FaDatabase, FaReact, 
  FaMobileAlt, FaShoppingCart, FaTicketAlt, FaUsers,
  FaCode, FaCogs, FaServer, FaTools
} from 'react-icons/fa';
import { SiInertia } from 'react-icons/si';
import './Hero.css';

import profilePhoto from '../assets/kingcharles.jpg';

const Hero = () => {
  const handleResumeDownload = () => {
    alert("Download resume coming soon!");
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        
        {/* Header Section */}
        <header className="site-header">
          <div className="header-content">
            <div className="profile-image-container">
              <img 
                src={profilePhoto} 
                alt="King Charlie R. Dacillo - Software Developer" 
                className="profile-image"
              />
            </div>
            <div className="header-info">
            <h1 className="name flex items-center gap-2">
              King Charlie R. Dacillo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="35"
                viewBox="0 0 24 24"
                fill="#1DA1F2"
              >
                <path d="M22.25 12l-2.1 2.7.3 3.4-3.3.9-1.9 2.8-3.2-1.2-3.2 1.2-1.9-2.8-3.3-.9.3-3.4L1.75 12l2.1-2.7-.3-3.4 3.3-.9L8.8 2.2l3.2 1.2 3.2-1.2 1.9 2.8 3.3.9-.3 3.4L22.25 12z"/>
                <path
                  fill="#fff"
                  d="M10.6 13.8l-2.2-2.2-1.4 1.4 3.6 3.6 7-7-1.4-1.4z"
                />
              </svg>
            </h1>
              <h2 className="title">Software Developer</h2>
              <div className="header-actions">
                <button className="btn btn-primary" onClick={handleResumeDownload}>
                  <FaDownload /> Download Resume
                </button>
                // <a href="#projects" className="btn btn-secondary">
                //   View Projects
                // </a>
                <a href="#experience" className="btn btn-secondary">
                  My Experience
                </a>
              </div>
            </div>
          </div>
          
          {/* Site Navigation */}
          <nav className="site-navigation">
            <ul className="nav-list">
              <li><a href="#home" className="nav-link active">Home</a></li>
              // <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#experience" className="nav-link">Experience</a></li>
              <li><a href="#skills" className="nav-link">Skills</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
        </header>

        {/* Main Content Area with 3 Columns */}
        <main className="main-content">
          
          {/* Left Column - Category/Sidebar */}
          <aside className="left-column">
            {/* Category List */}
            <div className="category-section">
              <h3 className="section-title">
                <FaCogs /> My Expertise
              </h3>
              <ul className="category-list">
                <li className="category-item">
                  <FaCode />
                  <span>Backend Development</span>
                </li>
                <li className="category-item">
                  <FaReact />
                  <span>Frontend Development</span>
                </li>
                <li className="category-item">
                  <FaDatabase />
                  <span>Database Design</span>
                </li>
                {/* <li className="category-item">
                  <FaServer />
                  <span>System Architecture</span>
                </li> */}
                <li className="category-item">
                  <FaTools />
                  <span>DevOps & Infrastructure</span>
                </li>
              </ul>
            </div>

            {/* Compare Products/Info */}
            <div className="compare-section">
              <h3 className="section-title">
                <FaDatabase /> Database Expertise
              </h3>
              <div className="compare-card">
                <div className="compare-item">
                  <strong>MySQL</strong>
                  <span>Database Design & Optimization</span>
                </div>
                {/* <div className="compare-item">
                  <strong>XAMPP</strong>
                  <span>Local Development Environment</span>
                </div> */}
                <div className="compare-item">
                  <strong>API Integration</strong>
                  <span>RESTful APIs & Services</span>
                </div>
              </div>
            </div>

            {/* Sub Category List */}
            {/* <div className="subcategory-section">
              <h3 className="section-title">Technical Stack</h3>
              <div className="subcategory-list">
                <span className="subcategory-tag">Laravel</span>
                <span className="subcategory-tag">PHP 8+</span>
                <span className="subcategory-tag">MySQL</span>
                <span className="subcategory-tag">React</span>
                <span className="subcategory-tag">Inertia.js</span>
                <span className="subcategory-tag">JavaScript</span>
                <span className="subcategory-tag">HTML/CSS</span>
                <span className="subcategory-tag">Bootstrap</span>
              </div>
            </div> */}
          </aside>

          {/* Middle Column - Main Content */}
          <div className="middle-column">
            {/* Main Description */}
            <div className="main-description">
              <h3>About Me</h3>
              <p className="description">
                A full-stack developer with a strong foundation in infrastructure operations 
                and system development. I build reliable backend architectures using Laravel, 
                craft intuitive interfaces with React and Inertia, and optimize data handling 
                through efficient MySQL design. I bring a well-rounded, end-to-end approach 
                to development creating solutions that are stable, scalable, and user-focused.
              </p>
            </div>

            {/* Product Listing (Featured Projects) */}
            <div className="projects-listing">
              <h3 className="section-title">Featured Projects</h3>
              <div className="projects-grid">
                <div className="project-card">
                  <FaTicketAlt className="project-icon" />
                  <h4>Ticketing System</h4>
                  <p>Complete ticket management system with Laravel backend</p>
                  <div className="project-tags">
                    <span>Laravel</span>
                    <span>MySQL</span>
                    <span>Inertia.js</span>
                  </div>
                </div>
                <div className="project-card">
                  <FaUsers className="project-icon" />
                  <h4>HRIS System</h4>
                  <p>Human Resource Information System (Collaborative project)</p>
                  <div className="project-tags">
                    <span>Laravel</span>
                    <span>MySQL</span>
                    <span>Blade</span>
                  </div>
                </div>
                <div className="project-card">
                  <FaShoppingCart className="project-icon" />
                  <h4>E-commerce & POS</h4>
                  <p>Online shop with Point of Sale system (Ongoing)</p>
                  <div className="project-tags">
                    <span>Laravel</span>
                    <span>React</span>
                    <span>Payment APIs</span>
                  </div>
                </div>
                <div className="project-card">
                  <FaDatabase className="project-icon" />
                  <h4>Inventory Management</h4>
                  <p>Complete inventory tracking and management system</p>
                  <div className="project-tags">
                    <span>Laravel</span>
                    <span>MySQL</span>
                    <span>jQuery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info in Main */}
            {/* <div className="contact-main">
              <div className="contact-info">
                <div className="info-item">
                  <FaEnvelope />
                  <span>dev.kcee37340@gmail.com</span>
                </div>
                <div className="info-item">
                  <FaGithub />
                  <a href="https://github.com/Meep0Zero" target="_blank" rel="noopener noreferrer">
                    https://github.com/Meep0Zero
                  </a>
                </div>
                
              </div>
            </div> */}
          </div>

          {/* Right Column - Callouts & Newsletter */}
          <aside className="right-column">
            {/* Tech Stack Callout */}
            <div className="callout tech-stack-callout">
              <h3 className="section-title">Tech Stack</h3>
              <div className="tech-stack-grid">
                <div className="tech-item">
                  <FaLaravel className="tech-icon laravel" />
                  <span>Laravel</span>
                </div>
                <div className="tech-item">
                  <FaPhp className="tech-icon php" />
                  <span>PHP</span>
                </div>
                <div className="tech-item">
                  <FaDatabase className="tech-icon mysql" />
                  <span>MySQL</span>
                </div>
                <div className="tech-item">
                  <FaReact className="tech-icon react" />
                  <span>React</span>
                </div>
                <div className="tech-item">
                  <SiInertia className="tech-icon inertia" />
                  <span>Inertia.js</span>
                </div>
                <div className="tech-item">
                  <FaMobileAlt className="tech-icon flutter" />
                  <span>Flutter</span>
                  {/* <small style={{ color: "#8a8a8a" }}>Coming soon</small> */}
                </div>
              </div>
            </div>

            {/* Newsletter Signup (Contact Form) */}
            {/* <div className="newsletter-section">
              <h3 className="section-title">Get In Touch</h3>
              <p className="newsletter-description">
                Interested in collaborating or have a project in mind?
              </p>
              <div className="contact-form">
                <a href="mailto:dev.kcee37340@gmail.com" className="btn btn-primary btn-block">
                  <FaEnvelope /> Send Email
                </a>
                <p className="form-note">
                  Available for freelance projects and full-time opportunities
                </p>
              </div>
            </div> */}

            {/* Callout - What I Do */}
            <div className="callout expertise-callout">
              <h3 className="section-title">What I Do</h3>
              <div className="expertise-list">
                <div className="expertise-item">
                  <h4>Backend Development</h4>
                  <p>Building robust APIs, business logic, and server-side applications with Laravel</p>
                </div>
                <div className="expertise-item">
                  <h4>Frontend Development</h4>
                  <p>Creating responsive UIs with React, Inertia.js, and Blade templates</p>
                </div>
                <div className="expertise-item">
                  <h4>Database Design</h4>
                  <p>Designing and optimizing MySQL databases for performance and scalability</p>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </section>
  );
};

export default Hero;
