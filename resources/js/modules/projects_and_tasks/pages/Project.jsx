import AuthLayout from '@/shared/layouts/AuthLayout'
import { useState } from 'react'
import Tbody from '../components/Tbody'
import Thead from '../components/Thead'

export default function Project({ project, sections: sec }) {
  const [collapsedSections, setCollapsedSections] = useState(() => {
    const initialState = []

    sec.map((section) => {
      initialState[section.section.name] = false
    })

    return initialState
  })

  const toggleSection = (sectionName) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionName]: !collapsedSections[sectionName],
    })
  }

  return (
    <>
      <AuthLayout>
        <div className="w-full flex flex-col justify-start items-start  rounded-xl  container-glass gap-4 h-full">
          {/* header */}
          <div className="flex items-center justify-between p-4 w-full bg-gray-900 ">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
            </div>
          </div>

          {/* body */}
          <div className="overflow-x-auto w-full h-full p-3 bg-black/60">
            <table className="w-full border-collapse">
              <Thead />
              <Tbody
                sections={sec}
                toggleSection={toggleSection}
                collapsedSections={collapsedSections}
              />
            </table>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}
