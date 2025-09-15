import { useEffect, useRef, useState } from 'react'
import { BiPlus, BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuSettings2 } from 'react-icons/lu';
import { color, motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa';
import { RxCross1, RxPlus } from 'react-icons/rx';
import { GoPlug, GoPlus } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';

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

export default function Sidebar({ list, setList, expanded, setExpanded, mobileOpen, setMobileOpen, partyDetails, setPartyDetails, isPopupOpen, setIsPopupOpen, coordinates, setCoordinates, settingCoordinates }) {
    const [filteredArea, setFilteredArea] = useState([])
    const [filteredSubArea, setFilteredSubArea] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const partyRefs = useRef([]);
    const [lastAddedId, setLastAddedId] = useState(null);

    const addPartyDetails = () => {
        setPartyDetails((prev) => {
            const newId = crypto.randomUUID(); // unique id every time
            const updated = [
                ...prev,
                { id: newId, name: "", totalVotes: "", castedVotes: "", area: "", color: "" }
            ];
            setLastAddedId(newId);
            return updated;
        });
    };

    const removeParty = (indexToRemove) => {
        setPartyDetails((prev) => prev.filter((_, i) => i !== indexToRemove));
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

    // Scroll to last added when id changes
    useEffect(() => {
        if (lastAddedId !== null && partyRefs.current[lastAddedId]) {
            partyRefs.current[lastAddedId].scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [lastAddedId]);

    return (
        <>
            <div className={`fixed top-0 left-0 h-full w-120 bg-white px-5 z-50 transform transition-transform duration-300 shadow-lg hidden lg:block ${expanded ? "translate-x-0" : "-translate-x-full"}`}>

                {/* Heading */}
                <div className="py-4 flex justify-between items-center">
                    <h3 className="text-indigo-600 font-semibold text-xl">Electra</h3>
                    <div className="flex w-42 justify-between items-center">
                        <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 bg-indigo-600 active:shadow-sm hover:bg-indigo-300 transition duration-100 text-white text-[13px] px-3 py-3 rounded"> <BiPlus size={16} /> Add Vote</button>
                        <img className="w-10 h-10 rounded-full" src="/profile.jpg" alt="" />
                    </div>
                </div>

                {/* When click on Add vote it will comes out slide from the left */}
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: isOpen ? "0%" : "-100%" }}
                    transition={{ type: "tween", duration: 0.4 }}
                    className="fixed top-0 left-0 h-full w-120 bg-white shadow-lg z-50 px-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-indigo-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-button]:hidden [scrollbar-width:thin] [scrollbar-color:#c7d2fe_#ffffff]"
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
                                    value={coordinates}
                                    onChange={(e) => setCoordinates(e.target.value)}
                                    className="w-full px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                    placeholder="Longitude Latitude"
                                />
                                <button
                                    type="button"
                                    onClick={settingCoordinates}
                                    className="flex items-center gap-2 bg-green-600 active:shadow-sm hover:bg-green-300 transition duration-100 text-white text-[13px] px-3 py-3 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>

                    </div>

                    {/* Vote */}
                    <div className="mt-3 border-t border-gray-200">
                        {/* <div className="mt-3">
                            <label className="text-[12px]">Votes</label>
                            <div className="flex justify-between items-center gap-3 mt-1">
                                <input type="text" inputMode="numeric" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, "") }} className="w-full px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1" placeholder="Total votes" />
                                <input type="text" inputMode="numeric" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, "") }} className="w-full px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1" placeholder="Casted votes" />
                            </div>
                        </div> */}
                    </div>

                    {/* Party wise votes */}
                    {partyDetails.map((item, index) => (
                        <div key={item.id} ref={(el) => (partyRefs.current[item.id] = el)} className="my-3">
                            <div className="flex justify-between items-center py-4">
                                <h3 className="font-semibold text-indigo-600 text-xl mb-2">Party {index + 1}</h3>
                                <div className="flex gap-3">
                                    <GoPlus
                                        size={28}
                                        onClick={index === partyDetails.length - 1 ? addPartyDetails : () => removeParty(index)}
                                        className={`font-semibold text-gray-600 ${index === partyDetails.length - 1 ? "rotate-0 hover:text-green-600" : "rotate-45 hover:text-red-600"} transition duration-300`}
                                    />
                                </div>

                            </div>

                            <label className="text-[12px]">Name</label>
                            <div className="flex justify-between items-center gap-3 mt-1">
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => {
                                        const newDetails = [...partyDetails];
                                        newDetails[index].name = e.target.value;
                                        setPartyDetails(newDetails);
                                    }}
                                    className="w-full px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                    placeholder="Party name"
                                />
                            </div>

                            <div className="flex justify-between items-center gap-3 mt-3">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={item.totalVotes}
                                    onChange={(e) => {
                                        const newDetails = [...partyDetails];
                                        newDetails[index].totalVotes = e.target.value.replace(/[^0-9]/g, "");
                                        setPartyDetails(newDetails);
                                    }}
                                    className="w-full px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                    placeholder="Total votes"
                                />

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={item.castedVotes}
                                    onChange={(e) => {
                                        const newDetails = [...partyDetails];
                                        newDetails[index].castedVotes = e.target.value.replace(/[^0-9]/g, "");
                                        setPartyDetails(newDetails);
                                    }}
                                    className="w-full px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                    placeholder="Casted votes"
                                />
                            </div>

                            <div className="flex justify-between items-center gap-3 mt-3">
                                <select
                                    value={item.area}
                                    onChange={(e) => {
                                        const newDetails = [...partyDetails];
                                        newDetails[index].area = e.target.value;
                                        setPartyDetails(newDetails);
                                    }}
                                    className="w-full px-3 py-3 outline-none text-[12px] border border-gray-200 rounded transition duration-300 ring-indigo-600 focus:ring-1"
                                >
                                    <option value="">Select Area</option>
                                    <option value="street_1">Street 01</option>
                                    <option value="street_2">Street 02</option>
                                    <option value="street_3">Street 03</option>
                                    <option value="street_4">Street 04</option>
                                    <option value="street_5">Street 05</option>
                                    <option value="street_6">Street 06</option>
                                </select>

                                {/* Color picker box */}
                                <div className="relative w-full">
                                    {/* Invisible color input */}
                                    <input
                                        type="color"
                                        value={item.color || "#000000"}
                                        onChange={(e) => {
                                            const newDetails = [...partyDetails];
                                            newDetails[index].color = e.target.value;
                                            setPartyDetails(newDetails);
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0"
                                    />

                                    {/* Styled input look */}
                                    <div className="flex items-center justify-between px-3 py-3 border border-gray-200 rounded bg-white">
                                        {/* Color preview */}
                                        <div
                                            className="w-5 h-5 rounded"
                                            style={{ backgroundColor: item.color || "#000000" }}
                                        ></div>

                                        {/* Hex code text */}
                                        <span className="ml-2 text-gray-700 text-sm">
                                            {item.color || "#000000"}
                                        </span>

                                        {/* Dropdown arrow (just for look) */}
                                        <svg
                                            className="w-4 h-4 ml-auto text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center items-center my-3">
                        <button type="button" className="flex items-center gap-2 bg-indigo-600 active:shadow-sm hover:bg-indigo-300 transition duration-100 text-white text-[13px] px-3 py-3 rounded">
                            Save data
                        </button>
                    </div>

                </motion.div>

                <div className="flex gap-3 justify-between items-center mt-4 border-t border-gray-200">
                    {/* Searching */}
                    <div className="bg-[#f2f3f7] pl-3 flex items-center gap-3 mt-3 rounded w-full">
                        <BiSearch size={20} className="text-[#cacdd4]" />
                        <input
                            type="text"
                            // value={query}
                            // onChange={handleSearch}
                            // onFocus={() => setSearchOpen(true)}   // 👈 open when clicked
                            placeholder="Search party, area, or subarea..."
                            className="w-full text-[13px] py-3 outline-none text-gray-700 placeholder-[#cacdd4]"
                        />
                        {/* {loading ? (
                        // <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        )} */}
                    </div>

                    {/* Filter button */}
                    <button className="flex items-center gap-4 mt-3 active:shadow-sm bg-white border border-gray-200 transition duration-100 text-black text-[13px] px-3 py-3 rounded"> <LuSettings2 size={17} className="text-indigo-600" /> Filters</button>
                </div>

                <div className="mt-4 px-3 border border-gray-200">
                    asdfasdf
                </div>

            </div>

            <>
                {/* DESKTOP SIDEBAR */}
                {/* <div
                className={`fixed top-0 left-0 h-full w-90 bg-[#242831] z-50
    transform transition-transform duration-300 hidden lg:block
    ${expanded ? "translate-x-0" : "-translate-x-full"}`}
            > */}
                {/* <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h3 className="text-white font-semibold text-2xl">Geo Election</h3>
                </div> */}

                {/* <div className="p-4 space-y-6 overflow-y-auto"> */}
                {/* Party */}
                {/* <div>
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
                    </div> */}

                {/* Area */}
                {/* <div>
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
                    </div> */}

                {/* Sub Area */}
                {/* <div>
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
            </div> */}

                {/* MOBILE SIDEBAR */}
                {/* <div
                className={`fixed top-0 left-0 h-full w-90 bg-[#242831] shadow-2xl z-50 transform transition-transform duration-300 lg:hidden
                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            > */}
                {/* <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h3 className="text-white font-semibold text-2xl">Geo Election</h3>
                    <button onClick={() => setMobileOpen(false)} className="text-white text-xl">✕</button>
                </div> */}

                {/* <div className="p-4 space-y-6 overflow-y-auto"> */}
                {/* Party */}
                {/* <div>
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
                    </div> */}

                {/* Area */}
                {/* <div>
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
                    </div> */}

                {/* Sub Area */}
                {/* <div>
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
            </div> */}

                {/* MOBILE BOTTOM BAR */}
                {/* <div className="fixed bottom-0 w-full lg:hidden z-40">
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
            </div> */}
            </>
        </>
    )
}
