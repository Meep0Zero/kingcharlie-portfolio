import React from 'react';
import { HashRouter } from 'react-router-dom';
import ChatBot from './components/ChatBot';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Hero />
      <ChatBot />
    </HashRouter>
  );
}

export default App;
