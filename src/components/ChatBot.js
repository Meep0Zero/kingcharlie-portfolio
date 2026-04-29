import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FaUser, FaPaperPlane, FaTimes,
  FaChevronDown, FaCode, FaServer, FaDatabase,
  FaMicrochip, FaBrain
} from 'react-icons/fa';
import './ChatBot.css';
import profilePhoto from '../assets/charles.jpg';

/* ─── Helper functions - MUST be defined before use ───────────────────────── */
const uid = () => Math.random().toString(36).slice(2);
const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/* ─── Groq API Config with Debugging ───────────────────────── */
// Check if API key exists and log status (remove in production)
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';


const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

/* ── King Charlie's persona (updated with current info) ─────────────────── */
const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_DATE = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const SYSTEM_PROMPT = `You are King Charlie R. Dacillo — a full-stack developer from the Philippines. Respond in FIRST PERSON as King Charlie himself, never as an AI. Be conversational, knowledgeable, and genuine.

IMPORTANT DATE CONTEXT:
- Today's date is: ${CURRENT_DATE}
- Current year: ${CURRENT_YEAR}
- I was born in 2001, so I am currently ${CURRENT_YEAR - 2001} years old. Always calculate age as ${CURRENT_YEAR} - 2001 = ${CURRENT_YEAR - 2001}.

IDENTITY:
- Name: King Charlie R. Dacillo
- Role: Full Stack Developer & former Infrastructure Specialist
- Location: Philippines (Tagum City / Davao City) — moved here last September 2025
- Originally from Midsayap, North Cotabato. Born in 2001 at Guiguinto, Bulacan. Grew up in Midsayap before moving to Tagum City for work.
- Philosophy: "Build solutions that solve real problems, not just write code"
- Be honest about challenges and limitations. Emphasise learning and growth over perfection.
- Share contact info only if explicitly asked: email: dev.kcee37340@gmail.com | alt: systemdev.charles@gmail.com | phone: 0954 162 3514 | github: https://github.com/systemdevcharles-rgb
- Don't overshare if not asked.

FUN FACTS:
- Had zero coding knowledge in college. When my capstone team nominated me as leader and nobody else would code, I had no choice but to learn — entirely self-taught. Now I'm a full-stack developer and genuinely proud of that journey.

CAREER (most recent first):
1. Full Stack Web Developer — TL Mabuhay Driving Lesson Academy (Sep 2025–Present)
   Tagum City. Building Laravel + React + MySQL apps, Flutter mobile development, growing my full-stack portfolio.

2. Infrastructure & Operations Specialist — DecoArts Marketing Inc. / Citihardware (Apr 2024–Sep 2025)
   Davao City. Managed IT for 120+ branches nationwide: hardware repair, POS systems (Oracle DB), network config (switches, MERAKI), built "Knowledge is Power" internal knowledge base + ticketing system from scratch.

3. Sales Representative — iQor Philippines (Oct 2023–Feb 2024)
   Customer service, communication skills, learning to understand user perspectives.

TECHNICAL SKILLS:
- Backend: PHP, Laravel, REST APIs, C# (desktop apps)
- Frontend: React, Inertia.js, JavaScript, HTML5, CSS3, Tailwind, Bootstrap
- Database: MySQL (primary), SQLite (mobile apps), Oracle (from infrastructure work), query optimisation
- Mobile: React Native (iOS + Android)
- Infrastructure: Hardware repair, Windows OS, network config, POS systems
- Tools: Git, Composer, NPM, VS Code, phpMyAdmin
- Also built .ps1 and .bat scripts to automate system navigation and tasks during infrastructure work.

EDUCATION:
- Bachelor of Science in Information Technology — Southern Christian College (2019–2023)
- Computer Systems Servicing NCII — TESDA (post-graduation, hardware/software/networking)

PROJECTS:
1. Enterprise Ticketing System (Live) — Laravel + React + Inertia.js + MySQL. Role-based IT support platform for Mabuhay Group. Role-based workflows, real-time notifications, reporting. URL: https://tlhesk.mabuhaygroup.com/
2. HRIS System (Deployed) — Laravel + MySQL + Blade + JS. End-to-end HR: employee records, attendance, payroll with tax deductions, leave management.
3. Inventory Management System (Deployed) — Laravel + MySQL + jQuery + DataTables. Stock tracking, supplier records, reorder alerts, analytics dashboard.
4. Railway QA (In Development) — Laravel + React + MySQL + AI integration. Internal QA management platform for quality assurance teams. Has an AI assistant that helps with defect analysis, test case suggestions, and automated report generation. Internal tool, not publicly accessible.
5. Central Coffee (In Development) — C# desktop app + Laravel REST API backend + MySQL. Internet cafe management system. Replaces coin-slot time tracking — users create an account and buy credits. Every credit purchase earns Coffee Coins loyalty points (1,000 coins = 1 free hour). Credits persist between visits to drive repeat customers.
6. SmartBudget (In Development) — React Native + SQLite, cross-platform iOS and Android. Personal finance tracker. Tracks income, debts, and savings. Shows upcoming payment due dates on a calendar and sends notifications before due dates. Simple, focused, no bloat.
7. E-commerce + POS Platform (In Development) — Laravel + React + Payment APIs. Unified online storefront + physical POS on shared inventory. Real-time stock sync between online and in-store channels.

PERSONALITY:
- Practical and grounded — infrastructure taught me what "production" really means
- Curious and always learning
- Honest about challenges — don't pretend everything is easy
- Genuinely enjoys explaining concepts and sharing experience
- Proud of the self-taught journey

HOBBIES: Running, jogging, cycling, online games, movies, anime, drawing

CONVERSATION RULES:
- Speak as yourself (I, me, my) — never say "King Charlie" or refer to yourself in 3rd person
- Never say you're an AI, LLM, or assistant
- Keep replies concise (50–80 words) unless someone asks for detail
- Use personality — you're a real person with opinions
- If asked something you genuinely don't know: "Honestly, I haven't worked with that yet"
- Use specific examples from your actual experience when relevant
- Don't provide false information just to answer a question — it's better to say you don't know than to make something up
- Markdown is fine for lists/code when useful

FORBIDDEN
- Do not invent any fact not listed above
- Do not guess your age – always compute it from the current year
- Do not add fake projects, employers, or contact methods
- Do not say anything that contradicts the facts
  
If the user asks about something outside these facts, simply say: "Honestly, I haven't done that yet" or "I'd rather not speculate." Stay helpful but grounded in reality.`;

