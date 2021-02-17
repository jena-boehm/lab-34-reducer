/* eslint-disable max-len */
import React from 'react';
import { 
  render, 
  cleanup, 
  screen, 
  fireEvent, 
  waitFor 
} from '@testing-library/react';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  
  it('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes the background color, undoes a color change, and then redoes it', async() => {
    render(<App />);
    const colorInput = screen.getByTestId('colorInput');
    const colorDiv = await screen.getByTestId('colorDiv');
    const undoButton = screen.getByTestId('undoButton');
    const redoButton = screen.getByTestId('redoButton');

    fireEvent.change(colorInput, {
      target: {
        value: '#00FF00'
      }
    });

    await waitFor(() => {
      expect(colorDiv).toHaveStyle({ 
        backgroundColor: '#00FF00' 
      });
    });

    fireEvent.click(undoButton);

    await waitFor(() => {
      expect(colorDiv).toHaveStyle({
        backgroundColor: '#FF0000'  
      });
    });
    
    fireEvent.click(redoButton);

    return waitFor(() => {
      expect(colorDiv).toHaveStyle({
        backgroundColor: '#00FF00'
      });
    });
  });
});
