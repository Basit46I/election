import { useState } from 'react'
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const parties = [
    { value: "jip", label: "Jamaat-e-Islami Pakistan (JIP)" },
    { value: "mqm", label: "Muttahida Qaumi Movement (MQM)" },
]

const area = {
    jip: [{ value: "gulistan-e-jauhar", label: "Gulistan-e-Jauhar" }],
    mqm: [{ value: "gulistan-e-jauhar", label: "Gulistan-e-Jauhar" }],
}

const subArea = {
    "gulistan-e-jauhar": [
        { value: "kda-overseas-bungalows", label: "KDA OVERSEAS' BUNGALOWS" }
    ],
    "gulistan-e-jauhar": [
        { value: "kda-overseas-bungalows", label: "KDA OVERSEAS' BUNGALOWS" }
    ],
}

export default function Sidebar({ list, setList, expanded, setExpanded, mobileOpen, setMobileOpen }) {
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
            <div
                className={`fixed top-0 left-0 h-full w-90 bg-[#242831] z-50
    transform transition-transform duration-300 hidden lg:block
    ${expanded ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h3 className="text-white font-semibold text-2xl">Geo Election</h3>
                </div>

                <div className="p-4 space-y-6 overflow-y-auto">
                    {/* Party */}
                    <div>
                        <h3 className="text-white text-sm mb-2">Filter by Party</h3>
                        <select
                            className="w-full bg-white text-sm outline-none px-3 py-2.5"
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
                            className="w-full bg-white text-sm outline-none px-3 py-2.5"
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
                            className="w-full bg-white text-sm outline-none px-3 py-2.5"
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

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-full w-90 bg-[#242831] shadow-2xl z-50 transform transition-transform duration-300 lg:hidden
                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h3 className="text-white font-semibold text-2xl">Geo Election</h3>
                    <button onClick={() => setMobileOpen(false)} className="text-white text-xl">✕</button>
                </div>

                <div className="p-4 space-y-6 overflow-y-auto">
                    {/* Party */}
                    <div>
                        <h3 className="text-white text-sm mb-2">Filter by Party</h3>
                        <select
                            className="w-full bg-white text-sm outline-none px-3 py-2.5"
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
                            className="w-full bg-white text-sm outline-none px-3 py-2.5"
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
                            className="w-full bg-white text-sm outline-none px-3 py-2.5"
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
            <div className="fixed bottom-0 w-full lg:hidden z-40">
                <div className="w-full bg-[#242831] shadow-lg flex">
                    <div className="flex-1 border-r border-white">
                        <button
                            type='button'
                            className="w-full text-white text-[13px] flex items-center justify-center gap-2 py-2 hover:text-black hover:bg-white transition duration-100"
                            onClick={() => setMobileOpen(true)}
                        >
                            <FiFilter size={14} /> Party
                        </button>
                    </div>
                    <div className="flex-1 border-r border-white">
                        <button
                            type='button'
                            className="w-full text-white text-[13px] flex items-center justify-center gap-2 py-2 hover:text-black hover:bg-white transition duration-100"
                            onClick={() => setMobileOpen(true)}
                        >
                            <FiFilter size={14} /> Area
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            type='button'
                            className="w-full text-white text-[13px] flex items-center justify-center gap-2 py-2 hover:text-black hover:bg-white transition duration-100"
                            onClick={() => setMobileOpen(true)}
                        >
                            <FiFilter size={14} /> Sub Area
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
