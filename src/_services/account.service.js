import { BehaviorSubject } from 'rxjs';
import { fetchWrapper, history } from '@/_helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `http://localhost:8081`
const v1 = baseUrl + "/v1";

export const accountService = {
    login,
    getAll,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function login(username, password) {
    return fetchWrapper.post(baseUrl + "/login", {
        username: username,
        password: password
    });
}

function getAll() {
    return fetchWrapper.get(v1 + "/tickets");
}