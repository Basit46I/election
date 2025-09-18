import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useMap } from 'react-leaflet';

export default function ZoomControl() {

    const map = useMap();

    const handleZoomIn = () => {
        map.zoomIn();
    };

    const handleZoomOut = () => {
        map.zoomOut();
    };

    return (
        <div className="absolute bottom-10 right-2 z-1000 bg-white flex flex-col rounded-lg shadow-lg">
            <button className="text-gray-600 p-2 hover:bg-gray-200 rounded-t-lg" onClick={handleZoomIn}><FaPlus size={11} /></button>
            <div className="bg-gray-300 p-[0.5px]"></div>
            <button className="text-gray-600 p-2 hover:bg-gray-200 rounded-b-lg" onClick={handleZoomOut}><FaMinus size={11} /></button>
        </div>
    )
}
