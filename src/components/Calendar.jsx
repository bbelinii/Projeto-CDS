import { useState } from 'react'
import {
  addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isBefore, startOfToday, format,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gerarHorarios } from '../data'

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function Calendar({ value, onChange }) {
  const today = startOfToday()
  const [month, setMonth] = useState(startOfMonth(value || today))

  const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 0 })
  const gridEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 0 })
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd })

  const canPrev = !isBefore(startOfMonth(addMonths(month, -1)), startOfMonth(today))
  const canNext = isBefore(startOfMonth(month), startOfMonth(addMonths(today, 3)))
  const titulo = format(month, "MMMM 'de' yyyy", { locale: ptBR })

  return (
    <div className="bg-ink2 rounded-xl border border-ink3 p-4 md:p-5">
      {/* cabeçalho do mês */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => canPrev && setMonth(addMonths(month, -1))}
          disabled={!canPrev}
          className="w-9 h-9 rounded-lg flex items-center justify-center border border-ink3 text-cream disabled:opacity-30 disabled:cursor-not-allowed hover:border-flame hover:text-flame transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-head uppercase tracking-wide text-cream text-lg first-letter:capitalize">
          {titulo}
        </span>
        <button
          type="button"
          onClick={() => canNext && setMonth(addMonths(month, 1))}
          disabled={!canNext}
          className="w-9 h-9 rounded-lg flex items-center justify-center border border-ink3 text-cream disabled:opacity-30 disabled:cursor-not-allowed hover:border-flame hover:text-flame transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-[0.7rem] font-head uppercase tracking-wide text-creamsoft py-1">
            {w}
          </div>
        ))}
      </div>

      {/* dias */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const outside = !isSameMonth(day, month)
          const past = isBefore(day, today)
          const closed = gerarHorarios(day).length === 0
          const disabled = outside || past || closed
          const selected = value && isSameDay(day, value)
          const isToday = isSameDay(day, today)

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onChange(day)}
              className={[
                'aspect-square rounded-lg text-sm font-head flex items-center justify-center transition-all',
                selected
                  ? 'bg-brand text-white shadow-[0_4px_0_#9e271e]'
                  : disabled
                    ? 'text-ink3 cursor-not-allowed'
                    : 'text-cream bg-ink/40 hover:bg-flame/20 hover:text-flame',
                !selected && isToday && !disabled ? 'ring-1 ring-flame/60' : '',
              ].join(' ')}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      <p className="mt-3 text-xs text-creamsoft flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded bg-brand" /> selecionado
        <span className="inline-block w-3 h-3 rounded ring-1 ring-flame/60 ml-3" /> hoje
        <span className="ml-3 text-ink3">·</span> domingos fechados
      </p>
    </div>
  )
}
