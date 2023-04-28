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
            navigate('/login')
        }
        if(!response.ok) {
            setError(json)
        }

        console.log(error)
    }
  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="Submit">Submit</button>
      </form>
    </div>
  )
}

export default Register
