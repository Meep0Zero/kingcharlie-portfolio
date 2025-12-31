import React from 'react';
import ChatBot from './components/ChatBot';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <Experience />
       <Projects/>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
