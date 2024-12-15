import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Accueil from "./Accueil"


function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Accueil/> },
    { path: "hello", element: <div>hello world</div> }
  ])

  return <RouterProvider router={router} />
}

export default App
