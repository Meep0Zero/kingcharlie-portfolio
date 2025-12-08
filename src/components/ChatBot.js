import React, { useState, useRef, useEffect } from 'react';
import { 
  FaRobot, FaUser, FaPaperPlane, FaTimes, 
  FaChevronUp, FaLaravel, FaPhp, FaDatabase, FaReact,
  FaLightbulb, FaCog, FaInfinity
} from 'react-icons/fa';
import { SiInertia } from 'react-icons/si';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Updated expertise profile with your actual experience
  const expertiseProfile = `You are an AI assistant for King Charlie R. Dacillo, a Full Stack Laravel Developer with diverse experience.

PROFESSIONAL BACKGROUND:
1. Current Role (Sep 2025-Present): Full Stack Web Developer specializing in Laravel, React, and MySQL.

2. Citihardware Inc. (Apr 2024-Sep 2025): Infrastructure and Operations Specialist for 120 hardware store branches nationwide:
   - Troubleshot computer hardware, printers, and peripherals
   - Maintained POS systems, Oracle databases, and in-house applications
   - Handled network troubleshooting (switches, MERAKI, crimping)
   - Created "Knowledge is Power" internal knowledge base
   - Built ticketing system and system navigation tools

3. iQor Philippines (Oct 2023-Feb 2024): Sales Representative & Customer Service for two accounts.

TECHNICAL EXPERTISE:
- Full Stack: Laravel, PHP, MySQL, React, Inertia.js, Blade Templates
- Infrastructure: Hardware troubleshooting, Network administration, POS systems
- Systems Built: Internal knowledge base, Ticketing system, Navigation tools

PROJECTS:
- Ticketing System (Laravel/MySQL/Inertia.js)
- HRIS System (Collaborative)
- Inventory Management System
- E-commerce Platform with POS
- Flutter Mobile App (Coming Soon)

COMMUNICATION STYLE:
- Be professional and helpful
- Emphasize practical experience from retail IT to development
- Provide actionable advice based on real-world scenarios
- Highlight problem-solving skills gained from diverse roles`;

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
        text: "👋 Hello! I'm your AI assistant. I can help answer questions about Laravel, PHP, MySQL, React, Inertia.js, infrastructure troubleshooting, and discuss the projects in this portfolio. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

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
      // Always use smart mock responses (no API needed)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const smartResponses = {
        default: `I can help with that! As a Laravel full-stack developer with infrastructure experience, here's my recommendation:\n\nFor ${input.toLowerCase().includes('laravel') ? 'Laravel' : input.toLowerCase().includes('react') ? 'React/Inertia' : 'technical'} queries, I'd suggest reviewing best practices, checking documentation, and implementing tested patterns. Feel free to ask more specific questions!`,
        
        laravel: `**Laravel Best Practices:**\n\n1. Use Eloquent relationships efficiently with eager loading\n2. Implement proper validation in Form Requests\n3. Utilize queues for time-consuming tasks\n4. Cache frequently accessed data\n5. Follow PSR standards and Laravel conventions\n6. Use middleware for authentication and authorization\n7. Implement proper error handling and logging\n\n**From my experience:** At Citihardware, I built several Laravel systems including a ticketing system and knowledge base portal.`,
        
        mysql: `**MySQL Optimization Tips:**\n\n• Add indexes to columns in WHERE, JOIN, ORDER BY clauses\n• Use EXPLAIN to analyze query performance\n• Normalize data but consider denormalization for read-heavy applications\n• Implement proper foreign key constraints\n• Monitor slow query log regularly\n• Use appropriate data types and avoid SELECT *\n• Implement connection pooling for high-traffic applications\n\n**Real-world tip:** In our 120-branch system, query optimization was crucial for performance.`,
        
        react: `**React with Inertia.js Best Practices:**\n\n1. Keep components small and focused (Single Responsibility)\n2. Use Inertia's built-in form handling with validation\n3. Implement proper loading states and error boundaries\n4. Leverage Laravel's validation with Inertia forms\n5. Use Laravel Mix or Vite for asset compilation\n6. Implement proper state management for complex UIs\n7. Use TypeScript for better type safety (if applicable)\n\n**My approach:** I use Inertia.js to create seamless SPAs while leveraging Laravel's backend power.`,
        
        infrastructure: `**Infrastructure & Troubleshooting Experience:**\n\nFrom my time at Citihardware managing 120 branches:\n\n• **Hardware:** Troubleshot desktops, laptops, printers, barcode scanners\n• **Network:** Configured switches, MERAKI devices, crimping, connectivity issues\n• **Systems:** POS maintenance, Oracle database support, Windows OS installations\n• **Process:** Created troubleshooting guides and trained staff\n\n**Key Achievement:** Built "Knowledge is Power" portal that reduced IT calls by 40%.`,
        
        projects: `**Portfolio Projects Overview:**\n\n• **Ticketing System:** Laravel backend with role-based access, real-time notifications\n• **HRIS System:** Collaborative project with employee management features\n• **Inventory Management:** Complete stock tracking with barcode support\n• **E-commerce & POS:** Online shop with integrated point-of-sale system (In Development)\n• **Flutter App:** Mobile application for business operations (Coming Soon)\n\n**Plus:** Internal systems built at Citihardware including knowledge base and navigation tools.`,
        
        experience: `**My Career Journey:**\n\n1. **Customer Service** (iQor): Developed communication and problem-solving skills\n2. **Infrastructure Specialist** (Citihardware): Hands-on IT experience across 120 branches\n3. **System Developer:** Built internal tools to solve business problems\n4. **Full Stack Developer:** Now focusing on professional web development\n\n**Unique Perspective:** My infrastructure background gives me insights into system performance, reliability, and user needs that pure developers might miss.`,
        
        troubleshooting: `**Troubleshooting Methodology:**\n\nFrom my infrastructure experience:\n\n1. **Identify:** Clearly define the problem and symptoms\n2. **Reproduce:** Can you consistently reproduce the issue?\n3. **Isolate:** Determine if it's hardware, software, network, or user-related\n4. **Research:** Check logs, documentation, and known solutions\n5. **Test:** Try potential fixes in a controlled manner\n6. **Implement:** Apply the solution and monitor results\n7. **Document:** Record the issue and solution for future reference\n\n**Pro tip:** Always start with the simplest explanation first.`,
        
        career: `**Career Advice for Developers:**\n\nBased on my journey from IT support to development:\n\n1. **Build Projects:** Nothing beats hands-on experience\n2. **Learn Fundamentals:** Understand how things work under the hood\n3. **Solve Real Problems:** Build tools that address actual needs\n4. **Document Everything:** Good documentation is invaluable\n5. **Network:** Connect with other developers and share knowledge\n6. **Stay Curious:** Technology evolves rapidly, keep learning\n\n**My edge:** Infrastructure experience gives me practical insights into system reliability and performance.`
      };

      let response = smartResponses.default;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('laravel') || lowerInput.includes('php')) {
        response = smartResponses.laravel;
      } else if (lowerInput.includes('mysql') || lowerInput.includes('database')) {
        response = smartResponses.mysql;
      } else if (lowerInput.includes('react') || lowerInput.includes('inertia') || lowerInput.includes('frontend')) {
        response = smartResponses.react;
      } else if (lowerInput.includes('infrastructure') || lowerInput.includes('hardware') || lowerInput.includes('network') || lowerInput.includes('citihardware')) {
        response = smartResponses.infrastructure;
      } else if (lowerInput.includes('project') || lowerInput.includes('ticket') || lowerInput.includes('hris') || lowerInput.includes('inventory') || lowerInput.includes('ecommerce')) {
        response = smartResponses.projects;
      } else if (lowerInput.includes('experience') || lowerInput.includes('career') || lowerInput.includes('journey') || lowerInput.includes('background')) {
        response = smartResponses.experience;
      } else if (lowerInput.includes('troubleshoot') || lowerInput.includes('error') || lowerInput.includes('fix') || lowerInput.includes('debug') || lowerInput.includes('problem')) {
        response = smartResponses.troubleshooting;
      } else if (lowerInput.includes('advice') || lowerInput.includes('learn') || lowerInput.includes('become') || lowerInput.includes('developer')) {
        response = smartResponses.career;
      }

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
        text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment. Meanwhile, feel free to browse the portfolio projects below!",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Updated quick questions based on your experience
  const quickQuestions = [
    // "Laravel best practices?",
    // "MySQL optimization tips?",
    // "React with Inertia.js?",
    // "Your infrastructure experience?"
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
                <FaRobot />
              </div>
              <div>
                <h3>King Charlie's AI Development Assistant</h3>
                <small>Laravel & Infrastructure Expert</small>
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
                      <FaRobot />
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
                    <FaRobot />
                  </div>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span>Thinking</span>
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

          {/* Quick Questions */}
          <div className="quick-questions">
            <div className="quick-questions-header">
              {/* <FaLightbulb /> */}
              <span></span>
            </div>
            <div className="quick-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-btn"
                  onClick={() => {
                    setInput(question);
                    // Auto-send after setting the question
                    setTimeout(() => {
                      handleSend();
                    }, 100);
                  }}
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>
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
              placeholder="Ask about Laravel, MySQL, React, Inertia.js, infrastructure, or projects..."
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
                <FaLightbulb /> Smart Assistant (No API Required)
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;