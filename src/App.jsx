import { Home } from 'lucide-react'
import ScrollProgress from './components/ScrollProgress'
import Header from './components/Header'
import Hero from './components/Hero'
import ComoFunciona from './components/ComoFunciona'
import BeforeAfter from './components/BeforeAfter'
import Servicos from './components/Servicos'
import Domicilio from './components/Domicilio'
import Galeria from './components/Galeria'
import Prova from './components/Prova'
import Sobre from './components/Sobre'
import Contato from './components/Contato'
import Faq from './components/Faq'
import Footer from './components/Footer'
import WhatsappFloat from './components/WhatsappFloat'

function TopPromo() {
  return (
    <div className="bg-brand text-white text-center font-head text-[0.8rem] md:text-sm tracking-wide py-2 px-4 flex items-center justify-center gap-2">
      <Home className="w-4 h-4 hidden sm:block" />
      <span>
        <strong className="font-semibold">Atendemos em domicílio</strong> · Primeira lavagem com 10% OFF — agende
        pelo WhatsApp
      </span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <TopPromo />
      <Header />
      <main>
        <Hero />
        <ComoFunciona />
        <BeforeAfter />
        <Servicos />
        <Domicilio />
        <Galeria />
        <Prova />
        <Sobre />
        <Contato />
        <Faq />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  )
}
