const Thead = ({ filters }) => {
  return (
    <thead>
      <tr className="text-left text-gray-400 border-b border-gray-700">
        <th className="px-2 py-2">Nombre</th>
        <th className="px-2 py-2">Responsable</th>
        <th className="px-2 py-2 ">
          Fecha <span className="hidden xl:inline">de entrega</span>
        </th>

        {filters.map((filter) => (
          <th key={filter.id} className="px-2 py-2">
            <span className="line-clamp-1">{filter.name}</span>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Thead
