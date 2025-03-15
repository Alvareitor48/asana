import CardNav from '@/shared/components/CardNav'
import Add from '@/shared/icons/Add'
import ArrowDown from '@/shared/icons/ArrowDown'
import ArrowUp from '@/shared/icons/ArrowUp'
import React from 'react'

const Tbody = ({ sections, collapsedSections, toggleSection, openModal }) => {
  return (
    <tbody>
      {sections.map((section) => (
        <React.Fragment key={section.section.id}>
          {/* Fila de encabezado de sección (colapsable) */}
          <tr
            className="bg-gray-800 border-b border-gray-700 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSection(section.section.name)}
          >
            <td className="px-4 py-2 font-semibold flex items-center text-white">
              {collapsedSections[section.section.name] ? (
                <ArrowUp height="25px" width="25px" color="white" />
              ) : (
                <ArrowDown height="25px" width="25px" color="white" />
              )}
              <span>{section.section.name} 🔥</span>
            </td>
            <td colSpan={4}></td>
          </tr>

          {/* Filas de tareas (visibles cuando la sección no está colapsada) */}
          {!collapsedSections[section.section.name] &&
            section.tasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2 pl-10 text-gray-300 flex items-center">
                  <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2">
                    {!!task.status && '✔'}
                  </div>
                  {task.title}
                </td>
                <td className="px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white">
                    <span>A</span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="w-6 h-6 rounded-full border border-gray-400"></div>
                </td>
              </tr>
            ))}

          {/* Fila para agregar tarea (visible cuando la sección no está colapsada) */}
          {!collapsedSections[section.section.name] && (
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
