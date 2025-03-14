import CardNav from '@/shared/components/CardNav'
import Add from '@/shared/icons/Add'
import ArrowDown from '@/shared/icons/ArrowDown'
import ArrowUp from '@/shared/icons/ArrowUp'
import React from 'react'

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'Alta':
      return 'bg-red-200 text-red-800'
    case 'Media':
      return 'bg-orange-200 text-orange-800'
    case 'Baja':
      return 'bg-green-200 text-green-800'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

const Tbody = ({ sections, collapsedSections, toggleSection, openModal }) => {
  return (
    <tbody>
      {sections.map((section) => (
        <React.Fragment key={section.id}>
          {/* Fila de encabezado de sección (colapsable) */}

          <tr
            className="bg-gray-800 border-b border-gray-700 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSection(section.id)}
          >
            <td className="px-4 py-2 font-semibold flex items-center text-white">
              {collapsedSections[section.id] ? (
                <ArrowUp height="25px" width="25px" color="white" />
              ) : (
                <ArrowDown height="25px" width="25px" color="white" />
              )}
              <span>
                {section.name} {section.icon}
              </span>
            </td>
            <td colSpan={4}></td>
          </tr>

          {/* Filas de tareas (visibles cuando la sección no está colapsada) */}
          {!collapsedSections[section.id] &&
            section.tasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2 pl-10 text-gray-300 flex items-center">
                  <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2">
                    {task.complete && '✔'}
                  </div>
                  {task.name}
                </td>
                <td className="px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white">
                    {task.assignee}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="w-6 h-6 rounded-full border border-gray-400"></div>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-2"></td>
              </tr>
            ))}

          {/* Fila para agregar tarea (visible cuando la sección no está colapsada) */}
          {!collapsedSections[section.id] && (
            <tr className="border-b border-gray-700 text-gray-400  hover:bg-gray-800 cursor-pointer">
              <td className="px-4 py-2 pl-10">
                <button onClick={openModal}>Agegar Tarea...</button>
              </td>
              <td colSpan={4}></td>
            </tr>
          )}
        </React.Fragment>
      ))}

      {/* new section */}
      <tr className="border-b border-gray-700 hover:bg-gray-800">
        <td>
          <CardNav name={'Añadir nueva sección'} className="hover:bg-gray-800 cursor-pointer">
            <Add width="20" height="20" color="white" />
          </CardNav>
        </td>
      </tr>
    </tbody>
  )
}

export default Tbody
