import { MapContainer, Marker, Polygon, Polyline, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { divIcon, Icon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { coordinates, streetCoordinates } from '../data/mapData';
import ZoomControl from './ZoomControl';

export default function Map({ electionDetail, searchSelection }) {

    const areas = electionDetail || [];

    const allParties = areas.flatMap(area => (area.parties || []).map(p => ({ ...p, area: area.area })));

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: point(33, 33, true)
        })
    }

    const streetEndIcon = divIcon({
        className: "street-end-icon",
        html: `<div class="street-icon"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });

    const displayedParties = searchSelection
        ? allParties.filter(party =>
            (searchSelection.name && party.name === searchSelection.name) &&
            (!searchSelection.area || party.area === searchSelection.area)
        )
        : allParties;

    return (
        <div className="h-screen w-full transform transition-transform duration-300">

            <MapContainer center={[24.911707705451338, 67.1160249854709]} zoom={13} zoomControl={false} className="h-full w-full rounded-lg shadow">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <ZoomControl />

                {
                    <Polygon positions={coordinates} pathOptions={{
                        color: "#4f39f6",
                        fillColor: "#4f39f6",
                        fillOpacity: 0,
                        weight: 2,
                    }} >
                    </Polygon>
                }

                <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
                    {areas.map((area, index) => {
                        if (!area.area) return null;

                        const street = streetCoordinates.find(s => s.name === area.area);
                        if (!street) return null;

                        const first = street.coordinates[0];
                        const matchingParties = (displayedParties || []).filter(p => p.area === area.area);
                        if (matchingParties.length === 0) return null;

                        const winner = matchingParties.reduce((prev, curr) =>
                            Number(curr.castedVotes) > Number(prev.castedVotes) ? curr : prev
                        );

                        const lineColor = winner.color || "#4f39f6";
                        const formattedStreetName = area.area.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

                        return (
                            <div key={index}>
                                <Polyline positions={street.coordinates} pathOptions={{ color: lineColor, weight: 3 }} />

                                <Marker position={first} icon={streetEndIcon}>
                                    <Popup closeButton={true}>
                                        <div className="flex flex-col gap-3 items-start">
                                            <h3 className="text-base font-bold text-gray-800">
                                                {winner.name} (Winner)
                                            </h3>
                                            <span className="text-sm font-semibold">{formattedStreetName}</span>
                                            <span className="text-sm font-semibold" style={{ color: winner.color }}>
                                                {winner.castedVotes} votes
                                            </span>
                                            <div className="text-xs text-gray-700 mt-2">
                                                <p>Total Votes: {area.totalVotes || "—"}</p>
                                                <p>Casted Votes: {area.totalCastedVotes || "—"}</p>
                                                <p>Winner: {winner.name}</p>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            </div>
                        );
                    })}
                </MarkerClusterGroup>

            </MapContainer>

        </div >
    )
}
