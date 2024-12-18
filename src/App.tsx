import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Accueil from "./Accueil"
import UserProfil from "./user/UserProfil.tsx";
import Apropos from "./Apropos.tsx";
import Contact from "./Contact.tsx";
import Home from "./user/actualiter/Home.tsx";


function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Accueil/> },
    { path: "/apropos" , element: <Apropos/> },
    {path: "/contact", element: <Contact/>},
    { path: "hello", element: <div>hello world a a</div> },
    { path: "/user/profile", element: <UserProfil/> },
    { path: "/home", element: <Home/> },
  ])

  return <RouterProvider router={router} />
}

export default App
