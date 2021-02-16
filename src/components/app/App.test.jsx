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
});

