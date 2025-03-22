import { useState, useEffect } from 'react';

const usePetStatus = () => {
  const [hungerStatus, setHungerStatus] = useState('Full');
  const [happinessStatus, setHappinessStatus] = useState('Happy');
  const [cleanlinessStatus, setCleanlinessStatus] = useState('Clean');
  const [timer, setTimer] = useState(null);  // To track the timer

  useEffect(() => {
    // Timer LETS ME EXECUTE MY FUNCTION REPEATEDLY AT THE SPECIFIED INTERVAL
    const interval = setInterval(() => {
      setHungerStatus(prev => (prev === 'Full' ? 'Hungry' : prev === 'Hungry' ? 'Starving' : 'Starving'));
      setHappinessStatus(prev => (prev === 'Happy' ? 'Bored' : prev === 'Bored' ? 'Sad' : 'Sad'));
      setCleanlinessStatus(prev => (prev === 'Clean' ? 'Dirty' : prev === 'Dirty' ? 'Filthy' : 'Filthy'));
    }, 30000);  // Updates every 30 seconds

    // Cleanup interval when component unmounts TO AVOID MEMORY LEAKS 
    return () => clearInterval(interval);
  }, []);

  // reset the timer 
  const resetTimer = () => {
    // Clear the current interval
    if (timer) {
      clearInterval(timer);
    }

    // Start a new interval 
    const newTimer = setInterval(() => {
      setHungerStatus(prev => (prev === 'Full' ? 'Hungry' : prev === 'Hungry' ? 'Starving' : 'Starving'));
      setHappinessStatus(prev => (prev === 'Happy' ? 'Bored' : prev === 'Bored' ? 'Sad' : 'Sad'));
      setCleanlinessStatus(prev => (prev === 'Clean' ? 'Dirty' : prev === 'Dirty' ? 'Filthy' : 'Filthy'));
    }, 20000);  

  
    setTimer(newTimer);
  };


  const feedPet = () => {
    setHungerStatus('Full');
    resetTimer(); 
  };

  const playWithPet = () => {
    setHappinessStatus('Happy');
    resetTimer(); 
  };

  const cleanPet = () => {
    setCleanlinessStatus('Clean');
    resetTimer(); 
  };

  return {
    hungerStatus,
    happinessStatus,
    cleanlinessStatus,
    feedPet,
    playWithPet,
    cleanPet,
  };
};

export default usePetStatus;

