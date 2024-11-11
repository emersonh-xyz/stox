import { BarChart3, Globe, Rocket, Smartphone, Zap, Users, Shield, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">About MoonstoX</h1>
        <p className="text-xl text-muted-foreground">Blast off to Intelligent Stock Market Investing</p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          At MoonstoX, we're on a mission to democratize stock market investing. We believe that everyone should have
          access to the tools and information needed to make informed investment decisions. Our app combines technology with user-friendly design to empower both novice and experienced investors.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Real-time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              Stay updated with live stock prices and market movements from global exchanges.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Custom Interface</CardTitle>
            </CardHeader>
            <CardContent>
              Benefit from wide options for personalization to make the interface to whatever is desired.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Global Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              View current and trending news from all around the world, expanding your investment horizons.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Smartphone className="h-8 w-8 text-primary mb-2" />
              <CardTitle>User Friendly Design</CardTitle>
            </CardHeader>
            <CardContent>
              Enjoy a seamless experience on any device with our responsive, well optimized and customizable interface.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>High Level Security</CardTitle>
            </CardHeader>
            <CardContent>
              Rest easy knowing your data and investments are protected by state-of-the-art security measures.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Educational Resources</CardTitle>
            </CardHeader>
            <CardContent>
              Access a wealth of learning materials to enhance your investment knowledge and skills.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {[
            { name: "Josh Lytle", role: "CEO & Founder" },
            { name: "Grace Villar-Matamoros", role: "CTO"},
            { name: "Devyansh Tailor", role: "Head of Product" },
            { name: "Emerson Hicks", role: "Lead Developer" },
          ].map((member) => (
            <div key={member.name} className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is MoonstoX suitable for beginners?</AccordionTrigger>
            <AccordionContent>
              Yes, Moonstox is designed to be user-friendly for both beginners and experienced investors. We offer
              comprehensive educational resources and a intuitive interface to help newcomers get started.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my data safe with MoonstoX?</AccordionTrigger>
            <AccordionContent>
              Absolutely. We employ security measures to protect your data and investments. This includes
              encryption, secure servers, and regular security audits to ensure your information remains safe.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <footer className="text-center text-sm text-muted-foreground">
        <p>© 2024 Moonstox. All rights reserved.</p>
      </footer>
    </div>
  )
}