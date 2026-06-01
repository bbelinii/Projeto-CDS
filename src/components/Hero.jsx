import { motion } from 'framer-motion'
import { Home, MapPin, Star, Hand, CalendarCheck } from 'lucide-react'
import WaIcon from './WaIcon'
import { wa } from '../data'

const EASE = [0.22, 1, 0.36, 1]
const up = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const TRUST = [
  { icon: MapPin, label: 'Vamos até você' },
  { icon: Star, label: 'Avaliações no Google' },
  { icon: Hand, label: 'Feito à mão, com garantia' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden grain bg-ink pt-12 md:pt-16 pb-0">
      {/* raios de sol girando devagar */}
      <motion.div
        aria-hidden
        className="rays absolute -top-1/3 inset-x-0 h-[140%] pointer-events-none"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{ rotate: { duration: 140, ease: 'linear', repeat: Infinity }, opacity: { duration: 1.2 } }}
        style={{ transformOrigin: '50% 32%' }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[16%] w-[520px] h-[520px] -translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,116,42,.22) 0%, transparent 60%)' }}
      />

      <motion.div
        className="container-cds relative z-10 text-center pb-16"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* badge domicílio */}
        <motion.div variants={up} className="flex justify-center">
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 bg-brand/15 border border-brand/40 text-cream font-head uppercase tracking-wide text-xs md:text-sm px-4 py-2 rounded-full"
          >
            <Home className="w-4 h-4 text-flame" />
            Lavamos o seu carro onde você estiver
          </motion.span>
        </motion.div>

        <motion.p variants={up} className="font-head uppercase tracking-[3px] text-sm text-creamsoft mt-6">
          <span className="script text-gold text-xl mr-1.5">Desde 2025</span> · Estética Automotiva
        </motion.p>

        <motion.h1 variants={up} className="text-cream text-[2.9rem] leading-[0.98] md:text-7xl mt-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          Seu carro novo,<br />
          <span className="text-brand">sem sair de casa.</span>
        </motion.h1>

        <motion.p variants={up} className="max-w-xl mx-auto mt-6 text-lg text-creamsoft">
          Lavagem detalhada e higienização <strong className="text-cream">em domicílio</strong>. Você agenda
          pelo WhatsApp e a CDS Garage vai até a sua casa ou trabalho — com tudo na mão.
        </motion.p>

        <motion.div variants={up} className="flex flex-wrap justify-center gap-3.5 mt-8">
          <a
            href="/agendar.html"
            className="inline-flex items-center gap-2.5 bg-brand text-white font-head font-semibold uppercase tracking-wide text-base md:text-lg px-7 py-4 rounded-md shadow-[0_6px_0_#9e271e] hover:bg-branddark active:translate-y-0.5 active:shadow-[0_3px_0_#9e271e] transition-all"
          >
            <CalendarCheck className="w-5 h-5" /> Agendar em domicílio
          </a>
          <a
            href={wa('Olá, CDS Garage! Quero agendar uma lavagem em domicílio. Meu endereço é:')}
            target="_blank" rel="noopener"
            className="inline-flex items-center gap-2.5 bg-wa text-[#06351c] font-head font-semibold uppercase tracking-wide text-base md:text-lg px-7 py-4 rounded-md shadow-[0_6px_0_#1da851] hover:bg-[#2ee06f] active:translate-y-0.5 active:shadow-[0_3px_0_#1da851] transition-all"
          >
            <WaIcon className="w-5 h-5" /> Falar no WhatsApp
          </a>
        </motion.div>

        <motion.ul variants={up} className="flex flex-wrap justify-center gap-x-7 gap-y-3 mt-9 font-head uppercase tracking-wide text-xs md:text-sm text-creamsoft">
          {TRUST.map((t) => (
            <li key={t.label} className="flex items-center gap-2">
              <t.icon className="w-4 h-4 text-flame" /> {t.label}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* faixa quadriculada */}
      <div className="checker h-[22px] border-t-[3px] border-brand opacity-90" aria-hidden />
    </section>
  )
}
