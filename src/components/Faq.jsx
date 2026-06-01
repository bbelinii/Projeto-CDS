import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import Reveal from './Reveal'
import { FAQS } from '../data'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-paper text-ink py-20 md:py-24">
      <div className="container-cds">
        <Reveal>
          <p className="font-head uppercase tracking-[3px] text-sm text-[#8a7d6c]">
            <span className="script text-gold text-xl mr-1.5">Ainda na</span> dúvida?
          </p>
          <h2 className="text-[2rem] md:text-5xl mt-2 text-ink">Perguntas frequentes</h2>
        </Reveal>

        <div className="max-w-3xl mt-9">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={i} delay={i * 0.05} className="mb-3">
                <div className="bg-white border border-paper2 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-head font-semibold text-[1.05rem] text-ink"
                    aria-expanded={isOpen}
                  >
                    {item.q}
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-brand shrink-0">
                      <Plus className="w-6 h-6" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[#6a5f54] m-0">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
