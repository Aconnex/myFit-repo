import { useState } from "react"
import { useSignupApi } from "../hooks/useSignupApi"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignupApi()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <form className="signupForm" onSubmit={handleSubmit}>
      <h3>sign up</h3>
      
      {/*<label>--email--</label>*/}
      <input 
        type="email"
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <input 
        type="password"
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}><b>sign up</b></button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup