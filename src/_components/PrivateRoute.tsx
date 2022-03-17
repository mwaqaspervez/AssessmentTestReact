import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../redux/rootReducer';

function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            const user = useAppSelector(state => state.loginReducer.user)
            if (!user) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
            }

            // check if route is restricted by role
            if (roles && roles.indexOf(user.role) === -1) {
                // role not authorized so redirect to home page
                return <Redirect to={{ pathname: '/'}} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };