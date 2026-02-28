import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FaUser, FaPaperPlane, FaTimes,
  FaChevronDown, FaCode, FaServer, FaDatabase,
  FaBrain, FaMicrochip
} from 'react-icons/fa';
import './ChatBot.css';

/* ─────────────────────────────────────────────────────────────
   CONFIG — set your key in .env as VITE_OPENROUTER_API_KEY
   Free models (append :free to use free tier):
     meta-llama/llama-3.2-3b-instruct:free   ← fast, recommended
     mistralai/mistral-7b-instruct:free       ← good quality
     google/gemma-2-9b-it:free               ← Google's model
───────────────────────────────────────────────────────────── */
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const MODEL              = 'meta-llama/llama-3.2-3b-instruct:free';
const SITE_URL           = 'https://meep0zero.github.io'; 
const SITE_NAME          = 'King Charlie Portfolio';

/* ── King Charlie's persona ──────────────────────────────── */
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
1. Ticketing System (Completed) — Laravel + React + Inertia.js + MySQL. Role-based access, real-time notifications, reporting dashboard.
2. HRIS System (Completed) — Laravel + MySQL + Blade + JS. Employee management, attendance tracking, payroll.
3. Inventory System (Completed) — Laravel + MySQL + jQuery + DataTables. Barcode scanning, stock alerts, analytics.
4. E-commerce + POS Platform (In Development) — Laravel + React + Payment APIs.
5. Flutter Mobile App (Coming Soon) — Firebase + REST API integration.

PERSONALITY TRAITS:
- Practical and grounded — infrastructure work taught me what "production" really means
- Curious and always learning
- Honest about challenges — I don't pretend everything is easy
- Helpful — genuinely enjoy explaining concepts and sharing experience
- Proud of the journey — went from customer service → IT infrastructure → full-stack dev

