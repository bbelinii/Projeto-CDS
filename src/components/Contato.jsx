import { MapPin, Phone, Clock, Instagram, CalendarCheck } from 'lucide-react'
import Reveal from './Reveal'
import WaIcon from './WaIcon'
import { wa, INSTAGRAM, INSTAGRAM_HANDLE, CIDADE } from '../data'

export default function Contato() {
  return (
    <section id="contato" className="bg-ink py-20 md:py-24">
      <div className="container-cds">
        <Reveal>
          <p className="font-head uppercase tracking-[3px] text-sm text-creamsoft">
            <span className="script text-flame text-xl mr-1.5">Bora</span> agendar?
          </p>
          <h2 className="text-[2rem] md:text-5xl mt-2 text-cream">Fale com a CDS Garage</h2>
          <p className="max-w-2xl mt-4 text-creamsoft">
            Atendemos <span className="text-flame">em domicílio</span> em {CIDADE}. Chame no WhatsApp, mande seu
            endereço e agende sem sair de casa.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-9 mt-10 items-start">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <a
                href="/agendar.html"
                className="inline-flex items-center gap-2.5 bg-brand text-white font-head font-semibold uppercase tracking-wide text-base md:text-lg px-7 py-4 rounded-md shadow-[0_6px_0_#9e271e] hover:bg-branddark active:translate-y-0.5 active:shadow-[0_3px_0_#9e271e] transition-all"
              >
                <CalendarCheck className="w-5 h-5" /> Agendar online
              </a>
              <a
                href={wa('Olá, CDS Garage! Quero agendar um serviço em domicílio. Meu endereço é:')}
                target="_blank" rel="noopener"
                className="inline-flex items-center gap-2.5 bg-wa text-[#06351c] font-head font-semibold uppercase tracking-wide text-base md:text-lg px-7 py-4 rounded-md shadow-[0_6px_0_#1da851] hover:bg-[#2ee06f] active:translate-y-0.5 active:shadow-[0_3px_0_#1da851] transition-all"
              >
                <WaIcon className="w-5 h-5" /> Chamar no WhatsApp
              </a>
            </div>

            <ul className="mt-7 space-y-0">
              <li className="flex items-center gap-3 py-3 border-b border-ink3">
                <MapPin className="w-5 h-5 text-flame shrink-0" />
                <span className="text-cream">Atendimento em domicílio — {CIDADE} <em className="text-creamsoft not-italic text-sm">(edite a área)</em></span>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-ink3">
                <Phone className="w-5 h-5 text-flame shrink-0" />
                <span className="text-cream">(00) 00000-0000 <em className="text-creamsoft not-italic text-sm">(edite)</em></span>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-ink3">
                <Clock className="w-5 h-5 text-flame shrink-0" />
                <span className="text-cream">Seg a Sáb, 8h–18h <em className="text-creamsoft not-italic text-sm">(edite)</em></span>
              </li>
              <li className="flex items-center gap-3 py-3 border-b border-ink3">
                <Instagram className="w-5 h-5 text-flame shrink-0" />
                <a href={INSTAGRAM} target="_blank" rel="noopener" className="text-flame hover:underline">{INSTAGRAM_HANDLE}</a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Cole o iframe do Google Maps aqui (Maps › Compartilhar › Incorporar) */}
            <div className="h-full min-h-[300px] rounded-lg border-2 border-dashed border-ink3 bg-ink2 flex flex-col items-center justify-center gap-3 text-creamsoft font-head uppercase tracking-wide">
              <MapPin className="w-12 h-12 text-ink3" />
              <span>Seu mapa do Google aqui</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
