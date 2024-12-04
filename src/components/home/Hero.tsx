
const Hero = () => {
  return (
    <div
        className="hero min-h-[90%] min-w-full"
        style={{
            backgroundImage: "url(heroimage.png)",
        }}>
         
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
            <div className="max-w[60%]">
            <h1 className="mb-5 text-4xl font-bold">Bienvenue sur  la plateforme PSARA !  <br/> Offrir un foyer chaleureux à un animal, c'est changer une vie. 🌟</h1>
            <p className="mb-5">
            🐾 Notre plateforme connecte les amoureux des animaux avec ceux qui cherchent à leur offrir une nouvelle chance. <br/>
            💖 Que vous soyez un adoptant 🏡, un propriétaire 🐕, ou un centre d'adoption 🏢, nous sommes là pour faciliter l'adoption responsable en toute confiance.
            </p>
            <ul>
              <li>Découvrez des annonces d'animaux en attente d'un foyer.</li>
              <li>Communiquez directement avec les propriétaires et centres d'adoption.</li>
              <li>Simplifiez vos démarches grâce à nos outils dédiés.</li>
            </ul>
            <p className="my-5">Rejoignez notre communauté et faites la différence dès aujourd'hui. 💕</p>
            
            <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default Hero