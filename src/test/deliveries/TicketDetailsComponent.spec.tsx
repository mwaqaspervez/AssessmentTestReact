import {
  render,
  screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/rootReducer';
import { TicketsContainer } from '../../deliveries';


describe('Should render header', () => {
  it('Should show the header', () => {
    // Act
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TicketsContainer />
        </BrowserRouter>
      </Provider>
    );

    // Assert
    const header = screen.getByText('Automated Generated Tickets');
    expect(header).not.toBeNull();
    expect(header.tagName).toEqual('H1');
  });
});