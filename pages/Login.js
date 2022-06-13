import Link from 'next/link'
import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from "next/router"
import { toast } from 'react-toastify';

export default function Login({ user }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      toast.success(`Welcome Back! ${user.displayName}`, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(function () {
        router.push('/')
      }, 1800)

    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <>
      {user ?
        <>
        </>
        :
        <div className="container-lg my-5">
          <div className="text-center align-items-center align-content-center">
            <div className="d-flex justify-content-center">
              <form onSubmit={handleSubmit} className="border p-5">
                <h4 className="text-secondary fw-bold fs-3 mb-5">Log In</h4>
                <div className="mb-3">
                  <input type="email" placeholder="Email Address" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="password" placeholder="Password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                  <p>Not a Member? <Link href="/Register">Sign Up</Link></p>
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  )
}