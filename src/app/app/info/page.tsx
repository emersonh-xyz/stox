'use client';

import { BarChart3, Globe, Rocket, Smartphone, Zap, Shield, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { getLocaleLanguage } from "@/app/utility/language"

export default function AboutPage() {

  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(getLocaleLanguage());
  }, [])

  if (language === 'fr') {
    return (
      <div className="w-full mx-auto max-w-screen-lg px-4 py-8 min-h-screen overflow-y-auto">
        <header className="text-center mb-8">
          <Rocket className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold mb-2">À propos de StoX</h1>
          <p className="text-lg text-muted-foreground">Décollez vers l'investissement intelligent en bourse ou autre</p>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Notre Mission</h2>
          <p className="text-base">
            Chez StoX, nous avons pour mission de démocratiser l'investissement en bourse. Nous croyons que tout le monde devrait avoir
            accès aux outils et aux informations nécessaires pour prendre des décisions d'investissement éclairées. Notre application combine
            la technologie avec un design convivial pour autonomiser les investisseurs novices et expérimentés.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Fonctionnalités Clés</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <BarChart3 className="h-6 w-6 text-primary mb-1" />
                <CardTitle>Suivi en temps réel</CardTitle>
              </CardHeader>
              <CardContent>
                Restez informé des prix des actions en direct et des mouvements du marché des bourses mondiales.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-6 w-6 text-primary mb-1" />
                <CardTitle>Interface Personnalisée</CardTitle>
              </CardHeader>
              <CardContent>
                Bénéficiez de nombreuses options de personnalisation pour rendre l'interface à ce que vous désirez.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-6 w-6 text-primary mb-1" />
                <CardTitle>Couverture Mondiale</CardTitle>
              </CardHeader>
              <CardContent>
                Consultez les actualités actuelles et tendances du monde entier, élargissant vos horizons d'investissement.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Smartphone className="h-6 w-6 text-primary mb-1" />
                <CardTitle>Design Convivial</CardTitle>
              </CardHeader>
              <CardContent>
                Profitez d'une expérience fluide sur n'importe quel appareil avec notre interface responsive, bien optimisée et personnalisable.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-6 w-6 text-primary mb-1" />
                <CardTitle>Sécurité de Haut Niveau</CardTitle>
              </CardHeader>
              <CardContent>
                Dormez tranquille en sachant que vos données et investissements sont protégés par des mesures de sécurité de pointe.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="h-6 w-6 text-primary mb-1" />
                <CardTitle>Ressources Éducatives</CardTitle>
              </CardHeader>
              <CardContent>
                Accédez à une multitude de supports pédagogiques pour enrichir vos connaissances et compétences en matière d'investissement.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Rencontrez Notre Équipe</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {[
              { name: "Josh Lytle", role: "PDG & Fondateur" },
              { name: "Grace Villar-Matamoros", role: "CTO" },
              { name: "Devyansh Tailor", role: "Chef de Produit" },
              { name: "Emerson Hicks", role: "Développeur Principal" },
            ].map((member) => (
              <div key={member.name} className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={''} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Questions Fréquemment Posées</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>StoX convient-il aux débutants ?</AccordionTrigger>
              <AccordionContent>
                Oui, StoX est conçu pour être convivial à la fois pour les débutants et les investisseurs expérimentés. Nous offrons

                des ressources éducatives complètes et une interface intuitive pour aider les nouveaux venus à démarrer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger> Mes données sont-elles en sécurité avec StoX ?</AccordionTrigger>
              <AccordionContent>
                Absolument. Nous employons des mesures de sécurité pour protéger vos données et investissements. Cela inclut
                le cryptage, des serveurs sécurisés et des audits de sécurité réguliers pour garantir que vos informations restent en sécurité.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <footer className="text-center text-xs text-muted-foreground">
          <p>© 2024 StoX. Tous droits réservés.</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto max-w-screen-lg px-4 py-8 min-h-screen overflow-y-auto">
      <header className="text-center mb-8">
        <Rocket className="h-10 w-10 text-primary mx-auto mb-3" />
        <h1 className="text-3xl font-bold mb-2">About StoX</h1>
        <p className="text-lg text-muted-foreground">Blast off to Intelligent Stock Market Investing or Whatever</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
        <p className="text-base">
          At StoX, we're on a mission to democratize stock market investing. We believe that everyone should have
          access to the tools and information needed to make informed investment decisions. Our app combines technology with user-friendly design to empower both novice and experienced investors.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <BarChart3 className="h-6 w-6 text-primary mb-1" />
              <CardTitle>Real-time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              Stay updated with live stock prices and market movements from global exchanges.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-6 w-6 text-primary mb-1" />
              <CardTitle>Custom Interface</CardTitle>
            </CardHeader>
            <CardContent>
              Benefit from wide options for personalization to make the interface to whatever is desired.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="h-6 w-6 text-primary mb-1" />
              <CardTitle>Global Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              View current and trending news from all around the world, expanding your investment horizons.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Smartphone className="h-6 w-6 text-primary mb-1" />
              <CardTitle>User Friendly Design</CardTitle>
            </CardHeader>
            <CardContent>
              Enjoy a seamless experience on any device with our responsive, well-optimized, and customizable interface.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-6 w-6 text-primary mb-1" />
              <CardTitle>High Level Security</CardTitle>
            </CardHeader>
            <CardContent>
              Rest easy knowing your data and investments are protected by state-of-the-art security measures.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BookOpen className="h-6 w-6 text-primary mb-1" />
              <CardTitle>Educational Resources</CardTitle>
            </CardHeader>
            <CardContent>
              Access a wealth of learning materials to enhance your investment knowledge and skills.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Meet Our Team</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {[
            { name: "Josh Lytle", role: "CEO & Founder" },
            { name: "Grace Villar-Matamoros", role: "CTO" },
            { name: "Devyansh Tailor", role: "Head of Product" },
            { name: "Emerson Hicks", role: "Lead Developer" },
          ].map((member) => (
            <div key={member.name} className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={''} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is StoX suitable for beginners?</AccordionTrigger>
            <AccordionContent>
              Yes, StoX is designed to be user-friendly for both beginners and experienced investors. We offer
              comprehensive educational resources and an intuitive interface to help newcomers get started.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my data safe with StoX?</AccordionTrigger>
            <AccordionContent>
              Absolutely. We employ security measures to protect your data and investments. This includes
              encryption, secure servers, and regular security audits to ensure your information remains safe.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <footer className="text-center text-xs text-muted-foreground">
        <p>© 2024 StoX. All rights reserved.</p>
      </footer>
    </div>
  )
}
