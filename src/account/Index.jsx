import React from 'react';
import { Login } from './Login';
import { Route } from 'react-router-dom';

function Account({ history, match }) {
    const { path } = match;
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <div className="card m-3">
                        <Route path={`${path}/login`} component={Login} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Account };