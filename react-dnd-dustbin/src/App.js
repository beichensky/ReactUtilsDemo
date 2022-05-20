import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Dustbin from './components/Dustbin';
import Box from './components/Box';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ paddingLeft: 200, paddingTop: 50 }}>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Box name="Glass" />
          <Box name="Banana" />
          <Box name="Paper" />
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Dustbin />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
