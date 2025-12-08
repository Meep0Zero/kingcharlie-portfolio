import React from 'react';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaHeart,
  FaCode, FaServer, FaDatabase, FaReact
} from 'react-icons/fa';
import { SiLaravel, SiInertia } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const technologies = [
    { icon: <SiLaravel />, name: 'Laravel', color: '#FF2D20' },
    { icon: <FaCode />, name: 'PHP', color: '#777BB4' },
    { icon: <FaDatabase />, name: 'MySQL', color: '#4479A1' },
    { icon: <FaReact />, name: 'React', color: '#61DAFB' },
    { icon: <SiInertia />, name: 'Inertia.js', color: '#9553E9' },
    { icon: <FaServer />, name: 'XAMPP', color: '#FB7A24' },
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#home' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/kingcharlie', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/kingcharlie', label: 'LinkedIn' },
    { icon: <FaEnvelope />, href: 'mailto:kingcharlie@example.com', label: 'Email' },
  ];

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">King Charlie</h3>
            <p className="footer-tagline">
              Full Stack Laravel Developer specializing in building robust web applications 
              and backend systems.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Get In Touch</h4>
            <div className="contact-info">
              <a href="mailto:kingcharlie@example.com" className="contact-link">
                <FaEnvelope />
                kingcharlie@example.com
              </a>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="tech-stack-footer">
          <h4 className="tech-stack-title">Built With</h4>
          <div className="tech-icons">
            {technologies.map((tech, index) => (
              <div key={index} className="tech-icon-item">
                <span className="tech-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              &copy; {currentYear} King Charlie R. Dacillo. All rights reserved.
            </p>
            <p className="made-with">
              Made with <FaHeart className="heart-icon" /> using React & Laravel expertise
            </p>
          </div>

          <div className="footer-note">
            <p>
              Open to collaboration and new opportunities. Let's build something amazing together!
            </p>
          </div>
        </div>

        {/* Back to Top */}
        <button 
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;