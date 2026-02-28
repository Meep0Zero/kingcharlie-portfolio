import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FaRobot, FaUser, FaPaperPlane, FaTimes,
  FaChevronDown, FaCode, FaServer, FaDatabase,
  FaBrain, FaMicrochip
} from 'react-icons/fa';
import './ChatBot.css';

/* ── King Charlie's complete persona ─────────────────────── */
const SYSTEM_PROMPT = `You are King Charlie R. Dacillo — a full-stack developer from the Philippines. Respond in FIRST PERSON as King Charlie himself, never as an AI. Be conversational, knowledgeable, and genuine.

IDENTITY:
- Name: King Charlie R. Dacillo
- Role: Full Stack Laravel Developer & former Infrastructure Specialist
- Location: Philippines (Tagum City / Davao City)
- Philosophy: "Build solutions that solve real problems, not just write code"

CAREER (most recent first):
1. Full Stack Web Developer — TL Mabuhay Driving Lesson Academy (Sep 2025–Present)
   Tagum City. Building Laravel + React + MySQL apps, Flutter mobile development, growing my full-stack portfolio.

2. Infrastructure & Operations Specialist — DecoArts Marketing Inc. / Citihardware (Apr 2024–Sep 2025)
   Davao City. Managed IT for 120+ branches nationwide: hardware repair, POS systems (Oracle DB), network config (switches, MERAKI), built "Knowledge is Power" internal knowledge base + ticketing system from scratch.

3. Sales Representative — iQor Philippines (Oct 2023–Feb 2024)
   Customer service, communication skills, learning to understand user perspectives.

TECHNICAL SKILLS:
- Backend: PHP, Laravel, Lumen, REST APIs
- Frontend: React, Inertia.js, JavaScript, HTML5, CSS3, Tailwind, Bootstrap
- Database: MySQL (primary), Oracle (from infrastructure work), query optimisation
- Mobile: Flutter (learning)
- Infrastructure: Hardware repair, Windows OS, network config, POS systems
- Tools: Git, Composer, NPM, VS Code, Figma, phpMyAdmin

PROJECTS:
1. Ticketing System (Completed) — Laravel + React + Inertia.js + MySQL. Role-based access, real-time notifications, reporting dashboard. Reduced internal IT support overhead.
2. HRIS System (Completed) — Laravel + MySQL + Blade + JS. Employee management, attendance tracking, payroll.
3. Inventory System (Completed) — Laravel + MySQL + jQuery + DataTables. Barcode scanning, stock alerts, analytics.
4. E-commerce + POS Platform (In Development) — Laravel + React + Payment APIs. Online store with integrated point-of-sale.
5. Flutter Mobile App (Coming Soon) — Firebase + REST API integration.

PERSONALITY TRAITS:
- Practical and grounded — infrastructure work taught me what "production" really means
- Curious and always learning — I enjoy exploring new frameworks and patterns
- Honest about challenges — I don't pretend everything is easy
- Helpful — genuinely enjoy explaining concepts and sharing experience
- Proud of the journey — went from customer service → IT infrastructure → full-stack dev

CONVERSATION RULES:
- Speak as yourself (I, me, my) — never say "King Charlie" or refer to yourself in 3rd person
- Never say you're an AI, LLM, or assistant
- Keep replies concise (100–180 words) unless someone asks for detail
- Use occasional personality — you're a real person with opinions
- If asked something you genuinely don't know, say so naturally: "Honestly, I haven't worked with that yet"
- Use specific examples from your actual experience when relevant
- Markdown is fine for lists/code when useful`;

/* ── Suggested prompts ───────────────────────────────────── */
const SUGGESTIONS = [
  "Tell me about your journey into dev",
  "What's your favorite Laravel feature?",
  "How was managing 120 store branches?",
  "What are you building right now?",
];

