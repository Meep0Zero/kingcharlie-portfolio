import React from 'react';
import { 
  FaBuilding, FaServer, FaTools, FaNetworkWired,
  FaDesktop, FaCode, FaUsers, FaTicketAlt,
  FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt,
  FaChartLine, FaCogs, FaDatabase, FaShieldAlt
} from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: "Current Position",
      position: "Full Stack Web Developer",
      period: "September 24, 2025 - Present",
      location: "Magupo East, Tagum City",
      icon: <FaCode />,
      color: "#3b82f6",
      description: "Developing full-stack web applications using Laravel, React, and MySQL.",
      achievements: [
        "Building responsive web applications",
        "Implementing RESTful APIs",
        "Database design and optimization",
        "Frontend development with React/Inertia.js"
      ],
      technologies: ["Laravel", "React", "MySQL", "Inertia.js", "JavaScript"]
    },
    {
      id: 2,
      company: "DecoArts Marketing Inc.",
      position: "Infrastructure and Operations Specialist",
      period: "April 16, 2024 - September 24, 2025",
      location: "Quimpo blvd Ecoland, Davao City",
      icon: <FaServer />,
      color: "#10b981",
      description: "Managed IT infrastructure for 120 hardware store branches nationwide.",
      achievements: [
        "Troubleshooting computer hardware, printers, and peripherals across all branches",
        "Maintained POS systems, Oracle databases, and in-house applications",
        "Installed and configured operating systems and software applications",
        "Network troubleshooting including switches, MERAKI devices, and crimping",
        "Created internal knowledge base system 'Knowledge is Power' for troubleshooting guides",
        "Developed ticketing system for IT support requests",
        "Created navigation system for efficient system access"
      ],
      technologies: ["Network Troubleshooting", "Hardware Repair", "POS Systems", "Software Installation", "Windows OS"]
    },
    {
      id: 3,
      company: "iQor Philippines Inc.",
      position: "Sales Representative & Customer Service",
      period: "October 2023 - February 2024",
      location: "Sta Ana Davao City",
      icon: <FaUsers />,
      color: "#8b5cf6",
      description: "Seasonal position handling two different client accounts.",
      achievements: [
        "Handled customer inquiries and provided product information",
        "Managed sales transactions and order processing",
        "Resolved customer complaints and issues",
        "Achieved sales targets for both accounts"
      ],
      technologies: ["Customer Service", "Sales", "Communication", "CRM"]
    }
  ];

  const skills = [
    { name: "Laravel Development", level: 90, category: "Backend", icon: <FaCode /> },

    { name: "MySQL Database", level: 88, category: "Database", icon: <FaDatabase /> },
    { name: "React/Inertia.js", level: 80, category: "Frontend", icon: <FaCode /> },
    { name: "Hardware Troubleshooting", level: 95, category: "Infrastructure", icon: <FaTools /> },
    { name: "Network Troubleshooting", level: 90, category: "Infrastructure", icon: <FaNetworkWired /> },
    { name: "POS Systems", level: 85, category: "Infrastructure", icon: <FaDesktop /> },
  ];

  const systemsBuilt = [
    {
      name: "Knowledge is Power Portal",
      description: "Internal knowledge base with troubleshooting guides for IT staff and branches",
      impact: "Reduced IT support calls by 40%, enabled self-service troubleshooting",
      technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      icon: <FaShieldAlt />
    },
    {
      name: "Ticketing System",
      description: "Internal system for tracking IT support requests and resolutions",
      impact: "Improved ticket resolution time by 60%, better tracking and reporting",
      technologies: ["Laravel", "MySQL", "Inertia.js", "React"],
      icon: <FaTicketAlt />
    },
    {
      name: "System Navigation Tool",
      description: "Application for efficiently navigating multiple business systems",
      impact: "Increased productivity by streamlining system access",
      technologies: ["PHP", "JavaScript", "CSS", "HTML5"],
      icon: <FaChartLine />
    }
  ];

  const careerJourney = [
    {
      step: 1,
      title: "Customer Service",
      description: "Developed communication and customer handling skills",
      period: "2023-2024",
      icon: <FaUsers />
    },
    {
      step: 2,
      title: "Infrastructure Operations",
      description: "Gained hands-on experience with hardware and networks",
      period: "2024-2025",
      icon: <FaServer />
    },
    {
      step: 3,
      title: "System Development",
      description: "Built internal tools and business applications",
      period: "2024-2025",
      icon: <FaCode />
    },
    {
      step: 4,
      title: "Full Stack Development",
      description: "Focusing on professional web development",
      period: "2025-Present",
      icon: <FaCogs />
    }
  ];

  return (
    <section className="experience" id="experience">
      <div className="experience-container">
        
        {/* Header Section */}
        <header className="experience-header">
          <h1 className="experience-title">Professional Experience</h1>
          <p className="experience-subtitle">
            From customer service to infrastructure operations, now evolving into full-stack development
          </p>
        </header>

        {/* Main Content - 3 Columns */}
        <main className="experience-main">
          
          {/* Left Column - Timeline & Journey */}
          <aside className="experience-left-column">
            {/* Skills Comparison */}
            <div className="skills-comparison">
              <h3 className="section-title">Skills Overview</h3>
              <div className="comparison-chart">
                {skills.slice(0, 4).map((skill) => (
                  <div key={skill.name} className="comparison-item">
                    <div className="comparison-label">
                      {skill.icon}
                      <span>{skill.name}</span>
                    </div>
                    <div className="comparison-bar">
                      <div 
                        className="comparison-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                      <span className="comparison-percentage">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Progress */}
            <div className="skills-progress">
              <h3 className="section-title">Technical Skills</h3>
              <div className="skills-list">
                {skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <div className="skill-icon">{skill.icon}</div>
                      <div className="skill-details">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-category">{skill.category}</span>
                      </div>
                    </div>
                    <div className="skill-progress-bar">
                      <div 
                        className="skill-progress-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* Middle Column - Main Experience Details */}
          <div className="experience-middle-column">
            
            {/* Current Experience Card */}
            <div className="current-experience">
              <div className="experience-card featured">
                <div className="card-header">
                  <div className="company-info">
                    <div className="company-icon" style={{ backgroundColor: experiences[0].color }}>
                      {experiences[0].icon}
                    </div>
                    <div>
                      <h3 className="company-name">{experiences[0].company}</h3>
                      <h4 className="position-title">{experiences[0].position}</h4>
                    </div>
                  </div>
                  <span className="status-badge current">Current</span>
                </div>
                
                <div className="card-details">
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>{experiences[0].period}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt />
                    <span>{experiences[0].location}</span>
                  </div>
                </div>
                
                <p className="experience-description">{experiences[0].description}</p>
                
                <div className="achievements">
                  <h5>Key Responsibilities:</h5>
                  <ul>
                    {experiences[0].achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="technologies">
                  {experiences[0].technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Previous Experience */}
            <div className="previous-experience">
              <h3 className="section-title">Previous Experience</h3>
              {experiences.slice(1).map((exp) => (
                <div key={exp.id} className="experience-card">
                  <div className="card-header">
                    <div className="company-info">
                      <div className="company-icon" style={{ backgroundColor: exp.color }}>
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="company-name">{exp.company}</h3>
                        <h4 className="position-title">{exp.position}</h4>
                      </div>
                    </div>
                    <span className="status-badge previous">Completed</span>
                  </div>
                  
                  <div className="card-details">
                    <div className="detail-item">
                      <FaCalendarAlt />
                      <span>{exp.period}</span>
                    </div>
                    <div className="detail-item">
                      <FaMapMarkerAlt />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  
                  <p className="experience-description">{exp.description}</p>
                  
                  <div className="achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                      {exp.achievements.slice(0, 4).map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="technologies">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
              ))}
            </div>
          </div>

        </main>
      </div>
    </section>
  );
};

export default Experience;