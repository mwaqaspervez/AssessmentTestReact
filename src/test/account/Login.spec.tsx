import {
    fireEvent,
    queryAllByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { LoginContainer } from '../../account/LoginContainer';
import { Account } from '../../account/Index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/rootReducer';
import { act } from 'react-dom/test-utils';

describe('Should render login page with correct values', () => {

    it('Should show the header', () => {

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Account />
                </BrowserRouter>
            </Provider>
        );

        // Assert
        const header = screen.getByText('Automated Ticket Generator');
        expect(header).not.toBeNull();
        expect(header.tagName).toEqual('H1');
    });


    it('Should render Login form with empty value', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginContainer />
                </BrowserRouter>
            </Provider>
        );

        const username = screen.getByTestId('Username');
        const password = screen.getByTestId('Password');

        expect(username.getAttribute('value')).toEqual('');
        expect(password.getAttribute('value')).toEqual('');
    })

    it('should show error if username and password are not provided', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginContainer />
                </BrowserRouter>
            </Provider>
        );

        const login = screen.getAllByText('Login');
        act(() => { fireEvent.submit(login[1]) })

        await waitFor(() => {
            const username = screen.getByText('Username is required');
            const password = screen.getByText('Password is required');

            expect(username).not.toBeNull();
            expect(password).not.toBeNull();
        })

    })

    it('Should allow to pass if username and password is added.', async () => {
        const mockSubmit = jest.fn();
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginContainer />
                </BrowserRouter>
            </Provider>
        );

        const login = screen.getAllByText('Login');
        const username = screen.getByTestId('Username');
        const password = screen.getByTestId('Password');

        act(() => {
            fireEvent.change(username, { target: { value: "test" } })
            fireEvent.change(password, { target: { value: "test" } })
            fireEvent.submit(login[1])
        })
    })
});

