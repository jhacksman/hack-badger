import React, { useState, useEffect } from 'react';
import { Box, Button, Text } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import honeyBadgerSprite from './assets/sprites/honey_badger.png';
import lightbulbSprite from './assets/sprites/lightbulb.png';
import gliderSprite from './assets/sprites/glider.png';
import glidermakerSprite from './assets/sprites/glidermaker.png';
import mothershipSprite from './assets/sprites/mothership.png';

const Game = () => {
  const [lightbulbs, setLightbulbs] = useState(0);
  const [gliders, setGliders] = useState(0);
  const [hackerspaces, setHackerspaces] = useState(0);
  const [location, setLocation] = useState('basement');

  useEffect(() => {
    const savedGame = Cookies.getJSON('hack_badger_game');
    if (savedGame) {
      setLightbulbs(savedGame.lightbulbs);
      setGliders(savedGame.gliders);
      setHackerspaces(savedGame.hackerspaces);
      setLocation(savedGame.location);
    }
  }, []);

  useEffect(() => {
    Cookies.set('hack_badger_game', { lightbulbs, gliders, hackerspaces, location });
  }, [lightbulbs, gliders, hackerspaces, location]);

  const generateLightbulb = () => setLightbulbs(lightbulbs + 1);
  const convertToGlider = () => {
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
      if (location === 'basement') setLocation('garage');
      else if (location === 'garage') setLocation('home lab');
      else if (location === 'home lab') setLocation('hackerspace');
      else if (location === 'hackerspace') setLocation('mothership');
    }
  };

  return (
    <Box textAlign="center" p={5}>
      <Text fontSize="2xl">Current Location: {location}</Text>
      <motion.img src={honeyBadgerSprite} alt="Honey Badger" />
      <Box>
        <Button onClick={generateLightbulb}>Generate Idea</Button>
        <Text>Ideas: {lightbulbs}</Text>
      </Box>
      <Box>
        <Button onClick={convertToGlider} isDisabled={lightbulbs < 10}>Convert to Hacker</Button>
        <Text>Hackers: {gliders}</Text>
      </Box>
      <Box>
        <Button onClick={createHackerspace} isDisabled={gliders < 5}>Create Hackerspace (Glider Factory)</Button>
        <Text>Hackerspaces: {hackerspaces}</Text>
      </Box>
      <Box>
        <Button onClick={upgradeLocation} isDisabled={hackerspaces < 3}>Evolve Location</Button>
      </Box>
    </Box>
  );
};

export default Game;
