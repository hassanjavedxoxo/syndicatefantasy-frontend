import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import style from '../style/AdminLogin.module.css'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('isLogin') === 'true') {
            navigate('/admin')
        }
    }, [])

    const handleLogin = () => {
        if(username === 'josh' && password === 'josh2024') {
            localStorage.setItem('isLogin', true);
            navigate('/admin');
        } else {
            alert('INCORRECT CREDENTIALS');
        }
    }
    return (
        <>
            <Navbar />
            <div className={`${style.adminLoginMain}`}>
                <div className={style.loginContainer}>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username' />
                    <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                    <button onClick={() => handleLogin()}>Login</button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AdminLogin