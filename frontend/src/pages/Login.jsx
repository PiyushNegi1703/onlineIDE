import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const Body = {username, password, email}
        const response = await fetch(`${import.meta.env.VITE_API}login/`, {
            method: "POST",
            body: JSON.stringify(Body),
            headers: {
                'Content-Type': "application/json"
            }
        })
        const json = await response.json()
        console.log(json)
        if(response.ok) {
          sessionStorage.setItem('token', json.token)
          window.alert("Logged in successfully")
          navigate('/home')
        }
        else {
          setError(JSON.stringify(json))
        }
    }
  return (
    <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <h1>Login with your credentials</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <p style={{color: "black", fontWeight: "500"}}>Don't have an account? <span onClick={() => navigate('/')} className="nav">Register</span></p>
        <button type="Submit">Submit</button>
      </form>
      <div>{error}</div>
    </div>
  )
}

export default Login