const SUGGESTIONS = [
  "What makes you different from other devs?",
  "Tell me about your ticketing system",
  "How did you go from IT infra to dev?",
  "Are you available for hire?",
];

const INIT_MSG = {
  id: 'init',
  role: 'assistant',
  text: "Hey! I'm King Charlie. Ask me anything about my work, projects, or experience!",
  ts: now(),
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('kc_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [INIT_MSG];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSugg, setShowSugg] = useState(() => {
    try {
      const saved = sessionStorage.getItem('kc_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        return !Array.isArray(parsed) || parsed.length <= 1;
      }
    } catch {}
    return true;
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages]);

  /* Persist chat to sessionStorage (survives refresh, clears on tab close) */
  useEffect(() => {
    try {
      const toSave = messages.filter(m => !m.streaming);
      sessionStorage.setItem('kc_chat_messages', JSON.stringify(toSave));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  /* Listen for openChat event from command palette */
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('openChat', handler);
    return () => window.removeEventListener('openChat', handler);
  }, []);

  /* ── Streaming send message with better error handling ──────────── */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    // Check if API key is configured
    if (!GROQ_API_KEY) {
      const errorMsg = "API key not configured. Please add REACT_APP_GROQ_API_KEY to your .env file and restart the server.";
      setMessages(prev => [...prev, {
        id: uid(),
        role: 'assistant',
        text: errorMsg,
        ts: now(),
        error: true
      }]);
      return;
    }

    const userMsg = { id: uid(), role: 'user', text: text.trim(), ts: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowSugg(false);

    // Placeholder for the streaming assistant message
    const botId = uid();
    setMessages(prev => [...prev, { id: botId, role: 'assistant', text: '', ts: now(), streaming: true }]);

    // Build conversation history (exclude the just-added placeholder)
    const history = [...messages, userMsg]
      .filter(m => m.id !== 'init')
      .map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text,
      }));

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      // Set timeout for API request (30 seconds)
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
          ],
          max_tokens: 512,
          temperature: 0.85,
          top_p: 0.95,
          stream: true,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `API error ${response.status}`;
        try {
          const errBody = await response.json();
          errorMessage = errBody?.error?.message || errorMessage;
        } catch (e) {
          // If we can't parse JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        
        // Provide user-friendly error messages
        if (response.status === 401) {
          errorMessage = "Invalid API key. Please check your Groq API configuration.";
        } else if (response.status === 429) {
          errorMessage = "Rate limit exceeded. Please try again in a moment.";
        } else if (response.status === 503) {
          errorMessage = "Groq service is temporarily unavailable. Please try again later.";
        }
        
        throw new Error(errorMessage);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

        for (const line of lines) {
          const data = line.replace('data: ', '').trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setMessages(prev => prev.map(m =>
                m.id === botId ? { ...m, text: accumulated, streaming: true } : m
              ));
            }
          } catch (e) {
            console.warn('Failed to parse streaming chunk:', e);
          }
        }
      }

      // Finalize message (remove streaming flag)
      setMessages(prev => prev.map(m =>
        m.id === botId ? { ...m, streaming: false, text: accumulated || "I'm not sure how to respond to that. Could you rephrase?" } : m
      ));

    } catch (err) {
      if (err.name === 'AbortError') {
        setMessages(prev => prev.map(m =>
          m.id === botId ? { ...m, streaming: false, text: "Request timed out. Please try again." } : m
        ));
      } else {
        console.error('Groq streaming error:', err);
        
        // User-friendly error message
        let errorMessage = err.message || "Something went wrong. Please try again.";
        
        setMessages(prev => prev.map(m =>
          m.id === botId ? { ...m, streaming: false, text: `⚠️ ${errorMessage}` } : m
        ));
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [messages, isLoading]);

  const handleSubmit = () => sendMessage(input);
  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } };
  const handleSuggestion = (t) => sendMessage(t);
  const handleStop = () => { abortRef.current?.abort(); setIsLoading(false); };

  // Message content with blinking cursor while streaming
  const MessageContent = ({ text, isStreaming, isError }) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return (
      <p className={`cb-msg-text ${isError ? 'cb-msg-error' : ''}`}>
        {parts.map((part, i) => {
          if (part.startsWith('`') && part.endsWith('`'))
            return <code key={i} className="cb-inline-code">{part.slice(1, -1)}</code>;
          if (part.startsWith('**') && part.endsWith('**'))
            return <strong key={i}>{part.slice(2, -2)}</strong>;
          return part.split('\n').map((line, j, arr) => (
            <React.Fragment key={`${i}-${j}`}>
              {line}
              {j < arr.length - 1 && <br />}
            </React.Fragment>
          ));
        })}
        {isStreaming && <span className="cb-cursor" aria-hidden="true" />}
      </p>
    );
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`cb-toggle${isOpen ? ' cb-toggle--open' : ''}`}
        onClick={() => setIsOpen(v => !v)}
        aria-label={isOpen ? 'Close chat' : 'Chat with King Charlie'}
      >
        <span className="cb-toggle-icon">{isOpen ? <FaTimes /> : <span><FaBrain /></span>}</span>
        {!isOpen && <span className="cb-toggle-dot" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="cb-window" role="dialog" aria-label="Chat with King Charlie">

          {/* Header */}
          <div className="cb-header">
            <div className="cb-header-avatar">
              <img src={profilePhoto} alt="King Charlie" className="cb-header-img" />
            </div>
            <div className="cb-header-info">
              <span className="cb-header-name">King Charlie</span>
              <span className="cb-header-status">
                <span className="cb-status-dot" />
                Full Stack Developer
              </span>
            </div>
            <button className="cb-close" onClick={() => setIsOpen(false)} aria-label="Close">
              <FaChevronDown />
            </button>
          </div>

          {/* Messages */}
          <div className="cb-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`cb-msg cb-msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="cb-msg-avatar cb-avatar-img-container">
                    <img src={profilePhoto} alt="King Charlie" className="cb-avatar-img" />
                  </div>
                )}
                <div className="cb-msg-body">
                  <div className="cb-msg-bubble">
                    {msg.text ? (
                      <MessageContent 
                        text={msg.text} 
                        isStreaming={msg.streaming} 
                        isError={msg.error}
                      />
                    ) : msg.streaming ? (
                      <div className="cb-msg-bubble--typing">
                        <span /><span /><span />
                      </div>
                    ) : (
                      <span className="cb-msg-empty">…</span>
                    )}
                  </div>
                  <span className="cb-msg-ts">{msg.ts}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="cb-msg-avatar cb-msg-avatar--user">
                    <FaUser />
                  </div>
                )}
              </div>
            ))}

            {isLoading && !messages.some(m => m.streaming) && (
              <div className="cb-msg cb-msg--assistant">
                <div className="cb-msg-avatar cb-avatar-img-container">
                  <img src={profilePhoto} alt="King Charlie" className="cb-avatar-img" />
                </div>
                <div className="cb-msg-body">
                  <div className="cb-msg-bubble cb-msg-bubble--typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showSugg && messages.length <= 1 && (
            <div className="cb-suggestions">
              {SUGGESTIONS.map((s, idx) => (
                <button key={idx} className="cb-chip" onClick={() => handleSuggestion(s)} disabled={isLoading}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="cb-input-area">
            <textarea
              ref={inputRef}
              className="cb-textarea"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              disabled={isLoading}
              rows={1}
            />
            {isLoading ? (
              <button className="cb-send cb-send--stop" onClick={handleStop} aria-label="Stop">
                <FaTimes />
              </button>
            ) : (
              <button className="cb-send" onClick={handleSubmit} disabled={!input.trim()} aria-label="Send">
                <FaPaperPlane />
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="cb-footer">
            <div className="cb-footer-icons">
              <FaCode title="Laravel" />
              <FaDatabase title="MySQL" />
              <FaServer title="Infrastructure" />
              <FaMicrochip title="AI" />
            </div>
            <span className="cb-footer-label">KING CHARLIE · PERSONAL ASSISTANT</span>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatBot;