import {
    MapContainer,
    Polygon,
    Polyline,
    TileLayer,
    Marker,
    Popup,
    Tooltip,
    useMap,
    ZoomControl,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useMemo } from "react"
import { mapData, streetCoordinates } from "../data/mapData"
import { FaMapMarkerAlt } from "react-icons/fa"
import { renderToStaticMarkup } from "react-dom/server"

// Party → color map
const partyColors = {
    jip: "#157a35",
    mqm: "#ff7f0e",
}

// ✅ Function to generate custom React Icon marker per party
function getPartyIcon(party) {
    return L.divIcon({
        html: renderToStaticMarkup(
            <div
                style={{
                    color: "#189fedff",
                    fontSize: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <FaMapMarkerAlt />
            </div>
        ),
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    })
}

// 🔹 Fit to bounds of multiple polygons
function FitToBounds({ items }) {
    const map = useMap()
    const bounds = useMemo(() => {
        const b = L.latLngBounds([])
        items.forEach((item) => {
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

// 🔹 Fit to one polygon
function FitToPolygon({ coordinates }) {
    const map = useMap()
    useEffect(() => {
        if (coordinates?.length) {
            map.fitBounds(coordinates, { padding: [20, 20] })
        }
    }, [coordinates, map])
    return null
}

// 🔹 Legend Component
function Legend() {
    return (
        <div
            style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                background: "white",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "14px",
                lineHeight: "1.6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
        >
            <strong>Legend</strong>
            {Object.entries(partyColors).map(([key, color]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                        style={{
                            width: "14px",
                            height: "14px",
                            background: color,
                            display: "inline-block",
                            borderRadius: "3px",
                        }}
                    />
                    <span style={{ textTransform: "uppercase" }}>{key}</span>
                </div>
            ))}
        </div>
    )
}

export default function ElectionMap({ selectedFilters, searchSelection, partyDetails }) {
    const { parties, area, subArea } = selectedFilters

    // If searchSelection exists → only show that
    let filtered = mapData

    if (searchSelection) {
        // 🔹 Search overrides everything
        filtered = [searchSelection]
    } else if (parties || area || subArea) {
        // 🔹 Filters override when search is not active
        filtered = mapData.filter(
            (i) =>
                (!parties || i.party === parties) &&
                (!area || i.area === area) &&
                (!subArea || i.subArea === subArea)
        )
    }

    const worldBounds = [
        [-90, -180],
        [90, 180],
    ]

    const fitMany = filtered.length > 1
    const fitOne = filtered.length === 1 ? filtered[0] : null

    const coordsList = partyDetails
        .map((party) => streetCoordinates[party.area])
        .filter(Boolean) // remove undefined
    console.log(partyDetails);

    return (
        <div style={{ position: "relative" }}>
            <MapContainer
                bounds={worldBounds}
                maxBounds={worldBounds}
                maxBoundsViscosity={1.0}
                style={{ height: "100vh", width: "100%" }}
                zoomControl={false}
                scrollWheelZoom={true}
                minZoom={3}
            >
                {/* Zoom Control */}
                <ZoomControl position="bottomright" />

                {/* Basemap */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {/* Polygons */}
                {partyDetails && partyDetails.map((party, index) => {
                    const coords = streetCoordinates[party.area];
                    console.log(streetCoordinates);
                    if (!coords) return null;

                    return (
                        <Polygon key={index} positions={coords} pathOptions={{
                            color: party.color || "blue",
                            fillColor: party.color || "blue",
                            fillOpacity: 0.4,
                        }}>
                            <Tooltip sticky>
                                <div style={{ fontSize: 12 }}>
                                    <div>
                                        <strong>Party:</strong> {party.name}
                                    </div>
                                    <div>
                                        <strong>Area:</strong> {party.area}
                                    </div>
                                    <div>
                                        <strong>Total votes:</strong> {party.totalVotes}
                                    </div>
                                </div>
                            </Tooltip>
                        </Polygon>
                    )
                })}

                {/* Auto zoom */}
                {fitMany && <FitToBounds items={coordsList} />}
                {fitOne && <FitToPolygon coordinates={fitOne.coordinates} />}
            </MapContainer>

            {/* Legend */}
            <Legend />
        </div>
    )
}

