import { motion } from 'framer-motion'
import Reveal from './Reveal'
import WaIcon from './WaIcon'
import { wa } from '../data'

export default function Sobre() {
  return (
    <section id="sobre" className="bg-paper text-ink py-20 md:py-24">
      <div className="container-cds grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="font-head uppercase tracking-[3px] text-sm text-[#8a7d6c]">
            <span className="script text-gold text-xl mr-1.5">Quem</span> somos
          </p>
          <h2 className="text-[2rem] md:text-5xl mt-2 text-ink">A CDS Garage</h2>
          <p className="mt-4 text-[#5a5048]">
            A CDS Garage nasceu em 2025 da paixão por carros e pelo capricho no acabamento. Do clássico de
            coleção ao carro do dia a dia, cada veículo recebe atenção de verdade.
          </p>
          <p className="mt-4 text-[#5a5048]">
            E o melhor: levamos esse cuidado <span className="text-brand font-semibold">até você</span>. Produtos
            profissionais, técnica e dedicação — com a comodidade de não precisar sair de casa.
            <em className="text-[#8a7d6c] not-italic"> (Conte aqui a sua história e o que te diferencia.)</em>
          </p>
          <a
            href={wa('Olá, CDS Garage! Quero conhecer melhor os serviços em domicílio.')}
            target="_blank" rel="noopener"
            className="mt-6 inline-flex items-center gap-2.5 bg-wa text-[#06351c] font-head font-semibold uppercase tracking-wide px-6 py-3.5 rounded-md shadow-[0_6px_0_#1da851] hover:bg-[#2ee06f] active:translate-y-0.5 active:shadow-[0_3px_0_#1da851] transition-all"
          >
            <WaIcon className="w-5 h-5" /> Fale com a gente
          </a>
        </Reveal>

        <Reveal delay={0.12} className="flex justify-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative bg-ink rounded-2xl p-7 border-[3px] border-ink3 shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 40%, rgba(232,116,42,.18), transparent 70%)' }} />
            <img src="/imagens/logo-cds.png" alt="CDS Garage" className="relative max-w-[300px] w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
