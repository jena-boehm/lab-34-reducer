/* eslint-disable max-len */
import React, { useReducer } from 'react';
import colorReducer, { initialState } from '../reducers/colorReducer';

function App() {
  const [state, dispatch] = useReducer(colorReducer, initialState);
  const { before, current, after } = state;

  const undo = () => {
    dispatch({ type: 'UNDO' });
  };

  const redo = () => {
    dispatch({ type: 'REDO' });
  };

  return (
    <>
      <button 
        data-testid="undoButton"
        id="UNDO"
        onClick={undo}
        disabled={!before.length}>undo</button>
      <button 
        data-testid="redoButton"
        id="REDO"
        onClick={redo}
        disabled={!after.length}>redo</button>

      <input 
        data-testid="colorInput"
        id="RECORD"
        type="color" 
        value={current} 
        onChange={({ target }) => dispatch({
          payload: target.value,
          type: target.id
        })} 
      />

      <div 
        data-testid="colorDiv"
        style={{ 
          backgroundColor: current, 
          width: '10rem', 
          height: '10rem' }}>
      </div>
    </>
  );
}

export default App;
