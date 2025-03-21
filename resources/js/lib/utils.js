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
