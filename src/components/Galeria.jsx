import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import Reveal, { Stagger, Item } from './Reveal'
import { INSTAGRAM } from '../data'

// Troque cada "src" pelas fotos reais dos seus trabalhos (coloque em /public/imagens/)
const FOTOS = [
  { src: '/imagens/galeria-1.jpg', label: 'Lavagem detalhada' },
  { src: '/imagens/galeria-2.jpg', label: 'Higienização interna' },
  { src: '/imagens/galeria-3.jpg', label: 'Polimento técnico' },
  { src: '/imagens/galeria-4.jpg', label: 'Cristalização de vidros' },
  { src: '/imagens/galeria-5.jpg', label: 'Enceramento & proteção' },
  { src: '/imagens/galeria-6.jpg', label: 'Estética completa' },
]

export default function Galeria() {
  return (
    <section id="galeria" className="bg-ink py-20 md:py-24">
      <div className="container-cds">
        <Reveal>
          <p className="font-head uppercase tracking-[3px] text-sm text-creamsoft">
            <span className="script text-flame text-xl mr-1.5">Nosso</span> trabalho
          </p>
          <h2 className="text-[2rem] md:text-5xl mt-2 text-cream">Galeria</h2>
          <p className="max-w-2xl mt-4 text-creamsoft">
            Capricho em cada detalhe — do clássico ao carro do dia a dia.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-3.5 md:gap-4 mt-10" gap={0.06}>
          {FOTOS.map((f) => (
            <Item key={f.src}>
              <motion.figure
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-ink3 cursor-pointer"
              >
                <img
                  src={f.src}
                  alt={`CDS Garage — ${f.label}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <span className="font-head uppercase tracking-wide text-xs md:text-sm text-cream flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-flame" /> {f.label}
                  </span>
                </figcaption>
              </motion.figure>
            </Item>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="text-center mt-9">
          <a
            href={INSTAGRAM} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 border-2 border-cream/35 text-cream font-head font-semibold uppercase tracking-wide px-6 py-3.5 rounded-md hover:border-flame hover:text-flame transition-colors"
          >
            <Instagram className="w-5 h-5" /> Ver mais no Instagram
          </a>
        </Reveal>
      </div>
    </section>
  )
}
