import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { Account } from '../account/Index';
import { TicketsContainer } from '../deliveries/index';
import { ToastContainer } from 'react-toastify';


function App(): JSX.Element {
    const history = createBrowserHistory();
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/account">
                        <Account />
                    </Route>
                    <Route path="/tickets">
                        <TicketsContainer />
                    </Route>
                    <Route path="/">
                        <Account />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export { App };