import { Login } from './Login';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Account(): JSX.Element {
    return (
        <div>
            <div className="delivery-detail">
                <h1 className='header-heading'>Automated Ticket Generator</h1>
            </div>
            <div className="container">

                <div className="row">
                    <div className="col-sm-8 offset-sm-2 mt-5">
                        <div className="card m-3">
                            <Route path="/">
                                <Login />
                            </Route>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position='top-right'
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    );
}

export { Account };