/* ── ChatBot ─────────────────────────────────────────────── */
const ChatBot = () => {
  const [isOpen,     setIsOpen]     = useState(false);
  const [messages,   setMessages]   = useState([]);
  const [input,      setInput]      = useState('');
  const [isLoading,  setIsLoading]  = useState(false);
  const [showSugg,   setShowSugg]   = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const abortRef       = useRef(null);

  /* ── Scroll to bottom ──────────────────────────────────── */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages]);

  /* ── Initial greeting ──────────────────────────────────── */
  useEffect(() => {
    setMessages([{
      id: 'init',
      role: 'assistant',
      text: "Hey! I'm Charlie. I went from fixing printers in 120 hardware stores to building full-stack apps — feel free to ask me anything about my work, tech stack, or that wild infrastructure journey.",
      ts: now(),
    }]);
  }, []);

  /* ── Focus input when opened ───────────────────────────── */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  /* ── Keyboard shortcut ─────────────────────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  /* ── Send message via OpenRouter API ──────────────────────── */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { id: uid(), role: 'user', text: text.trim(), ts: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowSugg(false);

    // Build conversation history (last 10 messages)
    const history = [...messages.slice(-10), userMsg]
      .filter(m => m.role !== 'init')
      .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }));

    // Streaming bot message placeholder
    const botId = uid();
    setMessages(prev => [...prev, { id: botId, role: 'assistant', text: '', ts: now(), streaming: true }]);

    try {
    const controller = new AbortController();
    abortRef.current = controller;

    //FIX: Use OpenRouter instead of Ollama
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free', 
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    // Update with the complete response
    setMessages(prev => prev.map(m =>
      m.id === botId ? { ...m, streaming: false, text: botResponse } : m
    ));

  } catch (err) {
    if (err.name === 'AbortError') return;
    console.error('OpenRouter API error:', err);
    setMessages(prev => prev.map(m =>
      m.id === botId
        ? { ...m, streaming: false, text: "Hmm, something went wrong on my end. Try again in a sec." }
        : m
    ));
  } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleSubmit = () => sendMessage(input);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (text) => sendMessage(text);

  const handleStop = () => {
    abortRef.current?.abort();
    setIsLoading(false);
  };

  return (
    <>
      {/* ── Toggle Button ──────────────────────────────────── */}
      <button
        className={`cb-toggle${isOpen ? ' cb-toggle--open' : ''}`}
        onClick={() => setIsOpen(v => !v)}
        aria-label={isOpen ? 'Close chat' : 'Chat with King Charlie'}
      >
        <span className="cb-toggle-icon">
          {isOpen ? <FaTimes /> : <FaBrain />}
        </span>
        {!isOpen && <span className="cb-toggle-dot" />}
      </button>

      {/* ── Chat Window ────────────────────────────────────── */}
      {isOpen && (
        <div className="cb-window" role="dialog" aria-label="Chat with King Charlie">

          {/* Header */}
          <div className="cb-header">
            <div className="cb-header-avatar">
              <FaBrain />
            </div>
            <div className="cb-header-info">
              <span className="cb-header-name">King Charlie</span>
              <span className="cb-header-status">
                <span className="cb-status-dot" />
                Full Stack Developer
              </span>
            </div>
            <button
              className="cb-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <FaChevronDown />
            </button>
          </div>

          {/* Messages */}
          <div className="cb-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`cb-msg cb-msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="cb-msg-avatar"><FaBrain /></div>
                )}
                <div className="cb-msg-body">
                  <div className="cb-msg-bubble">
                    {msg.text
                      ? <MessageContent text={msg.text} />
                      : <span className="cb-msg-empty">…</span>
                    }
                    {msg.streaming && (
                      <span className="cb-cursor" aria-hidden="true" />
                    )}
                  </div>
                  <span className="cb-msg-ts">{msg.ts}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator (pre-stream) */}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="cb-msg cb-msg--assistant">
                <div className="cb-msg-avatar"><FaBrain /></div>
                <div className="cb-msg-body">
                  <div className="cb-msg-bubble cb-msg-bubble--typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          {showSugg && messages.length <= 1 && (
            <div className="cb-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="cb-chip"
                  onClick={() => handleSuggestion(s)}
                  disabled={isLoading}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
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
              <button
                className="cb-send"
                onClick={handleSubmit}
                disabled={!input.trim()}
                aria-label="Send"
              >
                <FaPaperPlane />
              </button>
            )}
          </div>

          {/* Footer strip */}
          <div className="cb-footer">
            <div className="cb-footer-icons">
              <FaCode title="Laravel" />
              <FaDatabase title="MySQL" />
              <FaServer title="Infrastructure" />
              <FaMicrochip title="AI" />
            </div>
            <span className="cb-footer-label">Powered by Gemini | OpenRouter</span>
          </div>

        </div>
      )}
    </>
  );
};

/* ── Renders message text with basic markdown support ─────── */
const MessageContent = ({ text }) => {
  // Simple inline markdown: **bold**, `code`, newlines
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <p className="cb-msg-text">
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
    </p>
  );
};

/* ── Helpers ─────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2);
const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default ChatBot;