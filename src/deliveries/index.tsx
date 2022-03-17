import { Route } from 'react-router-dom';
import { DeliveryProducts } from './TicketDetailsComponent';

const TicketsContainer = () => {

    return (
        <div>
            <div className="delivery-detail">
                <h1 className='header-heading'>Automated Generated Tickets</h1>
            </div>
            <div>
                <Route path="/" component={DeliveryProducts} />
            </div>
        </div>
    );
}

export { TicketsContainer };