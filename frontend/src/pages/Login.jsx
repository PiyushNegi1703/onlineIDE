import { useState } from "react"


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    
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
        sessionStorage.setItem('token', json.token)
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

export default Login
