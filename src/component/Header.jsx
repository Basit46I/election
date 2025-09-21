import { useState, useRef, useEffect } from "react"
import { BiMenu, BiSearch } from "react-icons/bi"

export default function Header({ expanded, setExpanded, onSearchSelect, electionDetail }) {
    const [searchOpen, setSearchOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const searchRef = useRef(null)

    const handleSearch = (e) => {
        const value = e.target.value
        setQuery(value)
        setLoading(true)
        setResults([])

        if (!value.trim()) {
            setLoading(false)
            setResults([])
            return
        }

        const parties = (electionDetail || []).flatMap((area) =>
            (area.parties || []).map((p) => ({ ...p, area: area.area, totalVotes: area.totalVotes }))
        );

        setTimeout(() => {
            const filtered = parties.filter(
                (item) =>
                    item.name.toLowerCase().includes(value.toLowerCase()) ||
                    item.area.toLowerCase().includes(value.toLowerCase()) ||
                    item.castedVotes.toLowerCase().includes(value.toLowerCase())
            )
            setResults(filtered)
            setLoading(false)
        }, 500)

        setSearchOpen(true)
    }

    const handleSelect = (item) => {
        setQuery("")
        setResults([])
        setSearchOpen(false)
        if (onSearchSelect) onSearchSelect(item)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div
            className={`
                fixed top-0 right-0 flex items-center gap-5 z-40
                p-3 transition-all duration-300
                ${expanded ? "left-0 lg:left-120" : "left-0 w-full"}
            `}
        >
            {/* Toggle Sidebar */}
            <button
                onClick={() => setExpanded((prev) => !prev)}
                className="text-black bg-white p-3 hover:bg-indigo-600 hover:text-white rounded-full shadow-lg"
            >
                <BiMenu size={20} />
            </button>

            {/* Search */}
            <div className="relative flex-1 flex" ref={searchRef}>
                <div className="bg-white py-3 px-4 flex items-center gap-3 rounded-full shadow-lg lg:w-100 w-full">
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        onFocus={() => setSearchOpen(true)}
                        placeholder="Search anything"
                        className="w-full text-xs outline-none text-gray-700"
                    />
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <BiSearch size={20} className="text-gray-500" />
                    )}
                </div>

                {/* Dropdown Results */}
                {searchOpen && (
                    <div className="absolute top-14 bg-white shadow-2xl lg:w-100 w-full max-h-64 overflow-y-auto z-50 rounded-sm">
                        {loading ? (
                            <div className="px-3 py-4 text-sm text-gray-500 flex justify-center">
                                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : results.length > 0 ? (
                            results.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelect(item)}
                                    className="px-3 py-2 text-sm border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="text-xs font-semibold">{item.name}</div>
                                    <div className="text-xs text-gray-600">
                                        {item.area.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())} → {item.castedVotes}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-xs text-center text-gray-500">
                                No data found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
