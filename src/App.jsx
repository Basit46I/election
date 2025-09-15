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

  const [coordinates, setCoordinates] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [tempCoordinates, setTempCoordinates] = useState("");
  const settingCoordinates = () => {
    setIsPopupOpen((prev) => !prev);
    setTempCoordinates(coordinates);
    setCoordinates("")
  }

  const [partyDetails, setPartyDetails] = useState([
    { id: crypto.randomUUID(), name: "", totalVotes: "", castedVotes: "", area: "", color: "" }
  ]);

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
          partyDetails={partyDetails}
          setPartyDetails={setPartyDetails}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          settingCoordinates={settingCoordinates}
        />
        <div className="flex-1 ml-0">
          {/* <Header expanded={expanded} setExpanded={setExpanded} onSearchSelect={setSearchSelection} /> */}
          <ElectionMap selectedFilters={filters} searchSelection={searchSelection} partyDetails={partyDetails} />
        </div>
      </div>
    </div>
  )
}

export default App
