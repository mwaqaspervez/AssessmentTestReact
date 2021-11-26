import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Alert } from '@/_components';

import { Account } from '@/account';
import { Table } from '@/deliveries';

function App() {
    return (
        <div>
            <Alert />
            <Switch>
                <Route path="/account" component={Account} />
                <Route path="/deliveries" component={Table} />
                <Route path="/" component={Account} />
            </Switch>
        </div>
    );
}

export { App };