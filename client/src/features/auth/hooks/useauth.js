import {useContext} from 'react'
import { AuthContext } from '../services/auth.context';
import { login, logout, register, getme } from '../services/auth.api';

export const useAuth = () => {
   const context = useContext(AuthContext);
   const {user, setUser, loading, setLoading} = context;
   const handleLogin = async (email, password) => {
    setLoading(true);
    try {
        const res = await login({email, password});
        setUser(res.user);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const res = await register({username, email, password});
            setUser(res.user);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleGetMe = async () => {
        setLoading(true);
        try {
            const res = await getme();
            setUser(res.user);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

   return {
    user,
    loading,
     handleLogin,
     handleRegister,
     handleLogout,
     handleGetMe
   }
}