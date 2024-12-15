import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/hello",
        element: <div>hello</div>
    }
])

const RoutesApp = () => {
  return <RouterProvider router={router}/>
}

export default RoutesApp