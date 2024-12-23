
// Header Component
const Header = () => (
    <header className="bg-orange-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Pabete.com</h1>
            <nav>
                <ul className="flex space-x-6">
                    <li><a href="#fonctionnement" className="hover:underline">Fonctionnement</a></li>
                    <li><a href="#histoire" className="hover:underline">Notre Histoire</a></li>
                    <li><a href="#inscription" className="hover:underline">Inscription Gratuite</a></li>
                    <li><a href="#espace-adherent" className="hover:underline">Espace Adhérent</a></li>
                </ul>
            </nav>
        </div>
    </header>
);

// Hero Section Component
const HeroSection = () => (
    <section className="bg-cover bg-center h-96 flex items-center justify-center text-center text-white" style={{ backgroundImage: "url('https://via.placeholder.com/1500x600')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded">
            <h2 className="text-3xl font-bold">La plateforme solidaire de garde de tous les animaux</h2>
            <p className="mt-4 text-lg">Pensée et faite pour les amoureux des animaux.</p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600">En savoir plus</button>
        </div>
    </section>
);

// Testimonials Component
const Testimonials = () => (
    <section className="bg-gray-100 py-12">
        <div className="container mx-auto">
            <h3 className="text-center text-2xl font-bold mb-6">Avis de nos adhérents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow p-4 rounded">
                    <p><strong>Maman de Bigoudte:</strong> Je trouve l'initiative très bonne...</p>
                    <span className="text-sm text-gray-500">Juin 2022</span>
                </div>
                <div className="bg-white shadow p-4 rounded">
                    <p><strong>Maman de Simba:</strong> Nous sommes très satisfaits du service...</p>
                    <span className="text-sm text-gray-500">Août 2022</span>
                </div>
                <div className="bg-white shadow p-4 rounded">
                    <p><strong>Maman de Saphir:</strong> Super initiative ! Très bonne expérience...</p>
                    <span className="text-sm text-gray-500">Août 2022</span>
                </div>
            </div>
        </div>
    </section>
);

// Information Section Component
const InfoSection = () => (
    <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-100 p-6 rounded">
                <h4 className="text-xl font-bold mb-4">Partir en vacances l'esprit serein</h4>
                <p>Que ce soit pour les vacances...</p>
            </div>
            <div className="bg-orange-100 p-6 rounded">
                <h4 className="text-xl font-bold mb-4">Vous n'avez pas d'animaux domestiques ?</h4>
                <p>Adorez les animaux mais vous ne pouvez en avoir ?...</p>
            </div>
        </div>
    </section>
);

// Call to Action Component
const CallToAction = () => (
    <section className="bg-orange-500 text-white py-12">
        <div className="container mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Souhaiteriez-vous promener un chien ?</h3>
            <p className="mb-6">Chaque jour, des personnes solidaires rejoignent notre communauté...</p>
            <button className="px-6 py-3 bg-white text-orange-500 font-semibold rounded hover:bg-gray-100">Rejoindre notre belle aventure</button>
        </div>
    </section>
);

// Footer Component
const Footer = () => (
    <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <h4 className="text-lg font-bold mb-4">Solution de garde pour animaux</h4>
                <p>Vous cherchez à faire garder votre chat ou votre chien ?...</p>
            </div>
            <div>
                <h4 className="text-lg font-bold mb-4">Liens rapides</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Accueil</a></li>
                    <li><a href="#" className="hover:underline">Fonctionnement</a></li>
                    <li><a href="#" className="hover:underline">Blog</a></li>
                    <li><a href="#" className="hover:underline">Inscription</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-bold mb-4">Informations légales</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Mentions légales</a></li>
                    <li><a href="#" className="hover:underline">Conditions générales</a></li>
                    <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
                </ul>
            </div>
        </div>
    </footer>
);

// Main Page Component
const AnimalCarePage = () => (
    <div>
        <Header />
        <HeroSection />
        <Testimonials />
        <InfoSection />
        <CallToAction />
        <Footer />
    </div>
);

export default AnimalCarePage;
