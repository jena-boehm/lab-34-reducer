export const initialState = {
  before: [],
  current: '#FF0000',
  after: []
};

export default function colorReducer(state, action) {
  switch(action.type) {
    case 'RECORD':
      return {
        ...state,
        before: [...state.before, state.current],
        current: action.payload
      };

    case 'UNDO':
      return {
        ...state,
        before: state.before.slice(0, -1),
        current: state.before[state.before.length - 1],
        after: [state.current, ...state.after],
      };

    case 'REDO':
      return {
        ...state,
        before: [...state.before, state.current],
        current: state.after[0],
        after: state.after.slice(1)
      };
      
    default:
      return state;
  }
}
