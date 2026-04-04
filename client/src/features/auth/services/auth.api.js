import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    withCredentials: true
});


export async function register({username, email, password}) {
    return api.post('/api/auth/register', {
        username,
        email,
        password
    }, {
        withCredentials: true
    }).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.error(err);
    });
}

export async function login({email, password}) {
    return axios.post('/api/auth/login', {
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
    return api.get('/api/auth/logout', {}).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.error(err);
    });
}

export async function getme() {
    return api.get('http://localhost:5000/api/auth/me', {}).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.error(err);
    }
    );
}