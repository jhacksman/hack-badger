import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import honeyBadgerSprite from './assets/sprites/honey_badger.png';
import lightbulbSprite from './assets/sprites/lightbulb.png';
import gliderSprite from './assets/sprites/glider.png';
import glidermakerSprite from './assets/sprites/glidermaker.png';
import mothershipSprite from './assets/sprites/mothership.png';
import './index.css';

const Game = () => {
  const [lightbulbs, setLightbulbs] = useState(0);
  const [gliders, setGliders] = useState(0);
  const [hackerspaces, setHackerspaces] = useState(0);
  const [location, setLocation] = useState('basement');

  useEffect(() => {
    const savedGame = Cookies.getJSON('hack_badger_game');
    if (savedGame) {
      setLightbulbs(savedGame.lightbulbs || 0);
      setGliders(savedGame.gliders || 0);
      setHackerspaces(savedGame.hackerspaces || 0);
      setLocation(savedGame.location || 'basement');
    }
  }, []);

  useEffect(() => {
    Cookies.set('hack_badger_game', { lightbulbs, gliders, hackerspaces, location });
  }, [lightbulbs, gliders, hackerspaces, location]);

  const generateIdea = () => {
    setLightbulbs(lightbulbs + 1);
  };

  const convertToHacker = () => {
    if (lightbulbs >= 10) {
      setLightbulbs(lightbulbs - 10);
      setGliders(gliders + 1);
    }
  };

  const createHackerspace = () => {
    if (gliders >= 5) {
      setGliders(gliders - 5);
      setHackerspaces(hackerspaces + 1);
    }
  };

  const upgradeLocation = () => {
    if (hackerspaces >= 3) {
      setHackerspaces(hackerspaces - 3);
      setLocation('garage');
    }
  };

  return (
    <div className="container">
      <div className="location">
        <motion.img
          src={honeyBadgerSprite}
          alt="Honey Badger"
          className="sprite"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, loop: Infinity }}
        />
        <h1>{location}</h1>
      </div>
      <div className="labels">
        <p className="text-element">Ideas: {lightbulbs}</p>
        <p className="text-element">Hackers: {gliders}</p>
        <p className="text-element">Hackerspaces: {hackerspaces}</p>
      </div>
      <button onClick={generateIdea}>Generate Idea</button>
      <button onClick={convertToHacker} disabled={lightbulbs < 10}>Convert to Hacker</button>
      <button onClick={createHackerspace} disabled={gliders < 5}>Create Hackerspace (Glider Factory)</button>
      <button onClick={upgradeLocation} disabled={hackerspaces < 3}>Evolve Location</button>
    </div>
  );
};

export default Game;
