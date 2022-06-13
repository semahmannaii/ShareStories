import Link from "next/link"
import { auth } from "../firebase"
import { FaBars, FaHome, FaSignInAlt, FaUserPlus, FaBook, FaSignOutAlt } from "react-icons/fa"

function Navbar({ user }) {
    return (
        <nav className="navbar navbar-light bg-light shadow-sm">
            <div className="container-lg">
                <Link href="/">
                    <div className="navbar-brand text-primary fw-bold fst-italic fs-4">
                        ShareStories
                    </div>
                </Link>
                <div className="d-md-block d-none">
                    {user ?
                        <div className="px-4 rounded-pill">
                            <button className="btn btn-primary text-white lead fw-bold" onClick={() => auth.signOut()}>Log Out</button>
                        </div>
                        :
                        <div className="d-flex gap-3 align-items-center">
                            <Link href="/Login" className="px-4 rounded-pill">
                                <button className="btn btn-primary text-white lead fw-bold">Login</button>
                            </Link>
                            <Link href="/Register" className="px-4 rounded-pill">
                                <button className="btn btn-primary text-white lead fw-bold">Register</button>
                            </Link>
                        </div>
                    }
                </div>
                <div className="d-block d-md-none">
                    <div className="dropdown">
                        <button className="btn btn-primary px-3" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaBars className="mb-1" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <Link href="/">
                                <li className="dropdown-item text-secondary fw-bold fs-6"><FaHome /> Home</li>
                            </Link>
                            {user ?
                                <>
                                    <Link href="/Create">
                                        <li className="dropdown-item text-secondary fw-bold fs-6"><FaBook /> Create Story</li>
                                    </Link>
                                    <li className="dropdown-item text-secondary fw-bold fs-6" onClick={() => auth.signOut()}><FaSignOutAlt /> Log Out</li>
                                </>
                                :
                                <>
                                    <Link href="/Login">
                                        <li className="dropdown-item text-secondary fw-bold fs-6"><FaSignInAlt /> Log In</li>
                                    </Link>
                                    <Link href="/Register">
                                        <li className="dropdown-item text-secondary fw-bold fs-6"><FaUserPlus /> Register</li>
                                    </Link>
                                </>
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar