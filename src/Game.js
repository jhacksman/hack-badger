import React, { useState, useEffect } from 'react';
import { Box, Text } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import honeyBadgerSprite from './assets/sprites/honey_badger.png';
import lightbulbSprite from './assets/sprites/lightbulb.png';
import gliderSprite from './assets/sprites/glider.png';
import glidermakerSprite from './assets/sprites/glidermaker.png';
import mothershipSprite from './assets/sprites/mothership.png';

console.log('Honey Badger Sprite:', honeyBadgerSprite);
console.log('Lightbulb Sprite:', lightbulbSprite);
console.log('Glider Sprite:', gliderSprite);
console.log('Glidermaker Sprite:', glidermakerSprite);
console.log('Mothership Sprite:', mothershipSprite);

const Game = () => {
  const [lightbulbs, setLightbulbs] = useState(0);
  const [gliders, setGliders] = useState(0);
  const [hackerspaces, setHackerspaces] = useState(0);
  const [location, setLocation] = useState('basement');

  useEffect(() => {
    const savedGame = Cookies.get('hack_badger_game');
    if (savedGame) {
      const parsedGame = JSON.parse(savedGame);
      setLightbulbs(parsedGame.lightbulbs || 0);
      setGliders(parsedGame.gliders || 0);
      setHackerspaces(parsedGame.hackerspaces || 0);
      setLocation(parsedGame.location || 'basement');
    }
  }, []);

  useEffect(() => {
    Cookies.set('hack_badger_game', JSON.stringify({ lightbulbs, gliders, hackerspaces, location }));
  }, [lightbulbs, gliders, hackerspaces, location]);

  // Function to generate lightbulbs
  const generateLightbulb = () => setLightbulbs(lightbulbs + 1);

  // Function to convert lightbulbs to gliders
  const convertToGlider = () => {
    if (lightbulbs >= 10) {
      setLightbulbs(lightbulbs - 10);
      setGliders(gliders + 1);
    }
  };

  // Function to create hackerspaces
  const createHackerspace = () => {
    if (gliders >= 5) {
      setGliders(gliders - 5);
      setHackerspaces(hackerspaces + 1);
    }
  };

  // Function to upgrade location
  const upgradeLocation = () => {
    if (hackerspaces >= 3) {
      setHackerspaces(hackerspaces - 3);
      if (location === 'basement') setLocation('garage');
      else if (location === 'garage') setLocation('home lab');
      else if (location === 'home lab') setLocation('hackerspace');
      else if (location === 'hackerspace') setLocation('mothership');
    }
  };

  // Simulate lightbulb generation by gliders
  useEffect(() => {
    const interval = setInterval(() => {
      setLightbulbs(prevLightbulbs => prevLightbulbs + gliders);
    }, 1000);
    return () => clearInterval(interval);
  }, [gliders]);

  return (
    <Flex direction="column" align="center" className="container">
      <h1>Current Location: {location}</h1>
      <Box>
        <motion.img
          className="sprite"
          src={honeyBadgerSprite}
          alt="Honey Badger"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, loop: Infinity, ease: "linear" }}
        />
      </Box>
      <Box onClick={generateLightbulb} cursor="pointer">
        <motion.img
          className="sprite"
          src={lightbulbSprite}
          alt="Laptop"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.5, loop: Infinity, ease: "easeInOut" }}
        />
        <p>Ideas: {lightbulbs}</p>
      </Box>
      <Box onClick={convertToGlider} cursor="pointer" style={{ pointerEvents: lightbulbs < 10 ? 'none' : 'auto' }}>
        <motion.img
          className="sprite"
          src={gliderSprite}
          alt="Glider"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 1, loop: Infinity, ease: "easeInOut" }}
        />
        <p>Hackers: {gliders}</p>
      </Box>
      <Box onClick={createHackerspace} cursor="pointer" style={{ pointerEvents: gliders < 5 ? 'none' : 'auto' }}>
        <motion.img
          className="sprite"
          src={glidermakerSprite}
          alt="Glidermaker"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, loop: Infinity, ease: "easeInOut" }}
        />
        <p>Hackerspaces: {hackerspaces}</p>
      </Box>
      <Box onClick={upgradeLocation} cursor="pointer" style={{ pointerEvents: hackerspaces < 3 ? 'none' : 'auto' }}>
        <motion.img
          className="sprite"
          src={mothershipSprite}
          alt="Mothership"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 1, loop: Infinity, ease: "easeInOut" }}
        />
      </Box>
    </Flex>
  );
};

export default Game;
