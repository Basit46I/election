import { MapContainer, Polygon, Polyline, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useMemo } from "react"
import { mapData } from "../data/mapData"

// Helper: fit to bounds of many polygons
function FitToBounds({ items }) {
    const map = useMap()

    const bounds = useMemo(() => {
        const b = L.latLngBounds([])
        items.forEach(item => {
            item.coordinates.forEach(([lat, lng]) => b.extend([lat, lng]))
        })
        return b
    }, [items])

    useEffect(() => {
        if (!items.length) return
        map.fitBounds(bounds, { padding: [20, 20] })
    }, [items, bounds, map])

    return null
}

// Helper: fit to a single polygon
function FitToPolygon({ coordinates }) {
    const map = useMap()
    useEffect(() => {
        if (coordinates?.length) {
            map.fitBounds(coordinates, { padding: [20, 20] })
        }
    }, [coordinates, map])
    return null
}

export default function ElectionMap({ selectedFilters }) {
    const { parties, area, subArea } = selectedFilters

    // Filter logic (party → areas → subAreas)
    const filtered = mapData.filter(i =>
        (!parties || i.party === parties) &&
        (!area || i.area === area) &&
        (!subArea || i.subArea === subArea)
    )

    // Initial world bounds
    const worldBounds = [
        [-90, -180],
        [90, 180]
    ]

    // Determine whether to fit to many polygons or one
    const fitMany = filtered.length > 1
    const fitOne = filtered.length === 1 ? filtered[0] : null

    return (
        <MapContainer
            bounds={worldBounds}
            maxBounds={worldBounds}   // 👈 Prevents going outside the world
            maxBoundsViscosity={1.0}  // 👈 Makes the map feel "sticky" at the edges
            style={{ height: "100vh", width: "100%" }}
            zoomControl={true}
            scrollWheelZoom={true}
            minZoom={3}
        >
            {/* English-only basemap */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />

            {/* Party/Area polygons */}
            {filtered.map((block, idx) => {
                const baseStyle = {
                    color: block.color,     // Border color
                    weight: 2,              // Border thickness
                    fill: 0.1,            // No fill at all
                    fillOpacity: 0,         // Ensures no accidental fill
                    dashArray: "6 4"        // Dashed border pattern
                }

                // If an area or subarea is chosen, slightly highlight the exact match
                const isExact =
                    (!!area && block.area === area && !subArea) ||
                    (!!subArea && block.subArea === subArea)

                const style = isExact
                    ? { ...baseStyle, weight: 3, dashArray: "8 4" } // Slightly bolder & different dash for highlight
                    : baseStyle

                return (
                    <Polygon
                        key={idx}
                        positions={block.coordinates}
                        pathOptions={style}
                    >
                        <Tooltip sticky>
                            <div style={{ fontSize: 12 }}>
                                <div><strong>Party:</strong> {block.partyLabel}</div>
                                <div><strong>Area:</strong> {block.areaLabel}</div>
                                <div><strong>Sub Area:</strong> {block.subAreaLabel}</div>
                            </div>
                        </Tooltip>
                    </Polygon>
                )
            })}

            {/* Streets + Polling stations only when a single area (or subArea) is in view */}
            {filtered.map((block, idx) => (
                <div key={`extras-${idx}`}>
                    {/* Streets */}
                    {(area || subArea) && block.streets?.map((line, i) => (
                        <Polyline
                            key={`st-${idx}-${i}`}
                            positions={line}
                            pathOptions={{ color: "#0077ff", weight: 3, opacity: 0.9 }}
                        />
                    ))}

                    {/* Polling Stations */}
                    {(area || subArea) && block.pollingStations?.map((ps, i) => (
                        <Marker key={`ps-${idx}-${i}`} position={ps.coordinates}>
                            <Popup>
                                <strong>{ps.name}</strong><br />
                                {block.areaLabel} — {block.subAreaLabel}
                            </Popup>
                        </Marker>
                    ))}
                </div>
            ))}

            {fitMany && <FitToBounds items={filtered} />}
            {fitOne && <FitToPolygon coordinates={fitOne.coordinates} />}
        </MapContainer>
    )
}
