import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import Reveal from './Reveal'

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)
  const dragging = useRef(false)

  const update = (clientX) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    let p = ((clientX - r.left) / r.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }

  return (
    <section id="antes" className="bg-ink2 py-20 md:py-24">
      <div className="container-cds">
        <Reveal>
          <p className="font-head uppercase tracking-[3px] text-sm text-creamsoft">
            <span className="script text-flame text-xl mr-1.5">A prova</span> está no resultado
          </p>
          <h2 className="text-[2rem] md:text-5xl mt-2 text-cream">Antes &amp; Depois</h2>
          <p className="max-w-2xl mt-4 text-creamsoft">
            Arraste a barrinha e veja a diferença. <span className="text-flame">Troque pelas suas próprias fotos.</span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-9">
          <div
            ref={ref}
            className="relative max-w-3xl mx-auto rounded-lg overflow-hidden border-[3px] border-ink3 shadow-2xl select-none cursor-ew-resize touch-none aspect-[16/10]"
            onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX) }}
            onPointerMove={(e) => { if (dragging.current) update(e.clientX) }}
            onPointerUp={() => { dragging.current = false }}
            onPointerCancel={() => { dragging.current = false }}
          >
            {/* depois (fundo) */}
            <img src="/imagens/depois.jpg" alt="Depois da lavagem" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
            {/* antes (clipado) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img src="/imagens/antes.jpg" alt="Antes da lavagem" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
            </div>

            {/* linha divisória */}
            <div className="absolute top-0 bottom-0 w-[3px] bg-cream -translate-x-1/2 pointer-events-none" style={{ left: `${pos}%` }} />
            {/* alça */}
            <motion.div
              className="absolute top-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand border-[3px] border-cream flex items-center justify-center shadow-lg pointer-events-none"
              style={{ left: `${pos}%` }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MoveHorizontal className="w-6 h-6 text-white" />
            </motion.div>

            {/* tags */}
            <span className="absolute bottom-3.5 left-3.5 font-head uppercase tracking-wider text-xs px-3 py-1.5 rounded bg-black/60 text-white pointer-events-none">Antes</span>
            <span className="absolute bottom-3.5 right-3.5 font-head uppercase tracking-wider text-xs px-3 py-1.5 rounded bg-brand text-white pointer-events-none">Depois</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
