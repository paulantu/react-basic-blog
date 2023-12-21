import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components/index"
import { Outlet } from "react-router-dom"


function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();


    useEffect(() => {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({userData}))
          }else{
            dispatch(logout())
          }
        })
        .finally(() => setLoading(false))
    }, [])

  



    if(!loading){
      return (
        <>
          <Header />
          <main>
            {/* < Outlet /> */}
          </main>
          <Footer />
        </>
      )
    }else{
      return (
        <>
          <h1>from else condition</h1>
        </>
      )
    }
}

export default App
