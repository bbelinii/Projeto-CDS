import { motion } from 'framer-motion'
import Reveal, { Stagger, Item } from './Reveal'
import { Icon } from '../lib/icons'
import WaIcon from './WaIcon'
import { SERVICES, wa } from '../data'

export default function Servicos() {
  return (
    <section id="servicos" className="bg-paper text-ink py-20 md:py-24">
      <div className="container-cds">
        <Reveal>
          <p className="font-head uppercase tracking-[3px] text-sm text-[#8a7d6c]">
            <span className="script text-gold text-xl mr-1.5">O que</span> fazemos
          </p>
          <h2 className="text-[2rem] md:text-5xl mt-2 text-ink">Nossos serviços</h2>
          <p className="max-w-2xl mt-4 text-[#5a5048]">
            Todos com <span className="text-brand font-semibold">atendimento em domicílio</span> — você escolhe o
            lugar. Escolha abaixo e peça seu orçamento direto no WhatsApp.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-11" gap={0.08}>
          {SERVICES.map((s) => (
            <Item key={s.title}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full bg-white rounded-xl p-6 border border-paper2 shadow-[0_8px_24px_rgba(40,30,20,0.06)] flex flex-col"
              >
                <span className="w-14 h-14 rounded-[10px] bg-ink flex items-center justify-center mb-4">
                  <Icon name={s.icon} className="w-7 h-7 text-flame" strokeWidth={1.7} />
                </span>
                <h3 className="text-xl text-ink mb-2">{s.title}</h3>
                <p className="text-[#6a5f54] text-[0.97rem] mb-5">{s.desc}</p>
                <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
                  <span className="font-head uppercase tracking-wide text-xs text-[#8a7d6c]">
                    a partir de <strong className="text-ink text-xl">{s.price}</strong>
                  </span>
                  <a
                    href={wa(s.wa)} target="_blank" rel="noopener"
                    className="font-head font-semibold uppercase text-xs tracking-wide text-brand hover:text-branddark"
                  >
                    Pedir orçamento ›
                  </a>
                </div>
              </motion.article>
            </Item>
          ))}
        </Stagger>

        {/* Plano mensal — recorrência */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden mt-9 bg-ink text-cream rounded-xl px-8 py-8 flex items-center justify-between gap-6 flex-wrap">
            <div className="relative z-10">
              <h3 className="text-2xl text-cream mb-1.5">Plano Mensal CDS</h3>
              <p className="text-creamsoft max-w-xl m-0">
                Seu carro sempre limpo, com preço fixo, desconto e atendimento em domicílio agendado. Para quem
                não abre mão do brilho.
              </p>
            </div>
            <a
              href={wa('Olá, CDS Garage! Quero saber sobre o Plano Mensal em domicílio.')}
              target="_blank" rel="noopener"
              className="relative z-10 inline-flex items-center gap-2 bg-cream text-ink font-head font-semibold uppercase tracking-wide px-6 py-3.5 rounded-md hover:bg-white transition-colors"
            >
              Quero meu plano
            </a>
            <div className="absolute -right-8 -top-8 w-40 h-40 opacity-[0.12]" aria-hidden
              style={{ background: 'repeating-conic-gradient(#e8742a 0% 25%, transparent 0% 50%) 0 0 / 20px 20px' }} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
