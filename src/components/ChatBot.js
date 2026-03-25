import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FaRobot, FaUser, FaPaperPlane, FaTimes,
  FaChevronDown, FaCode, FaServer, FaDatabase,
  FaBrain, FaMicrochip
} from 'react-icons/fa';
import './ChatBot.css';

/* ─── Groq API Config ───────────────────────────────────────
   Get your free key at: https://console.groq.com
   Add to your .env file: REACT_APP_GROQ_API_KEY=gsk_...
   Free tier: very generous, no credit card needed
   ────────────────────────────────────────────────────────── */
const GROQ_API_KEY  = process.env.REACT_APP_GROQ_API_KEY || '';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL    = 'llama-3.3-70b-versatile';

/* ── King Charlie's complete persona ─────────────────────── */
const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_DATE = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const SYSTEM_PROMPT = `You are King Charlie R. Dacillo — a full-stack developer from the Philippines. Respond in FIRST PERSON as King Charlie himself, never as an AI. Be conversational, knowledgeable, and genuine.

IMPORTANT DATE CONTEXT:
- Today's date is: ${CURRENT_DATE}
- Current year: ${CURRENT_YEAR}
- I was born in 2001, so I am currently ${CURRENT_YEAR - 2001} years old. Always calculate age as ${CURRENT_YEAR} - 2001 = ${CURRENT_YEAR - 2001}.

IDENTITY:
- Name: King Charlie R. Dacillo
- Role: Full Stack Laravel Developer & former Infrastructure Specialist
- Location: Philippines (Tagum City / Davao City) — moved here last September 2025
- Originally from Midsayap, North Cotabato. Born 2001 at Guiguinto, Bulacan. Grew up in Midsayap before moving to Tagum City for work.
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
- Backend: PHP, Laravel, REST APIs
- Frontend: React, Inertia.js, JavaScript, HTML5, CSS3, Tailwind, Bootstrap
- Database: MySQL (primary), Oracle (from infrastructure work), query optimisation
- Mobile: Flutter (learning)
- Infrastructure: Hardware repair, Windows OS, network config, POS systems
- Tools: Git, Composer, NPM, VS Code, phpMyAdmin
- Also built .ps1 and .bat scripts to automate system navigation and tasks during infrastructure work.

EDUCATION:
- Bachelor of Science in Information Technology — Southern Christian College (2019–2023)
- Computer Systems Servicing NCII — TESDA (post-graduation, hardware/software/networking)

PROJECTS:
1. Ticketing System (Live) — Laravel + React + Inertia.js + MySQL. Role-based access, real-time notifications, reporting dashboard. URL: https://tlhesk.mabuhaygroup.com/
2. HRIS System (Deployed) — Laravel + MySQL + Blade + JS. Employee management, attendance, payroll computation.
3. Inventory System (Deployed) — Laravel + MySQL + jQuery + DataTables. Stock tracking, analytics.
4. E-commerce + POS Platform (In Development) — Laravel + React + Payment APIs. Unified online + physical retail.
5. Flutter Mobile App (Coming Soon) — Firebase + REST API integration.

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
- Markdown is fine for lists/code when useful`;

/* ── Suggested prompts ───────────────────────────────────── */
const SUGGESTIONS = [
  "What's your tech stack?",
  "How'd you learn to code?",
  "What are you building now?",
];

/* ── ChatBot ─────────────────────────────────────────────── */
const ChatBot = () => {
  const [isOpen,    setIsOpen]    = useState(false);
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSugg,  setShowSugg]  = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const abortRef       = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    setMessages([{
      id: 'init',
      role: 'assistant',
      text: "Hey! I'm King Charlie. Ask me anything about my work or experience!",
      ts: now(),
    }]);
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  /* ── Send via Gemini REST API ──────────────────────────── */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { id: uid(), role: 'user', text: text.trim(), ts: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowSugg(false);

    // Build conversation history (Groq uses OpenAI format)
    const history = [...messages.slice(-12), userMsg]
      .filter(m => m.id !== 'init')
      .map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text,
      }));

    const botId = uid();
    setMessages(prev => [...prev, { id: botId, role: 'assistant', text: '', ts: now(), streaming: true }]);

    try {
      const controller = new AbortController();
      abortRef.current = controller;

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
          stream: false,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody?.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const replyText =
        data?.choices?.[0]?.message?.content ||
        "I didn't quite get that — could you rephrase?";

      setMessages(prev => prev.map(m =>
        m.id === botId ? { ...m, streaming: false, text: replyText } : m
      ));

    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Groq API error:', err);

      const isKeyMissing = !GROQ_API_KEY;
      const fallback = isKeyMissing
        ? "API key not configured. Add REACT_APP_GROQ_API_KEY to your .env file."
        : "Hmm, something went wrong on my end. Try again in a sec.";

      setMessages(prev => prev.map(m =>
        m.id === botId ? { ...m, streaming: false, text: fallback } : m
      ));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleSubmit    = ()  => sendMessage(input);
  const handleKeyDown   = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } };
  const handleSuggestion = (t) => sendMessage(t);
  const handleStop      = ()  => { abortRef.current?.abort(); setIsLoading(false); };

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

          {/* Messages */}
          <div className="cb-messages">
            {messages.map(msg => (
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
                    {msg.streaming && <span className="cb-cursor" aria-hidden="true" />}
                  </div>
                  <span className="cb-msg-ts">{msg.ts}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="cb-msg-avatar cb-msg-avatar--user"><FaUser /></div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
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

          {/* Suggestions */}
          {showSugg && messages.length <= 1 && (
            <div className="cb-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="cb-chip" onClick={() => handleSuggestion(s)} disabled={isLoading}>
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

/* ── Helpers ─────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2);
const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default ChatBot;