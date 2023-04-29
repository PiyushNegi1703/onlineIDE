import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState({})
    const navigate = useNavigate()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const Body = {username, password, email}
        const response = await fetch(`${import.meta.env.VITE_API}register/`, {
            method: "POST",
            body: JSON.stringify(Body),
            headers: {
                'Content-Type': "application/json"
            }
        })
        const json = await response.json()
        console.log(json)

        if(response.ok) {
          window.alert("Registered succesfully. Navigating to the Login page to login with your credentials")
            navigate('/login')
        }
        if(!response.ok) {
            setError(json)
        }

        console.log(error)
    }
  return (
    <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <h1>Register Yourself</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <p style={{color: "black", fontWeight: "500"}}>Already have an account? <span onClick={() => navigate('/login')} className="nav">Login</span></p>
        <button type="Submit">Submit</button>
      </form>
    </div>
  )
}

export default Register
