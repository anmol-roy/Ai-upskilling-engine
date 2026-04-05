import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true
});


export async function register({username, email, password}) {
    return api.post('/register', {
        username,
        email,
        password
    }).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.error(err);
    });
}

export async function login({email, password}) {
    return api.post('/login', {
        email,
        password
    }).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.error(err);
    });
}

export async function logout() {
    return api.get('/logout', {}).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.error(err);
    });
}

export async function getme() {
    return api.get('/get-me', {}).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.error(err);
    });
}
