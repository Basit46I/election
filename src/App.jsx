import './App.css'
import { useState } from "react"
import Sidebar from "./component/Sidebar"
import ElectionMap from "./component/ElectionMap"
import Header from './component/Header'

function App() {
  const [expanded, setExpanded] = useState(true) // desktop
  const [mobileOpen, setMobileOpen] = useState(false) // mobile
  const [filters, setFilters] = useState({ parties: "", area: "", subArea: "" })
  const [searchSelection, setSearchSelection] = useState(null)

  return (
    <div className="font-poppins">
      <div className="flex">
        <Sidebar
          expanded={expanded}
          setExpanded={setExpanded}
          list={filters}
          setList={setFilters}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div className="flex-1 ml-0">
          <Header expanded={expanded} setExpanded={setExpanded} onSearchSelect={setSearchSelection} />
          <ElectionMap selectedFilters={filters} searchSelection={searchSelection} />
        </div>
      </div>
    </div>
  )
}

export default App
