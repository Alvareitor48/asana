import Add from '@/shared/icons/Add'

const Thead = ({ filters }) => {
  return (
    <thead>
      <tr className="text-left text-gray-400 border-b border-gray-700">
        <th className="px-2 py-2 min-w-[270px]">Nombre</th>
        <th className="px-2 py-2min-w-[270px]">Responsable</th>
        <th className="px-2 py-2 min-w-[100px]">Entrega</th>
        {filters.map((filter) => (
          <th key={filter.id} className="px-2 py-2 text-center">
            <span className="line-clamp-1">{filter.name}</span>
          </th>
        ))}
        <th className="pl-4 px-2 py-2 min-w-[100px]">
          <span className="flex gap-2">
            <Add height="25px" width="25px" color="white" />
            <span>Filtro</span>
          </span>
        </th>
      </tr>
    </thead>
  )
}

export default Thead
