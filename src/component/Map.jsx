import { MapContainer, Marker, Polygon, Polyline, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { divIcon, Icon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { coordinates, streetCoordinates } from '../data/mapData';
import ZoomControl from './ZoomControl';

export default function Map({ partyDetails, searchSelection }) {

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
        ? partyDetails.filter(party => party.name === searchSelection.name)
        : partyDetails;

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
                    {streetCoordinates.map((street, index) => {
                        const first = street.coordinates[0];

                        const matchingParties = displayedParties.filter(
                            (party) => party.area === street.name
                        );

                        if (matchingParties.length > 1) {
                            alert(`${street.name} is already there`);
                        }

                        if (matchingParties.length === 0) return null;

                        const lineColor = matchingParties[0].color;

                        const formattedStreetName = street.name.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

                        return (
                            <div key={index}>
                                <Polyline positions={street.coordinates} pathOptions={{
                                    color: lineColor,
                                    weight: 3,
                                }} />

                                <Marker position={first} icon={streetEndIcon}>
                                    <Popup closeButton={true}>
                                        <div className="">
                                            {matchingParties.map((party) => (
                                                <div key={party.id} className="flex flex-col gap-3 items-start">
                                                    {/* Party name */}
                                                    <h3 className="text-base font-bold text-gray-800">{party.name}</h3>

                                                    {/* Street badge */}
                                                    <span className="text-sm font-semibold">
                                                        {formattedStreetName}
                                                    </span>

                                                    {/* Votes */}
                                                    <span className="text-sm font-semibold" style={{ color: party.color }}>
                                                        {party.castedVotes} votes
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Popup>
                                </Marker>

                            </div>
                        )
                    })}
                </MarkerClusterGroup>

            </MapContainer>

        </div >
    )
}
