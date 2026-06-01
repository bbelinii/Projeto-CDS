import { motion } from 'framer-motion'
import { Home, Clock, MapPin, ShieldCheck, CalendarCheck } from 'lucide-react'
import Reveal from './Reveal'
import { CIDADE } from '../data'

const BENEFITS = [
  { Icon: Clock, title: 'Economize seu tempo', text: 'Enquanto você trabalha ou descansa, a gente cuida do carro. Zero deslocamento, zero fila.' },
  { Icon: Home, title: 'Na sua casa ou trabalho', text: 'Atendemos na garagem, na empresa ou no condomínio. Você escolhe o lugar e o horário.' },
  { Icon: ShieldCheck, title: 'Estrutura completa', text: 'Levamos água, energia, equipamento e produtos profissionais. Não dá trabalho nenhum pra você.' },
  { Icon: MapPin, title: 'Pertinho de você', text: 'Atendemos toda a região de ' + CIDADE + '. Mande seu endereço e a gente confirma na hora.' },
]

export default function Domicilio() {
  return (
    <section className="relative overflow-hidden grain bg-ink py-20 md:py-24">
      <div className="absolute inset-0 rays opacity-60 pointer-events-none" aria-hidden />
      <div className="container-cds relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* texto */}
        <div>
          <Reveal>
            <p className="font-head uppercase tracking-[3px] text-sm text-creamsoft">
              <span className="script text-gold text-xl mr-1.5">A comodidade</span> que você merece
            </p>
            <h2 className="text-[2rem] md:text-5xl mt-2 text-cream">
              A CDS vai<br /><span className="text-brand">até a sua porta!</span>
            </h2>
            <p className="max-w-xl mt-4 text-creamsoft">
              Estética automotiva sem você sair do lugar. A CDS Garage leva tudo até você e devolve seu carro
              brilhando — do jeito que ele merece.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6 mt-9">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="flex gap-3.5">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand/15 border border-brand/35 flex items-center justify-center">
                  <b.Icon className="w-5 h-5 text-flame" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-base text-cream font-head uppercase tracking-wide mb-1">{b.title}</h3>
                  <p className="text-sm text-creamsoft m-0">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-9">
            <a
              href="/agendar.html"
              className="inline-flex items-center gap-2.5 bg-brand text-white font-head font-semibold uppercase tracking-wide text-base md:text-lg px-7 py-4 rounded-md shadow-[0_6px_0_#9e271e] hover:bg-branddark active:translate-y-0.5 active:shadow-[0_3px_0_#9e271e] transition-all"
            >
              <CalendarCheck className="w-5 h-5" /> Quero atendimento em casa
            </a>
          </Reveal>
        </div>

        {/* visual */}
        <Reveal delay={0.1} className="relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative rounded-2xl overflow-hidden border-[3px] border-ink3 shadow-2xl"
          >
            <img src="/imagens/depois.jpg" alt="Carro lavado em domicílio" className="w-full aspect-[16/11] object-cover" />
            <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-ink/85 backdrop-blur px-3.5 py-2 rounded-full font-head uppercase tracking-wide text-xs text-cream border border-ink3">
              <Home className="w-4 h-4 text-flame" /> Atendimento em domicílio
            </span>
          </motion.div>
          {/* selo flutuante */}
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.3 }}
            className="absolute -bottom-5 -left-3 md:-left-6 bg-brand text-white rounded-xl px-5 py-3 shadow-xl border-2 border-cream"
          >
            <span className="block font-display text-2xl leading-none">CDS</span>
            <span className="block font-head uppercase text-[0.62rem] tracking-widest">vai até você</span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
