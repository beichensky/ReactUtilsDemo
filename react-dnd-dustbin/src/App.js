import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Dustbin from './components/Dustbin';
import Box from './components/Box';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ paddingLeft: 200, paddingTop: 50 }}>
        <div>
          <Box name="Glass" />
          <Box name="Banana" />
          <Box name="Paper" />
        </div>
        <div>
          <Dustbin />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
