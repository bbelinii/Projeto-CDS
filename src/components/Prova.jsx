import { Star, Quote } from 'lucide-react'
import Reveal, { Stagger, Item } from './Reveal'

const SLOTS = [0, 1, 2]

export default function Prova() {
  return (
    <section id="prova" className="bg-ink2 py-20 md:py-24">
      <div className="container-cds text-center">
        <Reveal>
          <div className="flex justify-center gap-1 text-[#ffc83d] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-7 h-7 fill-[#ffc83d]" />
            ))}
          </div>
          <h2 className="text-2xl md:text-4xl text-cream">O que dizem sobre o nosso trabalho</h2>
          <p className="text-creamsoft mt-2 max-w-xl mx-auto">
            Troque pelos depoimentos reais dos seus clientes do Google — não inventamos nenhum.
          </p>
        </Reveal>

        <Stagger className="grid md:grid-cols-3 gap-5 mt-10 text-left" gap={0.1}>
          {SLOTS.map((i) => (
            <Item key={i}>
              <blockquote className="h-full bg-ink rounded-xl p-6 border border-ink3 border-t-[3px] border-t-flame">
                <Quote className="w-7 h-7 text-flame/60 mb-3" />
                <p className="text-cream italic mb-4">« Espaço para o depoimento real do cliente. »</p>
                <footer className="font-head uppercase tracking-wide text-sm text-creamsoft">— Nome do cliente</footer>
              </blockquote>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
