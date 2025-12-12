import React, { useState, useRef, useEffect } from 'react';
import { 
  FaRobot, FaUser, FaPaperPlane, FaTimes, 
  FaChevronUp, FaLaravel, FaPhp, FaDatabase, FaReact,
  FaLightbulb, FaCog, FaInfinity, FaBrain
} from 'react-icons/fa';
import { SiInertia } from 'react-icons/si';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Your complete personality and experience profile
  const kingCharlieKnowledgeBase = {
    // Core Identity
    identity: {
      name: "King Charlie R. Dacillo",
      title: "Full Stack Laravel Developer & Infrastructure Specialist",
      personality: "Professional, approachable, passionate about technology, practical problem-solver, enjoys sharing knowledge",
      communicationStyle: "Conversational, detailed but clear, enthusiastic about tech, honest about challenges",
      currentFocus: "Building robust web applications with Laravel, React, and modern tools"
    },
    
    // Complete Career Timeline
    career: [
      {
        period: "Sep 2025 - Present",
        role: "Full Stack Web Developer",
        company: "TL Mabuhay Driving Lesson Academy",
        highlights: [
          "Specializing in Laravel, React, and MySQL",
          "Building portfolio projects including e-commerce platforms",
          "Developing Flutter mobile applications",
          "Continuously learning modern web technologies"
        ],
        keyLearning: "Transitioning from infrastructure to full development cycle"
      },
      {
        period: "Apr 2024 - Sep 2025",
        role: "Infrastructure and Operations Specialist",
        company: "DecoArts Marketing Inc.",
        highlights: [
          "Managed IT infrastructure for 120+ citihardware store branches nationwide",
          "Troubleshot computer hardware, printers, barcode scanners",
          "Maintained POS systems and Oracle databases",
          "Network troubleshooting (switches, MERAKI devices)",
          "Created 'Knowledge is Power' internal knowledge base",
          "Built ticketing system and navigation tools"
        ],
        keyLearning: "Understanding real-world IT challenges and user needs"
      },
      {
        period: "Oct 2023 - Feb 2024",
        role: "Sales Representative & Customer Service",
        company: "iQor Philippines",
        highlights: [
          "Handled multiple customer service accounts",
          "Developed communication and problem-solving skills",
          "Learned to understand diverse user perspectives"
        ],
        keyLearning: "Importance of clear communication and empathy in tech"
      }
    ],
    
    // Technical Expertise (Organized by category)
    technical: {
      backend: {
        languages: ["PHP"],
        frameworks: ["Laravel", "Lumen"],
        databases: ["MySQL", "Oracle"],
        apis: ["REST APIs", "API Integration"]
      },
      frontend: {
        languages: ["JavaScript", "HTML5", "CSS3"],
        frameworks: ["React", "Inertia.js"],
        libraries: ["Axios", "React Router"],
        styling: ["Tailwind CSS", "Bootstrap"]
      },
      infrastructure: {
        hardware: ["Desktop/Laptop repair", "Printer troubleshooting", "POS systems"],
        networking: ["Switch configuration", "MERAKI devices", "Network crimping"],
        systems: ["Windows OS", "Linux basics", "System maintenance"],
        tools: ["Ticketing systems", "Knowledge bases", "Documentation"]
      },
      tools: {
        development: ["Git", "Composer", "NPM", "VS Code"],
        databases: ["phpMyAdmin", "MySQL Workbench"],
        design: ["Figma", "Adobe XD"],
        project: ["Trello", "Jira", "Asana"]
      }
    },
    
    // Projects with Details
    projects: [
      {
        name: "Ticketing System",
        status: "Completed",
        tech: ["Laravel", "MySQL", "Inertia.js", "React"],
        description: "Internal system for tracking and resolving IT issues",
        features: ["Role-based access", "Real-time notifications", "Priority queuing", "Reporting"],
        lessons: "Learned importance of clear workflow design and user feedback"
      },
      {
        name: "HRIS System",
        status: "Collaborative",
        tech: ["Laravel", "React", "MySQL"],
        description: "Human Resources Information System for employee management",
        features: ["Employee records", "Leave management", "Attendance tracking"],
        lessons: "Collaboration importance and data security considerations"
      },
      {
        name: "Inventory Management",
        status: "Completed",
        tech: ["Laravel", "MySQL", "Barcode API"],
        description: "System for tracking hardware store inventory",
        features: ["Barcode scanning", "Stock alerts", "Supplier management"],
        lessons: "Real-time data accuracy is crucial for inventory systems"
      },
      {
        name: "E-commerce Platform with POS",
        status: "In Development",
        tech: ["Laravel", "React", "Inertia.js", "Payment Gateways"],
        description: "Online store with integrated point-of-sale system",
        features: ["Product management", "Shopping cart", "Payment processing", "POS integration"],
        lessons: "Security and scalability challenges in e-commerce"
      },
      {
        name: "Flutter Mobile App",
        status: "Coming Soon",
        tech: ["Flutter", "Firebase", "REST API"],
        description: "Mobile application for business operations",
        features: ["Cross-platform", "Offline capability", "Push notifications"],
        lessons: "Mobile UX differs significantly from web"
      }
    ],
    
    // Personal Philosophy & Approach
    philosophy: {
      development: "Build solutions that solve real problems, not just write code",
      learning: "Always be curious, always be learning",
      problemSolving: "Understand the problem thoroughly before jumping to solutions",
      collaboration: "Great software is built by teams, not individuals",
      quality: "Write code you'll be proud of in 6 months"
    },
    
    // Fun Facts & Personal Touch
    personal: {
      background: "Transitioned from customer service to IT infrastructure to full-stack development",
      motivation: "Passionate about creating tools that make people's work easier",
      workStyle: "Methodical, detail-oriented but focused on practical results",
      interests: ["Technology trends", "Problem-solving puzzles", "Learning new frameworks"],
      quote: "Good infrastructure is like good plumbing - you only notice it when it fails"
    },
    
    // Conversation Patterns
    conversationPatterns: {
      greeting: ["friendly", "professional", "helpful"],
      technical: ["detailed but clear", "practical examples", "real-world experience"],
      personal: ["authentic", "storytelling", "lessons learned"],
      advice: ["practical", "based on experience", "actionable"]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "👋 Hello! I'm King Charlie's AI assistant - I know everything about his career journey, technical skills, and projects. Ask me anything about his experience, get technical advice, or just chat! I'm here to help you understand his unique perspective as a developer with infrastructure background.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Smart response generator - understands context and provides personalized answers
  const generateSmartResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Greeting patterns
    if (input.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return `Hello! I'm King Charlie's AI assistant. It's great to connect with you! What would you like to know about my journey from infrastructure specialist to full-stack developer?`;
    }
    
    // Ask about the person directly
    if (input.match(/(who are you|tell me about you|about yourself|introduce yourself)/)) {
      return `I'm King Charlie R. Dacillo! Let me tell you about my journey:\n\nI started in customer service at iQor, then moved to Citihardware where I managed IT for 120 hardware stores. This gave me incredible hands-on experience with real-world tech problems - fixing printers, configuring networks, and maintaining POS systems.\n\nNow I'm a Full Stack Developer specializing in Laravel and React. My infrastructure background gives me a unique perspective - I understand how systems actually work in production, which helps me build more reliable applications.\n\nWhat aspect of my experience interests you most?`;
    }
    
    // Career/journey questions
    if (input.match(/(career|journey|background|experience|how you started)/)) {
      const careerStory = kingCharlieKnowledgeBase.career.map(job => 
        `📅 ${job.period}\n💼 ${job.role} at ${job.company}\n✨ Key: ${job.keyLearning}\n`
      ).join('\n');
      
      return `My career journey has been quite the adventure! Here's the timeline:\n\n${careerStory}\n\nEach step taught me something valuable: customer service taught me communication, infrastructure taught me problem-solving, and development lets me build solutions. The combination makes me a well-rounded developer who understands both code and the systems it runs on.`;
    }
    
    // Technical questions
    if (input.match(/(laravel|php|backend)/)) {
      return `**My Laravel Experience:**\n\nI've built several production systems with Laravel, and here's what I've learned:\n\n• Laravel's elegance makes complex tasks simple, but understanding the "why" behind its conventions is key\n• Eloquent ORM is powerful - proper relationships and eager loading are game-changers\n• Queues and Jobs transformed how I handle background tasks\n• Testing (PHPUnit) is non-negotiable for production code\n• The ecosystem (Forge, Vapor, Nova) accelerates development\n\n**Real example:** At Citihardware, I built a Laravel-based knowledge base that reduced IT support calls by 40%. The key was making it intuitive for non-technical staff.\n\nWhat specific Laravel topic interests you?`;
    }
    
    if (input.match(/(react|frontend|inertia)/)) {
      return `**Frontend with React & Inertia.js:**\n\nMy approach combines React's component power with Laravel's backend strength:\n\n• React's component model changed how I think about UI - everything is reusable\n• Inertia.js is magical for Laravel devs - SPA experience without API overhead\n• State management: Start simple, only add complexity when needed\n• Form handling with Laravel validation is seamless with Inertia\n• Performance: Lazy loading components and proper bundling are crucial\n\n**Pro tip:** My infrastructure experience taught me that frontend performance affects user satisfaction more than we realize. Every second counts!`;
    }
    
    if (input.match(/(mysql|database|query)/)) {
      return `**Database Wisdom from 120 Stores:**\n\nManaging databases for 120 hardware stores taught me:\n\n• Indexes are your best friend, but too many hurt writes\n• Normalization is good, but denormalize for critical read paths\n• EXPLAIN is your microscope for query performance\n• Connection pooling prevents "too many connections" errors\n• Backups aren't optional - test your restore process!\n\n**Real story:** At Citihardware, optimizing a single query reduced report generation from 45 seconds to 2 seconds. That's the power of understanding your database!`;
    }
    
    if (input.match(/(infrastructure|hardware|network|citihardware)/)) {
      return `**The Infrastructure Years - Citihardware:**\n\nManaging IT for 120 stores was like getting a PhD in real-world tech:\n\n🔧 **Hardware:** Fixed everything from barcode scanners to POS systems. Learned that hardware fails differently than software!\n🌐 **Networking:** Configured switches, solved connectivity issues. Learned that network problems often look like software problems.\n💾 **Systems:** Oracle databases, Windows servers, custom applications. Learned that systems need care and feeding.\n👥 **People:** Trained staff, wrote guides. Learned that good documentation saves hours of support.\n\n**Biggest lesson:** Infrastructure thinking makes you a better developer. You consider performance, reliability, and maintenance from day one.`;
    }
    
    // Project questions
    if (input.match(/(project|portfolio|what have you built|ticket|hris|inventory)/)) {
      const projectSummary = kingCharlieKnowledgeBase.projects.map(project => 
        `🚀 ${project.name} (${project.status})\n🛠️ Tech: ${project.tech.join(', ')}\n📝 ${project.description}\n`
      ).join('\n');
      
      return `**Projects I've Built:**\n\n${projectSummary}\n\n**My development philosophy:** Each project taught me something new. The ticketing system taught me about workflow design. The inventory system taught me about data accuracy. Currently, the e-commerce project is teaching me about security and scalability.\n\nWhich project interests you most?`;
    }
    
    // Advice questions
    if (input.match(/(advice|tip|recommend|suggest|how to|learn|become developer)/)) {
      return `**Advice from My Journey:**\n\n1. **Start with why:** Understand why you're learning something before diving in\n2. **Build real things:** Personal projects teach more than tutorials\n3. **Embrace the struggle:** Infrastructure troubleshooting taught me persistence pays off\n4. **Learn the fundamentals:** A solid base makes learning frameworks easier\n5. **Document as you go:** Future you will be grateful\n6. **Connect with others:** The dev community is incredibly supportive\n7. **Specialize but stay curious:** Deep expertise + broad knowledge = career flexibility\n\n**My unique perspective:** Coming from infrastructure, I appreciate how code runs in the real world. It's not just about writing code - it's about creating solutions that work reliably for real people.`;
    }
    
    // Personal philosophy
    if (input.match(/(philosophy|approach|mindset|thinking)/)) {
      return `**My Development Philosophy:**\n\n"${kingCharlieKnowledgeBase.philosophy.quote}"\n\nI believe in:\n\n• **Practical solutions over perfect code:** Solve the real problem first\n• **Continuous learning:** Technology never stops evolving, neither should we\n• **User empathy:** Remember who you're building for\n• **Infrastructure thinking:** Consider performance and reliability from the start\n• **Collaboration:** Great software is a team effort\n\nThis mindset comes from my unique background - I've seen what happens when systems fail in production, so I build with that in mind.`;
    }
    
    // Questions about the future
    if (input.match(/(future|goals|next|aspirations|goals)/)) {
      return `**Looking Ahead:**\n\nI'm excited about:\n\n• Completing my e-commerce platform with integrated POS\n• Launching my Flutter mobile app\n• Deepening my expertise in Laravel ecosystem\n• Exploring more about system architecture and scalability\n• Possibly mentoring others transitioning from IT to development\n\nMy goal is to keep building tools that solve real problems while continuing to learn and grow. The journey from fixing printers to writing production code has been incredible, and I'm just getting started!`;
    }
    
    // Casual/conversational questions
    if (input.match(/(how are you|how's it going|what's up)/)) {
      const responses = [
        "I'm doing great! Currently helping people learn about King Charlie's journey from IT infrastructure to full-stack development. It's a fascinating story!",
        "Doing well! Thinking about how infrastructure experience makes better developers. What's on your mind?",
        "I'm excellent! King Charlie's working on some exciting Laravel projects, and I get to share all about it. How about you?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Thank you responses
    if (input.match(/(thanks|thank you|appreciate)/)) {
      return `You're very welcome! I'm glad I could help. If you have more questions about King Charlie's experience, technical skills, or projects, just ask. His journey from customer service to infrastructure to development has some great lessons for anyone in tech!`;
    }
    
    // Default - intelligent response based on understanding who I am
    return `That's an interesting question! Based on my experience as King Charlie:\n\nAs someone who's worked in customer service, managed IT infrastructure for 120 stores, and now builds full-stack applications, I'd approach this by:\n\n1. Understanding the real-world context (my infrastructure background helps here)\n2. Considering practical constraints and user needs\n3. Applying technical knowledge from my Laravel/React experience\n4. Drawing lessons from similar challenges I've faced\n\nCould you tell me more about what specifically interests you? I can share relevant experiences from my journey or provide technical insights based on what I've learned building real systems.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate thinking time based on question complexity
      const thinkingTime = input.length < 20 ? 600 : 1200;
      await new Promise(resolve => setTimeout(resolve, thinkingTime));
      
      const response = generateSmartResponse(input);

      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Hmm, let me think about that differently... Based on King Charlie's experience, I'd say the most important thing is to approach problems methodically and learn from each challenge. What specifically were you curious about?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick questions to help users understand what to ask
  const quickQuestions = [
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat assistant"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
        <span className="pulse-dot"></span>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <div className="chatbot-icon">
                <FaBrain />
              </div>
              <div>
                <h3>King Charlie's AI Assistant</h3>
                <small>Ask me anything about my journey & expertise</small>
              </div>
            </div>
            <button 
              className="minimize-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
            >
              <FaChevronUp />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender}`}
              >
                <div className="message-avatar">
                  {message.sender === 'bot' ? 
                    <div className="bot-avatar">
                      <FaBrain />
                    </div> : 
                    <div className="user-avatar">
                      <FaUser />
                    </div>
                  }
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-timestamp">{message.timestamp}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-avatar">
                  <div className="bot-avatar">
                    <FaBrain />
                  </div>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span>Thinking about my experience</span>
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about my journey, technical advice, projects, or just chat..."
              disabled={isLoading}
              rows="2"
            />
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
          
          {/* Tech Stack Indicator */}
          <div className="tech-indicator">
            <div className="tech-icons">
              <FaLaravel title="Laravel" />
              <FaPhp title="PHP" />
              <FaDatabase title="MySQL" />
              <FaReact title="React" />
              <SiInertia title="Inertia.js" />
              <FaInfinity title="Infrastructure" />
            </div>
            <div className="api-status">
              <small>
                <FaBrain /> Intelligent Assistant
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;