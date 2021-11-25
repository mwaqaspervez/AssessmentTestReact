import React from 'react';
import { Route } from 'react-router-dom';
import { DeliveryProducts } from './DeliveryProducts';


function Table({ history, match }) {

    return (
        <div>
            <div className="delivery-detail">
                <h1>Automated Generated Tickets</h1>
            </div>
            <div>
                <Route path="/" component={DeliveryProducts} />
            </div>
        </div>
    );
}

export { Table };