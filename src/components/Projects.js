// Projects.js - Updated with your images
import React, { useState } from 'react';
import { 
  FaTicketAlt, FaUsers, FaShoppingCart, 
  FaBox, FaTimes, FaChevronLeft, FaChevronRight,
  FaImages
} from 'react-icons/fa';
import './Projects.css';

// Import your project images from the assets folder
import ticketingImage1 from '../assets/projects/ticketing-1.png';
import ticketingImage2 from '../assets/projects/ticketing-2.png';
import ticketingImage3 from '../assets/projects/ticketing-3.png';

import hrisImage1 from '../assets/projects/hris-1.png';
import hrisImage2 from '../assets/projects/hris-2.png';
import hrisImage3 from '../assets/projects/hris-3.png';

import inventoryImage1 from '../assets/projects/inventory-1.png';
import inventoryImage2 from '../assets/projects/inventory-2.png';
import inventoryImage3 from '../assets/projects/inventory-3.png';

import ecommerceImage1 from '../assets/projects/comingsoon.png';
import ecommerceImage2 from '../assets/projects/comingsoon.png';
import ecommerceImage3 from '../assets/projects/comingsoon.png';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Updated projects array with your images and removed XAMPP & MySQL Optimization
  const projects = [
    {
      title: "Ticketing System",
      description: "Complete ticket management system with role-based access, real-time notifications, and reporting dashboard. Built with Laravel, MySQL, and Inertia.js frontend.",
      technologies: ["Laravel", "MySQL", "Inertia.js", "React", "Bootstrap"],
      icon: <FaTicketAlt />,
      status: "Completed",
      category: "Backend System",
      gallery: [
        { 
          id: 1, 
          url: ticketingImage1,
          caption: "Dashboard Overview with ticket statistics" 
        },
        { 
          id: 2, 
          url: ticketingImage2,
          caption: "Ticket creation and management interface" 
        },
        { 
          id: 3, 
          url: ticketingImage3,
          caption: "Admin panel with reporting features" 
        }
      ]
    },
    {
      title: "HRIS System",
      description: "Human Resource Information System with employee management, payroll, attendance tracking, and leave management modules. Collaborated with other developers on this project.",
      technologies: ["Laravel", "MySQL", "Blade Templates", "JavaScript"],
      icon: <FaUsers />,
      status: "Completed (Collaborative)",
      category: "Enterprise Software",
      gallery: [
        { 
          id: 1, 
          url: hrisImage1,
          caption: "Employee management dashboard" 
        },
        { 
          id: 2, 
          url: hrisImage2,
          caption: "Attendance and time tracking system" 
        },
        { 
          id: 3, 
          url: hrisImage3,
          caption: "Payroll processing interface" 
        }
      ]
    },
    {
      title: "Inventory Management System",
      description: "Comprehensive inventory tracking system with barcode scanning, stock alerts, supplier management, and sales reporting.",
      technologies: ["Laravel", "MySQL", "jQuery", "DataTables"],
      icon: <FaBox />,
      status: "Completed",
      category: "Business Management",
      gallery: [
        { 
          id: 1, 
          url: inventoryImage1,
          caption: "Inventory dashboard with stock overview" 
        },
        { 
          id: 2, 
          url: inventoryImage2,
          caption: "Product management and categorization" 
        },
        { 
          id: 3, 
          url: inventoryImage3,
          caption: "Sales reporting and analytics" 
        }
      ]
    },
    {
      title: "E-commerce Platform with POS",
      description: "Full-featured online shopping platform with integrated Point of Sale system, payment gateway integration, and admin dashboard for order management.",
      technologies: ["Laravel", "MySQL", "React", "Inertia.js", "Payment APIs"],
      icon: <FaShoppingCart />,
      status: "In Development",
      category: "E-commerce",
      gallery: [
        { 
          id: 1, 
          url: ecommerceImage1,
          caption: "Online store front with product catalog" 
        },
        { 
          id: 2, 
          url: ecommerceImage2,
          caption: "Shopping cart and checkout process" 
        },
        { 
          id: 3, 
          url: ecommerceImage3,
          caption: "Admin dashboard for order management" 
        }
      ]
    }
  ];

  const openGallery = (project, index = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.gallery.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.gallery.length - 1 : prevIndex - 1
      );
    }
  };

  const handleKeyDown = (e) => {
    if (!isGalleryOpen) return;
    
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen]);

  return (
    <>
      <section className="projects" id="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">My Projects</h2>
            <p className="section-subtitle">
              A collection of systems and applications I've built using Laravel, MySQL, and modern web technologies
            </p>
          </div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <div className="project-icon">{project.icon}</div>
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <span className={`project-status ${project.status.toLowerCase().includes('completed') ? 'completed' : 'in-progress'}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {/* Project Gallery Thumbnails */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="project-gallery-preview">
                    <div className="gallery-thumbnails">
                      {project.gallery.slice(0, 3).map((image, imgIndex) => (
                        <div 
                          key={image.id} 
                          className="gallery-thumbnail"
                          onClick={() => openGallery(project, imgIndex)}
                          style={{ 
                            backgroundImage: `url(${image.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {imgIndex === 2 && project.gallery.length > 3 && (
                            <div className="more-images-overlay">
                              +{project.gallery.length - 3}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <button 
                      className="view-gallery-btn"
                      onClick={() => openGallery(project, 0)}
                    >
                      <FaImages /> View Gallery
                    </button>
                  </div>
                )}
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="technology-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-footer">
                  <span className="project-stack">
                    <strong>Stack:</strong> Laravel, MySQL, {project.technologies.includes('React') ? 'React' : 'Blade'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && selectedProject && (
        <div className="gallery-modal">
          <div className="gallery-modal-overlay" onClick={closeGallery}></div>
          
          <div className="gallery-modal-content">
            <div className="gallery-modal-header">
              <h3 className="gallery-project-title">{selectedProject.title}</h3>
              <button className="close-gallery-btn" onClick={closeGallery}>
                <FaTimes />
              </button>
            </div>
            
            <div className="gallery-main-image">
              <img 
                src={selectedProject.gallery[currentImageIndex].url} 
                alt={selectedProject.gallery[currentImageIndex].caption}
              />
              <div className="image-caption">
                {selectedProject.gallery[currentImageIndex].caption}
              </div>
            </div>
            
            <div className="gallery-navigation">
              <button className="nav-btn prev-btn" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              
              <div className="gallery-thumbnails-container">
                {selectedProject.gallery.map((image, index) => (
                  <div 
                    key={image.id}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{ 
                      backgroundImage: `url(${image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                ))}
              </div>
              
              <button className="nav-btn next-btn" onClick={nextImage}>
                <FaChevronRight />
              </button>
            </div>
            
            <div className="gallery-info">
              <div className="image-counter">
                {currentImageIndex + 1} / {selectedProject.gallery.length}
              </div>
              <div className="gallery-description">
                <strong>Description:</strong> {selectedProject.description}
              </div>
              <div className="gallery-technologies">
                <strong>Technologies:</strong>{' '}
                {selectedProject.technologies.join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;