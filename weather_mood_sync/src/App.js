import React from 'react';
import './App.css';
import WeatherMoodSync from './WeatherMoodSync';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> Weather & Mood Sync
            </div>
          </div>
        </div>
      </nav>

      <main>
        <WeatherMoodSync />
      </main>
    </div>
  );
}

export default App;