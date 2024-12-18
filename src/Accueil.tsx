import Hero from "./components/accueil/Hero"
import NavBar from "./components/NavBar"

const Accueil = () => {
  return (
    <>
      <NavBar/>
      <Hero/>
      <div className="flex center w-[100%] p-9 ">
        <div className="card lg:card-side bg-base-100 w-[60%] shadow-xl">
          <figure>
            <img
              src="./img1.png"
              alt="Album" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">New album is released!</h2>
            <p>Click the button to listen on Spotiwhy app.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Listen</button>
            </div>
          </div>
        </div>
      </div>
      
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

export default Accueil