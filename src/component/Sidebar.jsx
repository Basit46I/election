import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react'
import { useState } from 'react'

const parties = [
    { value: "jip", label: "Jamaat-e-Islami Pakistan (JIP)" },
    { value: "mqm", label: "Muttahida Qaumi Movement (MQM)" },
    { value: "ppp", label: "Pakistan Peoples Party (PPP)" },
    { value: "pti", label: "Pakistan Tehreek-e-Insaf (PTI)" },
    { value: "pmln", label: "Pakistan Muslim League - Nawaz (PML-N)" }
]

const area = {
    jip: [
        { value: "gulistan-e-jauhar", label: "Gulistan-e-Jauhar" },
        { value: "north-karachi", label: "North Karachi" } // (add data if needed)
    ],
    mqm: [
        { value: "gulshan-e-iqbal", label: "Gulshan-e-Iqbal" },
        { value: "nazimabad", label: "Nazimabad" }
    ],
    ppp: [
        { value: "dha-phase-1", label: "DHA Phase 1" },
        { value: "lyari", label: "Lyari" }
    ],
    pti: [
        { value: "clifton", label: "Clifton" },
        { value: "korangi", label: "Korangi" }
    ],
    pmln: [
        { value: "malir", label: "Malir" },
        { value: "baldia-town", label: "Baldia Town" }
    ]
}

const subArea = {
    "gulistan-e-jauhar": [
        { value: "block-1", label: "Block 1" },
        { value: "block-2", label: "Block 2" },
        { value: "block-3", label: "Block 3" },
        { value: "block-4", label: "Block 4" },
        { value: "block-5", label: "Block 5" },
        { value: "block-6", label: "Block 6" }
    ],
    "north-karachi": [
        { value: "sector-5", label: "Sector 5" },
        { value: "sector-7", label: "Sector 7" },
        { value: "sector-11", label: "Sector 11" }
    ],
    "gulshan-e-iqbal": [
        { value: "block-1", label: "Block 1" },
        { value: "block-2", label: "Block 2" },
        { value: "block-3", label: "Block 3" },
        { value: "block-4", label: "Block 4" },
        { value: "block-5", label: "Block 5" },
        { value: "block-6", label: "Block 6" },
        { value: "block-7", label: "Block 7" }
    ],
    "nazimabad": [
        { value: "block-1", label: "Block 1" },
        { value: "block-2", label: "Block 2" },
        { value: "block-3", label: "Block 3" }
    ],
    "dha-phase-1": [
        { value: "sector-a", label: "Sector A" },
        { value: "sector-b", label: "Sector B" },
        { value: "sector-c", label: "Sector C" }
    ],
    "lyari": [
        { value: "chakiwara", label: "Chakiwara" },
        { value: "rangiwara", label: "Rangiwara" },
        { value: "baghdadi", label: "Baghdadi" }
    ],
    "clifton": [
        { value: "block-1", label: "Block 1" },
        { value: "block-2", label: "Block 2" }
    ],
    "korangi": [
        { value: "sector-31", label: "Sector 31" },
        { value: "sector-33", label: "Sector 33" }
    ],
    "malir": [
        { value: "model-colony", label: "Model Colony" },
        { value: "liaquat-market", label: "Liaquat Market" }
    ],
    "baldia-town": [
        { value: "sector-4", label: "Sector 4" },
        { value: "sector-9", label: "Sector 9" }
    ]
}

export default function Sidebar(props) {
    const { list, setList } = props
    const [filteredArea, setFilteredArea] = useState([])
    const [filteredSubArea, setFilteredSubArea] = useState([])

    const partyOnChange = (e) => {
        const value = e.target.value
        // reset area + subArea when party changes
        const next = { ...list, parties: value, area: "", subArea: "" }
        setList(next)
        setFilteredArea(area[value] || [])
        setFilteredSubArea([])
    }

    const areaOnChange = (e) => {
        const value = e.target.value
        const next = { ...list, area: value, subArea: "" }
        setList(next)
        setFilteredSubArea(subArea[value] || [])
    }

    const subAreaOnChange = (e) => {
        const value = e.target.value
        setList({ ...list, subArea: value })
    }

    return (
        <div className={`h-screen fixed left-0 top-0 transition-all bg-[#242831] shadow-lg ${props.expanded ? "w-90" : "w-22"} z-50`}>
            {/* Toggle */}
            <div className="p-1 relative">
                <button
                    type="button"
                    onClick={() => props.setExpanded(!props.expanded)}
                    className="absolute top-6 -right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#242831] hover:text-white transition-all"
                >
                    <div className="transform transition-transform duration-300">
                        {props.expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                    </div>
                </button>
            </div>

            {/* Logo */}
            <div className="p-4 pb-4 flex justify-center items-center gap-3">
                {props.expanded
                    ? <h3 className='text-white font-bold text-4xl'>GEO Election</h3>
                    : <div className="bg-white w-12 h-12 rounded-full flex justify-center items-center shadow-lg"><h3 className='text-dark font-bold text-4xl'>G</h3></div>}
            </div>

            {/* Heading */}
            {props.expanded && (
                <div className='px-4 pt-2'>
                    <h3 className='text-white text-lg'>Tracking Result</h3>
                </div>
            )}

            {/* Filters */}
            <div className="p-4 space-y-8">
                {/* Party */}
                <div>
                    {props.expanded ? (
                        <>
                            <h3 className='text-white text-sm mb-2'>Filter by Party</h3>
                            <select
                                name="parties"
                                className="w-full bg-white text-sm outline-none px-3 py-2.5 focus:ring-2 focus:ring-blue-500 transition"
                                onChange={partyOnChange}
                                value={list.parties}
                            >
                                <option value="">All Parties</option>
                                {parties.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <button className="w-full flex justify-center p-2 rounded bg-white hover:bg-gray-200">
                            <Filter size={18} />
                        </button>
                    )}
                </div>

                {/* Area */}
                <div>
                    {props.expanded ? (
                        <>
                            <h3 className='text-white text-sm mb-2'>Filter by Area</h3>
                            <select
                                name="area"
                                className="w-full bg-white text-sm outline-none px-3 py-2.5 focus:ring-2 focus:ring-blue-500 transition"
                                value={list.area}
                                onChange={areaOnChange}
                                disabled={!list.parties}
                            >
                                <option value="">{list.parties ? "All Areas of Party" : "Select a party first"}</option>
                                {filteredArea.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <button className="w-full flex justify-center p-2 rounded bg-white hover:bg-gray-200">
                            <Filter size={18} />
                        </button>
                    )}
                </div>

                {/* Sub Area */}
                <div>
                    {props.expanded ? (
                        <>
                            <h3 className='text-white text-sm mb-2'>Filter by Sub Area</h3>
                            <select
                                name="subArea"
                                className="w-full bg-white text-sm outline-none px-3 py-2.5 focus:ring-2 focus:ring-blue-500 transition"
                                value={list.subArea}
                                onChange={subAreaOnChange}
                                disabled={!list.area}
                            >
                                <option value="">{list.area ? "All Sub Areas" : "Select an area first"}</option>
                                {filteredSubArea.map((item, index) => (
                                    <option key={index} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <button className="w-full flex justify-center p-2 rounded bg-white hover:bg-gray-200">
                            <Filter size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
