import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTMLBackend from 'react-dnd-html5-backend';

import Dustbin from './components/Dustbin';
import Box from './components/Box';

// 将 HTMLBackend 作为参数传给 DragDropContext
@DragDropContext(HTMLBackend)
class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
