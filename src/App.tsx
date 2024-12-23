import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import Accueil from "./Accueil"
import Apropos from "./Apropos.tsx";
import Contact from "./Contact.tsx";
import Home from "./user/actualiter/Home.tsx";
import Dashboard from "./admin/dashboard/Dashboard.tsx";
import RequestDemandeAdoption from "./user/demande_adoption/RequestDemandeAdoption.tsx";
import Profile from "./user/profile/Profile.tsx";
import Messages from "./user/messages/Messages.tsx";

// Fonction pour vérifier si l'utilisateur est authentifié
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Vérifiez si le token est présent
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};
function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Accueil/> },
    { path: "/apropos" , element: <Apropos/> },
    {path: "/contact", element: <Contact/>},
    { path: "hello", element: <div>hello world a a</div> },
    { path: "/profile", element: <Profile/> },
    { path: "/home", element: <Home/> },
    { path: "/admin", element: <PrivateRoute element={<Dashboard />} /> },  // Protéger la route /admin
    { path: "/adoption-requests", element: <RequestDemandeAdoption/> },
    {path: "/messages" , element: <Messages/>},
  ])

  return <RouterProvider router={router} />
}

export default App
