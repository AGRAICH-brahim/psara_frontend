import Hero from "./components/accueil/Hero"
import NavBar from "./components/NavBar"

const Accueil = () => {
  return (
    <>
      <NavBar/>
      <Hero/>

        {/* Section de présentation */}
        <section className="w-full bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Découvrez notre plateforme
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Nous vous aidons à connecter les bonnes personnes, les bons services et les opportunités pour un impact durable.
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img
                            src="./img1.png"
                            alt="Service 1"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">Service 1</h3>
                            <p className="mt-2 text-gray-600">
                                Découvrez notre service qui révolutionne votre quotidien grâce à des solutions innovantes.
                            </p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img
                            src="./img1.png"
                            alt="Service 2"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">Service 2</h3>
                            <p className="mt-2 text-gray-600">
                                Une solution intuitive pour simplifier vos processus complexes.
                            </p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img
                            src="./img1.png"
                            alt="Service 3"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">Service 3</h3>
                            <p className="mt-2 text-gray-600">
                                Collaborez avec des experts et accédez à un réseau international.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Section fonctionnalités */}
        <section className="bg-gradient-to-r from-[#d86404] to-[#d86] text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-8">
                    Fonctionnalités clés
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Fonctionnalité 1 */}
                    <div className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white rounded-full text-[#d86404] mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h11M9 21H4a1 1 0 01-1-1V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1h-5"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold">Interface intuitive</h3>
                        <p className="mt-2 text-gray-200">
                            Naviguez facilement grâce à une interface conçue pour tous.
                        </p>
                    </div>
                    {/* Fonctionnalité 2 */}
                    <div className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white rounded-full text-[#d86404] mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold">Support 24/7</h3>
                        <p className="mt-2 text-gray-200">
                            Une assistance rapide et efficace, à tout moment.
                        </p>
                    </div>
                    {/* Fonctionnalité 3 */}
                    <div className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white rounded-full text-[#d86404] mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h11M9 21H4a1 1 0 01-1-1V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1h-5"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold">Personnalisation</h3>
                        <p className="mt-2 text-gray-200">
                            Adaptez la plateforme à vos besoins spécifiques.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section d'appel à l'action */}
        <section className="bg-gray-900 text-white py-12">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold">
                    Prêt à démarrer avec notre plateforme ?
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                    Rejoignez notre communauté et découvrez un monde d'opportunités.
                </p>
                <div className="mt-8">
                    <button className="btn btn-primary px-6 py-3 text-lg">
                        Inscrivez-vous maintenant
                    </button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Accueil