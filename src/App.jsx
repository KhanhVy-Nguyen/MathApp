import React, { useState, useEffect } from 'react';
import LampInteractive from './components/LampInteractive';
import RegistrationForm from './components/RegistrationForm';
import MathDashboard from './components/MathDashboard';
import './App.css';

function App() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [userName, setUserName] = useState(null); // null means not registered

  const toggleLight = () => {
    setIsLightOn(prev => !prev);
  };

  useEffect(() => {
    if (isLightOn) {
      document.body.classList.add('light-on');
    } else {
      document.body.classList.remove('light-on');
    }
  }, [isLightOn]);

  const handleRegister = (name) => {
    setUserName(name);
  };

  // If user is registered, show the Math Dashboard
  if (userName) {
    return <MathDashboard userName={userName} />;
  }

  // Otherwise, show the Registration Landing Page
  return (
    <div className="app-container">
      <div className="left-panel">
        <LampInteractive isLightOn={isLightOn} toggleLight={toggleLight} />
      </div>
      
      <div className="right-panel">
        {isLightOn && (
          <RegistrationForm onRegister={handleRegister} />
        )}
      </div>
    </div>
  );
}

export default App;
