import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  ArrowLeft, ArrowRight, Check, Home, Clock, Car, MapPin, User, Phone,
  CalendarPlus, ShieldCheck, CheckCircle2,
} from 'lucide-react'
import Calendar from './Calendar'
import WaIcon from './WaIcon'
import { Icon } from '../lib/icons'
import { SERVICES, DURACOES, gerarHorarios, mensagemAgendamento, wa, CIDADE } from '../data'

const STEPS = [
  { n: 1, label: 'Serviço' },
  { n: 2, label: 'Data e hora' },
  { n: 3, label: 'Seus dados' },
  { n: 4, label: 'Confirmar' },
]

function gcalLink(servico, date, hora) {
  if (!date || !hora) return '#'
  const [h, m] = hora.split(':').map(Number)
  const start = new Date(date); start.setHours(h, m || 0, 0, 0)
  const end = new Date(start); end.setHours(start.getHours() + 2)
  const fmt = (d) => format(d, "yyyyMMdd'T'HHmmss")
  const text = encodeURIComponent(`CDS Garage — ${servico}`)
  const details = encodeURIComponent('Agendamento CDS Garage (atendimento em domicílio). Confirmação pelo WhatsApp.')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${fmt(start)}/${fmt(end)}&details=${details}`
}

/* Remove horários já passados quando a data é hoje (antecedência de +2h) */
function slotsDisponiveis(date) {
  const todos = gerarHorarios(date)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (!isToday) return todos
  return todos.filter((h) => parseInt(h.slice(0, 2), 10) >= now.getHours() + 2)
}

/* Máscara de telefone brasileiro: (00) 00000-0000 */
function maskTel(v) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [servico, setServico] = useState(null)
  const [date, setDate] = useState(null)
  const [hora, setHora] = useState(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [endereco, setEndereco] = useState('')
  const [obs, setObs] = useState('')
  const topRef = useRef(null)

  useEffect(() => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  const dataLabel = date ? format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR }) : ''
  const serv = SERVICES.find((s) => s.title === servico)
  const slots = date ? slotsDisponiveis(date) : []

  const valid = {
    1: !!servico,
    2: !!date && !!hora,
    3: nome.trim() && telefone.trim() && veiculo.trim() && endereco.trim(),
  }
  const canNext = valid[step]

  const msg = mensagemAgendamento({ servico, dataLabel, hora, nome, telefone, veiculo, endereco, obs })

  const selectDate = (d) => { setDate(d); setHora(null) }

  return (
    <div className="min-h-screen bg-ink text-cream flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur-md border-b border-ink3">
        <div className="container-cds flex items-center justify-between py-2.5">
          <a href="/index.html" aria-label="CDS Garage — início">
            <img src="/imagens/logo-cds.png" alt="CDS Garage" className="h-12 w-auto" />
          </a>
          <div className="flex items-center gap-3">
            <a href="/index.html" className="hidden sm:inline-flex items-center gap-1.5 font-head uppercase tracking-wide text-sm text-creamsoft hover:text-flame transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar ao site
            </a>
            <a href={wa('Olá, CDS Garage! Quero tirar uma dúvida sobre o agendamento.')} target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 bg-wa text-[#06351c] font-head font-semibold uppercase tracking-wide text-sm px-4 py-2.5 rounded-md hover:bg-[#2ee06f] transition-colors">
              <WaIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* TÍTULO */}
      <section className="relative overflow-hidden grain bg-ink pt-12 pb-8">
        <div className="absolute inset-0 rays opacity-50 pointer-events-none" aria-hidden />
        <div className="container-cds relative z-10 text-center" ref={topRef}>
          <p className="font-head uppercase tracking-[3px] text-sm text-creamsoft">
            <span className="script text-gold text-xl mr-1.5">Agende</span> agora mesmo
          </p>
          <h1 className="text-cream text-[2.4rem] md:text-5xl mt-2">Marque seu horário<br className="hidden sm:block" /> <span className="text-brand">em domicílio</span></h1>
          <p className="max-w-xl mx-auto mt-3 text-creamsoft">
            Em 4 passos rápidos. A gente vai até você em {CIDADE} — e confirma o horário pelo WhatsApp.
          </p>
        </div>
      </section>

      {/* STEPPER */}
      <div className="container-cds w-full">
        <ol className="flex items-center justify-between max-w-2xl mx-auto mb-8 px-1">
          {STEPS.map((s, i) => {
            const done = step > s.n
            const active = step === s.n
            return (
              <li key={s.n} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => done && setStep(s.n)}
                  disabled={!done}
                  className="flex flex-col items-center gap-1.5 disabled:cursor-default"
                >
                  <div className={[
                    'w-9 h-9 rounded-full flex items-center justify-center font-head text-sm border-2 transition-colors',
                    done ? 'bg-flame border-flame text-ink' : active ? 'bg-brand border-brand text-white' : 'border-ink3 text-creamsoft',
                  ].join(' ')}>
                    {done ? <Check className="w-5 h-5" /> : s.n}
                  </div>
                  <span className={`text-[0.68rem] md:text-xs font-head uppercase tracking-wide whitespace-nowrap ${active ? 'text-cream' : 'text-creamsoft'}`}>{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-5 rounded ${step > s.n ? 'bg-flame' : 'bg-ink3'}`} />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      {/* CONTEÚDO */}
      <main className="container-cds w-full flex-1 pb-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-7 items-start">
          {/* COLUNA PRINCIPAL */}
          <div className="bg-ink2 rounded-2xl border border-ink3 p-5 md:p-7 min-h-[360px]">
            <AnimatePresence mode="wait">
              {/* ETAPA 1 — SERVIÇO */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-2xl text-cream mb-1">Escolha o serviço</h2>
                  <p className="text-creamsoft text-sm mb-5">Todos com atendimento em domicílio.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map((s) => {
                      const sel = servico === s.title
                      return (
                        <button key={s.title} type="button" onClick={() => setServico(s.title)}
                          className={[
                            'text-left rounded-xl p-4 border-2 transition-all flex gap-3',
                            sel ? 'border-brand bg-brand/10' : 'border-ink3 bg-ink/40 hover:border-flame/50',
                          ].join(' ')}>
                          <span className="shrink-0 w-11 h-11 rounded-lg bg-ink flex items-center justify-center">
                            <Icon name={s.icon} className="w-6 h-6 text-flame" strokeWidth={1.7} />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-head uppercase tracking-wide text-cream text-[0.95rem]">{s.title}</span>
                            <span className="block text-xs text-creamsoft mt-0.5 flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" /> {DURACOES[s.title] || '—'} · a partir de {s.price}
                            </span>
                          </span>
                          {sel && <Check className="w-5 h-5 text-flame ml-auto shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* ETAPA 2 — DATA E HORA */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-2xl text-cream mb-1">Escolha a data e o horário</h2>
                  <p className="text-creamsoft text-sm mb-5">Selecione um dia disponível e depois o melhor horário.</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <Calendar value={date} onChange={selectDate} />
                    <div>
                      <p className="font-head uppercase tracking-wide text-sm text-creamsoft mb-3">
                        {date ? <>Horários — <span className="text-cream first-letter:capitalize">{format(date, "d 'de' MMM", { locale: ptBR })}</span></> : 'Escolha um dia primeiro'}
                      </p>
                      {date ? (
                        slots.length ? (
                          <>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {slots.map((h) => (
                                <button key={h} type="button" onClick={() => setHora(h)}
                                  className={[
                                    'min-h-[44px] py-3 rounded-lg font-head text-sm border transition-all',
                                    hora === h ? 'bg-brand border-brand text-white shadow-[0_4px_0_#9e271e]' : 'border-ink3 text-cream hover:border-flame hover:text-flame',
                                  ].join(' ')}>
                                  {h}
                                </button>
                              ))}
                            </div>
                            <p className="mt-3 text-xs text-creamsoft">
                              Estes são nossos horários de atendimento — confirmamos a vaga pelo WhatsApp.
                            </p>
                          </>
                        ) : (
                          <p className="text-creamsoft text-sm">Sem horários disponíveis nesse dia. Escolha outra data.</p>
                        )
                      ) : (
                        <div className="rounded-xl border border-dashed border-ink3 p-8 text-center text-creamsoft text-sm">
                          Toque em um dia no calendário ao lado.
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ETAPA 3 — DADOS */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-2xl text-cream mb-1">Seus dados</h2>
                  <p className="text-creamsoft text-sm mb-5">Pra gente ir até você e deixar tudo certo.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Nome completo *" icon={User}>
                      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className="cds-input" />
                    </Field>
                    <Field label="WhatsApp com DDD *" icon={Phone}>
                      <input value={telefone} onChange={(e) => setTelefone(maskTel(e.target.value))} type="tel" inputMode="numeric" placeholder="(00) 00000-0000" className="cds-input" />
                    </Field>
                    <Field label="Veículo (modelo e cor) *" icon={Car}>
                      <input value={veiculo} onChange={(e) => setVeiculo(e.target.value)} placeholder="Ex.: Gol prata" className="cds-input" />
                    </Field>
                    <Field label="Endereço completo *" icon={MapPin} full>
                      <input value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua, número, bairro e ponto de referência" className="cds-input" />
                    </Field>
                    <Field label="Observações (opcional)" icon={Check} full>
                      <textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={3} placeholder="Algo que a gente precise saber?" className="cds-input resize-none" />
                    </Field>
                  </div>
                  <p className="text-xs text-creamsoft mt-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-flame" /> Seus dados vão só para o nosso WhatsApp. Sem cadastro, sem spam.
                  </p>
                </motion.div>
              )}

              {/* ETAPA 4 — CONFIRMAR */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-6 h-6 text-flame" />
                    <h2 className="text-2xl text-cream">Falta só confirmar!</h2>
                  </div>
                  <p className="text-creamsoft text-sm mb-5">Confira o resumo e toque para enviar pelo WhatsApp. <strong className="text-cream">Confirmamos seu horário por lá.</strong></p>

                  <div className="rounded-xl border border-ink3 bg-ink/40 divide-y divide-ink3">
                    <Resumo k="Serviço" v={servico} />
                    {serv && <Resumo k="Estimativa" v={`${DURACOES[servico]} · a partir de ${serv.price}`} />}
                    <Resumo k="Data" v={dataLabel} cap />
                    <Resumo k="Horário" v={hora} />
                    <Resumo k="Local" v={`Em domicílio — ${endereco}`} />
                    <Resumo k="Veículo" v={veiculo} />
                    <Resumo k="Nome" v={nome} />
                    <Resumo k="WhatsApp" v={telefone} />
                    {obs && <Resumo k="Observações" v={obs} />}
                  </div>

                  <a href={wa(msg)} target="_blank" rel="noopener"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-wa text-[#06351c] font-head font-semibold uppercase tracking-wide text-lg px-7 py-4 rounded-md shadow-[0_6px_0_#1da851] hover:bg-[#2ee06f] active:translate-y-0.5 active:shadow-[0_3px_0_#1da851] transition-all">
                    <WaIcon className="w-6 h-6" /> Confirmar pelo WhatsApp
                  </a>
                  <a href={gcalLink(servico, date, hora)} target="_blank" rel="noopener"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-ink3 text-cream font-head uppercase tracking-wide text-sm px-5 py-3 rounded-md hover:border-flame hover:text-flame transition-colors">
                    <CalendarPlus className="w-4 h-4" /> Adicionar ao Google Agenda
                  </a>
                  <p className="text-center text-xs text-creamsoft mt-3">Sem compromisso · resposta rápida no horário comercial</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* NAVEGAÇÃO */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-7 pt-5 border-t border-ink3">
                <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
                  className="inline-flex items-center gap-1.5 font-head uppercase tracking-wide text-sm text-creamsoft hover:text-cream disabled:opacity-0 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>
                <button type="button" onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext}
                  className="inline-flex items-center gap-2 bg-brand text-white font-head font-semibold uppercase tracking-wide px-6 py-3 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-branddark active:translate-y-0.5 transition-all">
                  Continuar <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
            {step === 4 && (
              <div className="mt-6">
                <button type="button" onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1.5 font-head uppercase tracking-wide text-sm text-creamsoft hover:text-cream transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Voltar e ajustar
                </button>
              </div>
            )}
          </div>

          {/* RESUMO LATERAL (desktop) */}
          <aside className="hidden lg:block sticky top-24 bg-ink2 rounded-2xl border border-ink3 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-5 h-5 text-flame" />
              <span className="font-head uppercase tracking-wide text-cream">Resumo</span>
            </div>
            <SideRow icon="Sparkles" k="Serviço" v={servico || 'A escolher'} />
            <SideRow icon="CalendarPlus" k="Data" v={date ? format(date, "d 'de' MMM yyyy", { locale: ptBR }) : 'A escolher'} cap />
            <SideRow icon="Clock" k="Horário" v={hora || 'A escolher'} />
            <SideRow icon="MapPin" k="Local" v="Em domicílio" />
            <div className="mt-4 pt-4 border-t border-ink3 text-xs text-creamsoft flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-flame shrink-0 mt-0.5" />
              Confirmamos seu horário pelo WhatsApp. Você não paga nada agora.
            </div>
          </aside>
        </div>
      </main>

      {/* RODAPÉ SLIM */}
      <footer className="bg-[#0d0b0a] border-t border-ink3 py-6">
        <div className="container-cds flex flex-wrap items-center justify-between gap-4 text-sm text-creamsoft">
          <a href="/index.html" className="inline-flex items-center gap-1.5 hover:text-flame transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para o site
          </a>
          <span>© {new Date().getFullYear()} CDS Garage · Estética Automotiva em domicílio</span>
        </div>
      </footer>
    </div>
  )
}

/* ---- subcomponentes ---- */
function Field({ label, icon: I, full, children }) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="flex items-center gap-1.5 font-head uppercase tracking-wide text-xs text-creamsoft mb-1.5">
        {I && <I className="w-3.5 h-3.5 text-flame" />} {label}
      </span>
      {children}
    </label>
  )
}

function Resumo({ k, v, cap }) {
  return (
    <div className="flex gap-3 px-4 py-3">
      <span className="font-head uppercase tracking-wide text-xs text-creamsoft w-24 shrink-0 pt-0.5">{k}</span>
      <span className={`text-cream text-sm ${cap ? 'first-letter:capitalize' : ''}`}>{v || '—'}</span>
    </div>
  )
}

function SideRow({ icon, k, v, cap }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Icon name={icon} className="w-4 h-4 text-flame shrink-0" strokeWidth={1.8} />
      <span className="font-head uppercase tracking-wide text-[0.7rem] text-creamsoft w-16 shrink-0">{k}</span>
      <span className={`text-cream text-sm truncate ${cap ? 'first-letter:capitalize' : ''}`}>{v}</span>
    </div>
  )
}
