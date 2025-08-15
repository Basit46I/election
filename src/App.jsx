import './App.css'
import { useState } from "react"
import Sidebar from "./component/Sidebar"
import ElectionMap from "./component/ElectionMap"

function App() {
  const [expanded, setExpanded] = useState(true)
  const [filters, setFilters] = useState({ parties: "", area: "", subArea: "" })

  return (
    <div className="font-poppins">
      <div className="flex">
        <Sidebar
          expanded={expanded}
          setExpanded={setExpanded}
          list={filters}
          setList={setFilters}
        />
        <div className={`flex-1 ${expanded ? 'md:ml-90' : 'md:ml-25'} ml-0`}>
          <ElectionMap selectedFilters={filters} />
        </div>
      </div>
    </div>
  )
}

export default App
