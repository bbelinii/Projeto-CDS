import { Instagram } from 'lucide-react'
import WaIcon from './WaIcon'
import { wa, INSTAGRAM } from '../data'

const LINKS = [
  { href: '#como', label: 'Como funciona' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#antes', label: 'Antes & Depois' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0d0b0a] text-cream pt-12">
      {/* faixa quadriculada fina */}
      <div className="checker h-2.5 opacity-80" aria-hidden />
      <div className="container-cds flex flex-wrap items-center justify-between gap-7 py-9">
        <div>
          <img src="/imagens/logo-cds.png" alt="CDS Garage" className="h-20 mb-3" />
          <p className="font-head uppercase tracking-[2px] text-xs text-creamsoft m-0">Estética Automotiva · Em domicílio · Desde 2025</p>
        </div>

        <nav className="flex flex-wrap gap-5">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="font-head uppercase tracking-wide text-sm text-creamsoft hover:text-flame transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-ink3 flex items-center justify-center hover:bg-brand transition-colors">
            <Instagram className="w-5 h-5 text-cream" />
          </a>
          <a href={wa('Olá, CDS Garage!')} target="_blank" rel="noopener" aria-label="WhatsApp"
            className="w-10 h-10 rounded-full bg-ink3 flex items-center justify-center hover:bg-wa transition-colors">
            <WaIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="border-t border-[#1c1815] py-4 text-center text-xs text-[#7a6f63]">
        © {year} CDS Garage. Todos os direitos reservados.
      </div>
    </footer>
  )
}
