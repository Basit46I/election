import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react'
import { useState } from 'react';

const parties = [
    { value: "jip", label: "Jamat e Islami Pakistan (JIP)" },
    { value: "mqm", label: "Muttahida Qaumi Movement (MQM)" },
    { value: "ppp", label: "Pakistan Peoples Party (PPP)" }
]

const area = {
    "jip": [{ value: "gulistan-e-jauhar", label: "Gulistan e Jauhar" }],
    "mqm": [{ value: "gulshan-e-iqbal", label: "Gulshan e Iqbal" }],
    "ppp": [{ value: "dha-phase-1", label: "DHA Phase 1" }],
}

const subArea = {
    "gulistan-e-jauhar": [
        { value: "block-1", label: "Block 1" },
        { value: "block-2", label: "Block 2" },
        { value: "block-3", label: "Block 3" },
        { value: "block-4", label: "Block 4" },
        { value: "block-5", label: "Block 5" },
        { value: "block-6", label: "Block 6" },
        { value: "block-7", label: "Block 7" },
        { value: "block-8", label: "Block 8" },
        { value: "block-9", label: "Block 9" },
        { value: "block-10", label: "Block 10" }
    ],
    "gulshan-e-iqbal": [
        { value: "block-1", label: "Block 1" },
        { value: "block-2", label: "Block 2" },
        { value: "block-3", label: "Block 3" },
        { value: "block-4", label: "Block 4" },
        { value: "block-5", label: "Block 5" },
        { value: "block-6", label: "Block 6" },
        { value: "block-7", label: "Block 7" },
        { value: "block-8", label: "Block 8" },
        { value: "block-9", label: "Block 9" },
        { value: "block-10", label: "Block 10" },
        { value: "block-11", label: "Block 11" },
        { value: "block-12", label: "Block 12" },
        { value: "block-13", label: "Block 13" },
        { value: "block-14", label: "Block 14" },
        { value: "block-15", label: "Block 15" },
        { value: "block-16", label: "Block 16" },
        { value: "block-17", label: "Block 17" },
        { value: "block-18", label: "Block 18" }
    ],
    "dha-phase-1": [
        { value: "sector-a", label: "Sector A" },
        { value: "sector-b", label: "Sector B" },
        { value: "sector-c", label: "Sector C" },
        { value: "sector-d", label: "Sector D" },
        { value: "sector-e", label: "Sector E" },
        { value: "sector-f", label: "Sector F" }
    ]
};

export default function Sidebar(props) {

    const [list, setList] = useState({ parties: "", area: "", subArea: "" })
    const [filteredArea, setFilteredArea] = useState();
    const [filteredSubArea, setFilteredSubArea] = useState();

    const partyOnChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });

        const filteredData = area[value];
        setFilteredArea(filteredData)
    }

    const areaOnChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });

        const filteredData = subArea[value];
        setFilteredSubArea(filteredData)
    }

    const subAreaOnChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    }

    console.log(list);

    return (
        <div className={`h-screen fixed left-0 top-0 transition-all bg-[#242831] shadow-lg ${props.expanded ? "w-90" : "w-22"} z-50`}>
            {/* Toggle Button */}
            <div className="p-1 relative">
                <button type="button" onClick={() => props.setExpanded(!props.expanded)}
                    className="absolute top-6 -right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#242831] hover:text-white focus:bg-[#242831] focus:text-white active:bg-[#242831] active:text-white transition-all">
                    <div className={`transform transition-transform duration-300`}>
                        {props.expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                    </div>
                </button>
            </div>

            {/* Logo */}
            <div className={`p-4 pb-4 flex justify-center items-center gap-3`}>
                <div>
                    {props.expanded
                        ? <h3 className='text-white font-bold text-4xl'>Election</h3>
                        : <div className="bg-white w-12 h-12 rounded-full flex justify-center items-center shadow-lg"><h3 className='text-dark font-bold text-4xl'>E</h3></div>
                    }
                </div>
            </div>

            {/* Search */}
            {props.expanded && (
                <div className='px-4 pt-2'>
                    <h3 className='text-white text-lg'>Tracking Result</h3>
                </div>
            )}
            {props.expanded && (
                <div className='p-4'>
                    <div className="bg-white shadow-md flex justify-start items-center gap-1 border-3 border-transparent focus-within:border-blue-500 transition">
                        <div className="px-3 py-2">
                            <Search size={20} color={'#949494ff'} />
                        </div>
                        <input
                            type="text"
                            className="w-full outline-none py-2 text-sm text-[#949494ff] placeholder-[#949494ff]"
                            placeholder='Search here...'
                        />
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="p-4 space-y-8">
                {/* Party Filter */}
                <div>
                    {props.expanded ? (
                        <>
                            <h3 className='text-white text-sm mb-2'>Filter with Party</h3>
                            <select name="parties" className="w-full bg-white text-sm outline-none focus:ring-2 px-3 py-2.5 focus:ring-blue-500 transition"
                                onChange={partyOnChange} value={list.parties}>
                                <option value="">Select an option</option>
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

                {/* Area Filter */}
                <div>
                    {props.expanded ? (
                        <>
                            <h3 className='text-white text-sm mb-2'>Filter with Area</h3>
                            <select name="area" className="w-full bg-white text-sm outline-none focus:ring-2 px-3 py-2.5 focus:ring-blue-500 transition"
                                value={list.area} onChange={areaOnChange}>
                                <option value="">Select an option</option>
                                {filteredArea && filteredArea.map((item, index) => (
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

                {/* Sub Area Filter */}
                <div>
                    {props.expanded ? (
                        <>
                            <h3 className='text-white text-sm mb-2'>Filter with Sub Area</h3>
                            <select name="subArea" className="w-full bg-white text-sm outline-none focus:ring-2 px-3 py-2.5 focus:ring-blue-500 transition"
                                value={list.subArea} onChange={subAreaOnChange}>
                                <option value="">Select an option</option>
                                {filteredSubArea && filteredSubArea.map((item, index) => (
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
