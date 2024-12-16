import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Accueil from "./Accueil"
import UserProfil from "./user/UserProfil.tsx";


function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Accueil/> },
    { path: "hello", element: <div>hello world a a</div> },
    { path: "/user/profile", element: <UserProfil/> },
  ])

  return <RouterProvider router={router} />
}

export default App
