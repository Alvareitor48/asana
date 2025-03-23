import { monthName } from './utils'

export function formatFilterValue(task, collaborators) {
  if (task.filter_type === 'seleccion_unica' && task.value)
    return (
      <span className="w-fit h-fit px-1 py-1 rounded-lg bg-blue-500/80 ">{task.value ?? ''}</span>
    )

  if (task.filter_type === 'seleccion_multiple' && task.value) {
    return (
      <div className="flex flex-wrap gap-4">
        {task.value.map((v) => (
          <span className="w-fit h-fit px-2 py-1 rounded-lg bg-green-500/80 ">{v}</span>
        ))}
      </div>
    )
  }

  if (task.filter_type === 'fecha' && task.value) {
    const dueDate = new Date(task.value)
    const dayAndMonth = `${dueDate.getDate()} de ${monthName(dueDate.getMonth() + 1)}`

    return <span className="w-fit h-fit px-1 py-1 rounded-lg">{dayAndMonth}</span>
  }

  if (task.filter_type === 'persona' && task.value) {
    const person = collaborators.find((person) => person.id == task.value)

    return (
      <div className="w-8 h-8 rounded-full bg-pink-400/70 flex items-center justify-center text-white">
        <span>{person.name.charAt(0)}</span>
      </div>
    )
  }

  if (task.filter_type === 'texto' && task.value)
    return <span className="w-fit h-fit px-1 py-1 rounded-lg">{task.value ?? ''}</span>

  if (task.filter_type === 'numero' && task.value)
    return <span className="w-fit h-fit px-1 py-1 rounded-lg line-clamp-1">{task.value ?? ''}</span>

  return ''
}
