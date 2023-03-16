import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        //console.log(email, password)
        await login(email, password)
    }

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <h3>log in</h3>

            {/*<label>--email--</label>*/}
            <input
                type='email'
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <input
                type='password'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}><b>log in</b></button>
            {error && <div className='formError'>{error}</div>}
        </form>
    )
}

export default Login