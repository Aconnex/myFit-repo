import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>fitPath</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link className="navbarDisplays" to="/">weather</Link>
                            <Link className="navbarDisplays" to="/">page3</Link>
                            <Link className="navbarDisplays" to="/">page4 |</Link>
                            <span className="navbarDisplays">{user.email}</span>{/*to show user email next to button*/}
                            <button onClick={handleClick}>log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link className="navbarDisplays" to="/login">login</Link>
                            <Link className="navbarDisplays" to="/signup">signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar