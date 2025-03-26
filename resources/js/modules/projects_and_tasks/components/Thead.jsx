import useContextMenu from '@/hooks/useContextMenu'
import { FilterModal } from '@/shared/components/FilterModal'
import Add from '@/shared/icons/Add'
import { useForm } from '@inertiajs/react'
import { useRef, useState } from 'react'
import FilterContextMenu from './FilterContextMenu'

const Thead = ({ filters, projectId }) => {
  const [closeContextMenu, handleContextMenu, contextMenu] = useContextMenu()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    type: 'unica',
    options: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)

    post(route('filter.store', { project: projectId }), {
      preserveScroll: true,
      preserveState: false,
      onSuccess: () => {
        reset()
        setIsModalOpen(false)
      },
    })
  }

  /*  console.log(filters) */

  return (
    <thead>
      <tr ref={containerRef} className="text-left text-gray-400 border-b border-gray-700">
        <th className="px-2 py-2 min-w-[270px]">Nombre</th>
        <th className="px-2 py-2min-w-[270px]">Responsable</th>
        <th className="px-2 py-2 min-w-[100px]">Entrega</th>
        {filters.map((filter) => (
          <th key={filter.id} className="px-2 py-2 text-center">
            <span onContextMenu={(e) => handleContextMenu(e, filter.id)} className="line-clamp-1">
              {filter.name}
            </span>
          </th>
        ))}
        <th className="pl-4 px-2 py-2 min-w-[100px]">
          <span onClick={openModal} className="flex gap-2 cursor-pointer">
            <Add height="25px" width="25px" color="white" />
            <span>Filtro</span>
          </span>
        </th>
      </tr>
      {contextMenu.visible && (
        <FilterContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          filterId={contextMenu.element}
          onClose={closeContextMenu}
          projectId={projectId}
        />
      )}
      <FilterModal
        handleSubmit={handleSubmit}
        setData={setData}
        processing={processing}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        data={data}
        errors={errors}
      />
    </thead>
  )
}

export default Thead
