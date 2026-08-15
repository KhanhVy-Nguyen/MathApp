import React, { useState } from 'react';
import './LampInteractive.css';

const LampInteractive = ({ isLightOn, toggleLight }) => {
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = () => {
    setIsPulling(true);
    setTimeout(() => {
      toggleLight();
      setIsPulling(false);
    }, 300); // Wait for the pull animation to finish
  };

  return (
    <div className="lamp-container">
      {/* The wire hanging from the ceiling */}
      <div className="lamp-wire"></div>
      
      {/* The lamp shade */}
      <div className={`lamp-shade ${isLightOn ? 'on' : ''}`}>
        <div className="lamp-bulb"></div>
      </div>
      
      {/* The pull chain */}
      <div 
        className={`pull-chain ${isPulling ? 'pulling' : ''}`} 
        onClick={handlePull}
      >
        <div className="chain-link"></div>
        <div className="chain-link"></div>
        <div className="chain-link"></div>
        <div className="chain-link"></div>
        <div className="chain-link"></div>
        <div className="chain-handle"></div>
      </div>
    </div>
  );
};

export default LampInteractive;
