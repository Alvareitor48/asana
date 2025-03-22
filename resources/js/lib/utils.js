import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const colorOptions = [
  { value: '#FF0000', label: 'Rojo' },
  { value: '#00FF00', label: 'Verde' },
  { value: '#0000FF', label: 'Azul' },
  { value: '#FFFF00', label: 'Amarillo' },
  { value: '#FFA500', label: 'Naranja' },
  { value: '#FFFFFF', label: 'Blanco' },
  { value: '#000000', label: 'Negro' },
  { value: '#FFC0CB', label: 'Rosa' },
  { value: '#800080', label: 'Púrpura' },
]

export const monthOptions = [
  { value: '1', label: 'Enero' },
  { value: '2', label: 'Febrero' },
  { value: '3', label: 'Marzo' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Mayo' },
  { value: '6', label: 'Junio' },
  { value: '7', label: 'Julio' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
]

export function monthName(month) {
  const m = monthOptions.find((m) => m.value == month)

  return m.label
}
