import { Accordion, AccordionItem } from "@nextui-org/react";
import NavBar from "./components/NavBar.tsx";

const Apropos = () => {
    return (
        <>
            <NavBar/>

            <div className='padding-container mb-20 mt-20 '>

                <div className='w-full flex flex-col items-center text-center pt-6 mb-6'>
                    <h1 className='text-[#fbc02d] text-3xl font-bold mb-4'>Trouvez un compagnon pour la vie</h1>
                    <p className='text-gray-600 text-lg'>Explorez nos FAQ pour en savoir plus sur l'adoption d'animaux,
                        les soins et bien plus encore.</p>
                </div>

                <h1 className='font-extrabold text-4xl pt-5'>Adoption d'Animaux</h1>
                <Accordion className={"rounded-3xl flex flex-col gap-5  pt-6"}>
                    <AccordionItem className={" border  "} key="1" aria-label="Comment adopter un animal ?" title="Comment adopter un animal ?">
                        Pour adopter un animal, inscrivez-vous sur notre plateforme, sélectionnez un animal à adopter,
                        remplissez le formulaire d'adoption, et un de nos conseillers vous contactera pour finaliser
                        l'adoption.
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Quels sont les critères pour adopter un animal ?"
                                   title="Quels sont les critères pour adopter un animal ?">
                        Les critères d'adoption varient en fonction de l'animal. Nous demandons généralement un
                        environnement adapté et des personnes prêtes à offrir des soins et de l'amour à l'animal.
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Est-ce que l'adoption est payante ?"
                                   title="Est-ce que l'adoption est payante ?">
                        Oui, une petite somme peut être demandée pour couvrir les frais vétérinaires, la vaccination et
                        la stérilisation. Cette somme aide à garantir le bien-être de l'animal.
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Puis-je adopter plusieurs animaux ?"
                                   title="Puis-je adopter plusieurs animaux ?">
                        Oui, il est possible d'adopter plusieurs animaux, à condition d'avoir un espace adapté et de
                        pouvoir leur offrir les soins nécessaires.
                    </AccordionItem>
                </Accordion>

                <h1 className='font-extrabold text-4xl pt-5'>Soins des Animaux</h1>
                <Accordion>
                    <AccordionItem key="1" aria-label="Quels soins sont nécessaires pour un animal adopté ?"
                                   title="Quels soins sont nécessaires pour un animal adopté ?">
                        Nos animaux sont généralement vaccinés et stérilisés avant l'adoption. Après l'adoption, des
                        soins réguliers comme des visites vétérinaires, une alimentation équilibrée et des jeux sont
                        essentiels.
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Est-ce que l'animal a besoin de beaucoup d'attention ?"
                                   title="Est-ce que l'animal a besoin de beaucoup d'attention ?">
                        Certains animaux, comme les chiots ou les chatons, nécessitent beaucoup d'attention et de jeux.
                        Les animaux adultes peuvent être plus indépendants, mais ont toujours besoin d'affection et de
                        soins réguliers.
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Les animaux doivent-ils être stérilisés ?"
                                   title="Les animaux doivent-ils être stérilisés ?">
                        Oui, tous nos animaux sont stérilisés avant l'adoption, à moins qu'il y ait une
                        contre-indication médicale.
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Quelles sont les options de soins à long terme ?"
                                   title="Quelles sont les options de soins à long terme ?">
                        Nous recommandons de souscrire à une assurance santé pour animaux pour couvrir les soins
                        vétérinaires à long terme et de maintenir un suivi régulier avec un vétérinaire.
                    </AccordionItem>
                </Accordion>

                <h1 className='font-extrabold text-4xl pt-5'>Trouver un Animal</h1>
                <Accordion>
                    <AccordionItem key="1" aria-label="Comment trouver l'animal qui me convient ?"
                                   title="Comment trouver l'animal qui me convient ?">
                        Vous pouvez parcourir notre site pour filtrer les animaux par type, taille, âge, et besoins
                        particuliers. Vous pouvez aussi nous contacter pour être conseillé dans votre recherche.
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Puis-je rencontrer un animal avant l'adoption ?"
                                   title="Puis-je rencontrer un animal avant l'adoption ?">
                        Oui, nous encourageons les rencontres avant l'adoption pour vous assurer que l'animal est
                        compatible avec votre mode de vie.
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Les animaux sont-ils vaccinés et en bonne santé ?"
                                   title="Les animaux sont-ils vaccinés et en bonne santé ?">
                        Oui, tous les animaux proposés à l'adoption sont vaccinés, traités contre les parasites et en
                        bonne santé. Nous fournissons un certificat vétérinaire pour chaque adoption.
                    </AccordionItem>
                    <AccordionItem key="4"
                                   aria-label="Est-ce que je peux adopter un animal qui a des besoins spécifiques ?"
                                   title="Est-ce que je peux adopter un animal qui a des besoins spécifiques ?">
                        Oui, nous avons des animaux avec des besoins spécifiques. Si vous êtes prêt à fournir les soins
                        appropriés, n'hésitez pas à nous contacter pour plus d'informations.
                    </AccordionItem>
                </Accordion>

                <h1 className='font-extrabold text-4xl pt-5'>Processus d'Adoption</h1>
                <Accordion>
                    <AccordionItem key="1" aria-label="Quel est le processus d'adoption ?"
                                   title="Quel est le processus d'adoption ?">
                        Le processus commence par la création d'un profil sur notre plateforme, suivi d'une sélection de
                        l'animal, et une interview avec un membre de notre équipe pour vérifier vos aptitudes à
                        accueillir un animal.
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Faut-il un entretien pour adopter un animal ?"
                                   title="Faut-il un entretien pour adopter un animal ?">
                        Oui, un entretien est nécessaire pour s'assurer que l'animal sera dans un environnement sûr et
                        adapté. Cet entretien peut être réalisé en personne ou à distance.
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Comment suivre l'adoption de mon animal ?"
                                   title="Comment suivre l'adoption de mon animal ?">
                        Vous pourrez suivre l'évolution de l'adoption via notre plateforme, où vous serez informé à
                        chaque étape du processus.
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Y a-t-il une période d'essai pour l'adoption ?"
                                   title="Y a-t-il une période d'essai pour l'adoption ?">
                        Oui, nous proposons parfois une période d'essai pour vous permettre de vous assurer que l'animal
                        s'adapte bien à votre environnement.
                    </AccordionItem>
                </Accordion>

            </div>

        </>
    )
}
export default Apropos;