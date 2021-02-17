import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  
  it('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes the background color', async() => {
    render(<App />);
    const colorInput = screen.getByLabelText('Color Input');

    fireEvent.change(colorInput, {
      target: {
        value: '#00FF00'
      }
    });

    const colorDiv = await screen.getByTestId('colorDiv');
    expect(colorDiv).toHaveStyle({ backgroundColor: '#00FF00' });
  });

  it('should undo and change to previous color', async() => {
    render(<App />);
    const colorInput = screen.getByLabelText('Color Input');
    const undoButton = screen.getByTestId('undoButton');

    fireEvent.change(colorInput, {
      target: {
        value: '#00FF00'
      }
    });
    fireEvent.click(undoButton);

    const colorDiv = await screen.findByTestId('colorDiv');
    expect(colorDiv).toHaveStyle({
      backgroundColor: '#FF0000'
    });
  });

  it('should redo color change', async() => {
    render(<App />);
    const colorInput = screen.getByLabelText('Color Input');
    const undoButton = screen.getByTestId('undoButton');
    const redoButton = screen.getByTestId('redoButton');

    fireEvent.change(colorInput, {
      target: {
        value: '#0000FF'
      }
    });
    fireEvent.click(undoButton);
    fireEvent.click(redoButton);

    const colorDiv = await screen.findByTestId('colorDiv');
    expect(colorDiv).toHaveStyle({
      backgroundColor: '#0000FF'
    });
  });
});

