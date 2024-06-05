import React, { useState, useEffect } from 'react';
import { Box, Text } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import honeyBadgerSprite from './assets/sprites/honey_badger_spritesheet.png';
import lightbulbSprite from './assets/sprites/lightbulb_spritesheet.png';
import gliderSprite from './assets/sprites/glider_spritesheet.png';
import glidermakerSprite from './assets/sprites/glidermaker_spritesheet.png';
import mothershipSprite from './assets/sprites/mothership_spritesheet.png';

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
    <Box textAlign="center" p={5}>
      <Text fontSize="2xl">Current Location: {location}</Text>
      <motion.img
        src={honeyBadgerSprite}
        alt="Honey Badger"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, loop: Infinity, ease: "linear" }}
      />
      <Box onClick={generateLightbulb} cursor="pointer">
        <Text>Click the laptop to generate ideas</Text>
        <motion.img
          src={lightbulbSprite}
          alt="Lightbulb"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.5, loop: Infinity, ease: "easeInOut" }}
        />
        <Text>Ideas: {lightbulbs}</Text>
      </Box>
      <Box onClick={convertToGlider} cursor="pointer" isDisabled={lightbulbs < 10}>
        <Text>Click the glider to convert ideas to hackers</Text>
        <motion.img
          src={gliderSprite}
          alt="Glider"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 1, loop: Infinity, ease: "easeInOut" }}
        />
        <Text>Hackers: {gliders}</Text>
      </Box>
      <Box onClick={createHackerspace} cursor="pointer" isDisabled={gliders < 5}>
        <Text>Click the glidermaker to create a hackerspace</Text>
        <motion.img
          src={glidermakerSprite}
          alt="Glidermaker"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, loop: Infinity, ease: "easeInOut" }}
        />
        <Text>Hackerspaces: {hackerspaces}</Text>
      </Box>
      <Box onClick={upgradeLocation} cursor="pointer" isDisabled={hackerspaces < 3}>
        <Text>Click the mothership to evolve location</Text>
        <motion.img
          src={mothershipSprite}
          alt="Mothership"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 1, loop: Infinity, ease: "easeInOut" }}
        />
      </Box>
    </Box>
  );
};

export default Game;
