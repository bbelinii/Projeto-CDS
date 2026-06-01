import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaIcon from './WaIcon'
import { wa } from '../data'

export default function WhatsappFloat() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={wa('Olá, CDS Garage! Quero agendar um serviço em domicílio.')}
          target="_blank" rel="noopener"
          aria-label="WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          className="fixed right-4 bottom-4 z-[60] group"
        >
          <span className="absolute inset-0 rounded-full bg-wa animate-ping opacity-40" aria-hidden />
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-wa shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            <WaIcon className="w-8 h-8 text-white" />
          </span>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink text-cream font-head uppercase tracking-wide text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
            Agende em domicílio
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
