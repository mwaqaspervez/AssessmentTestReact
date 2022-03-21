import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginUserAction } from './login';
import { useAppSelector } from '../redux/rootReducer';
import { toast } from 'react-toastify';
import './Login.less';

const LoginContainer = () => {
    const dispatch = useDispatch();
    const { user: { isLoggedIn }, error } = useAppSelector(state => state.loginReducer);
    const history = useHistory();

    const initialValues: { username: string, password: string } = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    function onSubmit({ username, password }, { setSubmitting }) {
        dispatch(loginUserAction({
            username,
            password
        }));
        setSubmitting(true)
    }

    useEffect(() => {
        if (isLoggedIn) {
            toast.success("Login Successfull")
            history.push("/tickets");
        }
        if (error) {
            toast.error("Invalid Username or Password")
        }
    }, [isLoggedIn, error])

    return (
        <div className='main'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <h3 className="sign">Login</h3>
                        <div>
                            <div>
                            <ErrorMessage data-testid="username_error" name="username" component="div" className="invalid-feedback" />
                                <Field data-testid="Username" placeholder="Username" name="username" type="text" className='pass' />
                            </div>
                            <div>
                            <ErrorMessage data-testid="password_error" name="password" component="div" className="invalid-feedback" />
                                <Field data-testid="Password" placeholder="Password" name="password" type="password" className='pass' />
                                
                            </div>
                            <div>
                                <div>
                                    <button type="submit" className="submit">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export { LoginContainer }; 