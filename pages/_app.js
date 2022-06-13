import Head from 'next/head'
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Head>
        <title>Share Stories</title>
      </Head>
      <Navbar user={user} />
      <Component {...pageProps} user={user} />
      <ToastContainer />
      <Footer />
    </>
  )
}

export default MyApp
