import { motion } from 'framer-motion'
import { MessageCircle, Truck, Sparkles, CalendarCheck, ArrowRight, Zap, ShieldCheck } from 'lucide-react'
import Reveal, { Stagger, Item } from './Reveal'

const STEPS = [
  {
    n: '1', Icon: MessageCircle, tag: 'Em 30 segundos',
    title: 'Você chama no WhatsApp',
    text: 'Manda o modelo do carro e o seu endereço. A gente responde na hora e confirma o melhor horário pra você.',
  },
  {
    n: '2', Icon: Truck, tag: 'Sem você sair de casa',
    title: 'A gente vai até você',
    text: 'Vamos à sua casa ou trabalho com tudo na mão: água, energia, equipamento e produtos. Zero deslocamento, zero fila.',
  },
  {
    n: '3', Icon: Sparkles, tag: 'Você só aproveita',
    title: 'Seu carro brilhando',
    text: 'Toca a sua vida enquanto cuidamos de tudo. No fim, você recebe o carro impecável — e só paga quando estiver pronto.',
  },
]

export default function ComoFunciona() {
  return (
    <section id="como" className="relative bg-paper text-ink py-20 md:py-24 overflow-hidden">
      <div className="container-cds">
        <Reveal>
          <p className="font-head uppercase tracking-[3px] text-sm text-[#8a7d6c]">
            <span className="script text-gold text-xl mr-1.5">Simples</span> assim
          </p>
          <h2 className="text-[2rem] md:text-5xl mt-2 text-ink">Você não vai até nós.<br className="hidden md:block" /> Nós vamos até você.</h2>
          <p className="max-w-2xl mt-4 text-[#5a5048]">
            Em 3 passos, sem complicação. Atendimento <span className="text-brand font-semibold">em domicílio</span> —
            você nem precisa interromper o seu dia.
          </p>
        </Reveal>

        <Stagger className="relative grid md:grid-cols-3 gap-7 md:gap-6 mt-14">
          {STEPS.map((s, i) => (
            <Item key={s.n} className="relative">
              {/* seta de fluxo entre os passos (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-[15px] z-20 -translate-y-1/2 w-8 h-8 rounded-full bg-brand text-white items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.25)] ring-4 ring-paper">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}

              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="group relative h-full bg-white rounded-2xl p-7 border border-paper2 shadow-[0_10px_30px_rgba(40,30,20,0.06)] hover:shadow-[0_20px_44px_rgba(40,30,20,0.14)] hover:border-flame/40 transition-shadow overflow-hidden"
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-flame to-gold" />

                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex w-14 h-14 rounded-xl bg-ink items-center justify-center group-hover:bg-brand transition-colors">
                    <s.Icon className="w-7 h-7 text-flame group-hover:text-white transition-colors" strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-2xl w-11 h-11 rounded-full border-2 border-brand/40 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors">
                    {s.n}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-head uppercase tracking-wider text-flame bg-flame/10 px-3 py-1 rounded-full mb-3">
                  <Zap className="w-3.5 h-3.5" /> {s.tag}
                </span>
                <h3 className="text-xl text-ink mb-2">{s.title}</h3>
                <p className="text-[#6a5f54] text-[0.97rem] m-0">{s.text}</p>
              </motion.div>
            </Item>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-4">
          <a
            href="/agendar.html"
            className="inline-flex items-center gap-2.5 bg-brand text-white font-head font-semibold uppercase tracking-wide text-base md:text-lg px-8 py-4 rounded-md shadow-[0_6px_0_#9e271e] hover:bg-branddark active:translate-y-0.5 active:shadow-[0_3px_0_#9e271e] transition-all"
          >
            <CalendarCheck className="w-5 h-5" /> Agendar em domicílio
          </a>
          <p className="flex items-center gap-2 text-sm text-[#8a7d6c]">
            <ShieldCheck className="w-4 h-4 text-flame" /> Sem compromisso · você só paga quando o serviço terminar
          </p>
        </Reveal>
      </div>
    </section>
  )
}