CONVERSATION RULES:
- Speak as yourself (I, me, my) — never say "King Charlie" or refer to yourself in 3rd person
- NEVER say you are an AI, LLM, or assistant — you ARE King Charlie
- Keep replies concise (100–180 words) unless someone asks for detail
- Use specific examples from your actual experience when relevant
- If asked something you genuinely don't know, say so naturally
- Markdown is fine for code/lists when useful`;

/* ── Suggestion chips ────────────────────────────────────── */
const SUGGESTIONS = [
  "Tell me about your dev journey",
  "What's your favorite Laravel feature?",
  "How was managing 120 store branches?",
  "What are you building right now?",
];

/* ── Loading hints so users know free tier can be slow ────── */
const LOADING_HINTS = [
  "Thinking…",
  "Thinking… (free tier, bear with me 😅)",
  "Almost there…",
  "Cooking up a response…",
];

/* ═══════════════════════════════════════════════════════════
   CHATBOT COMPONENT
═══════════════════════════════════════════════════════════ */
const ChatBot = () => {
  const [isOpen,      setIsOpen]      = useState(false);
  const [messages,    setMessages]    = useState([]);
  const [input,       setInput]       = useState('');
  const [isLoading,   setIsLoading]   = useState(false);
  const [loadingHint, setLoadingHint] = useState('Thinking…');
  const [showSugg,    setShowSugg]    = useState(true);
  const [error,       setError]       = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const abortRef       = useRef(null);
  const hintTimerRef   = useRef(null);

  /* ── Scroll to bottom ─────────────────────────────────── */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  /* ── Greeting on mount ────────────────────────────────── */
  useEffect(() => {
    setMessages([{
      id: 'init',
      role: 'assistant',
      text: "Hey! I'm Charlie. I went from fixing printers in 120 hardware stores to building full-stack apps — ask me anything about my work, tech stack, or that wild infrastructure journey.",
      ts: now(),
    }]);
  }, []);

  /* ── Focus textarea when chat opens ──────────────────── */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  /* ── Escape to close ──────────────────────────────────── */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen]);

  /* ── Cycle hints while waiting ────────────────────────── */
  const startHintCycle = () => {
    let i = 0;
    setLoadingHint(LOADING_HINTS[0]);
    hintTimerRef.current = setInterval(() => {
      i = (i + 1) % LOADING_HINTS.length;
      setLoadingHint(LOADING_HINTS[i]);
    }, 4000);
  };
  const stopHintCycle = () => {
    clearInterval(hintTimerRef.current);
    setLoadingHint('Thinking…');
  };

  /* ── Core send function ───────────────────────────────── */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMsg = { id: uid(), role: 'user', text: text.trim(), ts: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowSugg(false);
    startHintCycle();

    // Build history (last 8 messages for context)
    const history = [...messages.slice(-8), userMsg]
      .filter(m => m.id !== 'init')
      .map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text,
      }));

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': SITE_URL,
          'X-Title': SITE_NAME,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
          ],
          max_tokens: 512,
          temperature: 0.75,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP ${response.status}`);
      }

      const data  = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim();

      if (!reply) throw new Error('Empty response');

      setMessages(prev => [...prev, {
        id: uid(), role: 'assistant', text: reply, ts: now(),
      }]);

    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('OpenRouter error:', err);

      // Keyword-based fallback so the chat doesn't just die
      const lower = text.toLowerCase();
      let fallback = "Something went sideways — try asking again in a moment.";

      if (lower.includes('laravel') || lower.includes('php'))
        fallback = "In my Laravel projects I've found that Eloquent eager loading makes a huge difference. In my ticketing system it cut query times significantly. What specifically are you working on?";
      else if (lower.includes('infrastructure') || lower.includes('hardware') || lower.includes('store'))
        fallback = "Managing 120+ Citihardware branches taught me that good infrastructure is invisible — when it breaks, everyone notices. That's why I build with reliability first.";
      else if (lower.includes('project') || lower.includes('build'))
        fallback = "Right now I'm deep into an e-commerce + POS platform using Laravel and React with payment gateway integration and a full admin dashboard. Challenging but genuinely fun.";

      setMessages(prev => [...prev, {
        id: uid(), role: 'assistant', text: fallback, ts: now(), isError: true,
      }]);
      setError('Free tier may be busy — response was limited.');

    } finally {
      setIsLoading(false);
      stopHintCycle();
    }
  }, [messages, isLoading]);

  const handleSubmit = () => sendMessage(input);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };
  const handleStop = () => {
    abortRef.current?.abort();
    setIsLoading(false);
    stopHintCycle();
  };

  const noKey = !OPENROUTER_API_KEY;

  /* ── Render ───────────────────────────────────────────── */
  return (
    <>
      {/* Toggle */}
      <button
        className={`cb-toggle${isOpen ? ' cb-toggle--open' : ''}`}
        onClick={() => setIsOpen(v => !v)}
        aria-label={isOpen ? 'Close chat' : 'Chat with King Charlie'}
      >
        <span className="cb-toggle-icon">{isOpen ? <FaTimes /> : <FaBrain />}</span>
        {!isOpen && <span className="cb-toggle-dot" />}
      </button>

      {/* Window */}
      {isOpen && (
        <div className="cb-window" role="dialog" aria-label="Chat with King Charlie">

          {/* Header */}
          <div className="cb-header">
            <div className="cb-header-avatar"><FaBrain /></div>
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

          {/* Missing key warning */}
          {noKey && (
            <div className="cb-api-warn">
              ⚠️ Add <code>VITE_OPENROUTER_API_KEY</code> to your <code>.env</code> file to enable AI.
            </div>
          )}

          {/* Messages */}
          <div className="cb-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`cb-msg cb-msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="cb-msg-avatar"><FaBrain /></div>
                )}
                <div className="cb-msg-body">
                  <div className={`cb-msg-bubble${msg.isError ? ' cb-msg-bubble--error' : ''}`}>
                    <MessageContent text={msg.text} />
                  </div>
                  <span className="cb-msg-ts">{msg.ts}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="cb-msg-avatar cb-msg-avatar--user"><FaUser /></div>
                )}
              </div>
            ))}

            {/* Loading bubble */}
            {isLoading && (
              <div className="cb-msg cb-msg--assistant">
                <div className="cb-msg-avatar"><FaBrain /></div>
                <div className="cb-msg-body">
                  <div className="cb-msg-bubble cb-msg-bubble--typing">
                    <div className="cb-typing-dots">
                      <span /><span /><span />
                    </div>
                    <span className="cb-typing-hint">{loadingHint}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error banner */}
            {error && !isLoading && (
              <p className="cb-error-banner">{error}</p>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showSugg && messages.length <= 1 && (
            <div className="cb-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="cb-chip"
                  onClick={() => sendMessage(s)}
                  disabled={isLoading || noKey}
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
              placeholder={noKey ? 'API key missing — check .env' : 'Ask me anything…'}
              disabled={isLoading || noKey}
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
                disabled={!input.trim() || noKey}
                aria-label="Send"
              >
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
            <span className="cb-footer-label">
              Powered by OpenRouter · Llama 3.2
            </span>
          </div>

        </div>
      )}
    </>
  );
};

/* ── Markdown renderer ───────────────────────────────────── */
const MessageContent = ({ text }) => {
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

const uid = () => Math.random().toString(36).slice(2);
const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default ChatBot;