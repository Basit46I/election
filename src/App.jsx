import './App.css'
import { useState } from "react"
import Sidebar from "./component/Sidebar"
import ElectionMap from "./component/ElectionMap"
import Header from './component/Header'
import Map from './component/Map'

function App() {
  const [expanded, setExpanded] = useState(true) // desktop
  const [mobileOpen, setMobileOpen] = useState(false) // mobile
  const [filters, setFilters] = useState({ parties: "", area: "", subArea: "" })
  const [searchSelection, setSearchSelection] = useState(null)

  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const [electionMeta, setElectionMeta] = useState({ totalVotes: "", totalCastedVotes: "", latitude: "24.911775136948908", longitude: "67.11721981107088", });

  const [parties, setParties] = useState([
    { id: crypto.randomUUID(), name: "", castedVotes: "", area: "", color: "" }
  ]);

  const [partyDetails, setPartyDetails] = useState([]);

  const handleSave = () => {
    setPartyDetails([...parties]);
    setIsOpen(false)
  }

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
          electionMeta={electionMeta}
          setElectionMeta={setElectionMeta}
          parties={parties}
          setParties={setParties}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          partyDetails={partyDetails}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSave={handleSave}
        />
        <div className={`flex-1 ${expanded ? "ml-0 lg:ml-120" : "ml-0"}`}>
          <Header expanded={expanded} setExpanded={setExpanded} onSearchSelect={setSearchSelection} partyDetails={partyDetails} />
          {/* <ElectionMap selectedFilters={filters} searchSelection={searchSelection} electionDetails={electionDetails} /> */}
          <Map partyDetails={partyDetails} searchSelection={searchSelection} />
        </div>
      </div>
    </div>
  )
}

export default App
