import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Game from './Game';

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
}

export default App;
