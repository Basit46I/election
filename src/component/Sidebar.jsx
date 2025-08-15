import { ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { useState } from 'react'

const parties = [
    { value: "jip", label: "Jamaat-e-Islami Pakistan (JIP)" },
    { value: "mqm", label: "Muttahida Qaumi Movement (MQM)" },
    { value: "ppp", label: "Pakistan Peoples Party (PPP)" },
    { value: "pti", label: "Pakistan Tehreek-e-Insaf (PTI)" },
    { value: "pmln", label: "Pakistan Muslim League - Nawaz (PML-N)" }
]

const area = {
    jip: [{ value: "gulistan-e-jauhar", label: "Gulistan-e-Jauhar" }, { value: "north-karachi", label: "North Karachi" }],
    mqm: [{ value: "gulshan-e-iqbal", label: "Gulshan-e-Iqbal" }, { value: "nazimabad", label: "Nazimabad" }],
    ppp: [{ value: "dha-phase-1", label: "DHA Phase 1" }, { value: "lyari", label: "Lyari" }],
    pti: [{ value: "clifton", label: "Clifton" }, { value: "korangi", label: "Korangi" }],
    pmln: [{ value: "malir", label: "Malir" }, { value: "baldia-town", label: "Baldia Town" }]
}

const subArea = {
    "gulistan-e-jauhar": [
        { value: "block-1", label: "Block 1" }, { value: "block-2", label: "Block 2" }
    ],
    "north-karachi": [
        { value: "sector-5", label: "Sector 5" }
    ]
}

export default function Sidebar({ list, setList, expanded, setExpanded }) {
    const [filteredArea, setFilteredArea] = useState([])
    const [filteredSubArea, setFilteredSubArea] = useState([])

    const partyOnChange = (e) => {
        const value = e.target.value
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
        setList({ ...list, subArea: e.target.value })
    }

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <div className={`h-screen fixed left-0 top-0 bg-[#242831] shadow-lg z-50 hidden md:block transition-all ${expanded ? "w-90" : "w-25"}`}>
                {/* Toggle */}
                <div className="p-1 relative">
                    <button
                        type="button"
                        onClick={() => setExpanded(!expanded)}
                        className="absolute top-6 -right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#242831] hover:text-white transition-all"
                    >
                        {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                    </button>
                </div>

                {/* Logo */}
                <div className="p-4 pb-4 flex justify-center items-center gap-3">
                    {expanded
                        ? <h3 className='text-white font-bold text-4xl'>GEO Election</h3>
                        : <div className="bg-white w-12 h-12 rounded-full flex justify-center items-center shadow-lg"><h3 className='text-dark font-bold text-4xl'>G</h3></div>}
                </div>

                <div className="pl-4 pt-4">
                    <h3 className='text-white font-bold text-2xl'>Tracking result</h3>
                </div>

                {/* Filters */}
                <div className="p-4 space-y-8">
                    {/* Party */}
                    <div>
                        <h3 className="text-white text-sm mb-2">Filter by Party</h3>
                        <select
                            className="w-full bg-white text-sm outline-none px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                            value={list.parties}
                            onChange={partyOnChange}
                        >
                            <option value="">All Parties</option>
                            {parties.map((item, i) => (
                                <option key={i} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Area */}
                    <div>
                        <h3 className="text-white text-sm mb-2">Filter by Area</h3>
                        <select
                            className="w-full bg-white text-sm outline-none px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                            value={list.area}
                            onChange={areaOnChange}
                            disabled={!list.parties}
                        >
                            <option value="">Select party first</option>
                            {filteredArea.map((item, i) => (
                                <option key={i} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sub Area */}
                    <div>
                        <h3 className="text-white text-sm mb-2">Filter by Sub Area</h3>
                        <select
                            className="w-full bg-white text-sm outline-none px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                            value={list.subArea}
                            onChange={subAreaOnChange}
                            disabled={!list.area}
                        >
                            <option value="">Select area first</option>
                            {filteredSubArea.map((item, i) => (
                                <option key={i} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* MOBILE BOTTOM BAR */}
            <div className="fixed left-0 bottom-5 w-full p-3 md:hidden z-50">
                <div className="w-full bg-[#242831] shadow-lg p-3 flex justify-between rounded-lg">

                    <div>
                        <h3 className="text-white text-xs mb-2">Filter by Party</h3>
                        <select
                            className="w-35 bg-white text-xs px-2 py-1 rounded"
                            value={list.parties}
                            onChange={partyOnChange}
                        >
                            <option value="">Party</option>
                            {parties.map((p, i) => <option key={i} value={p.value}>{p.label}</option>)}
                        </select>
                    </div>

                    <div>
                        <h3 className="text-white text-xs mb-2">Filter by Area</h3>
                        <select
                            className="w-35 bg-white text-xs px-2 py-1 rounded"
                            value={list.area}
                            onChange={areaOnChange}
                            disabled={!list.parties}
                        >
                            <option value="">Area</option>
                            {filteredArea.map((a, i) => <option key={i} value={a.value}>{a.label}</option>)}
                        </select>
                    </div>

                    <div>
                        <h3 className="text-white text-xs mb-2">Filter by Sub area</h3>
                        <select
                            className="w-35 bg-white text-xs px-2 py-1 rounded"
                            value={list.subArea}
                            onChange={subAreaOnChange}
                            disabled={!list.area}
                        >
                            <option value="">Sub Area</option>
                            {filteredSubArea.map((sa, i) => <option key={i} value={sa.value}>{sa.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}
