import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import WaIcon from './WaIcon'
import { wa } from '../data'

const LINKS = [
  { href: '#como', label: 'Como funciona' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#antes', label: 'Antes & Depois' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'bg-ink/90 border-ink3 backdrop-blur-md' : 'bg-ink border-ink3/40'
      }`}
    >
      <div className="container-cds flex items-center justify-between py-2.5">
        <a href="#inicio" aria-label="CDS Garage" className="shrink-0">
          <img
            src="/imagens/logo-cds.png"
            alt="CDS Garage — Estética Automotiva"
            className={`w-auto transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${scrolled ? 'h-12' : 'h-16'}`}
          />
        </a>

        {/* nav desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-head uppercase tracking-wide text-sm text-cream/85 hover:text-flame transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/agendar.html"
            className="inline-flex items-center gap-2 bg-brand text-white font-head font-semibold uppercase tracking-wide text-sm px-4 py-2.5 rounded-md hover:bg-branddark transition-colors"
          >
            Agendar
          </a>
          <a
            href={wa('Olá, CDS Garage! Quero agendar um serviço em domicílio.')}
            target="_blank" rel="noopener"
            aria-label="WhatsApp"
            className="inline-flex items-center justify-center bg-wa text-[#06351c] w-11 h-11 rounded-md shadow-[0_5px_0_#1da851] hover:bg-[#2ee06f] active:translate-y-0.5 active:shadow-[0_2px_0_#1da851] transition-all"
          >
            <WaIcon className="w-5 h-5" />
          </a>
        </nav>

        {/* botão mobile */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 text-cream"
          aria-label="Abrir menu"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* drawer mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 md:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.32 }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-[320px] bg-ink2 border-l border-ink3 shadow-2xl z-50 p-7 pt-6 md:hidden flex flex-col gap-1"
            >
              <button
                onClick={() => setOpen(false)}
                className="self-end p-2 text-cream mb-4"
                aria-label="Fechar menu"
              >
                <X className="w-7 h-7" />
              </button>
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-head uppercase tracking-wide text-lg text-cream py-2 border-b border-ink3/60 hover:text-flame transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/agendar.html"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-brand text-white font-head font-semibold uppercase tracking-wide px-5 py-3.5 rounded-md"
              >
                Agendar online
              </a>
              <a
                href={wa('Olá, CDS Garage! Quero agendar um serviço em domicílio.')}
                target="_blank" rel="noopener"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 bg-wa text-[#06351c] font-head font-semibold uppercase tracking-wide px-5 py-3.5 rounded-md"
              >
                <WaIcon className="w-5 h-5" /> Falar no WhatsApp
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
