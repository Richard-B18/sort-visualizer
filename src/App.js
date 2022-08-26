import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import SortingVisualizer from "./visualizer/sortingVisualizer";

document.body.style.overflow = "hidden";

function App() {
  return (
      <ChakraProvider>
          <div className="App">
              <SortingVisualizer></SortingVisualizer>
          </div>
      </ChakraProvider>
  );
}

export default App;
