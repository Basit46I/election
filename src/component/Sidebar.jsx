import { useEffect, useRef, useState } from 'react'
import { BiMenu, BiPlus, BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuSettings2 } from 'react-icons/lu';
import { color, motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa';
import { RxCross1, RxPlus } from 'react-icons/rx';
import { GoPlug, GoPlus } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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

export default function Sidebar({ list, setList, expanded, setExpanded, mobileOpen, setMobileOpen, mapCoords, setMapCoords, areas, setAreas, isPopupOpen, setIsPopupOpen, handleSave, isOpen, setIsOpen }) {
    const [filteredArea, setFilteredArea] = useState([])
    const [filteredSubArea, setFilteredSubArea] = useState([])
    const partyRefs = useRef([]);
    const [lastAddedId, setLastAddedId] = useState(null);
    const allParties = (areas || []).flatMap(area => (area.parties || []).map(p => ({ ...p, area: area.area })));

    const addArea = () => {
        setAreas(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                area: "",
                totalVotes: "",
                totalCastedVotes: "",
                parties: [{ id: crypto.randomUUID(), name: "", castedVotes: "", color: "" }]
            }
        ]);
    };

    const removeArea = (areaIndex) => {
        setAreas(prev => prev.filter((_, i) => i !== areaIndex));
    };

    const addPartyToArea = (areaIndex) => {
        const newId = crypto.randomUUID();
        setAreas(prev => {
            const copy = [...prev];
            const exists = copy[areaIndex].parties.some(p => p.id === newId);
            if (!exists) {
                copy[areaIndex].parties = [
                    ...copy[areaIndex].parties,
                    { id: newId, name: "", castedVotes: "", color: "" }
                ];
            }
            return copy;
        });
        setLastAddedId(newId);
    };

    const removePartyFromArea = (areaIndex, partyIndex) => {
        setAreas(prev => {
            const copy = [...prev];
            copy[areaIndex].parties = copy[areaIndex].parties.filter((_, i) => i !== partyIndex);
            return copy;
        });
    };

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

    useEffect(() => {
        if (lastAddedId !== null && partyRefs.current[lastAddedId]) {
            partyRefs.current[lastAddedId].scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [lastAddedId]);

    return (
        <div className={`fixed top-0 left-0 h-full bg-white px-5 z-50 transform transition-transform duration-300 shadow-lg ${expanded || mobileOpen ? "translate-x-0" : "-translate-x-full"} w-full lg:w-120 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-indigo-100 [&::-webkit-scrollbar-thumb]:rounded-full`} >

            <div>
                {/* Heading */}
                <div className="py-4 flex justify-between items-center flex-wrap">
                    <h3 className="text-indigo-600 font-semibold text-xl">Electra</h3>
                    <div className="flex w-42 lg:justify-end justify-between items-center flex-wrap">
                        <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 bg-indigo-600 active:shadow-sm hover:bg-indigo-300 transition duration-100 text-white text-[12px] px-3 py-2 rounded"> <BiPlus size={16} /> Add Vote</button>
                        {/* Toggle Sidebar */}
                        <button
                            onClick={() => setExpanded((prev) => !prev)}
                            className="lg:hidden text-white px-3 py-1.5 rounded hover:bg-indigo-300 bg-indigo-600 active:shadow-sm"
                        >
                            <BiMenu size={20} />
                        </button>
                    </div>
                </div>

                {/* When click on Add vote it will comes out slide from the left */}
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: isOpen ? "0%" : "-100%" }}
                    transition={{ type: "tween", duration: 0.4 }}
                    className="absolute top-0 left-0 h-[100vh] w-full lg:w-120 bg-white shadow-lg z-50 px-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-indigo-100 [&::-webkit-scrollbar-thumb]:rounded-full"

                >
                    <div className="flex justify-between items-center pt-4 pb-1">
                        <h2 className="font-semibold text-indigo-600 text-xl">Cast your vote</h2>
                        <div className="flex justify-between items-center gap-5">

                            {/* Location button */}
                            {/* <button className="flex items-center gap-4 active:shadow-sm bg-white border border-gray-200 transition duration-100 text-black text-[13px] px-3 py-2 rounded" onClick={() => setIsPopupOpen(!isPopupOpen)}> <GrLocation size={17} className="text-indigo-600" /> Location</button> */}
                            <GoPlus size={28} onClick={() => setIsOpen(!isOpen)} className="text-gray-600 rotate-45 hover:text-red-600" />
                        </div>

                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: isPopupOpen ? "0%" : "-100%" }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="absolute top-0 left-0 right-0 bg-white shadow-sm p-4 z-50"
                        >
                            <div className="flex justify-between items-center gap-3 mt-1">
                                <input
                                    type="text"
                                    className="w-full px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                    placeholder="Longitude Latitude"
                                />
                                <button
                                    type="button"
                                    className="flex items-center gap-2 bg-green-600 active:shadow-sm hover:bg-green-300 transition duration-100 text-white text-[13px] px-3 py-3 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>

                    </div>

                    {/* Put coordinates */}
                    <div className="mt-3 border-t border-gray-200">
                        <div className="mt-3">
                            <label className="text-[12px]">Put coordinates</label>
                            <div className="flex justify-between items-center flex-wrap gap-3 mt-1">
                                <input type="text" inputMode="numeric" value={mapCoords.latitude}
                                    onChange={(e) => setMapCoords({ ...mapCoords, latitude: e.target.value })}
                                    className="w-full lg:w-52 px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1 disabled:bg-gray-100 disabled:cursor-not-allowed" placeholder="Longitude" disabled={true} />

                                <input type="text" inputMode="numeric" value={mapCoords.longitude}
                                    onChange={(e) => setMapCoords({ ...mapCoords, longitude: e.target.value })}
                                    className="w-full lg:w-52 px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1 disabled:bg-gray-100 disabled:cursor-not-allowed" placeholder="Latitude" disabled={true}
                                />

                            </div>
                        </div>
                    </div>

                    {/* Add area and their parties */}
                    {areas.map((area, areaIndex) => (
                        <div key={area.id} className="mt-4 border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-indigo-600 text-xl mb-2">Area {areaIndex + 1}</h3>
                                <div className="flex items-center gap-2">
                                    {(areaIndex === 0 || areaIndex === areas.length - 1) ? (
                                        <>
                                            {areaIndex !== 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArea(areaIndex)}
                                                    className="flex items-center gap-2 bg-red-600 active:shadow-sm hover:bg-red-300 transition duration-100 text-white text-[12px] px-3 py-2 rounded"
                                                >
                                                    Remove Area
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={addArea}
                                                className="flex items-center gap-2 bg-green-600 active:shadow-sm hover:bg-green-300 transition duration-100 text-white text-[12px] px-3 py-2 rounded"
                                            >
                                                + Add Area
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => removeArea(areaIndex)}
                                            className="flex items-center gap-2 bg-red-600 active:shadow-sm hover:bg-red-300 transition duration-100 text-white text-[12px] px-3 py-2 rounded"
                                        >
                                            Remove Area
                                        </button>
                                    )}
                                </div>

                            </div>

                            {/* Area select */}
                            <label className="text-[12px]">Area</label>
                            <div className="flex justify-between flex-wrap gap-3 mt-1 mb-3">
                                <select
                                    value={area.area}
                                    onChange={(e) => {
                                        const updated = [...areas];
                                        updated[areaIndex] = { ...updated[areaIndex], area: e.target.value };
                                        setAreas(updated);
                                    }}
                                    className="w-full lg:w-52 px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                >
                                    <option value="">Select Area</option>
                                    <option value="street_1">Street 01</option>
                                    <option value="street_2">Street 02</option>
                                    <option value="street_3">Street 03</option>
                                    <option value="street_4">Street 04</option>
                                    <option value="street_5">Street 05</option>
                                    <option value="street_6">Street 06</option>
                                </select>

                                <input
                                    type="text"
                                    value={area.totalVotes}
                                    onChange={(e) => {
                                        const updated = [...areas];
                                        updated[areaIndex].totalVotes = e.target.value.replace(/[^0-9]/g, "");
                                        setAreas(updated);
                                    }}
                                    placeholder="Total votes"
                                    className="w-full lg:w-52 px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300"
                                />
                                <input
                                    type="text"
                                    value={area.totalCastedVotes}
                                    onChange={(e) => {
                                        const updated = [...areas];
                                        updated[areaIndex].totalCastedVotes = e.target.value.replace(/[^0-9]/g, "");
                                        setAreas(updated);
                                    }}
                                    placeholder="Casted votes"
                                    className="w-full lg:w-52 px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300"
                                />

                            </div>

                            {/* Parties for this area */}
                            {area.parties.map((party, partyIndex) => (
                                <div key={party.id} ref={(el) => (partyRefs.current[party.id] = el)} className="my-3">
                                    <div className="flex justify-between items-center py-4">
                                        <h4 className="font-semibold text-indigo-600 text-lg mb-2">Party {partyIndex + 1}</h4>
                                        <div className="flex gap-3">
                                            {area.parties.length === 1 ? (
                                                <GoPlus
                                                    size={22}
                                                    onClick={() => addPartyToArea(areaIndex)}
                                                    className="cursor-pointer font-semibold text-gray-600 hover:text-green-600 transition duration-300"
                                                />
                                            ) : (
                                                <div className="flex gap-3">
                                                    <GoPlus
                                                        size={22}
                                                        onClick={() => removePartyFromArea(areaIndex, partyIndex)}
                                                        className="cursor-pointer font-semibold text-gray-600 rotate-45 hover:text-red-600 transition duration-300"
                                                    />
                                                    {partyIndex === area.parties.length - 1 && (
                                                        <GoPlus
                                                            size={22}
                                                            onClick={() => addPartyToArea(areaIndex)}
                                                            className="cursor-pointer font-semibold text-gray-600 hover:text-green-600 transition duration-300"
                                                        />
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    <label className="text-[12px]">Name</label>
                                    <div className="flex justify-between items-center flex-wrap gap-3 mt-1">
                                        <input
                                            type="text"
                                            value={party.name}
                                            onChange={(e) => {
                                                const updated = [...areas];
                                                updated[areaIndex].parties[partyIndex] = { ...updated[areaIndex].parties[partyIndex], name: e.target.value };
                                                setAreas(updated);
                                            }}
                                            className="w-full lg:w-52 px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                            placeholder="Party name"
                                        />
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={party.castedVotes}
                                            onChange={(e) => {
                                                const updated = [...areas];
                                                updated[areaIndex].parties[partyIndex] = { ...updated[areaIndex].parties[partyIndex], castedVotes: e.target.value.replace(/[^0-9]/g, "") };
                                                setAreas(updated);
                                            }}
                                            className="w-full lg:w-52 px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                            placeholder="Casted votes"
                                        />
                                    </div>

                                    <div className="flex justify-between items-center flex-wrap gap-3 mt-3">
                                        <div className="relative w-full lg:w-52">
                                            <input
                                                type="color"
                                                value={party.color || "#000000"}
                                                onChange={(e) => {
                                                    const updated = [...areas];
                                                    updated[areaIndex].parties[partyIndex] = { ...updated[areaIndex].parties[partyIndex], color: e.target.value };
                                                    setAreas(updated);
                                                }}
                                                className="absolute inset-0 w-full h-full opacity-0"
                                            />

                                            <div className="flex items-center justify-between px-3 py-3 border border-gray-200 rounded bg-white">
                                                <div className="w-5 h-5 rounded" style={{ backgroundColor: party.color || "#000000" }}></div>

                                                <span className="ml-2 text-gray-700 text-sm">
                                                    {party.color || "#000000"}
                                                </span>

                                                <svg className="w-4 h-4 ml-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    ))}

                    <div className="flex justify-center items-center my-3">
                        <button type="button" className="flex items-center gap-2 bg-indigo-600 active:shadow-sm hover:bg-indigo-300 transition duration-100 text-white text-[13px] px-3 py-3 rounded" onClick={handleSave}>
                            Save data
                        </button>
                    </div>

                </motion.div>

                <div className="flex gap-3 justify-center items-center mt-4 border-t border-gray-200">

                    {/* Multiple pie chart according to street */}
                    <div className="w-full mt-8">
                        {allParties.length === 0 ? (
                            <div className="flex justify-center items-center h-40 text-gray-500 text-sm">
                                Click add vote to fill out the fields
                            </div>
                        ) : (
                            [...new Set(allParties.map((p) => p.area).filter(Boolean))]
                                .map((street) => {
                                    const streetParties = allParties.filter((p) => p.area === street);

                                    const winner = streetParties.length ? streetParties.reduce((max, p) =>
                                        Number(p.castedVotes) > Number(max.castedVotes) ? p : max
                                    ) : null;

                                    return (
                                        <div key={street} className="mb-10">
                                            <h3 className="text-center font-semibold text-indigo-600 mb-3 capitalize">
                                                {street ? street.replace(/_/g, " ") : "Unknown"}
                                            </h3>

                                            <div className="w-full max-w-[400px] h-70 mx-auto bg-white">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={streetParties.map((p) => ({
                                                                ...p,
                                                                castedVotes: Number(p.castedVotes) || 0,
                                                            }))}
                                                            dataKey="castedVotes"
                                                            nameKey="name"
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={70}
                                                            innerRadius={30}
                                                            paddingAngle={3}
                                                        >
                                                            {streetParties.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color || "#6366F1"} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip formatter={(value) => [value, "Votes"]} contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }} />
                                                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>

                                            {/* Winner Info */}
                                            <div className="mt-3 text-center text-sm">
                                                <p className="font-semibold text-indigo-600">
                                                    Winner:{" "}
                                                    {winner ? winner.name : "N/A"}
                                                </p>
                                                <p className="text-gray-500">
                                                    Votes:{" "}
                                                    {winner ? winner.castedVotes : 0}
                                                    {" "} /{" "}
                                                    {streetParties.reduce((sum, p) => sum + Number(p.castedVotes || 0), 0)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
