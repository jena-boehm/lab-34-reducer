/* eslint-disable max-len */
import React, { useReducer } from 'react';
import colorReducer, { initialState } from '../reducers/colorReducer';

// const useRecord = (init) => {
//   const [before, setBefore] = useState([]);
//   const [current, setCurrent] = useState(init);
//   const [after, setAfter] = useState([]);

//   const undo = () => {
//     setAfter(after => [current, ...after]);
//     setCurrent(before[before.length - 1]);
//     setBefore(before => before.slice(0, -1));
//   };

//   const redo = () => {
//     setBefore(before => [...before, current]);
//     setCurrent(after[0]);
//     setAfter(after => after.slice(1));
//   };

//   const record = val => {
//     setBefore(before => [...before, current]);
//     setCurrent(val);
//   };

//   return {
//     undo,
//     record,
//     redo,
//     current,
//   };
// };

function App() {
  // const { current, undo, redo, record } = useRecord('#FF0000');
  const [state, dispatch] = useReducer(colorReducer, initialState);
  const { before, current, after } = state;

  const record = () => {
    dispatch({ type: 'RECORD' });
  };

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
        onClick={undo}
        disabled={!before.length}>undo</button>
      <button 
        data-testid="redoButton"
        onClick={redo}
        disabled={!after.length}>redo</button>

      <label htmlFor="colorInput">Color Input</label>
      <input 
        id="colorInput"
        type="color" 
        value={current} 
        onChange={({ target }) => dispatch({
          payload: target.value,
          type: record
        })} 
      />

      <div 
        data-testid="colorDiv"
        style={{ 
          backgroundColor: state.current, 
          width: '10rem', 
          height: '10rem' }}>
      </div>
    </>
  );
}

export default App;
