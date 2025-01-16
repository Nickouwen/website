import { useState } from "react"
import "./Login.css"

const Login = ({ setLoggedIn }: { setLoggedIn: (loggedIn: boolean) => void }) => {
    const [password, setPassword] = useState("")

    // I know this is not how this is meant to be handled, but as it's just a simple recipe website for myself and my family, a users table didn't seem necessary
    const handleLogin = () => {
        switch (password) {
            case "0056": {
                localStorage.setItem("author", "Nic")
                setLoggedIn(true)
                break
            }
            case "6111": {
                localStorage.setItem("author", "Mom")
                setLoggedIn(true)
                break
            }
            case "0823": {
                localStorage.setItem("author", "Dad")
                setLoggedIn(true)
                break
            }
            case "3199": {
                localStorage.setItem("author", "Kaia")
                setLoggedIn(true)
                break
            }
            case "0611": {
                localStorage.setItem("author", "Alicia")
                setLoggedIn(true)
                break
            }
            default: {
                document.getElementById("password")?.classList.add("wrong-password")
                document.getElementById("password-error")?.classList.add("visible")
            }
        }
    }

    return (
        <div className="login">
            <div className="login-card">
                <h1>Log in</h1>

                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => e.key === "Enter" && handleLogin()} id="password" />
                <div id="password-error">
                    <span>Incorrect password</span>
                    <br />
                    <span>Please try again or contact your family member to add you to the site</span>
                </div>
                <div className="button-container" id="login-button" onClick={handleLogin}>
                    <span>Log in</span>
                </div>
                <span id="view-button" onClick={() => { setLoggedIn(true); localStorage.setItem("author", "Unknown") }}>I just want to view the recipes</span>
            </div>
        </div>
    )
}

export default Login