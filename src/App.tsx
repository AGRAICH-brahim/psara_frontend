import Hero from "./components/home/Hero"
import NavBar from "./components/NavBar"

function App() {

  return (
    <>
      <NavBar/>
      <Hero/>
      <div className="border-2 border-black">
          <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
