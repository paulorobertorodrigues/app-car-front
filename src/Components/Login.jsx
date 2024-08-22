import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values).then(result => {

            if(result.data.loginStatus) {
                navigate('/dashboard')
            }else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>

                <div className='text-white'>
                    {error && error}
                </div>


                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <img src="./public/Images/logotipo_g8.png" alt="logo" />
                </div>

                
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" name='email' autoComplete='off' placeholder='Digite seu email' onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Senha</strong></label>
                        <input type="password" name='password' autoComplete='off' placeholder='Digite sua senha' onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-sucess w-100 rounded-0 mb-2'>Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login