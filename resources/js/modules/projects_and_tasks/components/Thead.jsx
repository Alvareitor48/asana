const Thead = ({ filters }) => {
  return (
    <thead>
      <tr className="text-left text-gray-400 border-b border-gray-700">
        <th className="px-2 py-2">Nombre</th>
        <th className="px-2 py-2">Responsable</th>
        <th className="px-2 py-2 line-clamp-1">Fecha de entrega</th>

        {filters.map((filter) => (
          <th className="px-2 py-2">
            <span className="line-clamp-1">{filter.name}</span>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default Thead
