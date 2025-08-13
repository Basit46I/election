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
        <div className="flex-1 ml-22 md:ml-90"> {/* keeps map clear of fixed sidebar */}
          <ElectionMap selectedFilters={filters} />
        </div>
      </div>
    </div>
  )
}

export default App
